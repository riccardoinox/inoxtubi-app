import React, { useState } from 'react';
import { 
  Search, 
  Scissors, 
  Calculator, 
  ArrowRight,
  Sparkles,
  Award,
  Truck,
  ShieldCheck
} from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenSpecs: () => void;
  onSelectCategory: (cat: string, subcat?: string) => void;
  onDimensionSearch: (shape: string, dimension: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onOpenSpecs,
  onSelectCategory,
  onDimensionSearch,
}) => {
  const [selectedShape, setSelectedShape] = useState<string>('Tubo Tondo');
  const [dimensionInput, setDimensionInput] = useState<string>('');

  const quickPills = [
    { label: 'Tubi Tondi', category: 'Tubi', subcategory: 'Tubi Tondi' },
    { label: 'Tubi Senza Saldatura', category: 'Tubi', subcategory: 'Tubi Senza Saldatura' },
    { label: 'Tubi Quadri', category: 'Tubi', subcategory: 'Tubi Quadri' },
    { label: 'Tubi Rettangolari', category: 'Tubi', subcategory: 'Tubi Rettangolari' },
    { label: 'Tubi Lucidi', category: 'Tubi', subcategory: 'Tubi Lucidi' },
    { label: 'Barre Piatte & Angolari', category: 'Barre', subcategory: '' },
    { label: 'Raccorderia & Curve', category: 'Raccorderia', subcategory: '' },
  ];

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dimensionInput.trim()) {
      onDimensionSearch(selectedShape, dimensionInput.trim());
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
      
      {/* Background Steel Sheen Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative max-w-7xl mx-auto space-y-8">
        
        {/* Top Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            Acciaieria e Magazzino a Limena (Padova) dal 1979
          </span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            Spedizioni dirette a privati in tutta Italia
          </span>
          <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
            <Scissors className="w-3.5 h-3.5 text-amber-400" />
            Barre da 6mt con tagli da 3mt o 2mt
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Tubi, Barre e Raccordi in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Acciaio Inox per Privati
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Acquista online tubi elettrouniti, senza saldatura e lucidi in <strong>AISI 304 e AISI 316</strong>. 
            Vendita minima barra intera da 6mt con scelta di consegna in <strong>2 pezzi da 3 metri</strong> oppure <strong>3 pezzi da 2 metri</strong>.
          </p>
        </div>

        {/* Interactive Dimension Search Box */}
        <div className="max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
          <form onSubmit={handleQuickSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Shape selection */}
            <div className="w-full sm:w-52">
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Tubo Tondo">Tubo Tondo</option>
                <option value="Tubo Tondo Senza Saldatura">Tubo Senza Saldatura</option>
                <option value="Tubo Quadro">Tubo Quadro</option>
                <option value="Tubo Rettangolare">Tubo Rettangolare</option>
                <option value="Barra Piatta">Barra Piatta</option>
                <option value="Barra Angolare">Barra Angolare</option>
                <option value="Curva">Curva / Raccordo</option>
              </select>
            </div>

            {/* Dimension input */}
            <div className="relative w-full flex-1">
              <input
                type="text"
                placeholder="Inserisci misura (es. 20x20x1.5, 30x2, 48.3x2)..."
                value={dimensionInput}
                onChange={(e) => setDimensionInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-2xl px-4 py-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Trova Misura</span>
            </button>
          </form>

          {/* Quick Categories Pills */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Categorie rapide:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => onSelectCategory(pill.category, pill.subcategory)}
                  className="px-2.5 py-1 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
