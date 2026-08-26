import React from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { QuoteDrawer } from './components/QuoteDrawer';
import { HomePage } from './pages/HomePage';
import { WarehousePage } from './pages/WarehousePage';
import { ProductsPage } from './pages/ProductsPage';
import { CompanyPage } from './pages/CompanyPage';
import { ContactPage } from './pages/ContactPage';
import { useInventory } from './context/InventoryContext';

export const App: React.FC = () => {
  const { activeTab, setActiveTab } = useInventory();

  return (
    <div className="min-h-screen bg-inox-bg flex flex-col text-slate-900 selection:bg-inox-blue selection:text-white">
      {/* Top Bar with Sync & Cart */}
      <Header />

      {/* Main Desktop Tab Bar (hidden on mobile, bottom nav used instead) */}
      <div className="hidden md:block bg-white border-b border-slate-200 shadow-xs sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center space-x-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors relative h-full flex items-center ${
              activeTab === 'home' ? 'text-inox-blue' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
            {activeTab === 'home' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-inox-blue" />}
          </button>
          <button
            onClick={() => setActiveTab('warehouse')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors relative h-full flex items-center space-x-1.5 ${
              activeTab === 'warehouse' ? 'text-inox-blue' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Magazzino Online</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {activeTab === 'warehouse' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-inox-blue" />}
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors relative h-full flex items-center ${
              activeTab === 'catalog' ? 'text-inox-blue' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Prodotti & Specifiche
            {activeTab === 'catalog' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-inox-blue" />}
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors relative h-full flex items-center ${
              activeTab === 'company' ? 'text-inox-blue' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            L'Azienda & Guida Inox
            {activeTab === 'company' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-inox-blue" />}
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors relative h-full flex items-center ${
              activeTab === 'contact' ? 'text-inox-blue' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contatti & Sede
            {activeTab === 'contact' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-inox-blue" />}
          </button>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'warehouse' && <WarehousePage />}
        {activeTab === 'catalog' && <ProductsPage />}
        {activeTab === 'company' && <CompanyPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Slide-over Quote Drawer */}
      <QuoteDrawer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
