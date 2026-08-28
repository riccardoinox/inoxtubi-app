import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Truck, 
  Scale, 
  Scissors, 
  MapPin,
  ShieldCheck
} from 'lucide-react';
import type { CartItem } from '../types';
import { calculateShippingRates } from '../utils/steelCalculations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, itm) => acc + itm.quantity, 0);
  const totalWeightKg = items.reduce((acc, itm) => acc + (itm.calculatedWeightKg * itm.quantity), 0);
  const totalGross = items.reduce((acc, itm) => acc + itm.totalPriceGross, 0);

  const shippingRates = calculateShippingRates(totalWeightKg, true);
  const standardShippingGross = shippingRates[0]?.costGross || 18.30;
  const grandTotalGross = totalGross + (items.length > 0 ? standardShippingGross : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Il tuo Carrello</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-black px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="font-bold text-slate-800 text-sm">Il carrello è vuoto</p>
                <p className="text-xs text-slate-500 max-w-xs">
                  Sfoglia il catalogo o cerca la misura di cui hai bisogno per comporre il tuo ordine con tagli da 3mt o 2mt.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Continua lo Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-2 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.primary_image}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Rimuovi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-blue-600">{item.product.alloy}</span>
                      <span>•</span>
                      <span>{(item.calculatedWeightKg * item.quantity).toFixed(1)} kg tot.</span>
                    </div>

                    {/* Cut details */}
                    {item.cutOption && (
                      <div className="bg-blue-50/80 text-blue-900 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 mt-1">
                        <Scissors className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span>
                          {item.cutOption === '3m_plus_3m' ? 'Taglio: 2 pezzi da 3m' : 'Taglio: 3 pezzi da 2m'}
                        </span>
                      </div>
                    )}

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">
                          €{item.totalPriceGross.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">IVA incl.</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Call-to-action */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              
              {/* Summary Stats */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Totale Prodotti (IVA incl.):</span>
                  <span className="font-bold text-slate-900">€{totalGross.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-slate-400" />
                    Peso complessivo:
                  </span>
                  <span className="font-bold text-slate-900">{totalWeightKg.toFixed(1)} kg</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    Spedizione con corriere:
                  </span>
                  <span className="font-bold text-slate-900">€{standardShippingGross.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900 text-sm">Totale Ordine (IVA incl.):</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-blue-600">
                      €{grandTotalGross.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Procedi all'Ordine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Pagamento sicuro & Ricevuta fiscale
                </span>
                <button
                  onClick={onClearCart}
                  className="text-red-500 hover:underline"
                >
                  Svuota carrello
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
