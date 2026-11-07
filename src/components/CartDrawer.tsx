import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Truck, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: (discountAmount: number, promoCode: string) => void;
  onAddUpsell: (product: Product) => void;
  upsellProduct?: Product;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onAddUpsell,
  upsellProduct,
}) => {
  const { formatPrice, currency } = useCurrency();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 35.0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || appliedDiscount?.code === 'HOLYFREE' || appliedDiscount?.code === 'QUICKSIPFREE';
  const shippingCost = isFreeShipping || cartItems.length === 0 ? 0 : 3.99;
  const finalTotal = discountedSubtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const shippingProgress = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'SQUAD10' || code === 'HOLY10' || code === 'QUICKSIP10' || code === 'QUICK10') {
      setAppliedDiscount({ code, percent: 10 });
    } else if (code === 'HOLY20' || code === 'QUICKSIP20' || code === 'QUICK20') {
      setAppliedDiscount({ code, percent: 20 });
    } else if (code === 'HOLYFREE' || code === 'QUICKSIPFREE') {
      setAppliedDiscount({ code, percent: 0 });
    } else {
      setPromoError('Invalid code. Try "SQUAD10" or "QUICKSIP10" for 10% off!');
    }
  };

  const totalItemCount = cartItems.reduce((total, i) => total + i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-6 pointer-events-none">
            <motion.div 
              id="cart-slide-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-screen max-w-md bg-[#141824] border-l-4 border-black text-white shadow-[-10px_0px_0px_#000] flex flex-col justify-between pointer-events-auto"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b-2 border-white/10 flex items-center justify-between bg-black">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#ffe600] text-black border-2 border-black flex items-center justify-center -skew-x-6 font-black shadow-[2px_2px_0px_#000]">
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white uppercase italic tracking-tight">SQUAD INVENTORY</h2>
                    <p className="text-[11px] text-[#10b981] font-bold uppercase">
                      {totalItemCount} {totalItemCount === 1 ? 'SLOT OCCUPIED' : 'SLOTS OCCUPIED'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center bg-[#1a2030] text-white hover:text-black hover:bg-[#ffe600] border-2 border-white/20 hover:border-black transition-transform hover:scale-105 active:scale-95 -skew-x-6 shadow-[2px_2px_0px_#000] cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Free Shipping Progress Threshold Meter */}
              <div className="bg-[#1a2030] px-6 py-3 border-b-2 border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#ffe600]" />
                    {isFreeShipping ? (
                      <span className="text-[#10b981] font-black uppercase text-[11px]">★ FREE EXPRESS CAMBODIA DISPATCH UNLOCKED!</span>
                    ) : (
                      <span className="text-zinc-300 font-bold uppercase text-[11px]">
                        Add <strong className="text-[#ffe600] font-black">{formatPrice(amountToFreeShipping)}</strong> for Free Delivery
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#ffe600] font-black tabular-nums">{shippingProgress.toFixed(0)}%</span>
                </div>
                
                {/* Visual bar */}
                <div className="w-full bg-black h-2.5 border border-white/20 -skew-x-4 overflow-hidden p-0.5">
                  <div
                    className="bg-[#10b981] h-full transition-all duration-300 shadow-[0_0_8px_#10b981]"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-black border-2 border-white/20 flex items-center justify-center mx-auto text-[#ffe600] -skew-x-6 shadow-[4px_4px_0px_#000]">
                      <ShoppingBag className="w-8 h-8 stroke-[2]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-black uppercase tracking-tight text-white">YOUR BAG IS EMPTY</h3>
                      <p className="text-xs text-zinc-400 max-w-xs mx-auto font-medium">
                        Equip zero-sugar fuel, cold-brewed tea, or custom shaker bundles.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#ffe600] hover:bg-white text-black font-black uppercase text-xs tracking-wider border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] cursor-pointer"
                    >
                      EXPLORE REQUISITIONS →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.cartItemId}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                          className="flex gap-3 p-3 bg-[#1a2030] border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000] relative group hover:border-[#ffe600] transition-colors"
                        >
                          {/* Item Image */}
                          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white border-2 border-black -skew-x-3 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_#000]">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              onError={(e) => {
                                if (item.product.fallbackImage && e.currentTarget.src !== item.product.fallbackImage) {
                                  e.currentTarget.src = item.product.fallbackImage;
                                }
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Item details */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="text-xs font-black text-white uppercase truncate tracking-tight">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.cartItemId)}
                                  className="text-zinc-400 hover:text-rose-500 p-1 transition-colors shrink-0 cursor-pointer"
                                  title="Remove item"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                              </div>

                              <p className="text-[11px] text-[#10b981] font-bold uppercase truncate">
                                {item.product.flavorName}
                              </p>

                              {item.selectedShakerColor && (
                                <p className="text-[10px] text-zinc-300 uppercase font-bold mt-0.5">
                                  Shaker: <span className="text-[#ffe600]">{item.selectedShakerColor}</span>
                                </p>
                              )}

                              {item.selectedBundleTubs && item.selectedBundleTubs.length > 0 && (
                                <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5 font-bold uppercase">
                                  Tubs: {item.selectedBundleTubs.map(t => t.name).join(', ')}
                                </p>
                              )}
                            </div>

                            {/* Quantity & Price */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center bg-black border-2 border-white/20 -skew-x-4 p-0.5 shadow-[2px_2px_0px_#000]">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                                  className="w-6 h-5 flex items-center justify-center text-zinc-300 hover:text-[#ffe600] cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3 stroke-[3]" />
                                </button>
                                <span className="text-xs font-black text-white px-2 min-w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                                  className="w-6 h-5 flex items-center justify-center text-zinc-300 hover:text-[#ffe600] cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>

                              <span className="text-sm font-black text-[#ffe600] tracking-tight">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>

                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Quick Add Upsell */}
                    {upsellProduct && !cartItems.some(i => i.product.id === upsellProduct.id) && (
                      <div className="mt-4 p-3 bg-black border-2 border-dashed border-[#ffe600]/60 -skew-x-2 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-[#ffe600] uppercase flex items-center gap-1.5 text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" /> RECOMMENDED GEAR PAIRING
                          </span>
                          <span className="text-[10px] text-[#10b981] font-bold uppercase">PROMO</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-black p-0.5 -skew-x-3 shrink-0">
                            <img 
                              src={upsellProduct.image} 
                              alt={upsellProduct.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-white truncate uppercase">{upsellProduct.name}</p>
                            <p className="text-[11px] text-[#ffe600] font-black">{formatPrice(upsellProduct.price)}</p>
                          </div>
                          <button
                            onClick={() => onAddUpsell(upsellProduct)}
                            className="px-3 py-1 bg-[#10b981] hover:bg-[#ffe600] text-black text-[10px] font-black uppercase border border-black -skew-x-6 shadow-[2px_2px_0px_#000] cursor-pointer"
                          >
                            + EQUIP
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer & Checkout Breakdown */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t-2 border-white/10 bg-black space-y-4">
                  
                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PROMO CODE (E.G. SQUAD10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-[#141824] border-2 border-white/20 -skew-x-2 px-3 py-2 text-xs text-white placeholder-zinc-500 uppercase font-black focus:outline-none focus:border-[#ffe600] transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0055ff] hover:bg-[#ffe600] hover:text-black text-white text-xs font-black uppercase border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] transition-colors cursor-pointer"
                      >
                        APPLY
                      </button>
                    </div>
                    {appliedDiscount && (
                      <p className="text-[11px] text-[#10b981] font-black uppercase flex items-center gap-1 pt-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> CODE '{appliedDiscount.code}' ACTIVATED ({appliedDiscount.percent}% DISCOUNT)
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-rose-400 font-bold uppercase pt-1">{promoError}</p>
                    )}
                  </form>

                  {/* Price calculations */}
                  <div className="space-y-1.5 text-xs text-zinc-300 font-medium">
                    <div className="flex justify-between">
                      <span className="uppercase text-[11px]">SUBTOTAL</span>
                      <span className="text-white font-black">{formatPrice(subtotal)}</span>
                    </div>

                    {appliedDiscount && discountAmount > 0 && (
                      <div className="flex justify-between text-[#10b981] font-bold">
                        <span className="uppercase text-[11px]">SQUAD DISCOUNT ({appliedDiscount.code})</span>
                        <span className="font-black">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="uppercase text-[11px]">CAMBODIA DISPATCH</span>
                      <span className={isFreeShipping ? 'text-[#10b981] font-black uppercase' : 'text-white font-bold'}>
                        {isFreeShipping ? 'FREE' : formatPrice(3.99)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2 border-t-2 border-white/10">
                      <span className="text-sm font-black text-white uppercase italic">TOTAL REQUISITION</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#ffe600] block">{formatPrice(finalTotal)}</span>
                        {currency === 'KHR' ? (
                          <span className="text-[10px] text-zinc-400 font-bold block">(${finalTotal.toFixed(2)} USD)</span>
                        ) : (
                          <span className="text-[10px] text-zinc-400 font-bold block">(៛{Math.round(finalTotal * 4100).toLocaleString()} KHR)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <motion.button
                    id="cart-checkout-proceed-btn"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ translateY: -1 }}
                    onClick={() => {
                      onClose();
                      onOpenCheckout(discountAmount, appliedDiscount?.code || '');
                    }}
                    className="w-full py-3.5 bg-[#ffe600] hover:bg-white text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black -skew-x-6 shadow-[5px_5px_0px_#000] transition-all cursor-pointer"
                  >
                    <span>EXECUTE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase pt-0.5">
                    <span>256-BIT SECURE</span>
                    <span>•</span>
                    <span>PHNOM PENH & PROVINCES EXPRESS</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
