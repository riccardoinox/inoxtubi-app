import type { ProductShape, MetalAlloy, ProductDimensions, ShippingRate } from '../types';

// Densities in kg/dm3 or g/cm3 for stainless steels
export const ALLOY_DENSITIES: Record<MetalAlloy, number> = {
  'AISI 304': 7.93,
  'AISI 304L': 7.93,
  'AISI 316': 8.00,
  'AISI 316L': 8.00,
  'AISI 430': 7.70,
  'AISI 303': 7.93,
};

/**
 * Calculates theoretical weight in kg per meter based on geometry and alloy
 */
export function calculateWeightPerMeter(
  shape: ProductShape,
  dims: ProductDimensions,
  alloy: MetalAlloy = 'AISI 304'
): number {
  const density = ALLOY_DENSITIES[alloy] || 7.93;

  switch (shape) {
    case 'Tubo Tondo':
    case 'Tubo Tondo Senza Saldatura': {
      const d = dims.outerDiameter || 0;
      const s = dims.wallThickness || 0;
      if (d <= 0 || s <= 0 || s >= d / 2) return 0;
      // Formula: (D - s) * s * PI * density / 1000 => for 7.93: (d - s) * s * 0.02491
      const factor = (Math.PI * density) / 1000;
      return Number(((d - s) * s * factor).toFixed(3));
    }

    case 'Tubo Quadro': {
      const a = dims.sideA || dims.width || 0;
      const s = dims.wallThickness || 0;
      if (a <= 0 || s <= 0) return 0;
      // Formula: 4 * (a - s) * s * density / 1000
      const weight = 4 * (a - s) * s * (density / 1000);
      return Number(weight.toFixed(3));
    }

    case 'Tubo Rettangolare': {
      const a = dims.width || 0;
      const b = dims.height || 0;
      const s = dims.wallThickness || 0;
      if (a <= 0 || b <= 0 || s <= 0) return 0;
      // Formula: 2 * (a + b - 2*s) * s * density / 1000
      const weight = 2 * (a + b - 2 * s) * s * (density / 1000);
      return Number(weight.toFixed(3));
    }

    case 'Barra Tonda': {
      const d = dims.outerDiameter || 0;
      if (d <= 0) return 0;
      // Formula: PI * (d/2)^2 * density / 1000
      const weight = Math.PI * Math.pow(d / 2, 2) * (density / 1000);
      return Number(weight.toFixed(3));
    }

    case 'Barra Piatta': {
      const w = dims.width || 0;
      const t = dims.wallThickness || dims.height || 0;
      if (w <= 0 || t <= 0) return 0;
      // Formula: w * t * density / 1000
      const weight = w * t * (density / 1000);
      return Number(weight.toFixed(3));
    }

    case 'Barra Angolare': {
      const a = dims.sideA || dims.width || 0;
      const s = dims.wallThickness || 0;
      if (a <= 0 || s <= 0) return 0;
      // Formula: (2 * a - s) * s * density / 1000
      const weight = (2 * a - s) * s * (density / 1000);
      return Number(weight.toFixed(3));
    }

    case 'Lamiera': {
      // Weight per square meter (m2)
      const s = dims.wallThickness || 1.0;
      const weight = s * density;
      return Number(weight.toFixed(3));
    }

    default:
      return 0.5; // default fallback for fittings
  }
}

/**
 * Calculates shipping options based on total weight (kg) and maximum dimension
 */
export function calculateShippingRates(totalWeightKg: number, hasLongBars: boolean = true): ShippingRate[] {
  let standardNet = 15.0;
  if (totalWeightKg > 100) {
    standardNet = 45.0;
  } else if (totalWeightKg > 50) {
    standardNet = 32.0;
  } else if (totalWeightKg > 20) {
    standardNet = 22.0;
  } else if (totalWeightKg > 5) {
    standardNet = 16.0;
  }

  if (hasLongBars) {
    standardNet += 8.0;
  }

  return [
    {
      id: 'express_courier',
      name: 'Corriere Espresso Nazionale (BRT / GLS / TNT)',
      description: 'Consegna con sponda idraulica e tracciamento real-time. Imballo tubolare rinforzato.',
      costGross: Number((standardNet * 1.22).toFixed(2)),
      estimatedDays: '24 - 48 ore lavorative'
    },
    {
      id: 'store_pickup',
      name: 'Ritiro Gratuito in Sede (Inoxtubi Limena, Padova)',
      description: 'Via Battisti 5, 35010 Limena (PD). Pronto per il ritiro entro 24 ore.',
      costGross: 0,
      estimatedDays: 'Disponibile in 24h'
    }
  ];
}
