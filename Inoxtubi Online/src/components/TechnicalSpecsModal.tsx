import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Award, 
  Check, 
  Sparkles, 
  Info,
  Download,
  AlertTriangle
} from 'lucide-react';

interface TechnicalSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalSpecsModal: React.FC<TechnicalSpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'alloys' | 'finishes' | 'tolerances' | 'certificates'>('alloys');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight">
                Specifiche Tecniche & Guida ai Materiali
              </h2>
              <p className="text-xs text-slate-500">
                Normative europee UNI EN, composizioni chimiche e tolleranze dimensionali Inoxtubi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-bold overflow-x-auto">
          {[
            { id: 'alloys', label: 'Confronto Leghe (304 vs 316)' },
            { id: 'finishes', label: 'Finiture Superficiali' },
            { id: 'tolerances', label: 'Tolleranze Dimensionali EN' },
            { id: 'certificates', label: 'Certificati 3.1 & MOCA' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 text-xs sm:text-sm space-y-6">
          
          {activeTab === 'alloys' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                Guida alle Leghe di Acciaio Inossidabile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AISI 304 */}
                <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-blue-900">AISI 304 / 304L (W.Nr. 1.4301 / 1.4307)</span>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Austenitico</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    L'acciaio inossidabile più diffuso al mondo (noto storicamente come Inox 18/10). Contiene circa il 18% di Cromo e l'8-10% di Nichel. Offre un'eccellente resistenza alla corrosione atmosferica e agli agenti alimentari, ottima saldabilità e facilità di lavorazione.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-blue-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Campi di applicazione ideali:</p>
                    <p className="text-slate-600">Arredo, ringhiere interne/esterne, industria alimentare, canne fumarie, carpenteria metallica generale.</p>
                  </div>
                </div>

                {/* AISI 316 */}
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-amber-900">AISI 316 / 316L (W.Nr. 1.4401 / 1.4404)</span>
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Austenitico al Molibdeno</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Contiene l'aggiunta di <strong>Molibdeno (2-2.5%)</strong>, che conferisce una straordinaria resistenza alla corrosione per vaiolatura (pitting) e agli ioni cloruro, nebbia salina e acidi aggressivi.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-amber-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Campi di applicazione ideali:</p>
                    <p className="text-slate-600">Settore nautico e marino, ambienti con piscina/cloro, industria chimica, farmaceutica e petrolchimica.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finishes' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                Finiture Superficiali Disponibili
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-900 text-sm">Satinato Scotch-Brite (con film PVC)</span>
                  <p className="text-xs text-slate-600">
                    Finitura satinata uniforme a grana fine con protezione superficiale tramite film pelabile laser o standard per evitare graffi durante il montaggio.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-900 text-sm">Grezzo / Industriale (Spazzolato)</span>
                  <p className="text-xs text-slate-600">
                    Finitura standard da officina, lavato e spazzolato da polveri di saldatura. Può presentare lievi segni di movimentazione industriale.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-900 text-sm">Lucido a Specchio (Mirror Grit 600)</span>
                  <p className="text-xs text-slate-600">
                    Lucidatura meccanica ultra brillante a specchio, ideale per ringhiere e complementi d'arredo estetici e nautica di lusso.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-900 text-sm">Decapato (Senza Saldatura)</span>
                  <p className="text-xs text-slate-600">
                    Trattamento chimico di decapaggio e passivazione che ripristina lo strato passivo naturale di ossido di cromo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tolerances' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                Tolleranze Dimensionali di Fabbricazione
              </h3>
              <p className="text-slate-600 text-xs">
                Tutti gli articoli in acciaio inossidabile forniti da Inoxtubi Padova rispettano le norme europee vigenti:
              </p>
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Normativa</th>
                      <th className="p-3">Tipologia Materiale</th>
                      <th className="p-3">Tolleranze Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-700">EN 10217-7</td>
                      <td className="p-3">Tubi tondi elettrouniti per pressione</td>
                      <td className="p-3 text-slate-600">Diametro ±0.75% o ±0.3mm; Spessore ±10%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-700">EN 10296-2</td>
                      <td className="p-3">Tubi quadri e rettangolari per usi meccanici</td>
                      <td className="p-3 text-slate-600">Lato ±1% o ±0.5mm; Spessore ±10%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-700">EN 10088-3</td>
                      <td className="p-3">Barre tonde e piatte laminate/trafilate</td>
                      <td className="p-3 text-slate-600">Classe h9 per trafilati, k11 per pelati</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-700">ASTM A312</td>
                      <td className="p-3">Tubi tondi senza saldatura (Seamless)</td>
                      <td className="p-3 text-slate-600">Conformi alle tabelle dimensionali ANSI B36.19</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900">
                Certificazioni di Qualità & Tracciabilità
              </h3>
              
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">Certificato di Collaudo EN 10204 3.1</h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      Attesta l'analisi chimica esatta di colata (Carbonio, Cromo, Nichel, Molibdeno) e le prove meccaniche (snervamento, trazione, allungamento). Fornito gratuitamente su richiesta in fase d'ordine.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
                  <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Idoneità al Contatto Alimentare MOCA</h4>
                    <p className="text-xs text-blue-800 mt-1">
                      Conforme al Regolamento CE 1935/2004 e D.M. 21/03/1973 per materiali a contatto con alimenti e liquidi per uso umano.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
          >
            Chiudi
          </button>
        </div>

      </div>
    </div>
  );
};
