import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, InventoryDataset, QuoteItem, TabType } from '../types/inventory';
import { 
  getCachedInventory, 
  saveInventoryToCache, 
  fetchLiveStockFromDrive, 
  parseExcelBuffer,
  GOOGLE_DRIVE_VIEW_URL 
} from '../services/driveSync';

interface InventoryContextType {
  articles: Article[];
  totalCount: number;
  availableCount: number;
  lastUpdated: string | null;
  isLoading: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  syncError: string | null;
  refreshFromDrive: () => Promise<void>;
  importCustomExcel: (file: File) => Promise<void>;
  
  // Tab Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Warehouse pre-filtered search triggers
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedAlloy: string;
  setSelectedAlloy: (alloy: string) => void;
  
  // Quotes / Cart
  quoteItems: QuoteItem[];
  addToQuote: (article: Article, quantity?: number) => void;
  removeFromQuote: (articleId: string) => void;
  updateQuoteQuantity: (articleId: string, quantity: number) => void;
  clearQuote: () => void;
  isQuoteDrawerOpen: boolean;
  setIsQuoteDrawerOpen: (open: boolean) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (articleCode: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataset, setDataset] = useState<InventoryDataset>(() => getCachedInventory());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [selectedAlloy, setSelectedAlloy] = useState<string>('Tutte');

  // Quotes
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('inoxtubi_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('inoxtubi_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('inoxtubi_quote_items', JSON.stringify(quoteItems));
  }, [quoteItems]);

  useEffect(() => {
    localStorage.setItem('inoxtubi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const refreshFromDrive = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');
    setSyncError(null);
    try {
      const updated = await fetchLiveStockFromDrive();
      setDataset(updated);
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 4000);
    } catch (err: any) {
      console.error('Errore aggiornamento Google Drive:', err);
      setSyncStatus('error');
      setSyncError(err.message || 'Errore di connessione a Google Drive.');
      setTimeout(() => setSyncStatus('idle'), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const importCustomExcel = async (file: File) => {
    setIsLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const articles = parseExcelBuffer(buffer);
      const newDataset: InventoryDataset = {
        updatedAt: new Date().toISOString(),
        totalCount: articles.length,
        availableCount: articles.filter(a => a.isAvailable).length,
        sourceUrl: file.name,
        articles
      };
      setDataset(newDataset);
      saveInventoryToCache(newDataset);
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Errore import file Excel locale:', err);
      setSyncStatus('error');
      setSyncError('Impossibile leggere il file Excel: formato non valido.');
    } finally {
      setIsLoading(false);
    }
  };

  const addToQuote = (article: Article, quantity: number = 1) => {
    setQuoteItems(prev => {
      const existing = prev.find(item => item.article.id === article.id);
      if (existing) {
        return prev.map(item =>
          item.article.id === article.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { article, quantity }];
    });
    setIsQuoteDrawerOpen(true);
  };

  const removeFromQuote = (articleId: string) => {
    setQuoteItems(prev => prev.filter(item => item.article.id !== articleId));
  };

  const updateQuoteQuantity = (articleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(articleId);
      return;
    }
    setQuoteItems(prev =>
      prev.map(item =>
        item.article.id === articleId ? { ...item, quantity } : item
      )
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const toggleFavorite = (code: string) => {
    setFavorites(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        articles: dataset.articles,
        totalCount: dataset.totalCount,
        availableCount: dataset.availableCount,
        lastUpdated: dataset.updatedAt,
        isLoading,
        syncStatus,
        syncError,
        refreshFromDrive,
        importCustomExcel,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedAlloy,
        setSelectedAlloy,
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuoteQuantity,
        clearQuote,
        isQuoteDrawerOpen,
        setIsQuoteDrawerOpen,
        favorites,
        toggleFavorite
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory deve essere usato all'interno di un InventoryProvider");
  }
  return context;
};
