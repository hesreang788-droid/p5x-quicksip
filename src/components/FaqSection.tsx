import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const FaqSection: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Quick Sip compare to standard canned energy drinks?',
      a: `Standard energy drinks contain 27g+ of sugar (approx 7 sugar cubes), synthetic taurine, and high acid levels. Quick Sip contains zero sugar, under 18 kcal per serving, and uses NuCaff® micro-encapsulated natural caffeine + L-Theanine for a smooth, steady 6-hour energy curve with no jitters or crash. Plus, Quick Sip costs ~${formatPrice(0.80)} per drink vs ${formatPrice(2.50)}+ in convenience stores.`
    },
    {
      q: 'How much caffeine is in Quick Sip drinks?',
      a: 'Quick Sip Energy contains 160mg of natural caffeine per 500ml serving (roughly equivalent to 2 cups of coffee or 1 standard energy drink). Quick Sip Iced Tea contains only 15–25mg of natural caffeine from real tea leaves. Quick Sip Hydration is 100% caffeine-free and can be enjoyed anytime, even right before bed.'
    },
    {
      q: 'How do you prepare Quick Sip powder?',
      a: 'Fill your Quick Sip Shaker with 500ml of cold still or sparkling water. Add 1 level scoop (or 1 sachet) of powder. Add ice cubes for maximum refreshment, seal the lid tight, and shake vigorously for 10 seconds. It dissolves completely without clumping.'
    },
    {
      q: 'What are the Cambodia delivery times and shipping costs?',
      a: `We ship all Cambodia orders via fast express courier. Delivery is FREE on all orders over ${formatPrice(35)} (or ${formatPrice(2.50)} for smaller orders). Standard delivery takes 1 to 2 working days in Phnom Penh, and 2 to 3 days across all Cambodian provinces.`
    },
    {
      q: 'Are Quick Sip products vegan and gluten-free?',
      a: 'Yes. All Quick Sip Energy, Quick Sip Iced Tea, and Quick Sip Hydration powders are 100% vegan, gluten-free, lactose-free, and contain no artificial azodyes or animal derivatives.'
    },
    {
      q: 'What is included in the Starter Set?',
      a: `The Starter Set includes 14 individual drink sachets (7 bestselling flavours x 2), 1x 500ml BPA-free Quick Sip Shaker in your choice of color, a Squad sticker pack, and a ${formatPrice(5)} discount voucher for your first 50-serving tub.`
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Persona 5 Themed FAQ Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 -skew-x-12 bg-[#ffe600] text-black text-xs font-black italic uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
          <HelpCircle className="w-3.5 h-3.5 stroke-[3] text-black" />
          <span>PHANTOM ARCHIVES • FAQ</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
          EVERYTHING YOU NEED TO KNOW.
        </h2>
        <p className="text-zinc-300 text-sm font-medium">
          Clear answers about preparation, ingredients, and delivery across Cambodia.
        </p>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const numStr = `0${idx + 1}`;
          const badgeCol = idx % 3 === 0 ? 'bg-[#ffe600] text-black' : idx % 3 === 1 ? 'bg-[#0055ff] text-white' : 'bg-[#10b981] text-black';
          
          return (
            <div
              key={idx}
              className={`-skew-x-4 border-2 transition-all overflow-hidden ${
                isOpen
                  ? 'bg-[#141824] border-[#ffe600] shadow-[6px_6px_0px_#000] translate-x-1'
                  : 'bg-[#141824] border-black hover:border-white shadow-[4px_4px_0px_#000]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-xs font-black italic px-2 py-0.5 border border-black shrink-0 -skew-x-8 ${badgeCol}`}>
                    {numStr}
                  </span>
                  <span className={`text-sm sm:text-base font-black italic uppercase tracking-tight transition-colors ${
                    isOpen ? 'text-[#ffe600]' : 'text-white group-hover:text-[#ffe600]'
                  }`}>
                    {faq.q}
                  </span>
                </div>

                <div className={`w-7 h-7 flex items-center justify-center border-2 shrink-0 transition-transform duration-200 -skew-x-8 ${
                  isOpen
                    ? 'bg-[#ffe600] text-black border-black rotate-180'
                    : 'bg-black text-white border-white/40 group-hover:border-[#ffe600]'
                }`}>
                  <ChevronDown className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-3 text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium border-t-2 border-white/20 animate-in fade-in">
                  <div className="bg-black/60 p-4 border border-white/20 -skew-x-2">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
