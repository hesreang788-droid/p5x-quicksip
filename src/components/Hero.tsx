import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Gift, Star, ShieldCheck, Check, Zap, Coffee, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCategory } from '../types';
import { HeroVisualPods } from './HeroVisualPods';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenStarterPack: (productId: string) => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenStarterPack,
  onOpenQuiz,
}) => {
  const { formatPrice } = useCurrency();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      id: 'quicksip-x-holysip-collab',
      category: 'starter-sets' as ProductCategory,
      productId: 'starter-set-deluxe',
      bgColor: 'bg-gradient-to-b from-[#f2fbf5] via-[#fafdfb] to-[#fafaf9]',
      badge: 'EXCLUSIVE COLLABORATION',
      titleLine1: 'QuickSip',
      titleLine2: '× Holy Sip',
      desc: 'Quick Sip is thrilled to announce an exciting new collaboration with our friends at Holy Sip! By combining our lightning-fast service with their heavenly flavor profiles, we are bringing you an exclusive lineup of handcrafted beverages. This limited-edition menu will be available at all participating locations starting next week. Stop by to taste the ultimate fusion of speed and perfection, and get ready to elevate your daily refreshment.',
      buttonText: 'Explore Collab Lineup',
      buttonBg: 'bg-[#18181b]',
      buttonTextCol: 'text-white',
      ratingText: 'Available Next Week at Participating Locations',
      guarantee: 'Ultimate Fusion of Speed & Perfection',
      type: 'collab-announcement',
      image: '/starter-set-deluxe.png',
    },
    {
      id: 'powder-starter',
      category: 'starter-sets' as ProductCategory,
      productId: 'starter-set-energy',
      bgColor: 'bg-gradient-to-b from-[#fefce8] via-[#fffdf5] to-[#fafaf9]',
      badge: `TRY 14 DRINKS FOR ${formatPrice(19.99)}`,
      titleLine1: 'Powder Starter',
      titleLine2: 'Set + Free Shaker',
      desc: 'Sample 7 bestselling energy & iced tea flavours with 0g sugar and slow-release NuCaff® caffeine. Includes a free 500ml shaker bottle.',
      buttonText: 'Order Starter Set',
      buttonBg: 'bg-[#18181b]',
      buttonTextCol: 'text-white',
      ratingText: '4.9/5 Trustpilot (25k+ Reviews)',
      guarantee: `Includes Free 500ml Shaker • ${formatPrice(5)} Voucher Inside`,
      type: 'powder-image',
      image: '/starter-set-energy.png',
    },
    {
      id: 'energy-tubs',
      category: 'energy' as ProductCategory,
      productId: 'energy-raspberry-raptor',
      bgColor: 'bg-gradient-to-b from-[#f7fee7] via-[#fafdf5] to-[#fafaf9]',
      badge: 'SMART ENERGY • ZERO CRASH',
      titleLine1: 'QuickSip Energy®',
      titleLine2: '50 Servings / Tub',
      desc: 'Micro-encapsulated natural green coffee caffeine with L-Theanine. Razor-sharp focus with no sugar, no synthetic taurine, and no jitters.',
      buttonText: 'Explore Energy Flavours',
      buttonBg: 'bg-[#18181b]',
      buttonTextCol: 'text-white',
      ratingText: '4.9/5 from 18,000+ Gamers & Athletes',
      guarantee: `Only ~${formatPrice(0.80)} per drink • 100% Vegan`,
      type: 'powder-image',
      image: '/tub-raspberry-raptor.png',
    },
    {
      id: 'iced-tea',
      category: 'iced-tea' as ProductCategory,
      productId: 'starter-set-iced-tea',
      bgColor: 'bg-gradient-to-b from-[#fff7ed] via-[#fffaf5] to-[#fafaf9]',
      badge: 'REAL BREWED TEA EXTRACT',
      titleLine1: 'QuickSip Iced Tea®',
      titleLine2: 'Zero Sugar Refreshment',
      desc: 'Cold-extracted from real tea leaves and packed with prebiotic inulin fiber & Vitamin C. The guilt-free daily iced tea upgrade.',
      buttonText: 'Discover Tea Flavours',
      buttonBg: 'bg-[#18181b]',
      buttonTextCol: 'text-white',
      ratingText: '4.8/5 (9,800+ Verified Reviews)',
      guarantee: 'Naturally low calorie • 0g Sugar',
      type: 'powder-image',
      image: '/starter-set-iced-tea.png',
    },
    {
      id: 'hydration',
      category: 'hydration' as ProductCategory,
      productId: 'hydration-cherry-chameleon',
      bgColor: 'bg-gradient-to-b from-[#f0f9ff] via-[#f8fcff] to-[#fafaf9]',
      badge: 'CAFFEINE FREE • RECOVERY',
      titleLine1: 'QuickSip Hydration®',
      titleLine2: 'Electrolyte Fuel',
      desc: 'Freeze-dried coconut water with a 4-mineral electrolyte complex (Na, K, Mg, Ca) and goji berry antioxidants. 24/7 all-day hydration.',
      buttonText: 'Shop Hydration',
      buttonBg: 'bg-[#18181b]',
      buttonTextCol: 'text-white',
      ratingText: '4.9/5 (4,500+ Daily Athletes)',
      guarantee: 'Zero Caffeine • Real Coconut Water',
      type: 'powder-image',
      image: '/tub-blue-raspberry.png',
    },
  ];

  const current = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="hero-collab-section" className="relative w-full overflow-hidden transition-colors duration-500 bg-[#0b0d14] border-b-4 border-black">
      
      {/* Halftone Comic Dots Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, #0055ff 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Comic Diagonal Speed Slash Accent Stripes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 -left-20 w-[140vw] h-10 bg-[#0055ff]/20 -rotate-12" />
        <div className="absolute top-1/2 -left-20 w-[140vw] h-14 bg-[#ffe600]/15 -rotate-12" />
        <div className="absolute bottom-6 -left-20 w-[140vw] h-8 bg-[#10b981]/20 -rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column with Slanted Persona 5 Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-text-${current.id}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Top Badge: Skewed Persona 5 Tag */}
                {current.badge && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 -skew-x-12 bg-[#ffe600] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000]">
                    <Sparkles className="w-3.5 h-3.5 stroke-[3] text-black" />
                    <span>{current.badge}</span>
                  </div>
                )}

                {/* Persona 5 Bold Slanted Heading */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic text-white tracking-tighter uppercase leading-[0.98] drop-shadow-[3px_3px_0px_#000]">
                  <span className="inline-block bg-[#0055ff] px-3 py-1 -skew-x-8 border-2 border-black shadow-[4px_4px_0px_#000] text-white">
                    {current.titleLine1}
                  </span>
                  <br />
                  <span className="inline-block text-[#ffe600] -skew-x-8 mt-2">
                    {current.titleLine2}
                  </span>
                </h1>

                {/* Persona 5 Subtitle in High-Contrast Comic Box */}
                <div className="bg-[#141824] border-2 border-white p-4 -skew-x-6 shadow-[4px_4px_0px_#000] max-w-lg">
                  <p className="text-zinc-200 text-sm sm:text-base font-medium leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                {/* CTA Action Button: Electric Yellow with Comic Shadow */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <motion.button
                    id="hero-get-started-btn"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      if (current.productId) {
                        onOpenStarterPack(current.productId);
                      } else {
                        onSelectCategory(current.category);
                      }
                    }}
                    className="bg-[#ffe600] hover:bg-white text-black font-black italic text-sm sm:text-base px-8 sm:px-9 py-3.5 -skew-x-12 border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer inline-flex items-center gap-2 uppercase tracking-wider"
                  >
                    <span>{current.buttonText}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>

                  <button
                    onClick={onOpenQuiz}
                    className="bg-[#10b981] hover:bg-white text-black font-black italic text-xs sm:text-sm px-5 py-3.5 -skew-x-12 border-2 border-black shadow-[3px_3px_0px_#000] transition-all cursor-pointer inline-flex items-center gap-1.5 uppercase"
                  >
                    <Sparkles className="w-3.5 h-3.5 stroke-[3]" />
                    <span>TAKE FLAVOUR QUIZ</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls (Slanted P5 navigation buttons) */}
            <div className="flex items-center gap-3 pt-3">
              
              {/* Prev Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-10 h-10 bg-white hover:bg-[#ffe600] text-black flex items-center justify-center -skew-x-12 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer"
                title="Previous slide"
              >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
              </motion.button>

              {/* Slider Pagination Indicators */}
              <div className="flex items-center gap-2 px-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 -skew-x-12 border border-black transition-all duration-200 cursor-pointer ${
                      currentSlide === idx
                        ? 'w-8 bg-[#ffe600] shadow-[2px_2px_0px_#000]'
                        : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-10 h-10 bg-white hover:bg-[#ffe600] text-black flex items-center justify-center -skew-x-12 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer"
                title="Next slide"
              >
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>

            </div>

          </div>

          {/* Right Product & Mascot Showcase Column (Persona 5 Calling Card / Feature Panel) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-visual-${current.id}`}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex items-center justify-center"
              >
                {current.type === 'collab-announcement' ? (
                  <div className="relative w-full max-w-lg bg-[#141824] border-4 border-white p-6 sm:p-7 -skew-x-6 shadow-[8px_8px_0px_#000] space-y-4">
                    
                    {/* Top Dual Logo Bar: Slanted Blue & Green Tags */}
                    <div className="flex items-center justify-between gap-2 border-b-2 border-white pb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black italic uppercase tracking-wider text-white bg-[#0055ff] px-3 py-1 -skew-x-12 border-2 border-black shadow-[2px_2px_0px_#000]">
                          ⚡ QUICKSIP
                        </span>
                        <span className="text-xs font-black text-white">×</span>
                        <span className="text-xs font-black italic uppercase tracking-wider text-black bg-[#10b981] px-3 py-1 -skew-x-12 border-2 border-black shadow-[2px_2px_0px_#000]">
                          ✨ HOLY SIP
                        </span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-2.5 py-1 -skew-x-12 border border-black shadow-[2px_2px_0px_#000]">
                        LIMITED COLLAB
                      </span>
                    </div>

                    {/* Main Visual Comic Banner */}
                    <div className="relative bg-white border-3 border-black p-4 flex flex-col items-center justify-center text-center overflow-hidden shadow-[4px_4px_0px_#000]">
                      <div className="absolute top-2 right-2 bg-black text-[#ffe600] text-[10px] font-black italic px-2.5 py-0.5 -skew-x-12 uppercase tracking-wider border border-white">
                        NEXT WEEK
                      </div>

                      <img
                        src="/starter-set-deluxe.png"
                        alt="QuickSip x Holy Sip Collaboration"
                        className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-xl drop-shadow-md hover:scale-105 transition-transform duration-300 my-2"
                      />

                      <div className="bg-[#0055ff] text-white border-2 border-black px-4 py-2 w-full mt-2 -skew-x-6 shadow-[2px_2px_0px_#000]">
                        <p className="text-xs sm:text-sm font-black italic uppercase tracking-tight">
                          EXCLUSIVE HANDCRAFTED BEVERAGES
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#ffe600] font-bold mt-0.5">
                          Lightning Speed • 0g Sugar • Heavenly Flavour
                        </p>
                      </div>
                    </div>

                    {/* 2 Feature Callout Pills in Blue & Green */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-[#0055ff] text-white border-2 border-black py-2 px-3 flex items-center justify-center gap-1.5 -skew-x-8 shadow-[2px_2px_0px_#000]">
                        <Zap className="w-3.5 h-3.5 text-[#ffe600] shrink-0 stroke-[3]" />
                        <span className="font-black italic text-[11px] uppercase">Lightning-Fast Service</span>
                      </div>
                      <div className="bg-[#10b981] text-black border-2 border-black py-2 px-3 flex items-center justify-center gap-1.5 -skew-x-8 shadow-[2px_2px_0px_#000]">
                        <Sparkles className="w-3.5 h-3.5 text-black shrink-0 stroke-[3]" />
                        <span className="font-black italic text-[11px] uppercase">Heavenly Flavour</span>
                      </div>
                    </div>

                    {/* Footer Location & Timing Pin */}
                    <div className="flex items-center justify-between text-xs font-bold text-white pt-2 border-t border-white/30">
                      <span>📍 ALL PARTICIPATING LOCATIONS</span>
                      <span className="text-[#ffe600] font-black uppercase">ARRIVING NEXT WEEK</span>
                    </div>

                  </div>
                ) : current.type === 'syrup-visual' ? (
                  <HeroVisualPods onSelectFlavor={(flavor) => console.log('Selected flavour:', flavor)} />
                ) : (
                  <div className="relative w-full max-w-md aspect-square bg-[#141824] border-4 border-white p-6 flex items-center justify-center -skew-x-6 shadow-[8px_8px_0px_#000] overflow-hidden group">
                    <div className="w-full h-full bg-white border-2 border-black p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={current.image}
                        alt={current.titleLine1}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-[#ffe600] text-black text-[11px] font-black italic uppercase px-3 py-1 -skew-x-12 border-2 border-black shadow-[2px_2px_0px_#000]">
                      ⚡ 0g Sugar
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#0055ff] text-white text-xs font-black italic px-3.5 py-1.5 -skew-x-12 border-2 border-white shadow-[3px_3px_0px_#000] flex items-center gap-1.5 uppercase">
                      <Gift className="w-3.5 h-3.5 text-[#ffe600]" />
                      <span>INCLUDES FREE SHAKER</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>

    </section>
  );
};

