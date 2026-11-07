import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Leaf, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuickSipLogo } from './QuickSipLogo';
import { useCurrency } from '../context/CurrencyContext';
import footerLogo from '../assets/images/regenerated_image_1794022417264.png';

export const Footer: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (e) {}
    }
  };

  return (
    <footer className="bg-[#0b0d14] text-zinc-300 text-xs mt-16 border-t-4 border-black relative overflow-hidden">
      
      {/* Halftone Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #0055ff 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top Newsletter Bar (Persona 5 Calling Card Style) */}
      <div className="relative z-10 border-b-4 border-black py-12 bg-[#141824]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <span className="text-[10px] font-black italic uppercase tracking-wider text-black bg-[#ffe600] border-2 border-black px-3 py-1 -skew-x-12 inline-block shadow-[2px_2px_0px_#000]">
                EXCLUSIVE PHANTOM PASS
              </span>
              <h3 className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
                UNLOCK {formatPrice(5)} OFF YOUR FIRST ORDER
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                Be the first to access limited seasonal flavour drops, collaborative releases, and subscriber privileges.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:ml-auto">
                  <div className="relative flex-1 -skew-x-4">
                    <Mail className="w-4 h-4 text-[#ffe600] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/90 border-2 border-white/40 pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffe600] transition-colors font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 -skew-x-12 bg-[#ffe600] hover:bg-white text-black font-black italic text-xs uppercase flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer transition-all"
                  >
                    <span>CLAIM {formatPrice(5)}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </form>
              ) : (
                <div className="bg-black/80 border-2 border-[#10b981] p-4 -skew-x-4 text-center text-xs text-white font-bold max-w-md mx-auto lg:ml-auto shadow-[4px_4px_0px_#000]">
                  ✨ Welcome to the squad! Use code <strong className="text-[#ffe600] font-black">SQUAD10</strong> at checkout.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info with Black QuickSip Logo */}
          <div className="col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-1.5 -skew-x-6 bg-black border-2 border-black shadow-[3px_3px_0px_#000] inline-flex items-center justify-center">
                <img
                  src={footerLogo}
                  alt="QuickSip Logo"
                  className="h-10 sm:h-12 w-auto max-w-[170px] object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]"
                />
              </div>
              <span className="text-[10px] font-black italic uppercase tracking-wider bg-[#0055ff] text-white px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] -skew-x-8">
                OFFICIAL STORE
              </span>
            </div>
            <p className="text-xs text-zinc-300 max-w-sm leading-relaxed font-medium">
              Quick Sip crafts zero-sugar functional beverages with clean botanical energy. Powered by NuCaff® slow-release caffeine, real brewed tea, and mineral electrolytes.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-xs pt-1">
              <span className="flex items-center gap-1.5 bg-black px-3 py-1 -skew-x-6 border-2 border-black shadow-[2px_2px_0px_#000] text-[#10b981] font-black"><Leaf className="w-3.5 h-3.5 stroke-[3]" /> 100% VEGAN</span>
              <span className="flex items-center gap-1.5 bg-black px-3 py-1 -skew-x-6 border-2 border-black shadow-[2px_2px_0px_#000] text-[#ffe600] font-black"><ShieldCheck className="w-3.5 h-3.5 stroke-[3]" /> ZERO SUGAR</span>
              <span className="flex items-center gap-1.5 bg-black px-3 py-1 -skew-x-6 border-2 border-black shadow-[2px_2px_0px_#000] text-white font-black"><Zap className="w-3.5 h-3.5 text-[#0055ff] stroke-[3]" /> CLEAN FOCUS</span>
            </div>
          </div>

          {/* Col 2: Drinks */}
          <div className="space-y-3 text-left">
            <p className="font-black italic text-white uppercase text-xs tracking-wider border-b-2 border-[#0055ff] pb-1 inline-block -skew-x-6">
              FLAVOURS & RANGE
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 font-medium">
              <li><a href="#shop-catalog-section" className="hover:text-[#ffe600] transition-colors">Quick Sip Energy (50 Servings)</a></li>
              <li><a href="#shop-catalog-section" className="hover:text-[#ffe600] transition-colors">Quick Sip Iced Tea (Real Brewed)</a></li>
              <li><a href="#shop-catalog-section" className="hover:text-[#ffe600] transition-colors">Quick Sip Hydration (Zero Caff)</a></li>
              <li><a href="#starter-sets" className="hover:text-[#ffe600] transition-colors">Starter Sets & Shakers</a></li>
              <li><a href="#shop-catalog-section" className="hover:text-[#ffe600] transition-colors">Collaborative Editions</a></li>
            </ul>
          </div>

          {/* Col 3: Company & Squad */}
          <div className="space-y-3 text-left">
            <p className="font-black italic text-white uppercase text-xs tracking-wider border-b-2 border-[#10b981] pb-1 inline-block -skew-x-6">
              SCIENCE & STORY
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 font-medium">
              <li><a href="#ingredients-science-section" className="hover:text-[#10b981] transition-colors">The NuCaff® Formulation</a></li>
              <li><a href="#why-holy" className="hover:text-[#10b981] transition-colors">Comparison vs Energy Cans</a></li>
              <li><a href="#community-squad-section" className="hover:text-[#10b981] transition-colors">Creator & Esports Partners</a></li>
              <li><span className="text-zinc-500 cursor-default">Sustainability & Zero-Can Waste</span></li>
            </ul>
          </div>

          {/* Col 4: Help & Cambodia Shipping */}
          <div className="space-y-3 text-left">
            <p className="font-black italic text-white uppercase text-xs tracking-wider border-b-2 border-[#ffe600] pb-1 inline-block -skew-x-6">
              SUPPORT & DELIVERY
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 font-medium">
              <li><span className="text-[#ffe600] font-black">Free delivery over {formatPrice(35)}</span></li>
              <li><span>Phnom Penh & Provinces Express</span></li>
              <li><span>30-Day Taste Satisfaction</span></li>
              <li><span className="text-white font-bold">support@quicksip.com.kh</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with P5 Comic Payment Pills */}
        <div className="mt-12 pt-8 border-t-2 border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px] font-semibold">
          <p>© {new Date().getFullYear()} Quick Sip Cambodia. Handcrafted with zero sugar & clean botanicals.</p>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-[#ffe600] font-black">ABA KHQR</span>
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-white font-black">Apple Pay</span>
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-white font-black">Google Pay</span>
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-white font-black">Visa</span>
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-white font-black">Mastercard</span>
            <span className="bg-black border border-white/30 px-2 py-0.5 -skew-x-8 text-[#10b981] font-black">Cash On Delivery</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
