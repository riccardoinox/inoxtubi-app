import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  HelpCircle, 
  Star, 
  ArrowUpDown,
  Lock
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { ArticleCard } from '../components/ArticleCard';
import { AvailabilityFilter, CategoryFilter } from '../types/inventory';
import { AdminDashboardModal } from '../components/AdminDashboardModal';

const CATEGORIES: CategoryFilter[] = [
  'Tutti',
  'Tubi Tondi',
  'Tubi Senza Saldatura (TSS)',
  'Tubi Quadri / Rett.',
  'Barre Tonde',
  'Barre Quadre',
  'Barre Esagonali',
  'Barre Forate',
  'Piatti',
  'Angolari e Profili',
  'Lamiere',
  'Raccorderia / Accessori',
  'Acciai Speciali',
  'Altri Prodotti'
];

const ALLOYS = ['Tutte', 'AISI 304', 'AISI 304L', 'AISI 316', 'AISI 316L', 'AISI 303', '1.4313', '1.4404', 'Duplex', 'Inox / Altro'];

export const WarehousePage: React.FC = () => {
  const { 
    articles, 
    totalCount, 
    availableCount, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedAlloy,
    setSelectedAlloy,
    favorites,
  } = useInventory();

  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [visibleLimit, setVisibleLimit] = useState<number>(40);
  const [sortBy, setSortBy] = useState<'code' | 'availability' | 'desc'>('availability');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return articles.filter(article => {
      // Search query (code, desc, altCode, alloy)
      if (q) {
        const matchesCode = article.code.toLowerCase().includes(q);
        const matchesDesc = article.desc.toLowerCase().includes(q);
        const matchesAlloy = article.alloy.toLowerCase().includes(q);
        const matchesAlt = article.altCode ? article.altCode.toLowerCase().includes(q) : false;
        if (!matchesCode && !matchesDesc && !matchesAlloy && !matchesAlt) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'Tutti' && article.category !== selectedCategory) {
        return false;
      }

      // Alloy filter
      if (selectedAlloy !== 'Tutte' && article.alloy !== selectedAlloy) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'available' && !article.isAvailable) {
        return false;
      }
      if (availabilityFilter === 'onRequest' && article.isAvailable) {
        return false;
      }

      // Favorites
      if (onlyFavorites && !favorites.includes(article.code)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'availability') {
        if (a.isAvailable === b.isAvailable) {
          return a.code.localeCompare(b.code);
        }
        return a.isAvailable ? -1 : 1;
      }
      if (sortBy === 'code') {
        return a.code.localeCompare(b.code);
      }
      return a.desc.localeCompare(b.desc);
    });
  }, [articles, searchQuery, selectedCategory, selectedAlloy, availabilityFilter, onlyFavorites, favorites, sortBy]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleLimit);
  }, [filteredArticles, visibleLimit]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tutti');
    setSelectedAlloy('Tutte');
    setAvailabilityFilter('all');
    setOnlyFavorites(false);
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-3.5 sm:px-6 pt-4">
      
      {/* Top Banner / Info Card */}
      <div className="bg-gradient-to-r from-inox-navy via-slate-900 to-inox-blue rounded-2xl p-4 sm:p-6 text-white shadow-lg mb-4 border border-inox-blue/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                Magazzino Live
              </span>
              <span className="text-xs text-slate-300">
                Giacenze in tempo reale Inoxtubi Padova
              </span>
            </div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Consultazione Magazzino Online
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Cerca tra oltre <strong className="text-white font-mono">{totalCount.toLocaleString('it-IT')} articoli</strong>. Gli articoli con giacenza mostrano <span className="text-emerald-400 font-bold">"Disponibile"</span> in verde, quelli a zero <span className="text-amber-400 font-bold">"Contattare per info"</span>.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
            >
              <Lock className="w-3.5 h-3.5 text-inox-lightBlue" />
              <span>Gestione Magazzino</span>
            </button>
          </div>
        </div>

        {/* Stats Pill Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-lg py-1.5 px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Articoli a Catalogo</span>
            <p className="font-mono font-bold text-sm sm:text-base text-white">{totalCount.toLocaleString('it-IT')}</p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg py-1.5 px-2 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-300 uppercase font-semibold">🟢 In Pronta Consegna</span>
            <p className="font-mono font-bold text-sm sm:text-base text-emerald-400">{availableCount.toLocaleString('it-IT')}</p>
          </div>
          <div className="bg-amber-500/10 rounded-lg py-1.5 px-2 border border-amber-500/20">
            <span className="text-[10px] text-amber-300 uppercase font-semibold">🟠 Su Ordinazione / Info</span>
            <p className="font-mono font-bold text-sm sm:text-base text-amber-400">{(totalCount - availableCount).toLocaleString('it-IT')}</p>
          </div>
        </div>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200 mb-4 sticky top-16 sm:top-20 z-30 space-y-3">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cerca per codice (es. TSS304, BTT303, ANG304, ACC14313), descrizione, dimensioni..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-inox-blue focus:ring-2 focus:ring-inox-blue/20 transition-all font-medium text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Wrap Chips (Fixed: wraps cleanly without cutting off) */}
        <div className="flex flex-wrap items-center gap-1.5 py-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-inox-blue text-white shadow-sm ring-2 ring-inox-blue/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          
          {/* Availability Filter Buttons */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setAvailabilityFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                availabilityFilter === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Tutti
            </button>
            <button
              onClick={() => setAvailabilityFilter('available')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                availabilityFilter === 'available'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Disponibili</span>
            </button>
            <button
              onClick={() => setAvailabilityFilter('onRequest')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                availabilityFilter === 'onRequest'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-800 hover:bg-amber-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Su Richiesta</span>
            </button>
          </div>

          {/* Alloy Selector & Favorites & Sorting */}
          <div className="flex items-center space-x-2">
            
            {/* Alloy Dropdown with AISI 303 */}
            <select
              value={selectedAlloy}
              onChange={e => setSelectedAlloy(e.target.value)}
              className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-inox-blue"
            >
              {ALLOYS.map(al => (
                <option key={al} value={al}>Lega: {al}</option>
              ))}
            </select>

            {/* Favorite Star Filter */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition-all ${
                onlyFavorites
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-700'
              }`}
              title="Mostra solo preferiti"
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Preferiti</span>
            </button>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(prev => prev === 'availability' ? 'code' : prev === 'code' ? 'desc' : 'availability')}
              className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center space-x-1"
              title="Cambia ordinamento"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-inox-blue" />
              <span className="hidden md:inline">
                {sortBy === 'availability' ? 'Stato' : sortBy === 'code' ? 'Codice' : 'Descrizione'}
              </span>
            </button>

          </div>

        </div>

      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="text-xs text-slate-500 font-medium">
          Trovati <strong className="text-inox-navy font-bold">{filteredArticles.length.toLocaleString('it-IT')}</strong> articoli 
          {filteredArticles.length !== totalCount && ` (filtrati da ${totalCount.toLocaleString('it-IT')})`}
        </div>

        {(searchQuery || selectedCategory !== 'Tutti' || selectedAlloy !== 'Tutte' || availabilityFilter !== 'all' || onlyFavorites) && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-inox-blue hover:text-inox-navy font-bold flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Azzera filtri</span>
          </button>
        )}
      </div>

      {/* Grid of Articles */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">Nessun articolo trovato</h3>
          <p className="text-xs text-slate-500 mb-4">
            Non abbiamo trovato articoli corrispondenti ai criteri di ricerca. Prova a verificare l'ortografia o azzera i filtri.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-inox-blue text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Azzera tutti i filtri
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {displayedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Load More Button if results exceed visible limit */}
          {filteredArticles.length > visibleLimit && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleLimit(prev => prev + 40)}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-inox-navy font-bold text-xs rounded-xl border border-slate-300 shadow-sm transition-all active:scale-95"
              >
                Carica altri articoli ({filteredArticles.length - visibleLimit} rimanenti)
              </button>
            </div>
          )}
        </>
      )}

      {/* Admin Protected Modal */}
      <AdminDashboardModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />

    </div>
  );
};
