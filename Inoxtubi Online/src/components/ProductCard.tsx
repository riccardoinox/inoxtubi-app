import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Scissors, 
  Scale, 
  Eye,
  Clock,
  Sparkles
} from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (p: Product) => void;
  onAddToCart: (p: Product, qty: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onAddToCart,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isPrestoDisponibile = product.stock_status === 'out_of_stock' || product.price_gross <= 0;
  const isBarOrTube = product.shape.includes('Tubo') || product.shape.includes('Barra');

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrestoDisponibile) {
      onOpenDetail(product);
      return;
    }
    onAddToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      onClick={() => onOpenDetail(product)}
      className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative ${
        isPrestoDisponibile 
          ? 'border-slate-200 hover:border-amber-300 hover:shadow-lg' 
          : 'border-slate-200 hover:border-blue-400 hover:shadow-xl'
      }`}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide ${
            product.alloy === 'AISI 316' || product.alloy === 'AISI 316L'
              ? 'bg-amber-500 text-white'
              : 'bg-blue-600 text-white'
          }`}>
            {product.alloy}
          </span>
          {product.subcategory && (
            <span className="text-[10px] font-semibold bg-white/95 backdrop-blur-sm text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">
              {product.subcategory}
            </span>
          )}
        </div>

        {isPrestoDisponibile ? (
          <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2.5 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Presto disponibile
          </span>
        ) : (
          product.finish && product.finish !== 'Grezzo / Industriale' && (
            <span className="text-[10px] font-semibold bg-slate-900/80 backdrop-blur-sm text-slate-100 px-2 py-0.5 rounded-md">
              {product.finish.split(' ')[0]}
            </span>
          )
        )}
      </div>

      <div>
        {/* Product Image Area */}
        <div className="relative h-48 sm:h-52 bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-center overflow-hidden">
          <img
            src={product.primary_image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
            }}
          />

          {/* Quick Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Vedi scheda & tagli (3m/2m)</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          
          {/* Subcategory & SKU */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-600">{product.subcategory || product.shape}</span>
            <span className="font-mono text-slate-400">{product.sku}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Dimensional Specs Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {product.dimensions.outerDiameter && (
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                Ø {product.dimensions.outerDiameter} mm
              </span>
            )}
            {product.dimensions.sideA && (
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                {product.dimensions.sideA}x{product.dimensions.sideB || product.dimensions.sideA} mm
              </span>
            )}
            {product.dimensions.width && !product.dimensions.sideA && (
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                {product.dimensions.width}x{product.dimensions.height || product.dimensions.wallThickness} mm
              </span>
            )}
            {product.dimensions.wallThickness && (
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                sp. {product.dimensions.wallThickness} mm
              </span>
            )}
          </div>

          {/* Technical Info snippet */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.weight_kg_per_unit} kg/{isBarOrTube ? 'barra 6m' : 'pz'}</span>
            </span>
            {isBarOrTube && (
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <Scissors className="w-3 h-3 text-emerald-600" />
                Scelta: 2x3m o 3x2m
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer / Price & Add to Cart */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-900">
              €{product.price_gross.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              IVA inclusa
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            {isBarOrTube ? 'Minimo vendita: 1 barra da 6mt' : 'Prezzo per pezzo'}
          </p>
        </div>

        {/* Quick Action Button */}
        {isPrestoDisponibile ? (
          <button
            onClick={handleAdd}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            title="Presto disponibile - Richiedi info"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Info</span>
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95'
            }`}
            title="Aggiungi al carrello"
          >
            {addedAnimation ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};
