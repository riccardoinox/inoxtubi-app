import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Navigation, 
  ShieldCheck, 
  FileText,
  ExternalLink 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-inox-navy via-slate-900 to-inox-blue rounded-3xl p-6 sm:p-8 text-white border border-inox-blue/30 shadow-xl">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-inox-lightBlue uppercase tracking-wider">
            Contatti Diretti & Uffici
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Inoxtubi Padova s.r.l.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Siamo a vostra completa disposizione per preventivi personalizzati, consulenza tecnica sulla scelta delle leghe inox e disponibilità in tempo reale.
          </p>
        </div>
      </div>

      {/* Main Grid: Info & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contact Details Column */}
        <div className="space-y-4 lg:col-span-1">
          
          {/* Sede Operativa & Magazzino */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-inox-sky text-inox-blue">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-inox-navy">Sede & Magazzino</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Via dell'Artigianato, 12<br />
                35010 Cadoneghe (PD) - Italia
              </p>
              <a
                href="https://maps.google.com/?q=Inoxtubi+Padova+Cadoneghe"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-xs font-bold text-inox-blue hover:text-inox-navy"
              >
                <Navigation className="w-3.5 h-3.5 mr-1" />
                <span>Apri in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Telefono & Ufficio Vendite */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm text-inox-navy">Ufficio Commerciale & Vendite</h3>
              <p className="text-xs text-slate-600 mt-1">
                Centralino: <strong className="font-mono text-slate-900">+39 049 768222</strong>
              </p>
              <div className="mt-3">
                <a
                  href="tel:+39049768222"
                  className="px-4 py-2 bg-inox-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chiama Ora (+39 049 768222)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Email & PEC */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-blue-50 text-inox-navy">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm text-inox-navy">Posta Elettronica</h3>
              <div className="mt-1 space-y-1 text-xs text-slate-600">
                <p>
                  Preventivi: <a href="mailto:info@inoxtubi.com" className="font-bold text-inox-blue hover:underline">info@inoxtubi.com</a>
                </p>
                <p>
                  PEC: <span className="font-mono text-slate-700">inoxtubi@legalmail.it</span>
                </p>
              </div>
            </div>
          </div>

          {/* Orari di Apertura */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-inox-navy">Orari Magazzino & Uffici</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dal Lunedì al Venerdì<br />
                <strong>08:00 - 12:00</strong> | <strong>14:00 - 18:00</strong><br />
                <span className="text-slate-400">Sabato e Domenica: Chiuso</span>
              </p>
            </div>
          </div>

        </div>

        {/* Map & Company Identity */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Interactive Google Map Embed */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs h-72 sm:h-96 relative">
            <iframe
              title="Mappa Inoxtubi Padova"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.9472392765876!2d11.8906669!3d45.4598155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477edae49c95b6c3%3A0x643bb670d588506!2sInoxtubi%20Padova%20Srl!5e0!3m2!1sit!2sit!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Dati Societari & Fiscale */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center space-x-2 mb-2 text-inox-navy font-bold">
              <Building2 className="w-4 h-4 text-inox-blue" />
              <span>Dati Societari Inoxtubi Padova S.r.l.</span>
            </div>
            <p className="leading-relaxed">
              <strong>Ragione Sociale:</strong> INOXTUBI PADOVA S.R.L. &bull; <strong>P.IVA / C.F.:</strong> 01047460281<br />
              <strong>Sede Legale e Operativa:</strong> Via dell'Artigianato 12, 35010 Cadoneghe (PD)<br />
              <strong>Capitale Sociale:</strong> € 100.000,00 i.v. &bull; <strong>R.E.A. Padova:</strong> 178550
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
