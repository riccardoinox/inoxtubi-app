import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Layers, 
  FileCheck2, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const CompanyPage: React.FC = () => {
  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-inox-navy to-slate-900 rounded-2xl p-6 text-white border border-inox-blue/30 shadow-lg">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-inox-lightBlue uppercase tracking-wider">La Nostra Storia</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Inoxtubi Padova: Specialisti Inox dal 1979
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Fondata nel 1979 a Padova, Inoxtubi è cresciuta fino a diventare uno dei punti di riferimento nel Nord-Est Italia per la distribuzione e commercializzazione di prodotti semilavorati in acciaio inossidabile.
          </p>
        </div>
      </div>

      {/* Key Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-inox-sky text-inox-blue flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-inox-navy mb-1">
            Magazzino di 5.000+ mq a Padova
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sede strategica nella zona industriale di Padova con oltre 4.700 articoli pronti a magazzino e carico/scarico rapido.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-inox-navy mb-1">
            Tracciabilità & Certificati 3.1
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ogni barra, tubo o lamiera è corredato da certificato di analisi chimica e meccanica del produttore originario.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-inox-navy mb-1">
            Servizi di Taglio & Finiture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Macchinari all'avanguardia per taglio a misura, satinatura, lucidatura e applicazione di film protettivo laser.
          </p>
        </div>
      </div>

      {/* Technical Guide: Conoscere l'Acciaio Inox */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-200">
          <BookOpen className="w-5 h-5 text-inox-blue" />
          <h2 className="font-display font-bold text-lg text-inox-navy">
            Guida Tecnica: Conoscere le Leghe Inox
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-inox-navy">AISI 304 / 304L (1.4301 / 1.4307)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-inox-navy text-white rounded">Austenitico</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              È l'acciaio inossidabile più diffuso. Contiene ~18% di Cromo e ~8% di Nichel. Offre eccellente resistenza alla corrosione atmosferica e ottima saldabilità.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Impieghi: arredamento, industria alimentare, architettura, carpenteria.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-inox-navy">AISI 316 / 316L (1.4401 / 1.4404)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-inox-blue text-white rounded">Con Molibdeno</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Con l'aggiunta di un 2-3% di Molibdeno, garantisce una resistenza superiore alla corrosione per vaiolatura (pitting) e agli ambienti salini/cloruri.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Impieghi: settore nautico, chimico, farmaceutico, impianti petrolchimici.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Surface Finishes Guide */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-display font-bold text-sm text-inox-navy mb-2">
            Principali Finiture Superficiali
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <strong className="text-inox-navy block">2B</strong>
              <span>Laminato a freddo decapato, aspetto opaco liscio.</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <strong className="text-inox-navy block">BA (Bright Annealed)</strong>
              <span>Ricotto a specchio in atmosfera controllata.</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <strong className="text-inox-navy block">Satinato (Grana 240/320)</strong>
              <span>Spazzolatura fine lineare protetta da film laser.</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <strong className="text-inox-navy block">Scotch-Brite</strong>
              <span>Satinatura morbida satin-finish non direzionale.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
