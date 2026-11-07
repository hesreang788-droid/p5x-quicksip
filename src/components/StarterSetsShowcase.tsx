import React from 'react';
import { Product } from '../types';
import { Star, Plus, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useCurrency } from '../context/CurrencyContext';

interface StarterSetsShowcaseProps {
  onAddToCart: (product: Product, shakerColor?: string) => void;
  onQuickView: (product: Product) => void;
  products: Product[];
}

export const StarterSetsShowcase: React.FC<StarterSetsShowcaseProps> = ({
  onAddToCart,
  onQuickView,
  products,
}) => {
  const { formatPrice } = useCurrency();
  const starterCards = [
    {
      id: 'starter-set-deluxe',
      catLabel: 'All QuickSip',
      title: 'Starter Set Deluxe',
      headerBg: 'bg-[#ffea3b]',
      badgeText: 'Free Shipping & Incl. Shaker',
      desc: 'Energy, Hydration, Iced Tea and Milkshake – 57 Drinks',
      rating: 5,
      sampleBadge: 'Starter Set Deluxe 57 Samples',
      price: 49.99,
      servings: 57,
      type: 'deluxe',
      image: '/starter-set-deluxe.png',
    },
    {
      id: 'starter-set-energy',
      catLabel: 'Energy',
      title: 'Energy Starter Set',
      headerBg: 'bg-[#4fbbf8]',
      badgeText: 'Shaker included',
      descLines: ['7 Flavours', '1 Box — 14 Drinks'],
      rating: 5,
      sampleBadge: '14 Samples',
      price: 19.99,
      servings: 14,
      type: 'energy',
      image: '/starter-set-energy.png',
    },
    {
      id: 'starter-set-hydration',
      catLabel: 'Hydration',
      title: 'Hydration Starter Set',
      headerBg: 'bg-[#38bdf8]',
      badgeText: 'Free Shipping & Incl. Shaker',
      descLines: ['7 Flavours', '1 Box — 14 Drinks'],
      rating: 5,
      sampleBadge: '14 Samples',
      price: 19.99,
      servings: 14,
      type: 'hydration',
      image: '/starter-set-hydration.png',
    },
    {
      id: 'starter-set-iced-tea',
      catLabel: 'Iced Tea',
      title: 'Iced Tea Starter Set',
      headerBg: 'bg-[#d8b4fe]',
      badgeText: 'Free Shipping & Incl. Shaker',
      descLines: ['7 Flavours', '1 Box — 14 Drinks'],
      rating: 5,
      sampleBadge: '14 Samples',
      price: 19.99,
      servings: 14,
      type: 'iced-tea',
      image: '/starter-set-iced-tea.png',
    },
    {
      id: 'starter-set-milkshake',
      catLabel: 'Milkshake',
      title: 'Milkshake Starter Set',
      headerBg: 'bg-[#fce7f3]',
      badgeText: 'Free Shipping & Incl. Shaker',
      descLines: ['5 Flavours', '1 Box — 15 Drinks'],
      rating: 5,
      sampleBadge: '15 Samples',
      price: 19.99,
      servings: 15,
      type: 'milkshake',
      image: '/starter-set-milkshake.png',
    },
    {
      id: 'starter-set-syrup',
      catLabel: 'Syrup System',
      title: 'Syrup Starter Set',
      headerBg: 'bg-[#ffea3b]',
      badgeText: 'Free Shipping & Incl. Bottle',
      descLines: ['1 Bottle', '9 Syrup Pods'],
      rating: 5,
      sampleBadge: '9 Pods (36L)',
      price: 24.99,
      servings: 36,
      type: 'syrup',
      image: '/starter-set-syrup.png',
    },
  ];

  return (
    <section className="w-full bg-[#0b0d14] py-14 sm:py-20 border-b-4 border-black relative overflow-hidden">
      {/* Halftone Comic Dots Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffe600 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black italic uppercase tracking-wider bg-[#0055ff] text-white px-3.5 py-1 -skew-x-12 inline-block mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
            TAKE YOUR STARTER BUNDLE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
            DISCOVER OUR STARTER SETS
          </h2>
          <p className="text-zinc-300 text-sm mt-2 font-medium leading-relaxed">
            Find your favourite zero-sugar flavours with natural botanicals, real extracts, and complimentary custom shakers.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {starterCards.map((card, idx) => {
            const product = products.find((p) => p.id === card.id) || products[0];
            const badgeColor = idx % 3 === 0 ? 'bg-[#ffe600] text-black' : idx % 3 === 1 ? 'bg-[#10b981] text-black' : 'bg-[#0055ff] text-white';

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, rotate: -0.5 }}
                className="bg-[#141824] -skew-x-2 border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#ffe600] overflow-hidden flex flex-col justify-between transition-all duration-200 group"
              >
                {/* 1. White Comic Visual Stage */}
                <div className="bg-white p-2 h-64 relative flex items-center justify-center border-b-2 border-black overflow-hidden">
                  <img
                    src={product.image || card.image}
                    alt={card.title}
                    onError={(e) => {
                      if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                        e.currentTarget.src = product.fallbackImage;
                      } else if (card.image && e.currentTarget.src !== card.image) {
                        e.currentTarget.src = card.image;
                      }
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#ffe600] text-[10px] font-black italic uppercase px-2 py-0.5 -skew-x-8 border border-white">
                    {card.sampleBadge}
                  </div>
                </div>

                {/* 2. Bottom Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Category Label */}
                    {card.catLabel && (
                      <span className="text-[11px] font-black italic uppercase tracking-wider text-zinc-400 block">
                        {card.catLabel}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    {/* Pill Badge */}
                    <div className="inline-block">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 -skew-x-8 border border-black shadow-[2px_2px_0px_#000] ${badgeColor}`}>
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Details list or Description */}
                    {card.descLines ? (
                      <ul className="text-xs text-zinc-300 space-y-1 pt-1 font-medium">
                        {card.descLines.map((line, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#ffe600] -skew-x-12" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-300 leading-relaxed pt-1 font-medium">
                        {card.desc}
                      </p>
                    )}
                  </div>

                  {/* Bottom Price & Button */}
                  <div className="pt-3.5 border-t-2 border-white/20 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xl font-black italic text-[#ffe600] tracking-tight bg-black px-2 py-0.5 -skew-x-6 border border-white/30">
                        {formatPrice(card.price)}
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-semibold mt-1">({card.servings} drinks)</span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onAddToCart(product)}
                      className="bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black px-4 py-2 -skew-x-8 text-xs font-black italic uppercase border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>TAKE SET</span>
                    </motion.button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
