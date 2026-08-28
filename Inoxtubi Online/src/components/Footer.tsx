import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Truck, 
  FileCheck2, 
  Lock
} from 'lucide-react';

interface FooterProps {
  onOpenSpecs: () => void;
  onOpenCalculator: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSpecs,
  onOpenCalculator,
  onOpenAdmin,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Dal 1979 a Padova</p>
              <p className="text-slate-400 text-xs mt-0.5">Oltre 45 anni di esperienza nel settore dell'acciaio inox.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Spedizioni ai Privati</p>
              <p className="text-slate-400 text-xs mt-0.5">Consegne rapide in tutta Italia con corrieri dedicati.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Certificati EN 10204 3.1</p>
              <p className="text-slate-400 text-xs mt-0.5">Tracciabilità di colata e conformità alimentare MOCA.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Pagamenti Sicuri</p>
              <p className="text-slate-400 text-xs mt-0.5">Carta di Credito, Bonifico Bancario e PayPal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Inoxtubi Padova srl" 
                className="h-12 w-auto bg-white p-1 rounded-lg"
              />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              <strong>INOXTUBI PADOVA S.R.L.</strong> è il punto di riferimento per la fornitura online di tubi, barre, lamiere e raccorderia in acciaio inossidabile per privati, hobbisti e professionisti.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>Via Battisti, 5 - 35010 Limena (Padova) - Italia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+39049768222" className="hover:text-white font-semibold">Tel: +39 049 768222</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@inoxtubionline.com" className="hover:text-white font-semibold">info@inoxtubionline.com</a>
              </p>
              <p className="text-slate-500 font-mono">
                P.IVA: 00864410287 • REA: PD-135890
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Gamma Prodotti</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('Tubi')} className="hover:text-white transition-colors">
                  Tubi Elettrouniti (Tondi, Quadri, Rettangolari)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Tubi')} className="hover:text-white transition-colors">
                  Tubi Senza Saldatura (Seamless)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Barre')} className="hover:text-white transition-colors">
                  Barre Inox (Tonde, Piatte, Angolari)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Lamiere')} className="hover:text-white transition-colors">
                  Lamiere & Nastri Inox
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Raccorderia')} className="hover:text-white transition-colors">
                  Raccorderia, Curve & Flange
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Service */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Servizi & Guide</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCalculator} className="hover:text-white transition-colors text-blue-400 font-semibold flex items-center gap-1">
                  Calcolatore Pesi Acciaio Inox
                </button>
              </li>
              <li>
                <button onClick={onOpenSpecs} className="hover:text-white transition-colors">
                  Tolleranze & Normative UNI EN
                </button>
              </li>
              <li>
                <button onClick={onOpenSpecs} className="hover:text-white transition-colors">
                  Guida Leghe AISI 304 vs AISI 316
                </button>
              </li>
              <li>
                <button onClick={onOpenSpecs} className="hover:text-white transition-colors">
                  Certificati EN 10204 3.1 & MOCA
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Payments */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Pagamenti Accettati</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>Carta di Credito (Visa, Mastercard, Nexi), PayPal, Bonifico Bancario Anticipato.</p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold">
                  Carta di Credito
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold">
                  PayPal
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold">
                  Bonifico Bancario
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Discreet Admin Access */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} INOXTUBI PADOVA S.R.L. - Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenSpecs(); }} className="hover:text-slate-300">Note Legali & Privacy</a>
            <span>•</span>
            <button 
              onClick={onOpenAdmin}
              className="text-slate-600 hover:text-amber-400 flex items-center gap-1 transition-colors text-[11px]"
              title="Accesso riservato all'amministratore"
            >
              <Lock className="w-3 h-3" />
              <span>Area Riservata Gestione</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
