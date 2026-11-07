import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, ChevronDown, User, Sparkles, X, Zap, Droplets, Coffee, Gift, HelpCircle, Flame, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCategory } from '../types';
import { HolyLogo } from './HolyLogo';
import { useCurrency } from '../context/CurrencyContext';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenBundleBuilder: () => void;
  onOpenPersona5Menu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenQuiz,
  onOpenBundleBuilder,
  onOpenPersona5Menu,
  searchQuery,
  onSearchChange,
}) => {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (menuKey: string, categoryTarget?: ProductCategory) => {
    if (activeDropdown === menuKey) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuKey);
    }
    if (categoryTarget) {
      onSelectCategory(categoryTarget);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all bg-[#0b0d14]/95 backdrop-blur-md border-b-2 border-black shadow-p5-sm text-white" ref={dropdownRef}>
      
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => {
              onSelectCategory('all');
              setActiveDropdown(null);
            }}
            className="flex items-center focus:outline-none group cursor-pointer"
          >
            <HolyLogo size="md" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-black uppercase tracking-wider">
            
            {/* Newcomers */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('newcomers', 'starter-sets')}
                onMouseEnter={() => setActiveDropdown('newcomers')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'newcomers' || activeCategory === 'starter-sets'
                    ? 'bg-[#0055ff] text-white shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-[#ffe600] hover:text-black text-white'
                }`}
              >
                <span>Newcomers</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'newcomers' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Powder */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('powder', 'energy')}
                onMouseEnter={() => setActiveDropdown('powder')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'powder' || activeCategory === 'energy' || activeCategory === 'iced-tea' || activeCategory === 'hydration'
                    ? 'bg-[#10b981] text-black shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-[#ffe600] hover:text-black text-white'
                }`}
              >
                <span>Powder</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'powder' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Syrup */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('syrup', 'syrup')}
                onMouseEnter={() => setActiveDropdown('syrup')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'syrup' || activeCategory === 'syrup'
                    ? 'bg-[#ffe600] text-black shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-[#ffe600] hover:text-black text-white'
                }`}
              >
                <span>Syrup</span>
                <span className="bg-[#10b981] text-black text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider border border-black">NEW</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'syrup' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mix & Match */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('bundles', 'bundles')}
                onMouseEnter={() => setActiveDropdown('bundles')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'bundles' || activeCategory === 'bundles'
                    ? 'bg-[#0055ff] text-white shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-[#ffe600] hover:text-black text-white'
                }`}
              >
                <span>Mix & Match</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'bundles' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Shop All */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('shop-all', 'all')}
                onMouseEnter={() => setActiveDropdown('shop-all')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'shop-all' || activeCategory === 'all'
                    ? 'bg-[#ffe600] text-black shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-[#ffe600] hover:text-black text-white'
                }`}
              >
                <span>Shop All</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'shop-all' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Learn more */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('learn-more')}
                onMouseEnter={() => setActiveDropdown('learn-more')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg -skew-x-8 border-2 border-black transition-all cursor-pointer ${
                  activeDropdown === 'learn-more'
                    ? 'bg-white text-black shadow-p5-xs'
                    : 'bg-[#151926] hover:bg-white hover:text-black text-white'
                }`}
              >
                <span>Learn more</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'learn-more' ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </nav>
        </div>

        {/* Right Utilities: Currency Selector, Search, User, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Currency Switcher (USD $ / KHR ៛) */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#ffe600] text-black transition-all border-2 border-black shadow-p5-xs -skew-x-8 cursor-pointer"
              title="Change Currency"
            >
              <span className="text-sm leading-none">{currency === 'USD' ? '🇺🇸' : '🇰🇭'}</span>
              <span>{currency === 'USD' ? 'USD ($)' : 'KHR (៛)'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0b0d14] rounded-xl border-3 border-black shadow-p5 p-2 z-50 text-white -skew-x-4 animate-in fade-in">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#ffe600] px-3 py-1">Select Currency</div>
                
                <button 
                  onClick={() => {
                    setCurrency('USD');
                    setCurrencyOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-black transition-all cursor-pointer border-2 ${
                    currency === 'USD' ? 'bg-[#0055ff] text-white border-black shadow-p5-xs' : 'bg-zinc-900 border-zinc-800 hover:bg-[#ffe600] hover:text-black'
                  }`}
                >
                  <span className="flex items-center gap-2"><span>🇺🇸</span> US Dollar</span>
                  <span className={currency === 'USD' ? 'text-[#ffe600] font-black' : 'text-zinc-400'}>USD ($)</span>
                </button>

                <button 
                  onClick={() => {
                    setCurrency('KHR');
                    setCurrencyOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-black transition-all cursor-pointer mt-1 border-2 ${
                    currency === 'KHR' ? 'bg-[#0055ff] text-white border-black shadow-p5-xs' : 'bg-zinc-900 border-zinc-800 hover:bg-[#ffe600] hover:text-black'
                  }`}
                >
                  <span className="flex items-center gap-2"><span>🇰🇭</span> Khmer Riel</span>
                  <span className={currency === 'KHR' ? 'text-[#ffe600] font-black' : 'text-zinc-400'}>KHR (៛)</span>
                </button>
                
                <div className="mt-2 pt-2 border-t border-zinc-100 px-2 text-[10px] text-zinc-400 text-center font-medium">
                  Rate: 1 USD = 4,100 KHR
                </div>
              </div>
            )}
          </div>

          {/* Search Toggle / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#141824] rounded-lg px-3 py-1.5 border-2 border-black -skew-x-6 shadow-p5-xs animate-in fade-in">
                <Search className="w-3.5 h-3.5 text-[#ffe600] mr-2" />
                <input
                  type="text"
                  placeholder="Search flavours, pods, tea..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-zinc-400 focus:outline-none w-36 sm:w-52 font-black uppercase tracking-wider"
                />
                <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-white ml-1 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-zinc-300 hover:text-[#ffe600] hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                title="Search flavours"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* User Account / Flavour Profile */}
          <button
            onClick={onOpenQuiz}
            className="p-2 text-zinc-300 hover:text-[#10b981] hover:bg-zinc-900 rounded-lg transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            title="Account / Flavour Profile"
          >
            <User className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* QuickSip Animated Menu Trigger Button (Cobalt Blue with Yellow) */}
          <motion.button
            id="navbar-quicksip-menu-btn"
            onClick={onOpenPersona5Menu}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-[#0055ff] hover:bg-[#ffe600] hover:text-black text-white px-3 sm:px-3.5 py-1.5 rounded-lg -skew-x-12 border-2 border-black font-black text-xs uppercase tracking-tight shadow-p5-xs transition-all cursor-pointer group"
            title="Open QuickSip Menu (Hotkeys: M or Esc)"
          >
            <span className="text-[#ffe600] group-hover:text-black font-black italic tracking-tighter">QUICKSIP</span>
            <span className="font-black tracking-tighter">MENU</span>
            <span className="hidden md:inline-block text-[9px] bg-black text-[#ffe600] px-1 py-0.2 rounded uppercase tracking-widest font-mono border border-black">
              M
            </span>
          </motion.button>

          {/* Cart Bag Icon with dynamic Bouncy Badge (Electric Yellow with Blue Badge) */}
          <motion.button
            id="navbar-cart-btn"
            onClick={onOpenCart}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 bg-[#ffe600] hover:bg-white text-black px-3.5 sm:px-4 py-1.5 rounded-lg -skew-x-8 border-2 border-black font-black text-xs uppercase tracking-tight transition-all shadow-p5-xs cursor-pointer group"
          >
            <div className="relative flex items-center">
              <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, y: -4 }}
                    animate={{ scale: [1, 1.35, 0.95, 1], y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute -top-2.5 -right-2.5 bg-[#0055ff] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-black shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="hidden sm:inline font-black tracking-tight text-black">
              {cartTotal > 0 ? formatPrice(cartTotal) : 'Cart'}
            </span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-800 hover:text-black rounded-full hover:bg-zinc-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <div className="space-y-1 w-5"><div className="h-0.5 bg-black w-full" /><div className="h-0.5 bg-black w-full" /><div className="h-0.5 bg-black w-full" /></div>}
          </button>

        </div>

      </div>

      {/* 3. Mega-Dropdown Menus on Desktop (Persona 5 Themed) */}
      {activeDropdown && (
        <div
          onMouseLeave={() => setActiveDropdown(null)}
          className="hidden lg:block absolute left-0 top-full w-full bg-[#080a12]/98 backdrop-blur-xl border-b-4 border-black shadow-[0_12px_0px_#000] py-6 px-8 animate-in fade-in slide-in-from-top-1 z-40 text-white"
        >
          {/* Halftone Dot pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #0055ff 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            
            {/* NEWCOMERS DROPDOWN */}
            {activeDropdown === 'newcomers' && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => {
                    onSelectCategory('starter-sets');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#ffe600] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:translate-x-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#ffe600] text-black text-[10px] font-black italic uppercase tracking-wider px-2.5 py-0.5 -skew-x-8 border border-black shadow-[2px_2px_0px_#000]">
                      POPULAR CHOICE
                    </span>
                    <Flame className="w-4 h-4 text-[#ffe600]" />
                  </div>
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-[#ffe600] transition-colors">
                    Powder Starter Sets
                  </h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">
                    14 drinks in 7 flavours + free 500ml shaker for only {formatPrice(19.99)}.
                  </p>
                  <span className="text-xs font-black italic uppercase text-[#ffe600] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    EXPLORE STARTER SETS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('syrup');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#10b981] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:translate-x-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#10b981] text-black text-[10px] font-black italic uppercase tracking-wider px-2.5 py-0.5 -skew-x-8 border border-black shadow-[2px_2px_0px_#000]">
                      NEW INNOVATION
                    </span>
                    <Sparkles className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-[#10b981] transition-colors">
                    Syrup Starter Set
                  </h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">
                    Get the Syrup Bottle and 3x 3-packs of flavour pods. Dial your taste!
                  </p>
                  <span className="text-xs font-black italic uppercase text-[#10b981] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    VIEW SYRUP SET <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onOpenQuiz();
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#0055ff] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:translate-x-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#0055ff] text-white text-[10px] font-black italic uppercase tracking-wider px-2.5 py-0.5 -skew-x-8 border border-black shadow-[2px_2px_0px_#000]">
                      INTERACTIVE
                    </span>
                    <Sparkles className="w-4 h-4 text-[#ffe600]" />
                  </div>
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-[#ffe600] transition-colors">
                    Take the Flavour Quiz
                  </h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">
                    Answer 4 quick questions to find your dream zero-sugar drink.
                  </p>
                  <span className="text-xs font-black italic uppercase text-[#0055ff] group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    START 60-SEC QUIZ <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            )}

            {/* POWDER DROPDOWN */}
            {activeDropdown === 'powder' && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => {
                    onSelectCategory('energy');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#10b981] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-[#10b981] stroke-[3]" />
                    <h4 className="font-black italic text-base text-white uppercase tracking-tight">QuickSip Energy®</h4>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">160mg NuCaff® slow-release caffeine + L-theanine. 0g sugar, 50 servings.</p>
                  <span className="text-xs font-black italic uppercase text-[#10b981] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    SHOP 8 ENERGY FLAVOURS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('iced-tea');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#ffe600] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee className="w-4 h-4 text-[#ffe600] stroke-[3]" />
                    <h4 className="font-black italic text-base text-white uppercase tracking-tight">QuickSip Iced Tea®</h4>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Cold-extracted from real tea leaves with inulin fiber & Vitamin C. Low calorie.</p>
                  <span className="text-xs font-black italic uppercase text-[#ffe600] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    SHOP 6 TEA FLAVOURS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('hydration');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#0055ff] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-[#0055ff] stroke-[3]" />
                    <h4 className="font-black italic text-base text-white uppercase tracking-tight">QuickSip Hydration®</h4>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Freeze-dried coconut water + 4 key electrolytes. 100% caffeine-free recovery.</p>
                  <span className="text-xs font-black italic uppercase text-[#0055ff] group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    SHOP HYDRATION FLAVOURS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            )}

            {/* SYRUP DROPDOWN */}
            {activeDropdown === 'syrup' && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => {
                    onSelectCategory('starter-sets');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#10b981] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <span className="bg-[#10b981] text-black text-[10px] font-black italic uppercase tracking-wider px-2.5 py-0.5 -skew-x-8 border border-black shadow-[2px_2px_0px_#000] inline-block mb-2">
                    SAVE {formatPrice(10)}
                  </span>
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-[#10b981] transition-colors">
                    Syrup Starter Set ({formatPrice(24.99)})
                  </h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Includes custom intensity Syrup Bottle + 3x 3-packs of pods (36+ Litres of drink).</p>
                  <span className="text-xs font-black italic uppercase text-[#10b981] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    GET STARTER SET <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('syrup');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#ffe600] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-[#ffe600]">Flavour Pods (3-Packs)</h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Peach Iced Tea, Sour Apple Zing, Elderflower Lemon, and Cola Ice Pop pods.</p>
                  <span className="text-xs font-black italic uppercase text-[#ffe600] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    BROWSE ALL SYRUP PODS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('accessories');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#0055ff] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <h4 className="font-black italic text-base text-white mb-1 uppercase tracking-tight group-hover:text-white">The Syrup Bottle</h4>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Reusable, BPA-free sports bottle with precision flavour intensity dial (1-5).</p>
                  <span className="text-xs font-black italic uppercase text-[#0055ff] group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    LEARN HOW IT WORKS <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            )}

            {/* MIX & MATCH DROPDOWN */}
            {activeDropdown === 'bundles' && (
              <div className="grid grid-cols-2 gap-6">
                <div
                  onClick={() => {
                    onOpenBundleBuilder();
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#ffe600] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-[#ffe600]" />
                    <h4 className="font-black italic text-lg text-white uppercase tracking-tight">Custom 3-Tub Bundle Builder</h4>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Pick any 3 tubs across Energy, Iced Tea, or Hydration. Save 15% + get a free special edition shaker.</p>
                  <span className="text-xs font-black italic uppercase text-[#ffe600] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    OPEN BUNDLE BUILDER <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  onClick={() => {
                    onSelectCategory('bundles');
                    setActiveDropdown(null);
                  }}
                  className="group cursor-pointer p-5 -skew-x-4 bg-[#141824] border-2 border-black hover:border-[#10b981] transition-all shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-[#10b981]" />
                    <h4 className="font-black italic text-lg text-white uppercase tracking-tight">Pre-Packaged Squad Bundles</h4>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed font-medium">Curated bestsellers including The Gamer Duo, The Hydration Station, and The Tea Master bundle.</p>
                  <span className="text-xs font-black italic uppercase text-[#10b981] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    VIEW PRE-SET BUNDLES <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            )}

            {/* SHOP ALL DROPDOWN */}
            {activeDropdown === 'shop-all' && (
              <div className="grid grid-cols-4 gap-3.5">
                {[
                  { name: 'Starter Sets', cat: 'starter-sets', count: '4 Kits' },
                  { name: 'QuickSip Energy®', cat: 'energy', count: '8 Flavours' },
                  { name: 'QuickSip Iced Tea®', cat: 'iced-tea', count: '6 Flavours' },
                  { name: 'QuickSip Hydration®', cat: 'hydration', count: '4 Flavours' },
                  { name: 'QuickSip Syrup Pods', cat: 'syrup', count: '4 Pod Packs' },
                  { name: 'Mix & Match Bundles', cat: 'bundles', count: 'Custom Savings' },
                  { name: 'Shakers & Bottles', cat: 'accessories', count: '5 Colours' },
                  { name: 'View Everything', cat: 'all', count: '30+ Items' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectCategory(item.cat as ProductCategory);
                      setActiveDropdown(null);
                    }}
                    className="p-3.5 text-left -skew-x-4 bg-[#141824] hover:bg-[#ffe600] text-white hover:text-black transition-all group border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
                  >
                    <div className="font-black italic text-xs uppercase group-hover:text-black text-white">{item.name}</div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-zinc-800 font-semibold">{item.count}</div>
                  </button>
                ))}
              </div>
            )}

            {/* LEARN MORE DROPDOWN */}
            {activeDropdown === 'learn-more' && (
              <div className="grid grid-cols-3 gap-6">
                <div className="p-5 -skew-x-4 bg-[#141824] border-2 border-black shadow-[5px_5px_0px_#000]">
                  <h4 className="font-black italic text-base text-[#10b981] mb-1 uppercase tracking-tight">NuCaff® vs Standard Energy</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">Learn how micro-encapsulated natural green coffee caffeine prevents the dreaded sugar-spike and crash.</p>
                </div>
                <div className="p-5 -skew-x-4 bg-[#141824] border-2 border-black shadow-[5px_5px_0px_#000]">
                  <h4 className="font-black italic text-base text-[#ffe600] mb-1 uppercase tracking-tight">Our Eco-Friendly Promise</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">1 tub = 50 cans saved from landfills. 90% less CO2 emissions in shipping weight.</p>
                </div>
                <div className="p-5 -skew-x-4 bg-[#141824] border-2 border-black shadow-[5px_5px_0px_#000]">
                  <h4 className="font-black italic text-base text-[#0055ff] mb-1 uppercase tracking-tight">30-Day Taste Guarantee</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">Try any starter set risk-free. If you don't love the flavours, get a full refund.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-200/80 p-4 space-y-2.5 max-h-[80vh] overflow-y-auto shadow-soft-md">
          {/* QuickSip Menu Highlight */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPersona5Menu();
            }}
            className="w-full text-left p-3 rounded-xl bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black font-black text-xs uppercase flex items-center justify-between border-2 border-black shadow-[3px_3px_0px_#000] -skew-x-6 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="bg-black text-[#FFE600] px-1.5 py-0.5 rounded text-[10px] italic">QS</span>
              <span>Open QuickSip Menu</span>
            </span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={() => {
              onSelectCategory('starter-sets');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center justify-between shadow-soft-xs"
          >
            <span>Starter Sets (Complimentary Shaker)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectCategory('syrup');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-900 hover:bg-zinc-100/80 transition-colors"
            >
              <span className="flex items-center gap-2">🌱 Quick Sip Syrup & Pods</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-semibold">New</span>
            </button>

            <button
              onClick={() => {
                onSelectCategory('energy');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-700 hover:bg-zinc-100/80 transition-colors"
            >
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Quick Sip Energy</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('iced-tea');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-700 hover:bg-zinc-100/80 transition-colors"
            >
              <span className="flex items-center gap-2"><Coffee className="w-4 h-4 text-amber-700" /> Quick Sip Iced Tea</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('hydration');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-700 hover:bg-zinc-100/80 transition-colors"
            >
              <span className="flex items-center gap-2"><Droplets className="w-4 h-4 text-sky-500" /> Quick Sip Hydration</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('bundles');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-700 hover:bg-zinc-100/80 transition-colors"
            >
              <span className="flex items-center gap-2"><Gift className="w-4 h-4 text-purple-600" /> Mix & Match 3-Tub Bundle</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
            </button>

            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl font-medium text-xs flex items-center justify-between text-zinc-700 hover:bg-zinc-100/80 transition-colors"
            >
              <span>Shop All Flavours & Shakers</span>
              <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#FAF9F6] border border-zinc-200/80 rounded-xl text-xs font-medium text-zinc-800 flex items-center justify-center gap-1.5 hover:bg-zinc-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Flavour Quiz</span>
            </button>

            <button
              onClick={() => {
                onOpenBundleBuilder();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#FAF9F6] border border-zinc-200/80 rounded-xl text-xs font-medium text-zinc-800 flex items-center justify-center gap-1.5 hover:bg-zinc-100 transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-purple-600" />
              <span>3-Tub Bundle</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

