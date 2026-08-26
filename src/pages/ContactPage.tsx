import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  ExternalLink, 
  Building2,
  CheckCircle2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:info@inoxtubi.com?subject=Richiesta Contatto App - ${encodeURIComponent(name)}&body=${encodeURIComponent(
      `Nome: ${name}\nTelefono: ${phone}\nEmail: ${email}\n\nMessaggio:\n${message}`
    )}`;
    window.location.href = mailto;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Inoxtubi+Padova', '_blank');
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-inox-navy rounded-2xl p-6 text-white border border-inox-blue/30 shadow-lg">
        <span className="text-xs font-bold text-inox-lightBlue uppercase tracking-wider">Contatti & Dove Siamo</span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
          Sede Inoxtubi Padova
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Siamo a tua disposizione per preventivi, consulenze tecniche sui materiali inox e ricezione ordini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Contact Info Cards */}
        <div className="space-y-3">
          
          {/* Sede e Indirizzo */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-inox-sky text-inox-blue">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm text-inox-navy">Sede Operativa & Magazzino</h3>
              <p className="text-xs text-slate-600 mt-1">
                Via Prima Strada, 35<br />
                35129 Padova (PD) &bull; Zona Industriale
              </p>
              <button
                onClick={openGoogleMaps}
                className="mt-2 text-xs font-bold text-inox-blue hover:text-inox-navy flex items-center space-x-1"
              >
                <span>Apri in Google Maps / Apple Maps</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>

          {/* Telefono & WhatsApp */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm text-inox-navy">Telefono & Ufficio Vendite</h3>
              <p className="text-xs text-slate-600 mt-1">
                Centralino: <strong>+39 049 870 1200</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href="tel:+390498701200"
                  className="px-3 py-1.5 bg-inox-navy hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chiama</span>
                </a>
                <a
                  href="https://wa.me/390498701200?text=Salve%20Inoxtubi,%20vorrei%20informazioni%20su..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
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
              <h3 className="font-display font-bold text-sm text-inox-navy">Email & Posta Certificata</h3>
              <p className="text-xs text-slate-600 mt-1">
                Email: <a href="mailto:info@inoxtubi.com" className="text-inox-blue font-bold">info@inoxtubi.com</a><br />
                PEC: <span className="font-mono text-slate-700">inoxtubisrl@pec.it</span>
              </p>
            </div>
          </div>

          {/* Orari */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-inox-navy">Orari Apertura Magazzino</h3>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Lunedì &ndash; Venerdì:</strong> 08:00 - 12:30 / 14:00 - 18:00<br />
                <span className="text-slate-400">Sabato e Domenica: Chiuso</span>
              </p>
            </div>
          </div>

        </div>

        {/* Direct Contact Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-display font-bold text-lg text-inox-navy mb-1">
            Invia un Messaggio Diretto
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Compila il modulo per richiedere informazioni o un preventivo personalizzato.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome e Cognome / Azienda *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="es. Mario Rossi (Officina Meccanica Srl)"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-inox-blue"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nome@azienda.it"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-inox-blue"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefono</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="es. 340 1234567"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-inox-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Messaggio / Materiali Richiesti *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Descrivi i materiali inox di cui hai bisogno (leghe, dimensioni, quantità, tagli a misura)..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-inox-blue resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-inox-blue hover:bg-inox-lightBlue text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Invia Richiesta</span>
            </button>

            {isSent && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Client email aperto con la richiesta precompilata!</span>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
};
