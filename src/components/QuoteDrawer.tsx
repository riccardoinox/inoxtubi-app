import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ShoppingCart, 
  Building2, 
  User, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const QuoteDrawer: React.FC = () => {
  const { 
    quoteItems, 
    removeFromQuote, 
    updateQuoteQuantity, 
    clearQuote, 
    isQuoteDrawerOpen, 
    setIsQuoteDrawerOpen 
  } = useInventory();

  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isQuoteDrawerOpen) return null;

  const totalItemsCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  const generateFormattedText = () => {
    let text = `RICHIESTA PREVENTIVO - INOXTUBI PADOVA SRL\n`;
    text += `Data: ${new Date().toLocaleDateString('it-IT')} ore ${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `-------------------------------------------\n`;
    if (companyName) text += `Azienda: ${companyName}\n`;
    if (contactName) text += `Referente: ${contactName}\n`;
    if (phone) text += `Telefono / Cell: ${phone}\n`;
    text += `-------------------------------------------\n`;
    text += `ARTICOLI RICHIESTI (${quoteItems.length} voci):\n`;

    quoteItems.forEach((item, index) => {
      text += `\n${index + 1}. Codice: ${item.article.code}\n`;
      text += `   Descrizione: ${item.article.desc}\n`;
      text += `   Lega: ${item.article.alloy} | U.M.: ${item.article.um}\n`;
      text += `   Quantità richiesta: ${item.quantity} ${item.article.um}\n`;
      text += `   Stato Magazzino: ${item.article.isAvailable ? '🟢 Disponibile' : '🟠 Contattare per info'}\n`;
    });
    if (notes) {
      text += `\nNOTE / RICHIESTE AGGIUNTIVE:\n${notes}\n`;
    }
    return text;
  };

  const handleSendEmail = () => {
    const text = generateFormattedText();
    const subject = encodeURIComponent(`Richiesta Preventivo ${companyName ? `- ${companyName}` : ''}`);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:info@inoxtubi.com?subject=${subject}&body=${body}`;
  };

  const handleCopyText = () => {
    const text = generateFormattedText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsQuoteDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-inox-navy text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-inox-blue text-white shadow-sm">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base sm:text-lg">Carrello Preventivo</h2>
                <p className="text-xs text-slate-300">
                  {quoteItems.length} {quoteItems.length === 1 ? 'articolo selezionato' : 'articoli selezionati'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {quoteItems.length > 0 && (
                <button
                  onClick={clearQuote}
                  className="p-2 text-slate-300 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors text-xs flex items-center space-x-1"
                  title="Svuota lista"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsQuoteDrawerOpen(false)}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {quoteItems.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-sm">Il tuo carrello preventivo è vuoto</h3>
                <p className="text-xs max-w-xs mx-auto text-slate-500">
                  Naviga nel Magazzino Online e clicca sul pulsante <strong>"Lista"</strong> per aggiungere articoli alla richiesta di offerta.
                </p>
                <button
                  onClick={() => setIsQuoteDrawerOpen(false)}
                  className="mt-2 px-4 py-2 bg-inox-blue text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Sfoglia Magazzino
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-2.5">
                  {quoteItems.map(item => (
                    <div 
                      key={item.article.code}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-1.5 mb-0.5">
                            <span className="font-mono font-bold text-xs sm:text-sm text-inox-navy">
                              {item.article.code}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-inox-sky text-inox-navy rounded">
                              {item.article.alloy}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {item.article.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromQuote(item.article.code)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-rose-50 transition-colors"
                          title="Rimuovi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-[11px] text-slate-500 font-medium">
                          U.M.: <strong className="text-slate-700">{item.article.um}</strong>
                        </span>

                        <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                          <button
                            onClick={() => updateQuoteQuantity(item.article.code, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={e => updateQuoteQuantity(item.article.code, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 text-center text-xs font-mono font-bold text-slate-800 focus:outline-none"
                          />
                          <button
                            onClick={() => updateQuoteQuantity(item.article.code, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700">
                    Dati di Contatto (Opzionali)
                  </h3>

                  <div className="space-y-2">
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Nome Azienda / Ragione Sociale"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-inox-blue"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Referente"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-inox-blue"
                        />
                      </div>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          placeholder="Telefono"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-inox-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        placeholder="Note o richieste di taglio a misura, finiture o specifiche..."
                        rows={2}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-inox-blue resize-none"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Actions: Email & Phone Direct */}
          {quoteItems.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              
              {/* Primary Action: Invia via Email */}
              <button
                onClick={handleSendEmail}
                className="w-full py-3 px-4 bg-inox-blue hover:bg-inox-lightBlue text-white rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98"
              >
                <Mail className="w-4 h-4" />
                <span>Invia Richiesta via Email (info@inoxtubi.com)</span>
              </button>

              {/* Secondary Actions: Chiama & Copia Testo */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+39049768222"
                  className="py-2.5 px-3 bg-inox-navy hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chiama +39 049 768222</span>
                </a>

                <button
                  onClick={handleCopyText}
                  className="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copiato!' : 'Copia Testo'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
