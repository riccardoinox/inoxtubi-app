import React, { useState, useRef } from 'react';
import { 
  Lock, 
  Unlock, 
  RefreshCw, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileSpreadsheet, 
  ExternalLink,
  ShieldCheck,
  Database,
  BarChart3,
  Layers
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { GOOGLE_DRIVE_VIEW_URL } from '../services/driveSync';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_ADMIN_PIN = 'inox2026';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { 
    articles,
    totalCount, 
    availableCount, 
    lastUpdated, 
    isLoading, 
    syncStatus, 
    syncError, 
    refreshFromDrive, 
    importCustomExcel 
  } = useInventory();

  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('inoxtubi_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === DEFAULT_ADMIN_PIN || pin.trim() === '1979' || pin.trim() === 'inoxtubi') {
      setIsAuthenticated(true);
      sessionStorage.setItem('inoxtubi_admin_auth', 'true');
      setAuthError(null);
      setPin('');
    } else {
      setAuthError('Password errata. Riprova.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('inoxtubi_admin_auth');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importCustomExcel(file);
    }
  };

  // Category statistics breakdown
  const categoryStats: Record<string, { total: number; available: number }> = {};
  articles.forEach(a => {
    if (!categoryStats[a.category]) {
      categoryStats[a.category] = { total: 0, available: 0 };
    }
    categoryStats[a.category].total += 1;
    if (a.isAvailable) categoryStats[a.category].available += 1;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-inox-navy text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-inox-blue flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg">Area Riservata Gestione Magazzino</h2>
              <p className="text-xs text-slate-300">
                Pannello privato aggiornamento giacenze e sincronizzazione Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="max-w-sm mx-auto py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-inox-navy">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800">Accesso Protetto da Password</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Inserisci la password di amministrazione per sincronizzare o caricare i file di magazzino.
                </p>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Inserisci password..."
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full px-4 py-3 text-center tracking-widest text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-inox-blue focus:ring-2 focus:ring-inox-blue/20"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs font-bold text-rose-500 mt-2">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-inox-blue hover:bg-inox-lightBlue text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
              >
                Sblocca Dashboard
              </button>
              
              <p className="text-[11px] text-slate-400">
                Password predefinita: <span className="font-mono font-bold text-slate-600">inox2026</span>
              </p>
            </form>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              
              {/* Sync Actions Box */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-inox-blue" />
                    <h3 className="font-display font-bold text-sm text-inox-navy">Sincronizzazione Dati Magazzino</h3>
                  </div>
                  <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Autenticato
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Google Drive Live Sync Button */}
                  <button
                    onClick={() => refreshFromDrive()}
                    disabled={isLoading}
                    className="p-4 bg-inox-blue hover:bg-inox-lightBlue text-white rounded-2xl shadow-sm text-left flex items-start space-x-3 transition-all active:scale-98 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <div>
                      <h4 className="font-bold text-xs">Sincronizza da Google Drive</h4>
                      <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
                        Scarica l'ultima versione del file ARTICO.XLSX da Google Drive.
                      </p>
                    </div>
                  </button>

                  {/* Upload Local Excel File */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="p-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-2xl shadow-xs text-left flex items-start space-x-3 transition-all active:scale-98"
                  >
                    <UploadCloud className="w-6 h-6 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">Carica File Excel Locale</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        Carica un file .XLSX dal tuo computer o smartphone.
                      </p>
                    </div>
                  </button>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept=".xlsx,.xls" 
                    className="hidden" 
                  />

                </div>

                {/* Status message */}
                {syncStatus === 'success' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Giacenze e articoli aggiornati con successo nel database dell'app!</span>
                  </div>
                )}
                {syncStatus === 'error' && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center space-x-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{syncError || 'Errore durante la sincronizzazione.'}</span>
                  </div>
                )}

                {/* Link to Google Drive Sheet */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
                  <span>Origine: <strong className="font-mono text-slate-700">ARTICO.XLSX</strong></span>
                  <a
                    href={GOOGLE_DRIVE_VIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inox-blue hover:text-inox-navy font-bold flex items-center space-x-1"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Apri Foglio Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

              {/* Metrics Summary */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-inox-blue" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700">
                    Riepilogo Giacenze per Categoria
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(categoryStats).map(([cat, stat]) => (
                    <div key={cat} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <strong className="text-slate-800 block truncate" title={cat}>{cat}</strong>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-emerald-600 font-bold">{stat.available} disp.</span>
                        <span className="text-slate-400 font-mono">/ {stat.total} tot</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer logout */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Ultimo aggiornamento: {lastUpdated ? new Date(lastUpdated).toLocaleString('it-IT') : 'Predefinito'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center space-x-1"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Esci da Area Riservata</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
