import React, { useState } from 'react';
import { ShoppingCart, Phone, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { AdminDashboardModal } from './AdminDashboardModal';

export const Header: React.FC = () => {
  const { 
    quoteItems, 
    setIsQuoteDrawerOpen, 
    syncStatus, 
    lastUpdated,
    setActiveTab 
  } = useInventory();

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Official Inoxtubi Padova Logo Image */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center focus:outline-none group py-1"
            title="Inoxtubi Padova Srl - Home"
          >
            <img 
              src="/logo-inoxtubi.jpg" 
              alt="Inoxtubi Padova srl" 
              className="h-10 sm:h-13 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
            />
          </button>

          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Private Admin Dashboard Button (Protected by password) */}
            <button
              onClick={() => setIsAdminOpen(true)}
              title="Area Riservata Gestione Magazzino"
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all active:scale-95 border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5 text-inox-blue" />
              <span className="hidden sm:inline">Area Gestione</span>
            </button>

            {/* Quick Call */}
            <a
              href="tel:+39049768222"
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-emerald-600 transition-colors"
              title="Chiama Inoxtubi Padova (+39 049 768222)"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Quote Cart Button */}
            <button
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-inox-blue hover:bg-inox-lightBlue text-white shadow-sm transition-all active:scale-95"
              title="Carrello Preventivo"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {totalQuoteCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-white font-bold text-[11px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalQuoteCount > 99 ? '99+' : totalQuoteCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Sync Status Banner */}
        {syncStatus === 'success' && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-1 flex items-center justify-center space-x-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Giacenze magazzino aggiornate con successo!</span>
          </div>
        )}
        {syncStatus === 'error' && (
          <div className="bg-amber-600 text-white text-xs px-4 py-1 flex items-center justify-center space-x-1.5 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Sincronizzazione Drive: caricato archivio locale di riserva.</span>
          </div>
        )}
      </header>

      {/* Admin Protected Modal */}
      <AdminDashboardModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </>
  );
};
