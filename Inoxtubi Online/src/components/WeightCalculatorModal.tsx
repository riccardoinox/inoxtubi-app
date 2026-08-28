import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Scale, 
  Scissors, 
  Search, 
  Plus, 
  Layers, 
  Check, 
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';
import { ProductShape, MetalAlloy, ProductDimensions, Product } from '../types';
import { calculateWeightPerMeter, ALLOY_DENSITIES } from '../utils/steelCalculations';

interface WeightCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isB2B: boolean;
  onSelectMatchingProduct?: (p: Product) => void;
  allProducts: Product[];
  onAddCustomToCart?: (customItem: any) => void;
}

export const WeightCalculatorModal: React.FC<WeightCalculatorModalProps> = ({
  isOpen,
  onClose,
  isB2B,
  onSelectMatchingProduct,
  allProducts,
  onAddCustomToCart
}) => {
  if (!isOpen) return null;

  const [shape, setShape] = useState<ProductShape>('Tubo Quadro');
  const [alloy, setAlloy] = useState<MetalAlloy>('AISI 304');
  
  // Dimensions
  const [diam, setDiam] = useState<number>(40);
  const [thick, setThick] = useState<number>(2);
  const [sideA, setSideA] = useState<number>(30);
  const [sideB, setSideB] = useState<number>(30);
  const [width, setWidth] = useState<number>(40);
  const [height, setHeight] = useState<number>(20);
  const [lengthMeters, setLengthMeters] = useState<number>(6);
  const [quantity, setQuantity] = useState<number>(1);
  const [customCuts, setCustomCuts] = useState<number>(0);

  const dims: ProductDimensions = {
    outerDiameter: diam,
    wallThickness: thick,
    sideA: sideA,
    sideB: sideB,
    width: width,
    height: height,
    standardLengthMeters: lengthMeters
  };

  const weightPerMeter = calculateWeightPerMeter(shape, dims, alloy);
  const totalWeightKg = Number((weightPerMeter * lengthMeters * quantity).toFixed(2));
  
  // Price estimate (e.g. ~6.00 EUR/kg for AISI 304, ~8.50 EUR/kg for AISI 316)
  const baseRatePerKg = alloy.includes('316') ? 8.20 : 5.80;
  const estimatedPriceNet = Number((totalWeightKg * baseRatePerKg + (customCuts * 1.50)).toFixed(2));
  const estimatedPriceGross = Number((estimatedPriceNet * 1.22).toFixed(2));

  // Find closest matching product in catalog
  const matchingProducts = allProducts.filter(p => {
    if (p.shape !== shape) return false;
    if (shape === 'Tubo Tondo' || shape === 'Tubo Tondo Senza Saldatura' || shape === 'Barra Tonda') {
      return p.dimensions.outerDiameter === diam;
    }
    if (shape === 'Tubo Quadro') {
      return p.dimensions.sideA === sideA;
    }
    if (shape === 'Tubo Rettangolare') {
      return p.dimensions.width === width && p.dimensions.height === height;
    }
    if (shape === 'Barra Piatta') {
      return p.dimensions.width === width;
    }
    return false;
  }).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none">
                Calcolatore Pesi & Taglio Metalli
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calcola peso teorico, volume e stima costo per qualsiasi profilo inox
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Inputs */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Shape selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Profilo o Forma:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Tubo Quadro', label: 'Tubo Quadro' },
                  { id: 'Tubo Rettangolare', label: 'Tubo Rettangolare' },
                  { id: 'Tubo Tondo', label: 'Tubo Tondo' },
                  { id: 'Barra Tonda', label: 'Barra Tonda Piena' },
                  { id: 'Barra Piatta', label: 'Barra Piatta' },
                  { id: 'Barra Angolare', label: 'Barra Angolare "L"' },
                  { id: 'Lamiera', label: 'Lamiera Inox' },
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id as ProductShape)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      shape === s.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alloy Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Lega Acciaio Inox:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'AISI 304', label: 'AISI 304 (1.4301)', desc: 'Standard universale' },
                  { id: 'AISI 316', label: 'AISI 316 (1.4401)', desc: 'Nautica / Chimica' },
                  { id: 'AISI 430', label: 'AISI 430 (Ferritico)', desc: 'Magnetico / Economico' },
                ].map(a => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAlloy(a.id as MetalAlloy)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      alloy === a.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <p className="font-bold text-xs">{a.id}</p>
                    <p className="text-[10px] opacity-70 mt-0.5">{a.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensional inputs based on shape */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold text-slate-800 block border-b border-slate-200 pb-1">
                3. Dimensioni in millimetri (mm):
              </span>

              {(shape === 'Tubo Tondo' || shape === 'Barra Tonda' || shape === 'Tubo Tondo Senza Saldatura') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Diametro Esterno (Ø mm):
                  </label>
                  <input
                    type="number"
                    value={diam}
                    onChange={(e) => setDiam(Number(e.target.value))}
                    min={4}
                    max={500}
                    step={0.5}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {shape === 'Tubo Quadro' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Lato Sezione (mm):
                  </label>
                  <input
                    type="number"
                    value={sideA}
                    onChange={(e) => { setSideA(Number(e.target.value)); setSideB(Number(e.target.value)); }}
                    min={10}
                    max={300}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {shape === 'Tubo Rettangolare' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Base (mm):
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      min={10}
                      max={300}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Altezza (mm):
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      min={10}
                      max={300}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {shape === 'Barra Piatta' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Larghezza (mm):
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      min={10}
                      max={300}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Spessore (mm):
                    </label>
                    <input
                      type="number"
                      value={thick}
                      onChange={(e) => setThick(Number(e.target.value))}
                      min={1}
                      max={50}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {shape.includes('Tubo') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Spessore Parete (mm):
                  </label>
                  <input
                    type="number"
                    value={thick}
                    onChange={(e) => setThick(Number(e.target.value))}
                    min={0.5}
                    max={20}
                    step={0.5}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Length and Quantity */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Lunghezza Singola (m):
                  </label>
                  <input
                    type="number"
                    value={lengthMeters}
                    onChange={(e) => setLengthMeters(Number(e.target.value))}
                    min={0.1}
                    max={12}
                    step={0.5}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Numero Pezzi:
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    min={1}
                    max={1000}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Physics Calculation Results */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Calculation Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">
                  Risultato Calcolo Teorico
                </span>
                <span className="text-xs text-slate-400">
                  Densità: {ALLOY_DENSITIES[alloy]} kg/dm³
                </span>
              </div>

              {/* Weight numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Peso al metro (kg/m):</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {weightPerMeter} <span className="text-sm font-normal text-slate-400">kg/m</span>
                  </span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <span className="text-xs text-slate-400 block">Peso Totale ({quantity} pz):</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">
                    {totalWeightKg} <span className="text-sm font-normal text-slate-400">kg</span>
                  </span>
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="bg-blue-900/40 p-4 rounded-2xl border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-300 block">Costo indicativo di fornitura:</span>
                  <span className="text-2xl font-black text-white">
                    €{isB2B ? estimatedPriceNet.toFixed(2) : estimatedPriceGross.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-blue-300 ml-1.5 font-normal">
                    {isB2B ? '+IVA' : 'IVA Inclusa'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Lega {alloy}</span>
                  <span className="text-xs text-emerald-400 font-bold">Disponibile a magazzino</span>
                </div>
              </div>

            </div>

            {/* Matching Products from Store */}
            {matchingProducts.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Articoli Corrispondenti a Catalogo:
                </span>
                <div className="space-y-2">
                  {matchingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        if (onSelectMatchingProduct) {
                          onSelectMatchingProduct(prod);
                          onClose();
                        }
                      }}
                      className="p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-xl cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <p className="font-bold text-xs text-slate-900">{prod.title}</p>
                        <p className="text-[11px] text-slate-500">{prod.sku} • {prod.alloy} • {prod.weight_kg_per_unit} kg/barra</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900">
                          €{isB2B ? prod.price_net.toFixed(2) : prod.price_gross.toFixed(2)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
