import React, { useState } from 'react';
import { Gift, Check, Star, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface StarterSetHeroPromoProps {
  starterProducts: Product[];
  onAddToCart: (product: Product, shakerColor: string) => void;
  onQuickView: (product: Product) => void;
}

export const StarterSetHeroPromo: React.FC<StarterSetHeroPromoProps> = ({
  starterProducts,
  onAddToCart,
  onQuickView,
}) => {
  const { formatPrice } = useCurrency();
  const [selectedProductId, setSelectedProductId] = useState<string>(
    starterProducts[0]?.id || 'starter-set-energy'
  );
  const [selectedShakerColor, setSelectedShakerColor] = useState<string>('Lime Frost');

  const selectedProduct = starterProducts.find(p => p.id === selectedProductId) || starterProducts[0];

  const shakerColors = [
    { name: 'Lime Frost', preview: 'bg-emerald-400' },
    { name: 'Blush Coral', preview: 'bg-rose-400' },
    { name: 'Matte Obsidian', preview: 'bg-zinc-900' },
    { name: 'Glacier Cyan', preview: 'bg-sky-400' },
  ];

  if (!selectedProduct) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Persona 5 Slanted Card Panel */}
      <div className="bg-[#141824] -skew-x-2 border-4 border-white shadow-[8px_8px_0px_#000] overflow-hidden p-6 sm:p-10 lg:p-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Product Visual + Live Shaker Display */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-white border-3 border-black aspect-square sm:aspect-4/3 flex items-center justify-center p-6 overflow-hidden group shadow-[4px_4px_0px_#000]">
              
              {/* Product Image */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={(e) => {
                  if (selectedProduct.fallbackImage && e.currentTarget.src !== selectedProduct.fallbackImage) {
                    e.currentTarget.src = selectedProduct.fallbackImage;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Free Shaker badge */}
              <div className="absolute top-3 left-3 bg-[#0055ff] text-white text-[10px] sm:text-xs font-black italic uppercase px-3 py-1 -skew-x-12 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#ffe600]" />
                <span>COMPLIMENTARY SHAKER</span>
              </div>

              {/* Shaker Color indicator badge */}
              <div className="absolute bottom-3 right-3 bg-black text-[#ffe600] text-[10px] sm:text-xs font-black italic uppercase px-3 py-1 -skew-x-8 border border-white">
                FINISH: <span>{selectedShakerColor}</span>
              </div>
            </div>

            {/* 4 Shaker Color Swatches */}
            <div className="bg-black/70 p-3.5 border-2 border-white/30 space-y-2 -skew-x-4">
              <div className="flex items-center justify-between text-xs font-bold text-white uppercase">
                <span>SELECT SHAKER FINISH:</span>
                <span className="text-[#10b981] font-black">INCLUDED AT $0.00</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shakerColors.map((shaker) => (
                  <button
                    key={shaker.name}
                    onClick={() => setSelectedShakerColor(shaker.name)}
                    className={`py-2 px-3 text-xs font-black italic uppercase transition-all flex items-center justify-center gap-1.5 border-2 cursor-pointer -skew-x-8 ${
                      selectedShakerColor === shaker.name
                        ? 'bg-[#ffe600] text-black border-black shadow-[2px_2px_0px_#000]'
                        : 'bg-[#141824] text-white border-white/40 hover:border-[#ffe600]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${shaker.preview}`} />
                    <span>{shaker.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info, Flavour list & Add to cart */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Type selector (Energy vs Iced Tea vs Hydration vs Deluxe) */}
            <div className="flex flex-wrap gap-2">
              {starterProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`text-xs font-black italic uppercase px-3.5 py-1.5 -skew-x-12 border-2 transition-colors cursor-pointer ${
                    selectedProductId === p.id
                      ? 'bg-[#0055ff] text-white border-black shadow-[3px_3px_0px_#000]'
                      : 'bg-black/60 text-zinc-300 border-white/20 hover:border-white'
                  }`}
                >
                  {p.name.replace('Starter Set', '').trim() || 'Starter Set'}
                </button>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-2.5 py-0.5 -skew-x-8 border border-black shadow-[2px_2px_0px_#000]">
                  SAVE 26%
                </span>
                <div className="flex text-[#ffe600]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#ffe600]" />
                  ))}
                </div>
                <span className="text-xs text-zinc-300 font-bold">
                  {selectedProduct.rating} ({selectedProduct.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
                {selectedProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#10b981] font-bold mt-1 uppercase">
                {selectedProduct.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {selectedProduct.description}
            </p>

            {/* Flavours Included in this pack */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block">
                7 Bestselling Flavours (2x Sachets Each = 14 Drinks):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.flavorNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs bg-black border border-white/30 text-[#ffe600] px-2.5 py-1 -skew-x-6 font-bold uppercase"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Included Box Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-200 pt-1 font-semibold">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                <span>14 Individual Drink Sachets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                <span>1x 500ml BPA-free Shaker ({selectedShakerColor})</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                <span>{formatPrice(5)} Voucher for your first full tub</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                <span>Quick Sip Holographic Sticker Pack</span>
              </div>
            </div>

            {/* Price & Add to Cart Button */}
            <div className="pt-4 border-t-2 border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black italic text-[#ffe600] bg-black px-2 py-0.5 -skew-x-6 border border-white/30">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm line-through text-zinc-400 font-bold">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs bg-[#10b981] text-black px-2 py-0.5 -skew-x-6 font-black uppercase border border-black">
                    {formatPrice(selectedProduct.pricePerServing)}/serving
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-semibold mt-1">
                  Includes free Cambodia express delivery
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQuickView(selectedProduct)}
                  className="px-4 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-black italic uppercase -skew-x-8 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  INSPECT
                </button>

                <button
                  id="starter-set-claim-btn"
                  onClick={() => onAddToCart(selectedProduct, selectedShakerColor)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black font-black italic text-xs sm:text-sm px-6 py-3 -skew-x-8 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer uppercase"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>CLAIM SET + FREE SHAKER</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
