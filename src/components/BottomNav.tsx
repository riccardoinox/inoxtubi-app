import React from 'react';
import { Home, PackageSearch, Layers, BookOpen, PhoneCall } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { TabType } from '../types/inventory';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, availableCount } = useInventory();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { 
      id: 'warehouse', 
      label: 'Magazzino', 
      icon: PackageSearch, 
      badge: availableCount > 0 ? `${availableCount}` : undefined 
    },
    { id: 'catalog', label: 'Prodotti', icon: Layers },
    { id: 'blog', label: 'Curiosità', icon: BookOpen },
    { id: 'contact', label: 'Contatti', icon: PhoneCall },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg md:hidden">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center space-y-1 transition-all ${
                isActive 
                  ? 'text-inox-blue font-bold scale-105' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.id === 'warehouse' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-inox-blue rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
