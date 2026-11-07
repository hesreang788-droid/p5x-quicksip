import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Zap, Coffee, Droplets, Gift, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-low' | 'price-high'>('featured');

  const categories: { id: ProductCategory; label: string; icon?: React.ReactNode; isNew?: boolean }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'starter-sets', label: 'Starter Sets' },
    { id: 'sample-boxes', label: 'Sample Boxes', icon: <Gift className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'energy', label: 'Energy®', icon: <Zap className="w-3.5 h-3.5 text-[#9ae600]" /> },
    { id: 'hydration', label: 'Hydration®', icon: <Droplets className="w-3.5 h-3.5 text-[#0284c7]" /> },
    { id: 'milkshake', label: 'Milkshake', icon: <Sparkles className="w-3.5 h-3.5 text-pink-500" />, isNew: true },
    { id: 'iced-tea', label: 'Iced Tea®', icon: <Coffee className="w-3.5 h-3.5 text-[#ea580c]" /> },
    { id: 'syrup', label: 'Syrup & Pods', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" />, isNew: true },
    { id: 'bundles', label: 'Mix & Match Stacks' },
    { id: 'accessories', label: 'Shakers' },
  ];

  // Filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;

    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavorNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured
  });

  return (
    <section id="shop-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      
      {/* Section Header with Persona 5 Styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 -skew-x-12 bg-[#0055ff] text-white text-[11px] font-black italic uppercase tracking-wider mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" />
            <span>PHANTOM BEVERAGE VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter drop-shadow-[2px_2px_0px_#000]">
            AWARD-WINNING FLAVOURS
          </h2>
          <p className="text-zinc-300 text-sm mt-2 font-medium leading-relaxed max-w-xl">
            0g Sugar • Real botanicals • Micro-encapsulated NuCaff® slow-release clean energy & cold-extracted Ceylon tea.
          </p>
        </div>

        {/* Sort selector in Persona 5 Comic Box */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#141824] px-4 py-2 -skew-x-8 border-2 border-black shadow-[3px_3px_0px_#000]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#ffe600]" />
          <span className="text-xs font-black uppercase text-zinc-300">SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs font-black uppercase text-[#ffe600] focus:outline-none cursor-pointer pr-1"
          >
            <option value="featured" className="bg-[#141824] text-white">FEATURED / POPULAR</option>
            <option value="rating" className="bg-[#141824] text-white">HIGHEST RATED (★ 5.0)</option>
            <option value="price-low" className="bg-[#141824] text-white">PRICE: LOW TO HIGH</option>
            <option value="price-high" className="bg-[#141824] text-white">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar (Slanted Persona 5 Buttons in Blue, Green, Yellow, White) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat.id;
          const activeBg = idx % 3 === 0 ? 'bg-[#0055ff] text-white' : idx % 3 === 1 ? 'bg-[#10b981] text-black' : 'bg-[#ffe600] text-black';
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 -skew-x-12 text-xs font-black italic uppercase transition-all shrink-0 flex items-center gap-2 cursor-pointer border-2 border-black ${
                isActive
                  ? `${activeBg} shadow-[4px_4px_0px_#000]`
                  : 'bg-[#141824] hover:bg-white text-zinc-300 hover:text-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Search results banner if searching */}
      {searchQuery && (
        <div className="mb-8 p-3.5 bg-[#141824] border-2 border-white/30 -skew-x-6 flex items-center justify-between text-xs shadow-[3px_3px_0px_#000]">
          <span className="font-bold text-zinc-200">
            SHOWING RESULTS FOR "<strong className="text-[#ffe600]">{searchQuery}</strong>" ({sortedProducts.length} items found)
          </span>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-[#ffe600] font-black uppercase hover:underline cursor-pointer"
          >
            CLEAR FILTER [×]
          </button>
        </div>
      )}

      {/* Product Grid with keyframe fade on filter change */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#141824] border-3 border-black -skew-x-4 shadow-[6px_6px_0px_#000] space-y-4">
          <p className="text-xl font-black italic uppercase text-white">NO TARGET FLAVOURS MATCHED</p>
          <button
            onClick={() => {
              onSelectCategory('all');
            }}
            className="px-6 py-3 bg-[#ffe600] text-black font-black italic text-xs uppercase -skew-x-8 border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
          >
            RESET TO ALL PRODUCTS
          </button>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </motion.div>
      )}

    </section>
  );
};
