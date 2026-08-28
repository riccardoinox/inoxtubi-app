import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  Lock
} from 'lucide-react';
import type { Product } from '../types';

interface NavbarProps {
  cartItemCount: number;
  totalCartWeight: number;
  cartTotalGross: number;
  onOpenCart: () => void;
  onOpenCalculator: () => void;
  onOpenSpecs: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcat: string) => void;
  onSelectProduct: (p: Product) => void;
  allProducts: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  totalCartWeight,
  cartTotalGross,
  onOpenCart,
  onOpenCalculator,
  onOpenSpecs,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  onSelectProduct,
  allProducts
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter autocomplete results
  const searchResults = searchQuery.trim().length > 1
    ? allProducts
        .filter(p => 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.alloy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const mainCategories = [
    { id: 'all', name: 'Tutti i Prodotti', count: allProducts.length },
    { id: 'Tubi Tondi', name: 'Tubi Tondi', category: 'Tubi', subcategory: 'Tubi Tondi' },
    { id: 'Tubi Senza Saldatura', name: 'Tubi Senza Saldatura', category: 'Tubi', subcategory: 'Tubi Senza Saldatura' },
    { id: 'Tubi Quadri', name: 'Tubi Quadri', category: 'Tubi', subcategory: 'Tubi Quadri' },
    { id: 'Tubi Rettangolari', name: 'Tubi Rettangolari', category: 'Tubi', subcategory: 'Tubi Rettangolari' },
    { id: 'Tubi Lucidi', name: 'Tubi Lucidi', category: 'Tubi', subcategory: 'Tubi Lucidi' },
    { id: 'Barre', name: 'Barre (Piatte, Tonde, Angolari)', category: 'Barre', subcategory: '' },
    { id: 'Raccorderia', name: 'Raccorderia & Curve', category: 'Raccorderia', subcategory: '' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-blue-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-400" />
              Vendita Online di Acciaio Inox ai Privati • Spedizioni in tutta Italia
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              Minimo di vendita 6mt per tubo (tagli da 3mt o 2mt)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenSpecs}
              className="hover:text-white flex items-center transition-colors text-slate-300"
            >
              <FileText className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Guida Leghe & Norme EN
            </button>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:+39049768222" 
              className="hover:text-white flex items-center text-slate-300 font-medium"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              049 768222
            </a>
            <span className="text-slate-600">|</span>
            {/* Discreet Admin Lock Button in Top Bar */}
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors text-[11px]"
              title="Area Riservata Amministrazione (Accesso con PIN)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 gap-4">
          
          {/* Official Inoxtubi Padova Logo Header */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                setSelectedCategory('all'); 
                setSelectedSubcategory(''); 
                setSearchQuery(''); 
              }}
              className="flex items-center gap-3 group"
            >
              <img 
                src="/logo.jpg" 
                alt="Inoxtubi Padova srl" 
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
              <div className="hidden xl:flex flex-col border-l border-slate-200 pl-3">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  Shop Online
                </span>
                <span className="text-[10px] text-slate-500">
                  Tubi e profili su misura
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Cerca misura (es. 20x20x1.5, Ø 48.3, 30x3), lega (AISI 304/316), codice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150">
                <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                  <span>Risultati Corrispondenti ({searchResults.length})</span>
                  <span className="text-[10px] text-slate-400">Clicca per visualizzare</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
                          <img 
                            src={p.primary_image} 
                            alt={p.title} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{p.title}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono text-blue-600 font-medium">{p.sku}</span>
                            <span>•</span>
                            <span className="bg-slate-100 px-1.5 py-0.2 rounded font-medium text-slate-700">{p.alloy}</span>
                            <span>•</span>
                            <span className="text-slate-600 font-medium">{p.subcategory}</span>
                            {(p.stock_status === 'out_of_stock' || p.price_gross <= 0) && (
                              <span className="text-amber-700 font-bold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Presto disponibile
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-slate-900 text-sm">
                          €{p.price_gross.toFixed(2)}
                        </p>
                        <span className="text-[10px] text-slate-400 block">
                          IVA inclusa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Metal Weight Calculator Button */}
            <button
              onClick={onOpenCalculator}
              className="hidden md:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200"
              title="Calcola peso teorico e configurazione"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Calcolatore Pesi</span>
            </button>

            {/* Cart Button with Total (IVA Inclusa) */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-normal text-blue-100">
                  {cartItemCount === 0 ? 'Carrello' : `${totalCartWeight.toFixed(1)} kg`}
                </span>
                <span className="text-xs font-bold">
                  €{cartTotalGross.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Categories Bar Navigation */}
        <div className="hidden lg:flex items-center space-x-1 py-2.5 border-t border-slate-100 overflow-x-auto text-xs font-bold">
          {mainCategories.map((item) => {
            const isSelected = item.id === 'all'
              ? (selectedCategory === 'all' && !selectedSubcategory && !searchQuery)
              : (selectedSubcategory === item.subcategory && selectedCategory === (item.category || selectedCategory));

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'all') {
                    setSelectedCategory('all');
                    setSelectedSubcategory('');
                  } else if (item.subcategory) {
                    setSelectedCategory(item.category || 'Tubi');
                    setSelectedSubcategory(item.subcategory);
                  } else {
                    setSelectedCategory(item.category || 'all');
                    setSelectedSubcategory('');
                  }
                  setSearchQuery('');
                }}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca misura, lega, codice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-lg text-xs border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenCalculator(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs"
            >
              <Calculator className="w-4 h-4" />
              Calcolatore Pesi
            </button>
            <button
              onClick={() => { onOpenSpecs(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
            >
              <FileText className="w-4 h-4" />
              Guida Tecniche
            </button>
          </div>

          <div className="space-y-1 pt-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Categorie Prodotti</p>
            {mainCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'all') {
                    setSelectedCategory('all');
                    setSelectedSubcategory('');
                  } else if (item.subcategory) {
                    setSelectedCategory(item.category || 'Tubi');
                    setSelectedSubcategory(item.subcategory);
                  } else {
                    setSelectedCategory(item.category || 'all');
                    setSelectedSubcategory('');
                  }
                  setSearchQuery('');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 flex justify-between"
              >
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Area Riservata (PIN: 1979)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
