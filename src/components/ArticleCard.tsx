import React from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  Mail, 
  Plus, 
  Star
} from 'lucide-react';
import { Article } from '../types/inventory';
import { useInventory } from '../context/InventoryContext';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { addToQuote, favorites, toggleFavorite } = useInventory();
  const isFav = favorites.includes(article.code);

  const phoneUrl = 'tel:+39049768222';

  const emailSubject = encodeURIComponent(`Richiesta Preventivo Inoxtubi: ${article.code}`);
  const emailBody = encodeURIComponent(
    `Spett.le Inoxtubi Padova,

` +
    `Vi contatto per richiedere quotazione e tempi di consegna per il seguente materiale:

` +
    `Codice Articolo: ${article.code}
` +
    `Descrizione: ${article.desc}
` +
    `Lega Inox: ${article.alloy}
` +
    `Unità di Misura: ${article.um}
` +
    `Stato a Catalogo: ${article.isAvailable ? 'Disponibile a magazzino' : 'Contattare per info'}

` +
    `Resto in attesa di un Vostro gentile riscontro.

` +
    `Cordiali Saluti.`
  );
  const emailUrl = `mailto:info@inoxtubi.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div 
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md ${
        article.isAvailable 
          ? 'border-slate-200 hover:border-emerald-400' 
          : 'border-slate-200 hover:border-amber-400'
      }`}
    >
      <div className="p-3.5 sm:p-4">
        
        {/* Top Badges & Favorite */}
        <div className="flex items-start justify-between gap-2 mb-2">
          
          {/* Alloy & Category badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-inox-navy text-white tracking-wide">
              {article.alloy}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {article.category}
            </span>
            {article.altCode && (
              <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                Dim: {article.altCode}
              </span>
            )}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(article.code)}
            className="text-slate-300 hover:text-amber-400 transition-colors p-1 -mr-1"
            title={isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          >
            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Article Code (Bold Primary) */}
        <div className="mb-1">
          <h3 className="font-mono font-bold text-base sm:text-lg text-inox-navy tracking-tight select-text">
            {article.code}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3 line-clamp-2 leading-relaxed">
          {article.desc || 'Descrizione prodotto inox'}
        </p>

        {/* Status Badge - EXACT REQUIREMENT: Verde "Disponibile" o "Contattare per info" */}
        <div className="mb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            {article.isAvailable ? (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Disponibile
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Contattare per info
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-medium">U.M. </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
              {article.um}
            </span>
          </div>
        </div>

        {/* Direct Human Contact & Quote Buttons */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          
          {/* Direct Phone Call */}
          <a
            href={phoneUrl}
            className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-inox-navy font-bold text-xs transition-colors border border-slate-200 shadow-2xs active:scale-95"
            title="Chiama Inoxtubi (+39 049 768222)"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chiama</span>
          </a>

          {/* Email Direct */}
          <a
            href={emailUrl}
            className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-inox-navy hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs active:scale-95"
            title="Invia richiesta via Email"
          >
            <Mail className="w-3.5 h-3.5 text-inox-lightBlue" />
            <span>Email</span>
          </a>

          {/* Add to Multi-Item Quote Cart */}
          <button
            onClick={() => addToQuote(article)}
            className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-inox-blue hover:bg-inox-lightBlue text-white font-bold text-xs transition-colors shadow-2xs active:scale-95"
            title="Aggiungi alla lista preventivo"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Lista</span>
          </button>

        </div>

      </div>
    </div>
  );
};
