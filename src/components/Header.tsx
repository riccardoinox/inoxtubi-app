import React from 'react';
import { RefreshCw, ShoppingCart, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const Header: React.FC = () => {
  const { 
    quoteItems, 
    setIsQuoteDrawerOpen, 
    syncStatus, 
    refreshFromDrive, 
    isLoading, 
    lastUpdated,
    setActiveTab 
  } = useInventory();

  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  const formattedDate = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : 'Pronto';

  return (
    <header className="sticky top-0 z-40 bg-inox-navy/95 backdrop-blur-md text-white border-b border-inox-blue/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-inox-blue to-inox-lightBlue flex items-center justify-center p-0.5 shadow-glow-blue">
            <div className="w-full h-full bg-inox-navy rounded-[10px] flex items-center justify-center border border-white/20">
              <span className="font-display font-extrabold text-lg text-white tracking-wider">IT</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-inox-lightBlue transition-colors">
                INOXTUBI
              </span>
              <span className="text-[10px] bg-inox-blue/50 text-inox-sky px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase border border-inox-blue/40">
                PADOVA
              </span>
            </div>
            <p className="text-[10.5px] text-slate-300 font-medium tracking-tight">
              Specialisti Inox dal 1979
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Live Sync Status & Refresh Button */}
          <button
            onClick={() => refreshFromDrive()}
            disabled={isLoading}
            title="Aggiorna giacenze da Google Drive"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw 
              className={`w-3.5 h-3.5 text-inox-lightBlue ${isLoading ? 'animate-spin text-amber-400' : ''}`} 
            />
            <span className="hidden sm:inline font-medium">
              {isLoading ? 'Sincronizzazione...' : 'Aggiorna'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              ({formattedDate})
            </span>
          </button>

          {/* Quick Call */}
          <a
            href="tel:+390498701200"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-emerald-400 transition-colors"
            title="Chiama Inoxtubi Padova"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Quote Cart Button */}
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="relative p-2 rounded-lg bg-inox-blue hover:bg-inox-lightBlue text-white shadow-sm transition-all active:scale-95"
            title="Carrello Preventivo"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalQuoteCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-white font-bold text-[11px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalQuoteCount > 99 ? '99+' : totalQuoteCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Sync Status Banner notification if status changed */}
      {syncStatus === 'success' && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-1 flex items-center justify-center space-x-1.5 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Giacenze magazzino aggiornate con successo da Google Drive!</span>
        </div>
      )}
      {syncStatus === 'error' && (
        <div className="bg-amber-600 text-white text-xs px-4 py-1 flex items-center justify-center space-x-1.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Sincronizzazione Drive: caricato archivio locale di riserva.</span>
        </div>
      )}
    </header>
  );
};
