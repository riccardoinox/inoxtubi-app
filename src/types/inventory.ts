export interface Article {
  id: string;
  code: string;
  desc: string;
  um: string;
  disp: number;
  isAvailable: boolean;
  category: string;
  alloy: string;
  altCode?: string;
}

export interface InventoryDataset {
  updatedAt: string;
  totalCount: number;
  availableCount: number;
  sourceUrl: string;
  articles: Article[];
}

export type CategoryFilter = 
  | 'Tutti'
  | 'Tubi Tondi'
  | 'Tubi Senza Saldatura (TSS)'
  | 'Tubi Quadri / Rett.'
  | 'Barre Tonde'
  | 'Barre Quadre'
  | 'Barre Esagonali'
  | 'Barre Forate'
  | 'Piatti'
  | 'Angolari e Profili'
  | 'Lamiere'
  | 'Raccorderia / Accessori'
  | 'Acciai Speciali'
  | 'Altri Prodotti';

export type AvailabilityFilter = 'all' | 'available' | 'onRequest';

export interface QuoteItem {
  article: Article;
  quantity: number;
  notes?: string;
}

export type TabType = 'home' | 'warehouse' | 'catalog' | 'blog' | 'company' | 'contact';
