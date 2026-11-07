import React from 'react';
import { Check, X, Sparkles, Zap, ShieldCheck, Leaf } from 'lucide-react';
import { COMPARISON_DATA } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';

export const WhyHolyComparison: React.FC = () => {
  const { formatPrice } = useCurrency();

  return (
    <section id="why-holy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 -skew-x-12 bg-[#ffe600] text-black text-xs font-black italic uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
          <Sparkles className="w-3.5 h-3.5 stroke-[3] text-black" />
          <span>THE PHANTOM BEVERAGE DIFFERENCE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
          SMARTER FORMULATION, ZERO COMPROMISE.
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
          Better for your body, better for your wallet, and engineered to reduce single-use can waste by 90%.
        </p>
      </div>

      {/* 3 Pillars Highlight Boxes (Persona 5 Slanted Cards in Yellow, Green, Blue) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#141824] -skew-x-4 p-7 border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#ffe600] transition-all space-y-3">
          <div className="w-12 h-12 -skew-x-8 bg-[#ffe600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
            <Zap className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-xl font-black italic text-[#ffe600] uppercase tracking-tight">Zero-Crash Energy</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
            NuCaff® micro-encapsulated natural caffeine and L-Theanine ensure a sustained 6-hour focus curve without heart palpitations or sharp energy dips.
          </p>
        </div>

        <div className="bg-[#141824] -skew-x-4 p-7 border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#10b981] transition-all space-y-3">
          <div className="w-12 h-12 -skew-x-8 bg-[#10b981] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
            <Leaf className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-xl font-black italic text-[#10b981] uppercase tracking-tight">90% Less Packaging</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
            One 50-serving Quick Sip tub replaces 50 single-use aluminium cans or plastic bottles. Eliminating canned water transit drastically reduces carbon footprint.
          </p>
        </div>

        <div className="bg-[#141824] -skew-x-4 p-7 border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#0055ff] transition-all space-y-3">
          <div className="w-12 h-12 -skew-x-8 bg-[#0055ff] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-xl font-black italic text-white uppercase tracking-tight">~{formatPrice(0.80)} Per 500ml Drink</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
            Avoid paying {formatPrice(2.50)}+ in convenience stores for canned tap water and high-fructose syrup. Real active botanicals at a fraction of the cost.
          </p>
        </div>
      </div>

      {/* Persona 5 Comparison Table */}
      <div className="bg-[#141824] -skew-x-2 border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-black text-[11px] font-black uppercase tracking-wider text-zinc-400">
                <th className="p-4 sm:p-5">FEATURE / METRIC</th>
                <th className="p-4 sm:p-5 bg-[#0055ff] text-white border-x-2 border-black">
                  <div className="flex items-center gap-1.5 font-black text-xs uppercase italic">
                    <span className="w-2 h-2 bg-[#ffe600] -skew-x-12"></span>
                    <span>QUICK SIP® FORMULATION</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-zinc-300">SUPERMARKET CANS</th>
                <th className="p-4 sm:p-5 text-zinc-300 hidden sm:table-cell">BOTTLED SODAS</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/60 text-xs sm:text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white uppercase tracking-tight">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 bg-[#0055ff]/20 border-x-2 border-black font-black text-[#ffe600]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#ffe600] text-black border border-black flex items-center justify-center shrink-0 -skew-x-12">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="font-bold">{row.holy}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-black text-zinc-400 border border-zinc-600 flex items-center justify-center shrink-0 -skew-x-12">
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{row.cannedEnergy}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400 font-medium hidden sm:table-cell">
                    <span>{row.sodaBottles}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
