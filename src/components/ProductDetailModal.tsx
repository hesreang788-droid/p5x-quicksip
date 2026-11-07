import React, { useState } from 'react';
import { X, Star, Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, shakerColor?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const { formatPrice } = useCurrency();
  const [selectedShaker, setSelectedShaker] = useState('Lime Frost');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-3xl bg-[#141824] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] -skew-x-2 overflow-hidden my-auto text-white"
      >
        {/* Decorative corner flash */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0055ff]/20 rotate-45 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black text-white hover:text-black hover:bg-[#ffe600] border-2 border-white/30 hover:border-black transition-transform hover:scale-105 active:scale-95 -skew-x-6 shadow-[3px_3px_0px_#000] z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left: Product Image & Mixing notes */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-80 w-full bg-white border-3 border-black -skew-x-2 shadow-[6px_6px_0px_#000] flex items-center justify-center p-6 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                    e.currentTarget.src = product.fallbackImage;
                  }
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Preparation guide */}
            <div className="bg-[#1a2030] p-4 border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000] space-y-1">
              <span className="font-black text-[#10b981] uppercase text-[10px] tracking-wider block">
                ★ OPTIMAL PREPARATION INSTRUCTIONS
              </span>
              <p className="text-zinc-300 font-medium text-xs leading-relaxed">
                {product.howToUse}
              </p>
            </div>
          </div>

          {/* Right: Info & Nutrition */}
          <div className="md:col-span-7 space-y-5">
            
            <div>
              {/* Badge & Category */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {product.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-2.5 py-0.5 border border-black -skew-x-6 shadow-[2px_2px_0px_#000]">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs text-[#0055ff] bg-black font-black uppercase tracking-wider px-2 py-0.5 border border-white/20 -skew-x-4">
                  {product.category.replace('-', ' ')} • {product.servings} SERVINGS
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white italic uppercase tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm text-[#10b981] font-bold uppercase mt-0.5">
                {product.flavorName}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#ffe600]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ffe600] stroke-black stroke-[1.5]" />
                  ))}
                </div>
                <span className="text-xs font-black text-white">{product.rating}</span>
                <span className="text-xs text-zinc-400 font-bold">({product.reviewCount.toLocaleString()} VERIFIED REVIEWS)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Flavour Notes */}
            <div>
              <span className="text-[11px] font-black uppercase text-[#ffe600] tracking-wider block mb-1.5">
                PALATE PROFILE
              </span>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note, idx) => (
                  <span key={idx} className="text-xs bg-[#1a2030] border-2 border-black text-white px-3 py-1 font-black uppercase -skew-x-4 shadow-[2px_2px_0px_#000]">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition Facts Box */}
            <div className="bg-[#1a2030] p-4 border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000] space-y-2">
              <span className="text-[10px] font-black uppercase text-[#10b981] tracking-wider block">
                NUTRITION FACTS PER 500ML SERVING
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-black p-2.5 border-2 border-white/20 -skew-x-3">
                  <span className="block font-black text-[#10b981] text-base">{product.nutrition.sugar}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-black">Sugar</span>
                </div>
                <div className="bg-black p-2.5 border-2 border-white/20 -skew-x-3">
                  <span className="block font-black text-[#ffe600] text-base">{product.nutrition.calories}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-black">Calories</span>
                </div>
                <div className="bg-black p-2.5 border-2 border-white/20 -skew-x-3">
                  <span className="block font-black text-[#0055ff] text-base">{product.nutrition.caffeine}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-black">Caffeine</span>
                </div>
              </div>
            </div>

            {/* Ingredients Transparency */}
            <div>
              <span className="text-[11px] font-black uppercase text-[#ffe600] tracking-wider block mb-1.5">
                BIOACTIVE COMPOUNDS & CLEAN BOTANICALS
              </span>
              <ul className="text-xs text-zinc-300 space-y-1 font-medium">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5 stroke-[3]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Starter pack shaker selector if applicable */}
            {product.isStarterSet && (
              <div className="bg-[#1a2030] p-3.5 border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000]">
                <p className="text-xs font-black uppercase text-[#ffe600] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> SELECT INCLUDED 500ML SHAKER COLOR:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Lime Frost', 'Blush Coral', 'Matte Obsidian', 'Glacier Cyan'].map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedShaker(color)}
                      className={`text-xs px-3 py-1.5 border-2 font-black uppercase tracking-wider transition-all cursor-pointer -skew-x-4 ${
                        selectedShaker === color 
                          ? 'bg-[#ffe600] text-black border-black shadow-[3px_3px_0px_#000]' 
                          : 'bg-black text-white border-white/20 hover:border-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing & Add Action */}
            <div className="pt-4 border-t-2 border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-black text-[#ffe600] tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-zinc-400 font-bold">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#10b981] font-bold uppercase">
                  {product.servings} Servings (~{formatPrice(product.pricePerServing)}/serving)
                </p>
              </div>

              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  onAddToCart(product, product.isStarterSet ? selectedShaker : undefined);
                  onClose();
                }}
                className="flex items-center gap-2 bg-[#ffe600] hover:bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 border-2 border-black -skew-x-6 shadow-[5px_5px_0px_#000] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>TAKE THIS ITEM</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
