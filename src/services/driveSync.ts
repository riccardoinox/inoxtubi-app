import * as XLSX from 'xlsx';
import initialStockRaw from '../data/initialStock.json';
import { Article, InventoryDataset } from '../types/inventory';

const initialStock = initialStockRaw as InventoryDataset;

const CACHE_KEY = 'inoxtubi_inventory_cache_v1';
const LAST_SYNC_KEY = 'inoxtubi_last_sync_time';

export const GOOGLE_DRIVE_EXPORT_URL = 
  'https://docs.google.com/spreadsheets/d/1hA1YbhFD-8RXD62CfifHBwucvfUBD33R/export?format=xlsx';

export const GOOGLE_DRIVE_VIEW_URL = 
  'https://docs.google.com/spreadsheets/d/1hA1YbhFD-8RXD62CfifHBwucvfUBD33R/edit?usp=drive_link';

function detectCategory(code: string, desc: string): string {
  const codeU = code.toUpperCase();
  const descU = desc.toUpperCase();

  if (codeU.includes('TUB') || codeU.includes('TT') || codeU.includes('TQ') || codeU.includes('TR') || descU.includes('TUBO') || descU.includes('TUBI')) {
    if (descU.includes('QUAD') || descU.includes('RETT') || codeU.includes('TQ') || codeU.includes('TR') || descU.includes('RET')) {
      return 'Tubi Quadri / Rett.';
    }
    return 'Tubi Tondi';
  }
  if (codeU.includes('ANG') || descU.includes('ANGOL')) {
    return 'Angolari';
  }
  if (codeU.includes('BAR') || descU.includes('TOND') || descU.includes('BARRA') || descU.includes('BARRE')) {
    if (descU.includes('QUADR') || codeU.includes('BQ')) {
      return 'Barre Quadre';
    }
    if (descU.includes('ESAG') || descU.includes('ES.')) {
      return 'Barre Esagonali';
    }
    return 'Barre Tonde';
  }
  if (descU.includes('PIAT') || codeU.includes('PIAT') || descU.includes('PIATT')) {
    return 'Piatti';
  }
  if (descU.includes('LAM') || codeU.includes('LAM') || descU.includes('LAMIER')) {
    return 'Lamiere';
  }
  if (['CURV', 'RACC', 'MANIC', 'NIPP', 'TEE', 'FLANG', 'RIDUZ', 'VALV', 'GHIER', 'BOCCH'].some(k => descU.includes(k))) {
    return 'Raccorderia / Accessori';
  }
  if (codeU.includes('ACC') || descU.includes('ACCIAO')) {
    return 'Acciai Speciali';
  }
  return 'Altri Prodotti';
}

function detectAlloy(code: string, desc: string): string {
  const combined = `${code} ${desc}`.toUpperCase();
  if (combined.includes('316L') || combined.includes('316 L')) return 'AISI 316L';
  if (combined.includes('316')) return 'AISI 316';
  if (combined.includes('304L') || combined.includes('304 L')) return 'AISI 304L';
  if (combined.includes('304')) return 'AISI 304';
  if (combined.includes('303')) return 'AISI 303';
  if (combined.includes('430')) return 'AISI 430';
  if (combined.includes('1.4313') || combined.includes('14313')) return '1.4313';
  if (combined.includes('1.4404') || combined.includes('14404')) return '1.4404';
  if (combined.includes('1.4541')) return '1.4541';
  if (combined.includes('1.4571')) return '1.4571';
  if (combined.includes('DUPLEX') || combined.includes('SAF 2205')) return 'Duplex';
  return 'Inox / Altro';
}

export function parseExcelBuffer(buffer: ArrayBuffer): Article[] {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (rawRows.length <= 1) {
    throw new Error('Il file Excel non contiene righe valide.');
  }

  const articles: Article[] = [];

  for (let i = 1; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (!row || !row[0]) continue;

    const code = String(row[0] || '').trim();
    if (!code) continue;

    const desc = String(row[1] || '').trim();
    const dispRaw = row[11] !== undefined ? row[11] : (row[2] !== undefined ? row[2] : 0);
    const um = String(row[10] || 'PZ').trim();
    const altCode = row[9] ? String(row[9]).trim() : undefined;

    let disp = 0;
    if (typeof dispRaw === 'number') {
      disp = dispRaw;
    } else if (typeof dispRaw === 'string') {
      const parsed = parseFloat(dispRaw.replace(',', '.'));
      disp = isNaN(parsed) ? 0 : parsed;
    }

    const isAvailable = disp > 0;
    const category = detectCategory(code, desc);
    const alloy = detectAlloy(code, desc);

    articles.push({
      id: code,
      code,
      desc,
      um: um || 'PZ',
      disp: Math.round(disp * 100) / 100,
      isAvailable,
      category,
      alloy,
      altCode
    });
  }

  return articles;
}

export function getCachedInventory(): InventoryDataset {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Errore lettura cache locale:', e);
  }
  return initialStock;
}

export function saveInventoryToCache(dataset: InventoryDataset): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(dataset));
    localStorage.setItem(LAST_SYNC_KEY, dataset.updatedAt);
  } catch (e) {
    console.warn('Impossibile salvare in cache locale (storage limit):', e);
  }
}

export async function fetchLiveStockFromDrive(): Promise<InventoryDataset> {
  // Direct export URL with CORS proxy fallback if needed
  const urlsToTry = [
    GOOGLE_DRIVE_EXPORT_URL,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(GOOGLE_DRIVE_EXPORT_URL)}`,
    `https://corsproxy.io/?${encodeURIComponent(GOOGLE_DRIVE_EXPORT_URL)}`
  ];

  let lastError: any = null;

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      if (buffer.byteLength < 500) {
        throw new Error('File scaricato troppo piccolo o risposta non valida.');
      }

      const articles = parseExcelBuffer(buffer);
      const dataset: InventoryDataset = {
        updatedAt: new Date().toISOString(),
        totalCount: articles.length,
        availableCount: articles.filter(a => a.isAvailable).length,
        sourceUrl: GOOGLE_DRIVE_VIEW_URL,
        articles
      };

      saveInventoryToCache(dataset);
      return dataset;
    } catch (err) {
      console.warn(`Tentativo sync fallito per ${url}:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('Impossibile sincronizzare con Google Drive.');
}
