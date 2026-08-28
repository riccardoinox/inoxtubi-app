import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Lock,
  Building,
  User,
  Scissors
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem, CustomerData, ShippingRate } from '../types';
import { calculateShippingRates } from '../utils/steelCalculations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const totalWeightKg = items.reduce((acc, itm) => acc + (itm.calculatedWeightKg * itm.quantity), 0);
  const totalGross = items.reduce((acc, itm) => acc + itm.totalPriceGross, 0);

  const shippingRates: ShippingRate[] = calculateShippingRates(totalWeightKg, true);
  const [selectedShipping, setSelectedShipping] = useState<string>(shippingRates[0]?.id || 'express_courier');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank_transfer'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [customer, setCustomer] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    fiscalCode: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    province: '',
    country: 'Italia',
    notes: '',
    requestCertificates: true,
    requestInvoice: false
  });

  const activeShippingRate = shippingRates.find(s => s.id === selectedShipping) || shippingRates[0];
  const shippingGross = activeShippingRate ? activeShippingRate.costGross : 18.30;
  const grandTotalGross = totalGross + shippingGross;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderNum = `IX-ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setOrderNumber(generatedOrderNum);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Checkout & Ordine Privati
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                Grazie per il tuo ordine!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Abbiamo registrato il tuo ordine n. <strong className="text-blue-600 font-mono text-base">{orderNumber}</strong>. 
                Una copia di conferma con il riepilogo e i dettagli per il ritiro/spedizione è stata inviata a <strong>{customer.email}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Destinatario:</span>
                <span className="font-bold text-slate-900">{customer.firstName} {customer.lastName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Indirizzo di spedizione:</span>
                <span className="font-bold text-slate-900">{customer.address}, {customer.city} ({customer.province})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Metodo di Pagamento:</span>
                <span className="font-bold text-slate-900">
                  {paymentMethod === 'card' ? 'Carta di Credito / Debito' : paymentMethod === 'paypal' ? 'PayPal' : 'Bonifico Bancario Anticipato'}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black text-slate-900">
                <span>Totale Pagato (IVA incl.):</span>
                <span className="text-blue-600">€{grandTotalGross.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all"
            >
              Torna al Catalogo Prodotti
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Step 1: Customer Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">1. Dati del Cliente</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={customer.firstName}
                    onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="Mario"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Cognome *</label>
                  <input
                    type="text"
                    required
                    value={customer.lastName}
                    onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="Rossi"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="mario.rossi@email.it"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Telefono / Cellulare *</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="340 1234567"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-semibold mb-1">Codice Fiscale (per ricevuta fiscale o fattura)</label>
                  <input
                    type="text"
                    value={customer.fiscalCode}
                    onChange={(e) => setCustomer({ ...customer, fiscalCode: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none uppercase font-mono"
                    placeholder="RSSMRA80A01H501U"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">2. Indirizzo di Consegna</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-3">
                  <label className="block text-slate-600 font-semibold mb-1">Via e Numero Civico *</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="Via Roma, 12"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Città *</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="Padova"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">CAP *</label>
                  <input
                    type="text"
                    required
                    value={customer.zipCode}
                    onChange={(e) => setCustomer({ ...customer, zipCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                    placeholder="35100"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Provincia (Sigla) *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={customer.province}
                    onChange={(e) => setCustomer({ ...customer, province: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none uppercase font-mono"
                    placeholder="PD"
                  />
                </div>
              </div>

              {/* Shipping Method Options */}
              <div className="space-y-2 pt-2">
                <label className="block text-slate-600 font-semibold text-xs">Modalità di Spedizione / Ritiro:</label>
                <div className="space-y-2">
                  {shippingRates.map((rate) => (
                    <label
                      key={rate.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedShipping === rate.id
                          ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={selectedShipping === rate.id}
                          onChange={() => setSelectedShipping(rate.id)}
                          className="text-blue-600"
                        />
                        <div>
                          <p className="font-bold text-xs text-slate-900">{rate.name}</p>
                          <p className="text-[11px] text-slate-500">{rate.description}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-slate-900">
                        {rate.costGross === 0 ? 'GRATIS' : `€${rate.costGross.toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">3. Metodo di Pagamento</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Carta di Credito / Prepagata
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Bonifico Bancario
                </button>
              </div>
            </div>

            {/* Order Total & Submit Button */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Totale Prodotti ({items.length} articoli):</span>
                  <span className="font-semibold text-slate-900">€{totalGross.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Spedizione / Trasporto:</span>
                  <span className="font-semibold text-slate-900">€{shippingGross.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                  <span>Totale Finale (IVA 22% inclusa):</span>
                  <span className="text-blue-600">€{grandTotalGross.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Elaborazione Ordine...' : `Paga e Conferma Ordine (€${grandTotalGross.toFixed(2)})`}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
