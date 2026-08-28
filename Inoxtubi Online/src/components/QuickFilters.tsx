import React from 'react';
import { 
  RotateCcw, 
  SlidersHorizontal, 
  PackageCheck
} from 'lucide-react';
import type { FilterState } from '../types';

interface QuickFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableSubcategories: string[];
  availableAlloys: string[];
  totalResultsCount: number;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableSubcategories,
  availableAlloys,
  totalResultsCount,
}) => {
  const handleSubcatToggle = (subcat: string) => {
    onFilterChange({
      ...filters,
      subcategory: filters.subcategory === subcat ? '' : subcat
    });
  };

  const handleAlloyToggle = (alloy: string) => {
    onFilterChange({
      ...filters,
      alloy: filters.alloy === alloy ? '' : alloy
    });
  };

  const hasActiveFilters = Boolean(
    filters.subcategory || 
    filters.alloy || 
    filters.finish || 
    filters.searchQuery || 
    filters.category !== 'all' ||
    filters.stockFilter !== 'all'
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-5">
      
      {/* Top Filter Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900 text-sm">Filtri Parametrici</span>
          <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
            {totalResultsCount}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Azzera</span>
          </button>
        )}
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Disponibilità Magazzino:
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, stockFilter: 'all' })}
            className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all ${
              filters.stockFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Tutti gli articoli
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, stockFilter: 'in_stock_only' })}
            className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all flex items-center justify-center gap-1 ${
              filters.stockFilter === 'in_stock_only'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            Pronta Consegna
          </button>
        </div>
      </div>

      {/* Subcategory Filter Tags */}
      {availableSubcategories.length > 1 && (
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Tipologia Specifica:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableSubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => handleSubcatToggle(subcat)}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-xl border transition-all ${
                  filters.subcategory === subcat
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Alloy Filter Tags */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Lega Acciaio Inox:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {availableAlloys.map((alloy) => (
            <button
              key={alloy}
              onClick={() => handleAlloyToggle(alloy)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                filters.alloy === alloy
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {alloy}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting select */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Ordina:</span>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
        >
          <option value="featured">Consigliati / In Evidenza</option>
          <option value="price_asc">Prezzo (IVA incl.): crescente</option>
          <option value="price_desc">Prezzo (IVA incl.): decrescente</option>
          <option value="name_asc">Alfabetico A-Z</option>
          <option value="weight_asc">Peso: dal più leggero</option>
        </select>
      </div>

    </div>
  );
};
