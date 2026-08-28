import React from 'react';
import { Download, FileText, ChevronRight, Check, PackageSearch, ExternalLink } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const ProductsPage: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useInventory();

  const handleWarehouseSearch = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('warehouse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productsList = [
    {
      title: 'Tubi Tondi in Acciaio Inox',
      category: 'Tubi Tondi',
      standard: 'EN 10217-7 / EN 10216-5 / ASTM A312',
      alloys: ['AISI 304 / 304L (1.4301 / 1.4307)', 'AISI 316 / 316L (1.4401 / 1.4404)'],
      description: 'Tubi tondi saldati laser / TIG / HF e tubi senza saldatura (trafilati a freddo). Idonei per condotte industriali, chimiche, alimentari e arredamento.',
      finishes: ['Grecato', 'Spazzolato', 'Satinato Grana 240/320', 'Lucido a Specchio BA'],
      dimensions: 'Diametri da 6 mm a oltre 508 mm, spessori da 1 mm a 12 mm.'
    },
    {
      title: 'Tubi Quadri e Rettangolari',
      category: 'Tubi Quadri / Rett.',
      standard: 'EN 10296-2 / EN 10088',
      alloys: ['AISI 304 / 304L', 'AISI 316 / 316L'],
      description: 'Scatolati e profilati quadri e rettangolari con saldatura longitudinale HF/TIG, ideali per carpenteria metallica, strutture portanti, serramenti e design.',
      finishes: ['Grezzo', 'Satinato Grana 240/320', 'Scotch-Brite', 'Lucidato'],
      dimensions: 'Quadri da 10x10 a 200x200 mm, Rettangolari da 20x10 a 200x100 mm.'
    },
    {
      title: 'Barre Tonde Inox',
      category: 'Barre Tonde',
      standard: 'EN 10088-3 / EN 10272 / ASTM A276',
      alloys: ['AISI 304 / 304L', 'AISI 303 (facile lavorabilità)', 'AISI 316L', '1.4313 martensitico'],
      description: 'Barre piene trafilate a freddo (tolleranza h9/h11) o pelate/rullate (tolleranza k12/h11) per lavorazioni meccaniche di precisione ad asportazione truciolo.',
      finishes: ['Trafilato h9', 'Pelato rullato k12/h11', 'Rettificato h8/h7'],
      dimensions: 'Diametri da 3 mm a oltre 350 mm.'
    },
    {
      title: 'Barre Forate in Acciaio Inox',
      category: 'Barre Forate',
      standard: 'EN 10294-2 / EN 10216-5',
      alloys: ['AISI 304 / 304L', 'AISI 316 / 316L', '1.4404'],
      description: 'Barre forate a forte spessore e tubi meccanici per tornitura e produzione di boccole, raccordi, distanziali e componenti idraulici/meccanici.',
      finishes: ['Grezzo di laminazione/estrusione', 'Pelato'],
      dimensions: 'Diametri esterni da 32 a oltre 250 mm con svariate forature interne.'
    },
    {
      title: 'Barre Quadre ed Esagonali',
      category: 'Barre Quadre',
      standard: 'EN 10088-3 / DIN 1014 / DIN 1015',
      alloys: ['AISI 303', 'AISI 304', 'AISI 316L'],
      description: 'Barre a sezione quadra ed esagonale trafilate a freddo (h11) per bulloneria, raccorderia e lavorazioni meccaniche su tornio automatico.',
      finishes: ['Trafilato h11', 'Laminato'],
      dimensions: 'Quadre da 4x4 a 100x100 mm; Esagonali da CH 6 a CH 80 mm.'
    },
    {
      title: 'Piatti Inox (Cesoiati, Trafilati, Laminati)',
      category: 'Piatti',
      standard: 'EN 10088-3 / EN 10058 / DIN 1017',
      alloys: ['AISI 304 / 304L', 'AISI 316L'],
      description: 'Piatti ricavati da lamiera cesoiata o trafilati a freddo con spigoli vivi, per carpenteria, flange, staffe e strutture.',
      finishes: ['Cesoiato da lamiera', 'Trafilato a freddo', 'Laminato a caldo decapato'],
      dimensions: 'Larghezze da 10 a 150 mm, spessori da 3 a 25 mm.'
    },
    {
      title: 'Lamiere in Acciaio Inox',
      category: 'Lamiere',
      standard: 'EN 10088-2 / EN 10028-7 / ISO 1127',
      alloys: ['AISI 304 / 304L', 'AISI 316 / 316L', 'AISI 430'],
      description: 'Lamiere inox laminate a freddo (finitura 2B o BA) e a caldo (finitura 1D). Disponibili con film protettivo laserabile 1 o 2 lati.',
      finishes: ['2B (opaco liscio)', 'BA (lucido a specchio)', 'Satinata', 'Mandorlata / Bugnata'],
      dimensions: 'Formati standard 1000x2000, 1250x2500, 1500x3000 mm, spessori da 0.5 a 30 mm.'
    },
    {
      title: 'Angolari e Profili Inox',
      category: 'Angolari e Profili',
      standard: 'EN 10088-3 / DIN 1028',
      alloys: ['AISI 304', 'AISI 316L'],
      description: 'Profili angolari a lati uguali laminati a caldo o ricavati da lamiera cesoiata/piegata, e profili a U / T per carpenteria e serramenti.',
      finishes: ['Laminato a caldo decapato', 'Da lamiera piegata'],
      dimensions: 'Angolari da 20x20x3 a 100x100x10 mm.'
    },
    {
      title: 'Raccorderia e Flange Inox',
      category: 'Raccorderia / Accessori',
      standard: 'ISO 4144 / EN 1092-1 / ANSI B16.5',
      alloys: ['AISI 304 / 304L', 'AISI 316 / 316L'],
      description: 'Raccordi filettati gas, raccordi a saldare (curve 90°/45°, riduzioni concentriche ed eccentriche, tee), flange piane, a collarino e cieche.',
      finishes: ['Decapato', 'Lucido'],
      dimensions: 'Filettati da 1/8" a 4"; Raccordi a saldare da DN 15 a DN 400.'
    }
  ];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Top Banner with Catalog Download */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-inox-blue uppercase tracking-wider">Gamma Prodotti Inox</span>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-inox-navy mt-1">
            Catalogo Tecnico & Specifiche Materiali
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Tutti i prodotti commercializzati da Inoxtubi Padova rispettano le più severe normative europee ed internazionali di qualità, tolleranza e resistenza alla corrosione.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://inoxtubi.com/wp-content/uploads/2025/09/INOX-TUBI-catalogo-tecnico.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-inox-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-inox-lightBlue" />
            <span>Scarica Catalogo PDF</span>
          </a>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsList.map(prod => (
          <div 
            key={prod.title}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-inox-blue/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-display font-bold text-base text-inox-navy">
                  {prod.title}
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {prod.standard}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {prod.description}
              </p>

              {/* Alloys tags */}
              <div className="mb-3 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Leghe disponibili:</span>
                <div className="flex flex-wrap gap-1.5">
                  {prod.alloys.map(al => (
                    <span key={al} className="text-[11px] font-medium px-2 py-0.5 bg-inox-sky text-inox-navy rounded-md">
                      {al}
                    </span>
                  ))}
                </div>
              </div>

              {/* Finishes & Dimensions */}
              <div className="grid grid-cols-1 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 mb-4">
                <div>
                  <span className="font-bold text-slate-700 block">Finiture:</span>
                  <span className="text-slate-500">{prod.finishes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">Dimensioni:</span>
                  <span className="text-slate-500">{prod.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Warehouse live button */}
            <button
              onClick={() => handleWarehouseSearch(prod.category)}
              className="w-full py-2.5 px-3 bg-inox-blue hover:bg-inox-lightBlue text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all active:scale-98"
            >
              <PackageSearch className="w-4 h-4" />
              <span>Controlla Giacenze a Magazzino</span>
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};
