import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Scissors, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Minus, 
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import type { Product, TubeCutOption } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number, cutOption?: TubeCutOption) => void;
  onOpenSpecs: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSpecs,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.primary_image);
  const [quantity, setQuantity] = useState(1);
  const [cutOption, setCutOption] = useState<TubeCutOption>('3m_plus_3m');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isPrestoDisponibile = product.stock_status === 'out_of_stock' || product.price_gross <= 0;
  const isBarOrTube = product.shape.includes('Tubo') || product.shape.includes('Barra');

  const totalPriceGross = product.price_gross * quantity;
  const totalWeightKg = Number((product.weight_kg_per_unit * quantity).toFixed(1));

  const handleAddToCart = () => {
    if (isPrestoDisponibile) return;
    onAddToCart(product, quantity, isBarOrTube ? cutOption : undefined);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {product.subcategory || product.shape}
            </span>
            <span className="text-xs font-mono text-slate-400">
              SKU: {product.sku}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Badges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-72 flex items-center justify-center relative overflow-hidden">
              <img
                src={selectedImage || product.primary_image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                }}
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md">
                {product.alloy}
              </span>

              {isPrestoDisponibile && (
                <div className="absolute top-3 right-3">
                  <span className="bg-amber-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Presto disponibile
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl border p-1 bg-white flex-shrink-0 transition-all ${
                      selectedImage === img ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Certificati & Garanzia Inoxtubi</span>
              </div>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Certificato di collaudo <strong>EN 10204 3.1</strong> incluso</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Tracciabilità di colata e marcatura al laser</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Conformità alimentare <strong>MOCA</strong> su richiesta</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Details, Cutting Options, and Price */}
          <div className="lg:col-span-7 space-y-5">
            
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.title}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {product.strapline || product.description}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 flex justify-between items-center">
                <span>Specifiche Tecniche</span>
                <button 
                  onClick={onOpenSpecs}
                  className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <FileText className="w-3 h-3" />
                  Tolleranze UNI EN
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-2 px-4 py-2 bg-white">
                  <span className="text-slate-500">Lega Inox:</span>
                  <span className="font-semibold text-slate-900">{product.alloy}</span>
                </div>
                {product.dimensions.outerDiameter && (
                  <div className="grid grid-cols-2 px-4 py-2 bg-slate-50/50">
                    <span className="text-slate-500">Diametro Esterno:</span>
                    <span className="font-semibold text-slate-900">Ø {product.dimensions.outerDiameter} mm</span>
                  </div>
                )}
                {product.dimensions.sideA && (
                  <div className="grid grid-cols-2 px-4 py-2 bg-slate-50/50">
                    <span className="text-slate-500">Dimensioni Sezione:</span>
                    <span className="font-semibold text-slate-900">{product.dimensions.sideA} x {product.dimensions.sideB || product.dimensions.sideA} mm</span>
                  </div>
                )}
                {product.dimensions.width && !product.dimensions.sideA && (
                  <div className="grid grid-cols-2 px-4 py-2 bg-slate-50/50">
                    <span className="text-slate-500">Larghezza x Spessore:</span>
                    <span className="font-semibold text-slate-900">{product.dimensions.width} x {product.dimensions.wallThickness || product.dimensions.height} mm</span>
                  </div>
                )}
                {product.dimensions.wallThickness && (
                  <div className="grid grid-cols-2 px-4 py-2 bg-white">
                    <span className="text-slate-500">Spessore Parete:</span>
                    <span className="font-semibold text-slate-900">{product.dimensions.wallThickness} mm</span>
                  </div>
                )}
                <div className="grid grid-cols-2 px-4 py-2 bg-slate-50/50">
                  <span className="text-slate-500">Finitura Superficiale:</span>
                  <span className="font-semibold text-slate-900">{product.finish}</span>
                </div>
                <div className="grid grid-cols-2 px-4 py-2 bg-white">
                  <span className="text-slate-500">Peso Barra da 6m:</span>
                  <span className="font-semibold text-slate-900">{product.weight_kg_per_unit} kg ({product.weight_kg_per_meter} kg/m)</span>
                </div>
                <div className="grid grid-cols-2 px-4 py-2 bg-slate-50/50">
                  <span className="text-slate-500">Norma di Fabbricazione:</span>
                  <span className="font-semibold text-slate-900">{product.standard_norm || 'EN 10217-7'}</span>
                </div>
              </div>
            </div>

            {/* Strict Cut Options: Only 3mt or 2mt (with 6mt minimum order) */}
            {isBarOrTube && (
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Opzioni di Taglio per il Trasporto
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                    Minimo vendita 6mt
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-snug">
                  La vendita minima del tubo/barra è di <strong>1 barra intera da 6 metri</strong>. Scegli come desideri ricevere i pezzi:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCutOption('3m_plus_3m')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cutOption === '3m_plus_3m'
                        ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-xs">2 Pezzi da 3 Metri</p>
                      {cutOption === '3m_plus_3m' && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      (3mt + 3mt = 6mt totali). Opzione standard per corriere espresso.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCutOption('2m_plus_2m_plus_2m')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cutOption === '2m_plus_2m_plus_2m'
                        ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-xs">3 Pezzi da 2 Metri</p>
                      {cutOption === '2m_plus_2m_plus_2m' && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      (2mt + 2mt + 2mt = 6mt totali). Taglio in 3 spezzoni da 2 metri.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Presto Disponibile Banner OR Add to Cart Box */}
            {isPrestoDisponibile ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3 text-amber-950">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Presto disponibile a magazzino</h4>
                    <span className="text-[11px] text-amber-800">Prezzo: €0.00 • In arrivo con le prossime consegne.</span>
                  </div>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Puoi richiedere la prenotazione o ricevere informazioni sui tempi esatti di disponibilità contattando direttamente il nostro magazzino:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="tel:+39049768222"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-amber-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Chiama 049 768222
                  </a>
                  <a
                    href={`mailto:info@inoxtubionline.com?subject=Richiesta info disponibilità ${product.sku} - ${product.title}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-amber-300 text-amber-950 font-bold text-xs rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Invia Email di Richiesta
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-300">
                      {isBarOrTube ? 'Numero Barre (6m):' : 'Quantità:'}
                    </span>
                    <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-slate-300 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-slate-300 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        €{totalPriceGross.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        IVA 22% inclusa
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Peso tot: <strong>{totalWeightKg} kg</strong> ({quantity * 6} metri totali)
                    </p>
                  </div>

                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                    addedAnimation
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-95'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Aggiunto al carrello!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Aggiungi al Carrello (€{totalPriceGross.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
