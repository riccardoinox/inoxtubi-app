import * as XLSX from 'xlsx';
import initialStockRaw from '../data/initialStock.json';
import { Article, InventoryDataset } from '../types/inventory';

const initialStock = initialStockRaw as InventoryDataset;

const CACHE_KEY = 'inoxtubi_inventory_cache_v3';
const LAST_SYNC_KEY = 'inoxtubi_last_sync_time';

export const GOOGLE_DRIVE_EXPORT_URL = 
  'https://docs.google.com/spreadsheets/d/1hA1YbhFD-8RXD62CfifHBwucvfUBD33R/export?format=xlsx';

export const GOOGLE_DRIVE_VIEW_URL = 
  'https://docs.google.com/spreadsheets/d/1hA1YbhFD-8RXD62CfifHBwucvfUBD33R/edit?usp=drive_link';

export function detectCategory(code: string, desc: string): string {
  const c = code.toUpperCase().trim();
  const d = desc.toUpperCase().trim();

  // 1. Non Utilizzare / Bancali / Servizi
  if (d === 'NON UTILIZZARE' || c.startsWith('BANC') || c.startsWith('CASSA') || c.startsWith('ESTINTORI') || c === 'B' || c === 'D') {
    return 'Altri Prodotti';
  }

  // 2. Raccorderia e Accessori
  const raccKeywords = [
    'REGGITUBO', 'CURVE', 'CURVA', 'RIDUZ', 'PEZZO T', 'FLANGIA', 'CARTELLE', 'CARTELLA',
    'FONDO BOMBATO', 'TRONCHETTO', 'MANICOTTO', 'GOMITO', 'NIPPLO', 'TAPPO', 'GIUNTO',
    'VALVOLA', 'BOCCHETTONE', 'GHIERA', 'COLLARE', 'MORSETTO', 'CROCE', 'PORTAGOMMA',
    'BOCCHOLA', 'VITE', 'BULLON', 'DADO', 'RACCORD', 'FEMMINA MANDR', 'MASCHIO MANDR'
  ];
  if (raccKeywords.some(k => d.includes(k))) {
    return 'Raccorderia / Accessori';
  }
  if (c.startsWith('CSS') || c.startsWith('TES') || c.startsWith('RC') || c.startsWith('TRO') || 
      c.startsWith('MAN') || c.startsWith('GOM') || c.startsWith('RF') || c.startsWith('CAR') || 
      c.startsWith('FB') || c.startsWith('NIP') || c.startsWith('TM') || c.startsWith('TF') || 
      c.startsWith('REG') || c.startsWith('FLA') || c.startsWith('FLG') || c.startsWith('VALV') || 
      c.startsWith('BOC') || c.startsWith('G3P') || c.startsWith('FEM')) {
    return 'Raccorderia / Accessori';
  }

  // 3. Barre Forate (Tubi spessi / forati)
  if (c.startsWith('BF') || d.includes('BARRA FORATA') || d.includes('BARRE FORATE')) {
    return 'Barre Forate';
  }

  // 4. Tubi Senza Saldatura (TSS) - Categoria Dedicata Richiesta
  if (c.startsWith('TSS') || ((d.includes('TUBO') || d.includes('TUBI')) && (d.includes('S/S') || d.includes('SENZA SALD')))) {
    return 'Tubi Senza Saldatura (TSS)';
  }

  // 5. Lamiere, Nastri, Dischi, Piastre da lamiera
  if (d.startsWith('LAM.') || d.startsWith('LAMIERA') || d.startsWith('NASTRO') || 
      d.startsWith('PIASTRA') || d.startsWith('DISCO') || d.startsWith('ANELLO') || 
      d.startsWith('PZ. LAM') || d.includes('LAMIER') || d.includes('MANDORLAT') || 
      c.startsWith('LE') || c.startsWith('LS') || c.startsWith('LSB') || c.startsWith('LSP') || 
      c.startsWith('LR') || c.startsWith('LFO') || c.startsWith('NASTRO') || 
      c.startsWith('PIASTRA') || c.startsWith('DIS') || c.startsWith('ANELLO') || c.startsWith('TAGLAM')) {
    return 'Lamiere';
  }

  // 6. Acciai Speciali
  if (c.startsWith('ACC') || c.startsWith('C45') || (d.startsWith('ACCIAO') && d.includes('1.4313'))) {
    return 'Acciai Speciali';
  }

  // 7. Angolari e Profili
  if (c.startsWith('ANG') || c.startsWith('PRO') || d.startsWith('ANG') || d.includes('ANGOLAR') || d.includes('PROFILO ')) {
    return 'Angolari e Profili';
  }

  // 8. Piatti (Barre Piatte, Cesoiate, Trafilate o Laminate Piatte)
  if (c.startsWith('BCE') || c.startsWith('BCA') || c.startsWith('BLP') || c.startsWith('BTP') || 
      c.startsWith('PIAT') || d.startsWith('PIAT') || d.includes('PIATTO') || d.includes('PIATTI') || 
      d.includes(' CES.') || d.includes(' CESOIAT')) {
    return 'Piatti';
  }

  // 9. Barre Esagonali
  if (c.startsWith('BTES') || c.startsWith('BLES') || c.startsWith('BRES') || c.startsWith('BES') || 
      c.startsWith('TSES') || d.includes('ESAG') || d.includes('ES.')) {
    return 'Barre Esagonali';
  }

  // 10. Barre Quadre (BTQ, BLQ, BQ)
  if (c.startsWith('BTQ') || c.startsWith('BLQ') || c.startsWith('BQ') || 
      (d.includes('BARRA') && (d.includes('QUADR') || d.includes('QUAD.')))) {
    return 'Barre Quadre';
  }

  // 11. Barre Tonde (BTT, BLT, BRT, BTI, AVP)
  if (c.startsWith('BTT') || c.startsWith('BLT') || c.startsWith('BRT') || c.startsWith('BTI') || c.startsWith('AVP') || 
      d.startsWith('BARRA') || d.startsWith('BARRE') || d.includes('TONDO')) {
    return 'Barre Tonde';
  }

  // 12. Tubi Quadri e Rettangolari
  if (c.startsWith('TER') || c.startsWith('TEQ') || c.startsWith('TSAQ') || c.startsWith('TSAR') || 
      c.startsWith('TLQ') || c.startsWith('TLR') || c.startsWith('TEQJ') || c.startsWith('TERJ') || 
      c.startsWith('TSAQJ') || c.startsWith('TEO') || c.startsWith('TQ') || c.startsWith('TR') || 
      ((d.includes('TUBO') || d.includes('TUBI')) && (d.includes('QUAD') || d.includes('RETT') || d.includes('SCATOL') || d.includes('OVALE') || d.includes('RET.')))) {
    return 'Tubi Quadri / Rett.';
  }

  // 13. Tubi Tondi Saldati / Altri Tubi Tondi
  if (d.includes('TUBO') || d.includes('TUBI') || 
      c.startsWith('TET') || c.startsWith('TRI') || c.startsWith('TLE') || 
      c.startsWith('TLIE') || c.startsWith('TSAT') || c.startsWith('TEF') || c.startsWith('TETJ') || 
      c.startsWith('TLI') || c.startsWith('TUB') || c.startsWith('TEMLUC') || c.startsWith('TEL') || 
      c.startsWith('TETT') || c.startsWith('TFER') || c.startsWith('TUBCENTR') || c.startsWith('TUBLAM') || 
      c.startsWith('TT') || c.startsWith('TA') || c.startsWith('TTC') || c.startsWith('TIS') || 
      c.startsWith('TCAP') || c.startsWith('TC')) {
    return 'Tubi Tondi';
  }

  return 'Altri Prodotti';
}

export function detectAlloy(code: string, desc: string): string {
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
