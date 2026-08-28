import React from 'react';
import { 
  PackageSearch, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Scissors, 
  PhoneCall, 
  ArrowRight, 
  FileText, 
  ChevronRight,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const HomePage: React.FC = () => {
  const { 
    totalCount, 
    availableCount, 
    setActiveTab, 
    setSelectedCategory, 
    setSearchQuery 
  } = useInventory();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('warehouse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveTab('warehouse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productCategories = [
    { title: 'Tubi Tondi', filter: 'Tubi Tondi', desc: 'Saldati EFW/HF e senza saldatura AISI 304/316', icon: '⭕' },
    { title: 'Tubi Quadri / Rett.', filter: 'Tubi Quadri / Rett.', desc: 'Scatolati e profilati quadri e rettangolari', icon: '🔲' },
    { title: 'Barre Tonde', filter: 'Barre Tonde', desc: 'Barre tonde piene trafilate, pelate e rettificate', icon: '📏' },
    { title: 'Barre Forate', filter: 'Barre Forate', desc: 'Tubi spessi e barre forate per meccanica', icon: '🔘' },
    { title: 'Barre Quadre & Esag.', filter: 'Barre Quadre', desc: 'Barre quadre ed esagonali trafilate e laminate', icon: '📐' },
    { title: 'Piatti & Angolari', filter: 'Piatti', desc: 'Piatti cesoiati/trafilati e profili angolari', icon: '📏' },
    { title: 'Lamiere Inox', filter: 'Lamiere', desc: 'A caldo e a freddo, finiture 2B, BA, satinate', icon: '📄' },
    { title: 'Raccorderia', filter: 'Raccorderia / Accessori', desc: 'Curve, flange, manicotti, riduzioni e tee', icon: '🔩' },
  ];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-inox-navy via-slate-900 to-inox-blue text-white p-6 sm:p-10 shadow-2xl border border-inox-blue/30">
        
        {/* Background decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-inox-lightBlue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-inox-sky mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1"></span>
            <span>Inoxtubi Padova &bull; Dal 1979</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
            Distributore Ufficiale Acciaio Inox AISI 304 / 316
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            Commercializziamo tubi, lamiere, barre e raccorderia in acciaio inossidabile. Consulta il nostro <strong>Magazzino Online</strong> in tempo reale per verificare immediatamente la disponibilità delle giacenze.
          </p>

          {/* Warehouse CTA Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6 max-w-lg">
            <input
              type="text"
              placeholder="Cerca subito codice articolo nel magazzino..."
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-32 py-3.5 rounded-2xl bg-white text-slate-800 text-xs sm:text-sm font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-inox-lightBlue/40"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-inox-blue hover:bg-inox-lightBlue text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all active:scale-95"
            >
              <PackageSearch className="w-4 h-4" />
              <span>Cerca</span>
            </button>
          </form>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15">
            <div>
              <p className="font-mono font-extrabold text-xl sm:text-2xl text-emerald-400">
                {availableCount.toLocaleString('it-IT')}
              </p>
              <p className="text-[11px] text-slate-300 font-medium">Articoli in Pronta Consegna</p>
            </div>
            <div>
              <p className="font-mono font-extrabold text-xl sm:text-2xl text-white">
                {totalCount.toLocaleString('it-IT')}+
              </p>
              <p className="text-[11px] text-slate-300 font-medium">Articoli a Magazzino</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono font-extrabold text-xl sm:text-2xl text-inox-lightBlue">
                45+ Anni
              </p>
              <p className="text-[11px] text-slate-300 font-medium">Esperienza e Qualità</p>
            </div>
          </div>

        </div>
      </div>

      {/* Fast Shortcuts: Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="font-display font-bold text-lg text-inox-navy">
              Categorie Prodotti Inox
            </h2>
            <p className="text-xs text-slate-500">Seleziona una categoria per verificare le giacenze</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Tutti');
              setActiveTab('warehouse');
            }}
            className="text-xs font-bold text-inox-blue hover:text-inox-navy flex items-center space-x-1"
          >
            <span>Vedi tutti</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {productCategories.map(cat => (
            <button
              key={cat.title}
              onClick={() => handleCategoryClick(cat.filter)}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-inox-blue/50 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="font-bold text-xs sm:text-sm text-inox-navy group-hover:text-inox-blue transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-[10.5px] font-bold text-inox-blue">
                <span>Giacenze live</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Value Propositions / Why Inoxtubi */}
      <div className="bg-slate-100/80 rounded-2xl p-5 border border-slate-200">
        <h2 className="font-display font-bold text-base text-inox-navy mb-4 text-center">
          Perché Scegliere Inoxtubi Padova
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-inox-navy mb-0.5">Pronta Consegna</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ampio magazzino rifornito con spedizioni e consegne rapide in tutto il Triveneto e Italia.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-inox-sky text-inox-blue">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-inox-navy mb-0.5">Taglio a Misura</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Servizio di taglio e sezionatura tubi, barre e profilati secondo le specifiche del cliente.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-inox-navy">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-inox-navy mb-0.5">Certificazioni 3.1</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Tutti i materiali sono corredati da certificati di colata e conformità secondo norme EN/ASTM.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-inox-navy mb-0.5">Consulenza Tecnica</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Assistenza specializzata nella scelta della lega ideale (AISI 304, 316, 1.4313, Duplex).
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Contact Banner */}
      <div className="bg-inox-navy rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-base text-white">
            Hai bisogno di una quotazione personalizzata o misure speciali?
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Il nostro ufficio vendite è a tua completa disposizione a Padova.
          </p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <a
            href="tel:+390498701200"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Chiama Ora</span>
          </a>
          <button
            onClick={() => setActiveTab('contact')}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors"
          >
            Dettagli Sede
          </button>
        </div>
      </div>

    </div>
  );
};
