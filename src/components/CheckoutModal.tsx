import React, { useState } from 'react';
import { X, Check, Lock, ArrowRight, Truck, Zap, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  promoCode: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  promoCode,
  onClearCart,
}) => {
  const { formatPrice, currency } = useCurrency();
  const [formData, setFormData] = useState({
    email: 'alex.taylor@example.com',
    firstName: 'Alex',
    lastName: 'Taylor',
    address: 'Street 2004, Sen Sok',
    city: 'Phnom Penh',
    phone: '+855 12 345 678',
    paymentMethod: 'aba-khqr',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const isFreeShipping = discountedSubtotal >= 35.0 || promoCode === 'HOLYFREE' || promoCode === 'QUICKSIPFREE';
  const shippingCost = isFreeShipping || cartItems.length === 0 ? 0 : 3.99;
  const total = discountedSubtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch (e) {}
      onClearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-2xl bg-[#141824] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] -skew-x-2 overflow-hidden my-auto text-white"
      >
        {/* Comic background accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ffe600]/15 rotate-45 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black text-white hover:text-black hover:bg-[#ffe600] border-2 border-white/30 hover:border-black transition-transform hover:scale-105 active:scale-95 -skew-x-6 shadow-[3px_3px_0px_#000] z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {!isCompleted ? (
          <div className="space-y-6 relative z-10">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between border-b-2 border-white/10 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#10b981]">
                  <Lock className="w-3.5 h-3.5 stroke-[3]" />
                  <span>256-BIT ENCRYPTED DISPATCH CONTRACT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white italic uppercase tracking-tight mt-0.5">
                  SEAL YOUR REQUISITION
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">TOTAL PAYABLE</span>
                <span className="text-2xl font-black text-[#ffe600] tracking-tight">{formatPrice(total)}</span>
                <span className="text-[10px] text-zinc-400 block font-bold">
                  {currency === 'KHR' ? `($${total.toFixed(2)} USD)` : `(៛${Math.round(total * 4100).toLocaleString()} KHR)`}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#ffe600] tracking-wider block">
                PAYMENT CLEARING GATEWAY
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'aba-khqr', label: 'ABA KHQR SCAN' },
                  { id: 'card', label: 'CARD / APPLE PAY' },
                  { id: 'cod', label: 'CASH ON DELIVERY' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`py-2.5 px-2 border-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer -skew-x-4 ${
                      formData.paymentMethod === method.id
                        ? 'bg-[#0055ff] text-white border-black shadow-[4px_4px_0px_#ffe600] scale-[1.02]'
                        : 'bg-black text-zinc-300 border-white/20 hover:border-white'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">
                  Email Address (Tracking Dispatch & Voucher)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">
                  Cambodia Street & Building Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">City / Province</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Phnom Penh"
                    className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-zinc-300 tracking-wide">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+855 ..."
                    className="w-full bg-[#1a2030] border-2 border-white/20 -skew-x-2 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ffe600] transition-colors"
                  />
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-[#1a2030] p-3.5 border-2 border-black -skew-x-2 shadow-[4px_4px_0px_#000] space-y-1 text-xs text-zinc-300 font-medium">
                <div className="flex justify-between">
                  <span className="uppercase text-[11px]">Items ({cartItems.length})</span>
                  <span className="text-white font-black">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10b981] font-bold">
                    <span className="uppercase text-[11px]">Promo Discount ({promoCode})</span>
                    <span className="font-black">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="uppercase text-[11px]">Cambodia Courier Dispatch</span>
                  <span className={isFreeShipping ? 'text-[#10b981] font-black uppercase' : 'text-white font-bold'}>
                    {isFreeShipping ? 'FREE' : formatPrice(3.99)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#ffe600] hover:bg-white text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black -skew-x-6 shadow-[5px_5px_0px_#000] transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    AUTHENTICATING TRANSACTION...
                  </span>
                ) : (
                  <>
                    <span>CONFIRM & EXECUTE PAYMENT ({formatPrice(total)})</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>

          </div>
        ) : (
          /* Order Complete */
          <div className="text-center py-8 space-y-5 relative z-10 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-[#10b981] border-2 border-black flex items-center justify-center mx-auto text-black -skew-x-6 shadow-[4px_4px_0px_#000]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#ffe600] px-4 py-1 border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] inline-block">
                ★ CONTRACT SEALED • #QS-KH-{Math.floor(100000 + Math.random() * 900000)} ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white italic uppercase tracking-tight">
                MISSION COMMENCED!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto font-medium">
                Requisition confirmed. Dispatch coordinates and 10% next-mission voucher dispatched to <strong className="text-[#ffe600] font-black">{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-[#1a2030] p-4 border-2 border-black -skew-x-2 shadow-[5px_5px_0px_#000] max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-white font-black uppercase">
                <Truck className="w-4 h-4 text-[#ffe600]" /> CAMBODIA DISPATCH COORDINATES:
              </div>
              <p className="text-zinc-300 font-medium">
                {formData.address}, {formData.city}, {formData.phone}
              </p>
              <p className="text-[11px] text-[#10b981] font-bold uppercase pt-1">
                ✓ Estimated Express Courier Transit: 1–2 business days
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-7 py-3 bg-[#0055ff] hover:bg-[#ffe600] hover:text-black text-white font-black text-xs uppercase tracking-wider border-2 border-black -skew-x-6 shadow-[4px_4px_0px_#000] transition-all cursor-pointer"
            >
              RETURN TO HEADQUARTERS
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
