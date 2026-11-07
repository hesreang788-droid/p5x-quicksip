import React, { useState } from 'react';
import { X, Plus, Gift, Trash2, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface BundleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  onAddBundleToCart: (bundleProduct: Product, selectedTubs: Product[], shakerColor: string) => void;
}

export const BundleBuilderModal: React.FC<BundleBuilderModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  onAddBundleToCart,
}) => {
  const { formatPrice } = useCurrency();
  const [selectedTubs, setSelectedTubs] = useState<Product[]>([]);
  const [selectedShaker, setSelectedShaker] = useState('Matte Obsidian');

  if (!isOpen) return null;

  // Filter only full 50-serving tubs
  const availableTubs = allProducts.filter(
    p => (p.category === 'energy' || p.category === 'iced-tea' || p.category === 'hydration') && !p.isStarterSet
  );

  const handleSelectTub = (tub: Product) => {
    if (selectedTubs.length < 3) {
      const updated = [...selectedTubs, tub];
      setSelectedTubs(updated);
      if (updated.length === 3) {
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      }
    }
  };

  const handleRemoveTub = (index: number) => {
    setSelectedTubs(selectedTubs.filter((_, i) => i !== index));
  };

  const isComplete = selectedTubs.length === 3;
  const bundlePrice = 94.99;

  const handleFinishBundle = () => {
    const bundleProduct = allProducts.find(p => p.id === 'bundle-custom-trio') || {
      id: 'custom-bundle-trio',
      name: 'Custom 3-Tub Trio Stack',
      category: 'bundles' as const,
      flavorName: selectedTubs.map(t => t.name).join(' + '),
      tagline: '150 Drinks + Free Shaker',
      flavorNotes: selectedTubs.map(t => t.name),
      description: 'Custom 3-Tub bundle stack with free shaker.',
      price: 94.99,
      originalPrice: 119.97,
      servings: 150,
      pricePerServing: 0.63,
      rating: 5.0,
      reviewCount: 7890,
      badge: 'Save 20%' as const,
      cardBg: 'bg-zinc-50',
      badgeColor: { bg: 'bg-zinc-900', text: 'text-white', border: 'border-zinc-800' },
      accentColor: { primary: '#18181b', secondary: '#27272a', glow: 'rgba(24, 24, 27, 0.2)' },
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      nutrition: {
        sugar: '0g',
        calories: '<18 kcal / serving',
        caffeine: 'Custom per tub',
        taurine: '0g',
        vitamins: ['Vitamin C', 'B-Vitamins', 'Electrolytes'],
        vegan: true,
        glutenFree: true,
      },
      ingredients: ['Custom mix of Quick Sip powders.'],
      howToUse: 'Mix 1 scoop with 500ml cold water.'
    };

    onAddBundleToCart(bundleProduct, selectedTubs, selectedShaker);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div 
        id="bundle-builder-modal"
        className="relative w-full max-w-4xl bg-[#141824] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] -skew-x-2 overflow-hidden my-auto text-white"
      >
        {/* Comic background accent */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#0055ff]/20 rotate-45 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black text-white hover:text-black hover:bg-[#ffe600] border-2 border-white/30 hover:border-black transition-transform hover:scale-105 active:scale-95 -skew-x-6 shadow-[3px_3px_0px_#000] z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-3 py-1 border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] inline-block">
              ★ ALL-OUT COMBO BUILDER ★
            </span>
            <span className="text-xs font-black text-[#10b981] flex items-center gap-1.5 uppercase tracking-wide bg-black/40 px-2.5 py-0.5 border border-[#10b981]/40 -skew-x-3">
              <Gift className="w-3.5 h-3.5 text-[#ffe600]" /> SAVE 20% + FREE CUSTOM SHAKER
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight italic uppercase">
            BUILD YOUR 3-TUB TRIO (150 SERVINGS)
          </h2>
          <p className="text-xs text-zinc-300 font-medium">
            Lock in any 3 full tubs from Energy, Real-Brewed Tea, or Hydration to trigger maximum squad savings.
          </p>
        </div>

        {/* 3 Tub Selection Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 relative z-10">
          {[0, 1, 2].map((slotIdx) => {
            const tub = selectedTubs[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`p-3.5 border-3 flex items-center justify-between gap-3 min-h-[90px] -skew-x-2 transition-all ${
                  tub
                    ? 'bg-[#1a2030] border-black shadow-[5px_5px_0px_#ffe600]'
                    : 'bg-black/40 border-dashed border-white/20 text-zinc-400'
                }`}
              >
                {tub ? (
                  <>
                    <div className="w-12 h-12 bg-white border-2 border-black p-0.5 -skew-x-3 shadow-[2px_2px_0px_#000] shrink-0 overflow-hidden flex items-center justify-center">
                      <img 
                        src={tub.image} 
                        alt={tub.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black uppercase text-[#ffe600] block tracking-wider">SLOT 0{slotIdx + 1}</span>
                      <h4 className="text-xs font-black text-white truncate uppercase">{tub.name}</h4>
                      <p className="text-[10px] text-[#10b981] font-bold truncate uppercase">{tub.flavorName}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveTub(slotIdx)}
                      className="p-1.5 bg-black hover:bg-rose-600 text-white border border-white/20 hover:border-black transition-colors -skew-x-6 cursor-pointer"
                      title="Remove tub"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-2 space-y-0.5">
                    <span className="text-xs font-black uppercase text-white tracking-wider block">
                      + LOCK IN TUB 0{slotIdx + 1}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Pick from inventory below</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Shaker Color Picker */}
        <div className="bg-[#1a2030] p-4 border-3 border-black shadow-[4px_4px_0px_#000] -skew-x-2 mb-6 space-y-2.5 relative z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#ffe600]" /> COMPLIMENTARY 500ML SHAKER COLOR:
            </span>
            <span className="text-[11px] bg-[#10b981] text-black font-black uppercase px-2 py-0.5 border border-black -skew-x-6">
              FREE BONUS (${formatPrice(6.99)} VALUE)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Lime Frost', 'Blush Coral', 'Matte Obsidian', 'Glacier Cyan'].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedShaker(color)}
                className={`py-2 px-3 text-xs font-black uppercase tracking-wider border-2 transition-transform cursor-pointer -skew-x-4 ${
                  selectedShaker === color
                    ? 'bg-[#ffe600] text-black border-black shadow-[3px_3px_0px_#000] scale-[1.02]'
                    : 'bg-black text-white border-white/20 hover:border-white'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Available Tubs Grid */}
        <div className="space-y-2 mb-6 relative z-10">
          <span className="text-xs font-black uppercase text-[#ffe600] tracking-wider block">
            SELECT TUBS TO POPULATE COMBOS:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1 pr-2">
            {availableTubs.map((tub) => {
              const isSelected = selectedTubs.some(t => t.id === tub.id);
              return (
                <button
                  key={tub.id}
                  onClick={() => handleSelectTub(tub)}
                  disabled={selectedTubs.length >= 3 && !isSelected}
                  className={`p-3 bg-[#1a2030] border-2 border-black text-left flex flex-col justify-between transition-all -skew-x-2 group cursor-pointer shadow-[3px_3px_0px_#000] ${
                    selectedTubs.length >= 3 && !isSelected
                      ? 'opacity-35 cursor-not-allowed'
                      : 'hover:border-[#ffe600] hover:bg-[#222a3d]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-black text-[#10b981] px-1.5 py-0.5 border border-[#10b981]/50 -skew-x-6">
                      {tub.category.replace('-', ' ')}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#ffe600] stroke-[3]" />
                  </div>
                  <h5 className="text-xs font-black text-white uppercase truncate tracking-tight">{tub.name}</h5>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase truncate">{tub.flavorName}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer & Submit */}
        <div className="pt-4 border-t-2 border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-3xl font-black text-[#ffe600] tracking-tight">
                {formatPrice(bundlePrice)}
              </span>
              <span className="text-sm line-through text-zinc-400 font-bold">
                {formatPrice(119.97)}
              </span>
              <span className="text-xs bg-[#10b981] text-black px-2.5 py-0.5 font-black uppercase border border-black -skew-x-6">
                ~{formatPrice(0.63)} / SERVING
              </span>
            </div>
            <p className="text-xs text-[#10b981] font-bold uppercase mt-1">
              ✓ Free Express Cambodia Courier Delivery Included
            </p>
          </div>

          <button
            id="add-custom-bundle-to-cart-btn"
            disabled={!isComplete}
            onClick={handleFinishBundle}
            className={`px-7 py-3 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black -skew-x-6 transition-all ${
              isComplete
                ? 'bg-[#ffe600] hover:bg-white text-black shadow-[5px_5px_0px_#000] hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed'
            }`}
          >
            <span>{isComplete ? 'LOCK IN TRIO BUNDLE' : `SELECT ${3 - selectedTubs.length} MORE TUBS`}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
};
