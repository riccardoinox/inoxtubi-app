import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Building, 
  User, 
  Phone, 
  FileText 
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
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isQuoteDrawerOpen) return null;

  const generateFormattedText = () => {
    let text = `RICHIESTA PREVENTIVO - INOXTUBI PADOVA\n`;
    text += `==================================\n`;
    if (companyName) text += `🏢 Azienda: ${companyName}\n`;
    if (contactName) text += `👤 Referente: ${contactName}\n`;
    if (phone) text += `📞 Telefono: ${phone}\n`;
    if (email) text += `✉️ Email: ${email}\n`;
    text += `\nELENCO MATERIALI RICHIESTI:\n`;
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

  const handleSendWhatsApp = () => {
    const text = generateFormattedText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/390498701200?text=${encoded}`, '_blank');
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
        onClick={() => setIsQuoteDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-inox-navy text-white flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg">Carrello Preventivo</h2>
              <p className="text-xs text-slate-300">
                {quoteItems.length} {quoteItems.length === 1 ? 'articolo selezionato' : 'articoli selezionati'}
              </p>
            </div>
            <button
              onClick={() => setIsQuoteDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {quoteItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-base mb-1">Nessun articolo nel preventivo</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                  Cerca gli articoli nel magazzino online e premi "+ Preventivo" per comporre la tua lista.
                </p>
                <button
                  onClick={() => setIsQuoteDrawerOpen(false)}
                  className="px-4 py-2 bg-inox-blue text-white rounded-lg text-xs font-bold"
                >
                  Sfoglia Magazzino
                </button>
              </div>
            ) : (
              <>
                {/* List of articles */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Articoli Inox</span>
                    <button
                      onClick={clearQuote}
                      className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Svuota lista</span>
                    </button>
                  </div>

                  {quoteItems.map(item => (
                    <div 
                      key={item.article.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono font-bold text-sm text-inox-navy">
                            {item.article.code}
                          </span>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {item.article.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.article.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        <span className={`text-[11px] font-bold ${item.article.isAvailable ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {item.article.isAvailable ? '🟢 Disponibile' : '🟠 Da richiedere'}
                        </span>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400 font-medium">Quantità ({item.article.um}):</span>
                          <div className="flex items-center space-x-1 bg-white rounded-lg border border-slate-300 p-0.5">
                            <button
                              onClick={() => updateQuoteQuantity(item.article.id, item.quantity - 1)}
                              className="p-1 text-slate-600 hover:text-inox-blue"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs px-2 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuoteQuantity(item.article.id, item.quantity + 1)}
                              className="p-1 text-slate-600 hover:text-inox-blue"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="pt-3 border-t border-slate-200 space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">I tuoi recapiti (opzionali)</span>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Ragione Sociale / Azienda"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-inox-blue"
                      />
                    </div>

                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Nome Referente"
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-inox-blue"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          placeholder="Telefono"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-inox-blue"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-inox-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        placeholder="Note o richieste di taglio / lavorazioni aggiuntive..."
                        rows={2}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-inox-blue resize-none"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Actions */}
          {quoteItems.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Invia Richiesta su WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSendEmail}
                  className="py-2 px-3 bg-inox-navy hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Invia via Email</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
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
