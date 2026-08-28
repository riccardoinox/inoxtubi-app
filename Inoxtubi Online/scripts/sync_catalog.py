"""
Inoxtubi Online - Automatic Live Catalog Synchronizer
Fetches all leaf categories, products, real prices, and availability directly from https://www.inoxtubionline.com.
Saves updated datasets to src/data/products.json and src/data/products.ts.
"""

import urllib.request
import re
import html
import json
import os
import time
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "http://www.inoxtubionline.com/"
HEADERS = {
    'Host': 'www.inoxtubionline.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_JSON = os.path.join(ROOT_DIR, "src", "data", "products.json")
OUTPUT_TS = os.path.join(ROOT_DIR, "src", "data", "products.ts")

LEAF_CATEGORIES = [
    {"name": "Tubi Tondi AISI 304", "url": "Category.aspx?CategoryID=10&strParent=2,8", "category": "Tubi", "subcategory": "Tubi Tondi", "shape": "Tubo Tondo", "alloy": "AISI 304"},
    {"name": "Tubi Tondi AISI 316", "url": "Category.aspx?CategoryID=11&strParent=2,8", "category": "Tubi", "subcategory": "Tubi Tondi", "shape": "Tubo Tondo", "alloy": "AISI 316"},
    {"name": "Tubi Senza Saldatura AISI 304", "url": "Category.aspx?CategoryID=24&strParent=2,23", "category": "Tubi", "subcategory": "Tubi Senza Saldatura", "shape": "Tubo Tondo Senza Saldatura", "alloy": "AISI 304"},
    {"name": "Tubi Senza Saldatura AISI 316", "url": "Category.aspx?CategoryID=25&strParent=2,23", "category": "Tubi", "subcategory": "Tubi Senza Saldatura", "shape": "Tubo Tondo Senza Saldatura", "alloy": "AISI 316"},
    {"name": "Tubi Quadri", "url": "Category.aspx?CategoryID=9&strParent=2", "category": "Tubi", "subcategory": "Tubi Quadri", "shape": "Tubo Quadro", "alloy": "AISI 304"},
    {"name": "Tubi Rettangolari", "url": "Category.aspx?CategoryID=12&strParent=2", "category": "Tubi", "subcategory": "Tubi Rettangolari", "shape": "Tubo Rettangolare", "alloy": "AISI 304"},
    {"name": "Tubi Lucidi AISI 304", "url": "Category.aspx?CategoryID=21&strParent=20", "category": "Tubi", "subcategory": "Tubi Lucidi", "shape": "Tubo Tondo", "alloy": "AISI 304", "finish": "Lucido a specchio (Grit 600)"},
    {"name": "Tubi Lucidi AISI 316", "url": "Category.aspx?CategoryID=22&strParent=20", "category": "Tubi", "subcategory": "Tubi Lucidi", "shape": "Tubo Tondo", "alloy": "AISI 316", "finish": "Lucido a specchio (Grit 600)"},
    {"name": "Barre Piatte", "url": "Category.aspx?CategoryID=13&strParent=4", "category": "Barre", "subcategory": "Barre Piatte", "shape": "Barra Piatta", "alloy": "AISI 304"},
    {"name": "Barre Tonde AISI 304", "url": "Category.aspx?CategoryID=16&strParent=4,14", "category": "Barre", "subcategory": "Barre Tonde", "shape": "Barra Tonda", "alloy": "AISI 304"},
    {"name": "Barre Tonde AISI 316", "url": "Category.aspx?CategoryID=17&strParent=4,14", "category": "Barre", "subcategory": "Barre Tonde", "shape": "Barra Tonda", "alloy": "AISI 316"},
    {"name": "Barre Tonde AISI 303", "url": "Category.aspx?CategoryID=18&strParent=4,14", "category": "Barre", "subcategory": "Barre Tonde", "shape": "Barra Tonda", "alloy": "AISI 303"},
    {"name": "Barre Angolari", "url": "Category.aspx?CategoryID=15&strParent=4", "category": "Barre", "subcategory": "Barre Angolari", "shape": "Barra Angolare", "alloy": "AISI 304"},
    {"name": "Lamiere Inox", "url": "Category.aspx?CategoryID=19", "category": "Lamiere", "subcategory": "Lamiere Inox", "shape": "Lamiera", "alloy": "AISI 304"},
    {"name": "Cartelle", "url": "Category.aspx?CategoryID=27&strParent=26", "category": "Raccorderia", "subcategory": "Cartelle", "shape": "Cartella", "alloy": "AISI 304"},
    {"name": "Curve AISI 304", "url": "Category.aspx?CategoryID=29&strParent=26,28", "category": "Raccorderia", "subcategory": "Curve", "shape": "Curva", "alloy": "AISI 304"},
    {"name": "Curve AISI 316", "url": "Category.aspx?CategoryID=30&strParent=26,28", "category": "Raccorderia", "subcategory": "Curve", "shape": "Curva", "alloy": "AISI 316"},
    {"name": "Curve ISO", "url": "Category.aspx?CategoryID=31&strParent=26,28", "category": "Raccorderia", "subcategory": "Curve", "shape": "Curva", "alloy": "AISI 304"},
    {"name": "Fondi Bombati", "url": "Category.aspx?CategoryID=32&strParent=26", "category": "Raccorderia", "subcategory": "Fondi Bombati", "shape": "Fondo Bombato", "alloy": "AISI 304"},
    {"name": "Flange", "url": "Category.aspx?CategoryID=33&strParent=26", "category": "Raccorderia", "subcategory": "Flange", "shape": "Flangia", "alloy": "AISI 304"},
    {"name": "Gomiti", "url": "Category.aspx?CategoryID=34&strParent=26", "category": "Raccorderia", "subcategory": "Gomiti", "shape": "Gomito", "alloy": "AISI 304"},
    {"name": "Manicotti", "url": "Category.aspx?CategoryID=35&strParent=26", "category": "Raccorderia", "subcategory": "Manicotti", "shape": "Manicotto", "alloy": "AISI 304"},
    {"name": "Riduzioni Concentriche", "url": "Category.aspx?CategoryID=36&strParent=26", "category": "Raccorderia", "subcategory": "Riduzioni", "shape": "Riduzione", "alloy": "AISI 304"},
    {"name": "Tronchetti", "url": "Category.aspx?CategoryID=37&strParent=26", "category": "Raccorderia", "subcategory": "Tronchetti", "shape": "Tronchetto", "alloy": "AISI 304"},
]

def fetch(url):
    try:
        full_url = urljoin(BASE_URL, url)
        req = urllib.request.Request(full_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=8) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception:
        return ""

def clean_text(raw):
    if not raw:
        return ""
    text = re.sub(r'<br\s*/?>', ' ', raw, flags=re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html.unescape(text)
    return re.sub(r'[ \t\r\n]+', ' ', text).strip()

def clean_img_url(url):
    if not url:
        return "https://www.inoxtubionline.com/Skins/EVOINOXTB2C/Images/logo.svg"
    u = html.unescape(url)
    u = u.replace("http://www.inoxtubionline.com", "https://www.inoxtubionline.com")
    u = u.replace("http://inoxtubi.com", "https://www.inoxtubionline.com")
    return u

def sync_catalog():
    print("=== SYNCHRONIZING WITH INOXTUBIONLINE.COM ===")
    
    discovered = []
    seen_urls = set()

    for leaf in LEAF_CATEGORIES:
        c_html = fetch(leaf['url'])
        if not c_html:
            continue
            
        prod_matches = re.findall(r'<a\s+[^>]*href=["\'](Product\.aspx\?[^"\']+)["\'][^>]*>(.*?)</a>', c_html, re.I | re.DOTALL)
        count = 0
        for purl, ptext in prod_matches:
            purl_clean = html.unescape(purl)
            ptext_clean = clean_text(ptext)
            if ptext_clean and len(ptext_clean) > 2 and 'dettagli' not in ptext_clean.lower() and 'oops' not in ptext_clean.lower():
                if purl_clean not in seen_urls:
                    seen_urls.add(purl_clean)
                    count += 1
                    discovered.append({
                        "meta": leaf,
                        "product_url": purl_clean,
                        "title_preview": ptext_clean
                    })
        print(f"Scanned {leaf['name']:<30} -> {count} items found")

    print(f"\nTotal product URLs to extract: {len(discovered)}")
    print("Fetching product details, exact prices and stock status...")

    def scrape_single(item):
        purl = item["product_url"]
        leaf_meta = item["meta"]
        p_html = fetch(purl)
        if not p_html:
            return None

        # Filter out 404 / Oops
        if 'Oops!' in p_html or 'Articolo non trovato' in p_html:
            return None

        title_m = re.search(r'<h1>(.*?)</h1>', p_html, re.DOTALL | re.IGNORECASE)
        title = clean_text(title_m.group(1)) if title_m else item["title_preview"]
        if not title or 'oops' in title.lower():
            return None

        title_clean = title.replace(',', '.')
        title_upper = title.upper()

        sku_m = re.search(r'itemprop="identifier"[^>]*content="sku:([^"]+)"', p_html)
        if not sku_m:
            sku_m = re.search(r'id=["\']\w*lblItemCode["\'][^>]*>(.*?)</span>', p_html)
        sku = sku_m.group(1).strip() if sku_m else ""

        strap_m = re.search(r'id=["\']strapline["\'][^>]*>(.*?)</div>', p_html, re.DOTALL | re.IGNORECASE)
        strapline = clean_text(strap_m.group(1)) if strap_m else ""

        desc_m = re.search(r'itemprop="description"[^>]*>(.*?)</span>', p_html, re.DOTALL | re.IGNORECASE)
        desc = clean_text(desc_m.group(1)) if desc_m else ""

        # Price Extraction (EXACT REAL PRICE FROM SITE)
        price_m = re.search(r'itemprop="price"[^>]*>([^<]+)</span>', p_html)
        if not price_m:
            price_m = re.search(r'<span class="figure">\s*€?([0-9.,]+)', p_html)
        
        price_net = 0.0
        if price_m:
            price_str = price_m.group(1).replace('€', '').strip()
            try:
                price_net = float(price_str.replace('.', '').replace(',', '.'))
            except:
                price_net = 0.0

        # Stock Status from source site:
        # If price is 0.00 or page contains out of stock indicators, mark as out_of_stock
        stock_status = "in_stock"
        if price_net <= 0.01 or 'non disponibile' in p_html.lower() or 'esaurito' in p_html.lower() or 'su richiesta' in p_html.lower():
            stock_status = "out_of_stock"
            price_net = 0.0

        price_gross = round(price_net * 1.22, 2) if price_net > 0 else 0.0

        # Alloy
        alloy = leaf_meta["alloy"]
        if "316" in title_upper or "316" in sku or "316" in desc:
            alloy = "AISI 316"
        elif "430" in title_upper or "430" in desc:
            alloy = "AISI 430"
        elif "303" in title_upper or "303" in desc:
            alloy = "AISI 303"

        # Dimensions
        dims = {"standardLengthMeters": 6}
        diam_m = re.search(r'(?:Ø|DIAM|D\.|D)\s*([0-9.]+)\s*(?:X|\*)\s*([0-9.]+)', title_clean, re.I)
        if diam_m:
            dims["outerDiameter"] = float(diam_m.group(1))
            dims["wallThickness"] = float(diam_m.group(2))
        else:
            sq_m = re.search(r'([0-9.]+)\s*[Xx]\s*([0-9.]+)\s*[Xx]\s*([0-9.]+)', title_clean)
            if sq_m:
                dims["width"] = float(sq_m.group(1))
                dims["height"] = float(sq_m.group(2))
                dims["wallThickness"] = float(sq_m.group(3))
                dims["sideA"] = float(sq_m.group(1))
                dims["sideB"] = float(sq_m.group(2))
            else:
                two_m = re.search(r'([0-9.]+)\s*[Xx]\s*([0-9.]+)', title_clean)
                if two_m:
                    v1, v2 = float(two_m.group(1)), float(two_m.group(2))
                    if "Barra Piatta" in leaf_meta["shape"]:
                        dims["width"] = v1
                        dims["wallThickness"] = v2
                    elif "Barra Angolare" in leaf_meta["shape"]:
                        dims["sideA"] = v1
                        dims["wallThickness"] = v2
                    elif "Tubo" in leaf_meta["shape"] or "Curva" in leaf_meta["shape"]:
                        dims["outerDiameter"] = v1
                        dims["wallThickness"] = v2
                    elif "Lamiera" in leaf_meta["shape"]:
                        dims["wallThickness"] = v1

        # Weight Calculation
        density = 8.0 if "316" in alloy else 7.93
        weight_m = 0.5
        shape = leaf_meta["shape"]
        if "Tubo Tondo" in shape and dims.get("outerDiameter") and dims.get("wallThickness"):
            d = dims["outerDiameter"]
            s = dims["wallThickness"]
            weight_m = round((d - s) * s * 3.14159 * density / 1000, 3)
        elif "Tubo Quadro" in shape and dims.get("sideA") and dims.get("wallThickness"):
            a = dims["sideA"]
            s = dims["wallThickness"]
            weight_m = round(4 * (a - s) * s * density / 1000, 3)
        elif "Tubo Rettangolare" in shape and dims.get("width") and dims.get("height") and dims.get("wallThickness"):
            w = dims["width"]
            h = dims["height"]
            s = dims["wallThickness"]
            weight_m = round(2 * (w + h - 2*s) * s * density / 1000, 3)
        elif "Barra Tonda" in shape and dims.get("outerDiameter"):
            d = dims["outerDiameter"]
            weight_m = round(3.14159 * (d/2)**2 * density / 1000, 3)
        elif "Barra Piatta" in shape and dims.get("width") and dims.get("wallThickness"):
            w = dims["width"]
            t = dims["wallThickness"]
            weight_m = round(w * t * density / 1000, 3)
        elif "Barra Angolare" in shape and dims.get("sideA") and dims.get("wallThickness"):
            a = dims["sideA"]
            s = dims["wallThickness"]
            weight_m = round((2*a - s) * s * density / 1000, 3)

        is_tube_or_bar = ("Tubo" in shape or "Barra" in shape)
        unit_weight = round(weight_m * 6.0, 2) if is_tube_or_bar else 0.8
        if unit_weight <= 0:
            unit_weight = 1.0

        # Images
        images = []
        main_img_m = re.search(r'itemprop="image"[^>]*src="([^"]+)"', p_html)
        if main_img_m:
            img_u = clean_img_url(urljoin(BASE_URL, main_img_m.group(1)))
            images.append(img_u)
        gal_imgs = re.findall(r'data-image="([^"]+)"', p_html)
        for g in gal_imgs:
            full_g = clean_img_url(urljoin(BASE_URL, g))
            if full_g not in images:
                images.append(full_g)
        primary_img = images[0] if images else "https://www.inoxtubionline.com/Skins/EVOINOXTB2C/Images/logo.svg"

        if not sku:
            pid_m = re.search(r'ProductID=([0-9]+)', purl)
            pid = pid_m.group(1) if pid_m else str(int(time.time()))
            sku = f"IX-{shape[:3].upper()}-{alloy.replace(' ', '')}-{pid}"

        return {
            "id": f"inox-{len(seen_urls)}",
            "sku": sku,
            "title": title,
            "category": leaf_meta["category"],
            "subcategory": leaf_meta["subcategory"],
            "shape": shape,
            "alloy": alloy,
            "finish": leaf_meta.get("finish", "Grezzo / Industriale"),
            "dimensions": dims,
            "strapline": strapline or f"{shape} {alloy}. Vendita minima: barra standard da 6 metri (opzioni di taglio: 2 pezzi da 3m o 3 pezzi da 2m).",
            "description": desc or strapline,
            "price_net": price_net,
            "price_gross": price_gross,
            "vat_rate": 22,
            "price_per_kg": round(price_net / unit_weight, 2) if (price_net > 0 and unit_weight > 0) else None,
            "price_per_meter": round(price_net / 6.0, 2) if (price_net > 0 and is_tube_or_bar) else None,
            "weight_kg_per_unit": unit_weight,
            "weight_kg_per_meter": weight_m,
            "unit": "barra 6m (scelta: 2x3m o 3x2m)" if is_tube_or_bar else "pezzo",
            "images": images,
            "primary_image": primary_img,
            "source_url": urljoin(BASE_URL, purl),
            "stock_status": stock_status,
            "min_order_qty": 1,
            "certifications": ["EN 10204 3.1", "Tracciabilità di colata", "Conformità alimentare MOCA"],
            "standard_norm": "EN 10217-7" if "Tubo" in shape else ("EN 10088-3" if "Barra" in shape else "EN 10253 / DIN 2605")
        }

    with ThreadPoolExecutor(max_workers=16) as executor:
        results = list(executor.map(scrape_single, discovered))

    valid_products = [r for r in results if r is not None and r.get("title")]

    # Sort and re-index
    for i, p in enumerate(valid_products):
        p["id"] = f"inox-{i+1}"

    print(f"\nSYNC COMPLETE: {len(valid_products)} products processed.")
    available_count = sum(1 for p in valid_products if p["stock_status"] == "in_stock")
    out_count = sum(1 for p in valid_products if p["stock_status"] == "out_of_stock")
    print(f" -> In Stock with REAL prices: {available_count}")
    print(f" -> Out of stock (price 0 / su richiesta): {out_count}")

    # Write files
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(valid_products, f, ensure_ascii=False, indent=2)

    ts_content = f"import type {{ Product }} from '../types';\n\nexport const PRODUCTS_CATALOG: Product[] = {json.dumps(valid_products, ensure_ascii=False, indent=2)};\n"
    with open(OUTPUT_TS, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"Updated {OUTPUT_JSON} and {OUTPUT_TS} successfully!")

if __name__ == '__main__':
    sync_catalog()
