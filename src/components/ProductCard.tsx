import React from 'react';
import { Plus, Star, Eye, Zap, Coffee, Droplets, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const { formatPrice, currency } = useCurrency();
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy':
        return <Zap className="w-3 h-3 text-[#9ae600]" />;
      case 'iced-tea':
        return <Coffee className="w-3 h-3 text-[#ea580c]" />;
      case 'hydration':
        return <Droplets className="w-3 h-3 text-[#0284c7]" />;
      default:
        return <Gift className="w-3 h-3 text-[#9333ea]" />;
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, rotate: -0.5 }}
      className="relative bg-[#141824] border-2 border-black -skew-x-2 p-4 sm:p-5 flex flex-col justify-between shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#ffe600] transition-all duration-200 group"
    >
      
      {/* Top Header: Slanted Category Tag & Persona 5 Badge */}
      <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-black italic text-zinc-300 uppercase tracking-wider bg-black/60 px-2 py-0.5 border border-white/20 -skew-x-6">
          {getCategoryIcon(product.category)}
          <span>{product.category.replace('-', ' ')}</span>
        </div>

        {product.badge && (
          <span className="text-[10px] font-black italic tracking-wide uppercase px-2.5 py-0.5 bg-[#ffe600] text-black border border-black shadow-[2px_2px_0px_#000] -skew-x-8">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Image Stage in Crisp White Comic Box */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-square bg-white border-2 border-black p-3.5 flex items-center justify-center cursor-pointer overflow-hidden my-2 shadow-[3px_3px_0px_#000] group-hover:border-[#ffe600] transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
              e.currentTarget.src = product.fallbackImage;
            }
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
        />

        {/* Quick View Hover Pill (Slanted Comic Badge) */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 bg-black hover:bg-[#0055ff] text-[#ffe600] hover:text-white text-xs font-black italic uppercase px-3.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1.5 border-2 border-white shadow-[2px_2px_0px_#000] -skew-x-8 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>INSPECT</span>
        </motion.button>
      </div>

      {/* Info Body */}
      <div className="space-y-2 mt-2">
        
        {/* Rating Stars & Count */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex text-[#ffe600]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#ffe600] text-[#ffe600]" />
            ))}
          </div>
          <span className="font-black text-white">{product.rating}</span>
          <span className="text-zinc-400 text-[11px] font-semibold">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Product Title & Flavor */}
        <div>
          <h3 
            onClick={() => onQuickView(product)}
            className="font-black italic text-base sm:text-lg text-white uppercase tracking-tight leading-snug cursor-pointer group-hover:text-[#ffe600] transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-xs font-medium text-zinc-300 line-clamp-1 mt-0.5">
            {product.flavorName}
          </p>
        </div>

        {/* Serving & Nutrition specs in P5 mini boxes */}
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-200 pt-1 flex-wrap">
          <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-6 text-[#10b981]">
            {product.servings} Servings
          </span>
          <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-6 text-[#ffe600]">
            {product.nutrition.sugar} Sugar
          </span>
          {product.nutrition.caffeine !== 'N/A' && (
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-6 text-[#0055ff] text-white">
              {product.nutrition.caffeine}
            </span>
          )}
        </div>

      </div>

      {/* Footer: Price + Add Button */}
      <div className="pt-3.5 mt-3 border-t-2 border-white/20 flex items-center justify-between gap-3">
        
        <div>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-black italic text-base sm:text-lg text-[#ffe600] tracking-tight bg-black px-2 py-0.5 -skew-x-6 border border-white/30">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-zinc-400 font-bold">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-zinc-400 block font-semibold mt-1">
            ~{formatPrice(product.pricePerServing)} / drink
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onAddToCart(product)}
          className="bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black font-black italic text-xs uppercase px-3.5 py-2 -skew-x-8 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>TAKE</span>
        </motion.button>

      </div>

    </motion.div>
  );
};
