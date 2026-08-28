import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WeightCalculatorModal } from './components/WeightCalculatorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogManagerModal } from './components/CatalogManagerModal';
import { TechnicalSpecsModal } from './components/TechnicalSpecsModal';
import { QuickFilters } from './components/QuickFilters';
import { Footer } from './components/Footer';
import { PRODUCTS_CATALOG } from './data/products';
import type { Product, CartItem, FilterState, TubeCutOption } from './types';
import { 
  PackageSearch, 
  Scissors, 
  Mail
} from 'lucide-react';

export function App() {
  // State: Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('inoxtubi_catalog_override');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return PRODUCTS_CATALOG;
  });

  // State: Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('inoxtubi_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('inoxtubi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // State: Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  // State: Filters
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    subcategory: '',
    shape: '',
    alloy: '',
    finish: '',
    stockFilter: 'all',
    sortBy: 'featured'
  });

  // Keyboard shortcut for owner: Ctrl + Shift + A opens Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Available subcategories and alloys
  const availableSubcategories = useMemo(() => {
    const subset = filters.category === 'all'
      ? products
      : products.filter(p => p.category === filters.category);
    const subcats = Array.from(new Set(subset.map(p => p.subcategory).filter(Boolean)));
    return subcats.sort();
  }, [products, filters.category]);

  const availableAlloys = useMemo(() => {
    const subset = filters.category === 'all'
      ? products
      : products.filter(p => p.category === filters.category);
    const alloys = Array.from(new Set(subset.map(p => p.alloy)));
    return alloys.sort();
  }, [products, filters.category]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Search text match
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchSku = p.sku.toLowerCase().includes(query);
        const matchAlloy = p.alloy.toLowerCase().includes(query);
        const matchSubcat = p.subcategory.toLowerCase().includes(query);
        const matchShape = p.shape.toLowerCase().includes(query);
        if (!matchTitle && !matchSku && !matchAlloy && !matchSubcat && !matchShape) {
          return false;
        }
      }

      // 2. Strict Category match
      if (filters.category !== 'all') {
        if (p.category !== filters.category) return false;
      }

      // 3. Strict Subcategory match
      if (filters.subcategory) {
        if (p.subcategory !== filters.subcategory) return false;
      }

      // 4. Shape match
      if (filters.shape && p.shape !== filters.shape) return false;

      // 5. Alloy match
      if (filters.alloy && p.alloy !== filters.alloy) return false;

      // 6. Stock filter
      if (filters.stockFilter === 'in_stock_only' && (p.stock_status === 'out_of_stock' || p.price_gross <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price_gross - b.price_gross;
      if (filters.sortBy === 'price_desc') return b.price_gross - a.price_gross;
      if (filters.sortBy === 'name_asc') return a.title.localeCompare(b.title);
      if (filters.sortBy === 'weight_asc') return a.weight_kg_per_unit - b.weight_kg_per_unit;
      return 0; // featured
    });
  }, [products, filters]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, cutOption?: TubeCutOption) => {
    const cutId = cutOption ? `-${cutOption}` : '';
    const itemId = `${product.id}${cutId}`;

    const baseUnitGross = product.price_gross;

    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map(i => i.id === itemId ? {
          ...i,
          quantity: newQty,
          totalPriceGross: Number((baseUnitGross * newQty).toFixed(2))
        } : i);
      } else {
        return [...prev, {
          id: itemId,
          product,
          quantity,
          cutOption,
          calculatedWeightKg: product.weight_kg_per_unit,
          unitPriceGross: baseUnitGross,
          totalPriceGross: Number((baseUnitGross * quantity).toFixed(2))
        }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => {
      if (i.id === itemId) {
        return {
          ...i,
          quantity: qty,
          totalPriceGross: Number((i.unitPriceGross * qty).toFixed(2))
        };
      }
      return i;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCatalogUpdate = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('inoxtubi_catalog_override', JSON.stringify(updated));
  };

  // Cart summary metrics
  const cartItemCount = cartItems.reduce((acc, itm) => acc + itm.quantity, 0);
  const totalCartWeight = cartItems.reduce((acc, itm) => acc + (itm.calculatedWeightKg * itm.quantity), 0);
  const cartTotalGross = cartItems.reduce((acc, itm) => acc + itm.totalPriceGross, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        cartItemCount={cartItemCount}
        totalCartWeight={totalCartWeight}
        cartTotalGross={cartTotalGross}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={filters.searchQuery}
        setSearchQuery={(q) => setFilters(f => ({ ...f, searchQuery: q }))}
        selectedCategory={filters.category}
        setSelectedCategory={(cat) => setFilters(f => ({ ...f, category: cat, subcategory: '' }))}
        selectedSubcategory={filters.subcategory}
        setSelectedSubcategory={(subcat) => setFilters(f => ({ ...f, subcategory: subcat }))}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
        allProducts={products}
      />

      {/* 2. Hero Section with Brand and Exact Subcategory Search */}
      <Hero
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onSelectCategory={(cat, subcat) => {
          setFilters(f => ({ 
            ...f, 
            category: cat, 
            subcategory: subcat || '', 
            searchQuery: '' 
          }));
          const catalogSection = document.getElementById('catalog-section');
          if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' });
        }}
        onDimensionSearch={(shape, dim) => {
          setFilters(f => ({
            ...f,
            category: 'all',
            subcategory: '',
            shape: shape,
            searchQuery: dim
          }));
          const catalogSection = document.getElementById('catalog-section');
          if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Faceted Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
            <QuickFilters
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters({
                searchQuery: '',
                category: 'all',
                subcategory: '',
                shape: '',
                alloy: '',
                finish: '',
                stockFilter: 'all',
                sortBy: 'featured'
              })}
              availableSubcategories={availableSubcategories}
              availableAlloys={availableAlloys}
              totalResultsCount={filteredProducts.length}
            />

            {/* Assistance Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Scissors className="w-4 h-4" />
                <span>Hai misure speciali?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Le barre vengono fornite in pezzi da 3mt o 2mt (minimo vendita 6mt). Per quantitativi elevati o capitolati, contatta il nostro ufficio.
              </p>
              <a
                href="mailto:info@inoxtubionline.com"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@inoxtubionline.com</span>
              </a>
            </div>
          </aside>

          {/* Right Column: Product Cards Grid */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Active Filters Bar and Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-800">
                  {filteredProducts.length} articoli a catalogo
                </span>

                {filters.category !== 'all' && (
                  <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    {filters.category}
                  </span>
                )}
                {filters.subcategory && (
                  <span className="text-xs bg-blue-600 text-white font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    {filters.subcategory}
                  </span>
                )}
                {filters.alloy && (
                  <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    Lega: {filters.alloy}
                  </span>
                )}
                {filters.searchQuery && (
                  <span className="text-xs bg-slate-200 text-slate-900 font-semibold px-2.5 py-1 rounded-lg">
                    "{filters.searchQuery}"
                  </span>
                )}
              </div>

              {/* Price Indicator Note */}
              <div className="text-xs font-semibold text-slate-600">
                Prezzi trasparenti con <strong className="text-slate-900 font-bold">IVA 22% inclusa</strong>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <PackageSearch className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Nessun articolo trovato</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Nessun prodotto corrisponde ai criteri cercati. Prova a reimpostare i filtri per visualizzare l'intera gamma.
                </p>
                <button
                  onClick={() => setFilters({
                    searchQuery: '',
                    category: 'all',
                    subcategory: '',
                    shape: '',
                    alloy: '',
                    finish: '',
                    stockFilter: 'all',
                    sortBy: 'featured'
                  })}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Mostra Tutto il Catalogo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetail={(p) => {
                      setSelectedProduct(p);
                      setIsDetailModalOpen(true);
                    }}
                    onAddToCart={(p, qty) => handleAddToCart(p, qty, '3m_plus_3m')}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      {/* 4. Global Modals and Drawers */}

      {/* Product Details & Cut Configurator Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onOpenSpecs={() => {
          setIsDetailModalOpen(false);
          setIsSpecsOpen(true);
        }}
      />

      {/* Interactive Metal Weight & Cut Calculator Modal */}
      <WeightCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        isB2B={false}
        allProducts={products}
        onSelectMatchingProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          handleClearCart();
        }}
      />

      {/* PIN-Protected Private Admin Catalog & ERP Manager */}
      <CatalogManagerModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleCatalogUpdate}
      />

      {/* Technical Specs & Normative Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* 5. Footer with Private Admin Link */}
      <Footer
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(cat) => {
          setFilters(f => ({ ...f, category: cat, subcategory: '', searchQuery: '' }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
export default App;
