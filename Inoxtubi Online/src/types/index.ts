export type MetalAlloy = 'AISI 304' | 'AISI 316' | 'AISI 304L' | 'AISI 316L' | 'AISI 430' | 'AISI 303';

export type ProductShape = 
  | 'Tubo Tondo'
  | 'Tubo Tondo Senza Saldatura'
  | 'Tubo Quadro'
  | 'Tubo Rettangolare'
  | 'Barra Tonda'
  | 'Barra Piatta'
  | 'Barra Angolare'
  | 'Lamiera'
  | 'Curva'
  | 'Flangia'
  | 'Gomito'
  | 'Manicotto'
  | 'Riduzione'
  | 'Tronchetto'
  | 'Fondo Bombato'
  | 'Cartella'
  | 'Altro';

export type SurfaceFinish = 
  | 'Grezzo / Industriale'
  | 'Decapato'
  | 'Satinato Scotch-Brite (con PVC)'
  | 'Spazzolato'
  | 'Lucido a specchio (Grit 600)';

export type TubeCutOption = 
  | '3m_plus_3m'      // 2 pezzi da 3 metri (Inclusa/Standard per trasporto)
  | '2m_plus_2m_plus_2m'; // 3 pezzi da 2 metri

export interface ProductDimensions {
  outerDiameter?: number | null; // in mm
  wallThickness?: number | null; // in mm
  width?: number | null;         // in mm (base)
  height?: number | null;        // in mm (altezza)
  sideA?: number | null;         // in mm
  sideB?: number | null;         // in mm
  sheetLength?: number | null;   // in mm
  sheetWidth?: number | null;    // in mm
  standardLengthMeters?: number | null; // 6 metri standard
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: string;       // 'Tubi' | 'Barre' | 'Lamiere' | 'Raccorderia'
  subcategory: string;    // 'Tubi Tondi', 'Tubi Quadri', 'Tubi Rettangolari', 'Tubi Senza Saldatura', 'Tubi Lucidi', 'Barre Piatte', 'Barre Tonde', 'Barre Angolari', etc.
  shape: ProductShape;
  alloy: MetalAlloy;
  finish: SurfaceFinish;
  dimensions: ProductDimensions;
  strapline: string;
  description: string;
  price_net: number;     // Price in EUR (excl. VAT)
  price_gross: number;   // Price in EUR (incl. VAT 22%)
  vat_rate: number;      // 22%
  price_per_kg?: number | null; // EUR/kg
  price_per_meter?: number | null; // EUR/m
  weight_kg_per_unit: number; // Weight per 6m bar or per item (kg)
  weight_kg_per_meter?: number | null;
  unit: string;          // e.g. "barra 6m (scelta: 2x3m o 3x2m)" | "pezzo"
  images: string[];
  primary_image: string;
  source_url?: string;
  stock_status: 'in_stock' | 'out_of_stock';
  min_order_qty: number; // 1 (1 barra da 6mt)
  certifications?: string[];
  standard_norm?: string;
}

export interface CartItem {
  id: string; // unique item uuid (product.id + cutOption)
  product: Product;
  quantity: number; // number of 6m bars or pieces
  cutOption?: TubeCutOption;
  calculatedWeightKg: number;
  unitPriceGross: number;
  totalPriceGross: number;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  fiscalCode?: string; // Codice Fiscale per privati
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  province: string;
  country: string;
  notes?: string;
  requestCertificates: boolean;
  requestInvoice: boolean; // se desidera fattura oltre alla ricevuta fiscale
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  costGross: number;
  estimatedDays: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;       // 'all' | 'Tubi' | 'Barre' | 'Lamiere' | 'Raccorderia'
  subcategory: string;    // specific subcategory
  shape: string;
  alloy: string;
  finish: string;
  stockFilter: 'all' | 'in_stock_only';
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'name_asc' | 'weight_asc';
}
