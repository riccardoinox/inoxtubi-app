import React from 'react';
import { BookOpen, ExternalLink, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const articles = [
    {
      title: 'Acciaio Inox al Limite della Norma: Come Gestire le Tolleranze nei Progetti Industriali',
      date: 'Approfondimento Tecnico',
      tag: 'Tolleranze & Normative',
      desc: 'Come interpretare e gestire correttamente le tolleranze dimensionali secondo gli standard ISO 1127 ed EN 10029 per tubi, lamiere e profilati inox nei progetti di ingegneria meccanica.',
      url: 'https://inoxtubi.com/tolleranze-acciaio-inox-iso-1127-en-10029/'
    },
    {
      title: 'Acciaio, arriva lo scudo Ue: cosa cambia dal 1° luglio 2026',
      date: 'Attualità & Mercato',
      tag: 'Mercato Acciaio',
      desc: 'Cosa prevede la nuova misura di salvaguardia europea sulle importazioni di acciaio inossidabile e come cambiano le disponibilità e i prezzi per le aziende italiane.',
      url: 'https://inoxtubi.com/scudo-ue-acciaio-dazi-50-2026/'
    },
    {
      title: 'Guida alle Finiture Superficiali dell\'Acciaio Inox: 2B, BA, Satinato e Scotch-Brite',
      date: 'Guida Tecnica',
      tag: 'Finiture & Trattamenti',
      desc: 'Differenze estetiche, rugosità superficiale (Ra) e resistenza alla corrosione delle diverse finiture inox applicate su lamiere e tubolari.',
      url: 'https://inoxtubi.com/finiture/'
    },
    {
      title: 'Conoscere l\'Acciaio Inox: Differenze tra AISI 304, AISI 316 e Gradi Speciali',
      date: 'Guida ai Materiali',
      tag: 'Leghe Inox',
      desc: 'Composizione chimica, ruolo del cromo e del molibdeno, resistenza al pitting e criteri di selezione della lega più adatta per ogni ambiente.',
      url: 'https://inoxtubi.com/conoscere-lacciaio-inox/'
    }
  ];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-inox-navy via-slate-900 to-inox-blue rounded-3xl p-6 sm:p-8 text-white border border-inox-blue/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-inox-sky mb-3">
            <Sparkles className="w-3.5 h-3.5 text-inox-lightBlue" />
            <span>Blog Inoxtubi Padova</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Curiosità Inossidabili
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Approfondimenti tecnici, novità normative, guide alla scelta delle leghe e aggiornamenti sul mondo dell'acciaio inossidabile a cura degli esperti di Inoxtubi.
          </p>
        </div>

        <a
          href="https://inoxtubi.com/curiosita-inossidabili/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-inox-blue hover:bg-inox-lightBlue text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-lg transition-all active:scale-95 flex-shrink-0"
        >
          <span>Visita il Blog su Inoxtubi.com</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map(art => (
          <div
            key={art.title}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-inox-blue/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-inox-sky text-inox-navy">
                  {art.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {art.date}
                </span>
              </div>

              <h2 className="font-display font-bold text-base sm:text-lg text-inox-navy mb-2 leading-snug">
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {art.desc}
              </p>
            </div>

            <a
              href={art.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-inox-blue hover:text-white text-inox-navy font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Leggi l'articolo completo sul sito</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      {/* Official Website Banner */}
      <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-display font-bold text-sm text-inox-navy">
            Vuoi esplorare l'intero archivio di articoli e schede tecniche?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sul sito ufficiale trovi guide approfondite, schede dei materiali e approfondimenti normativi.
          </p>
        </div>
        <a
          href="https://inoxtubi.com/curiosita-inossidabili/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-inox-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition-colors flex-shrink-0"
        >
          <span>Apri inoxtubi.com/curiosita-inossidabili</span>
          <ExternalLink className="w-3.5 h-3.5 text-inox-lightBlue" />
        </a>
      </div>

    </div>
  );
};
