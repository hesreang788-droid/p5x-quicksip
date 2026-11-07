import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StarterSetsShowcase } from './components/StarterSetsShowcase';
import { BorisSupportBanner } from './components/BorisSupportBanner';
import { StarterSetHeroPromo } from './components/StarterSetHeroPromo';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyHolyComparison } from './components/WhyHolyComparison';
import { IngredientsDeepDive } from './components/IngredientsDeepDive';
import { SquadReviews } from './components/SquadReviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FlavorQuizModal } from './components/FlavorQuizModal';
import { BundleBuilderModal } from './components/BundleBuilderModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Persona5MenuOverlay } from './components/Persona5MenuOverlay';
import { CurrencyProvider } from './context/CurrencyContext';
import { Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

function QuickSipApp() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers state (Starts with Persona 5 menu intro first)
  const [isP5MenuOpen, setIsP5MenuOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBundleBuilderOpen, setIsBundleBuilderOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Global hotkey 'M' to trigger Persona 5 menu
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsP5MenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state initialized from local storage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('holy_uk_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default starter pack in cart for exciting first-load feel
    const starter = PRODUCTS.find(p => p.id === 'starter-set-energy');
    return starter ? [{
      cartItemId: 'init-starter',
      product: starter,
      quantity: 1,
      selectedShakerColor: 'Toxic Lime'
    }] : [];
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('holy_uk_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, shakerColor?: string) => {
    const existingIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.selectedShakerColor === shakerColor
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        selectedShakerColor: shakerColor || (product.isStarterSet ? 'Toxic Lime' : undefined)
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (bundleProduct: Product, selectedTubs: Product[], shakerColor: string) => {
    const newItem: CartItem = {
      cartItemId: `custom-bundle-${Date.now()}`,
      product: bundleProduct,
      quantity: 1,
      selectedShakerColor: shakerColor,
      selectedBundleTubs: selectedTubs
    };

    setCartItems([...cartItems, newItem]);
    showToast(`Added Custom 3-Tub Bundle with Free ${shakerColor} Shaker!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleOpenStarterPack = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      setSelectedProductForDetail(product);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const starterSets = PRODUCTS.filter(p => p.isStarterSet);
  const upsellShaker = PRODUCTS.find(p => p.id === 'shaker-toxic-lime');

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex flex-col font-sans selection:bg-[#ffe600] selection:text-black bg-p5-dots relative overflow-x-hidden">
      
      {/* Toast Notification with Persona 5 comic pop */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, skewX: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, skewX: -8 }}
            exit={{ opacity: 0, y: 12, scale: 0.9, skewX: -8 }}
            transition={{ type: 'spring', damping: 22, stiffness: 400 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0055ff] text-white border-2 border-black font-black text-xs px-5 py-3 rounded-xl shadow-p5 flex items-center gap-2.5"
          >
            <span className="w-5 h-5 rounded bg-[#10b981] text-black border border-black flex items-center justify-center font-black">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="tracking-tight uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const shopElem = document.getElementById('shop-catalog-section');
          if (shopElem) {
            shopElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenPersona5Menu={() => setIsP5MenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const shopElem = document.getElementById('shop-catalog-section');
            if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStarterPack={handleOpenStarterPack}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 4 Starter Sets Grid (Deluxe, Syrup, Energy, Iced Tea) - Image 1 */}
        <StarterSetsShowcase
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProductForDetail(p)}
        />

        {/* Interactive Starter Set Customizer */}
        <StarterSetHeroPromo
          starterProducts={starterSets}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProductForDetail(p)}
        />

        {/* Product Catalog with Categories & Filtering */}
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProductForDetail(p)}
          searchQuery={searchQuery}
        />

        {/* Why HOLY Comparison Table vs Canned Drinks */}
        <WhyHolyComparison />

        {/* Ingredients & Science Transparency Breakdown */}
        <IngredientsDeepDive />

        {/* Sambath Support Banner */}
        <BorisSupportBanner />

        {/* Community Crew & Join the Squad */}
        <SquadReviews />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={(disc, code) => {
          setCheckoutDiscount(disc);
          setCheckoutPromoCode(code);
          setIsCheckoutOpen(true);
        }}
        onAddUpsell={handleAddToCart}
        upsellProduct={upsellShaker}
      />

      {/* Flavor Quiz Modal */}
      <FlavorQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProductForDetail(p)}
      />

      {/* 3-Tub Mix & Match Custom Bundle Builder Modal */}
      <BundleBuilderModal
        isOpen={isBundleBuilderOpen}
        onClose={() => setIsBundleBuilderOpen(false)}
        allProducts={PRODUCTS}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Product Quick View & Ingredients Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cambodia Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onClearCart={() => setCartItems([])}
      />

      {/* Full-Screen Persona 5 Animated Menu Overlay */}
      <Persona5MenuOverlay
        isOpen={isP5MenuOpen}
        onClose={() => setIsP5MenuOpen(false)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const shopElem = document.getElementById('shop-catalog-section');
          if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCollab={() => {
          const collabElem = document.getElementById('hero-collab-section');
          if (collabElem) collabElem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSupport={() => {
          document.getElementById('get-in-touch-sambath-btn')?.click();
        }}
        cartCount={cartCount}
      />

    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <QuickSipApp />
    </CurrencyProvider>
  );
}
