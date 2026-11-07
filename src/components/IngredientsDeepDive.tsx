import React, { useState } from 'react';
import { Zap, Coffee, Droplets, Check, Sparkles, Leaf, ShieldCheck } from 'lucide-react';

export const IngredientsDeepDive: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'nucaff' | 'theanine' | 'tea' | 'hydration'>('nucaff');

  const pillars = {
    nucaff: {
      title: 'NuCaff® Slow-Release Caffeine',
      tagline: 'Micro-encapsulated green coffee bean',
      subtitle: 'Standard energy drinks dump synthetic caffeine into your bloodstream in 15 minutes, causing sudden jitters, elevated heart rate, and severe crashes.',
      howItWorks: 'NuCaff® encapsulates natural caffeine in a plant-lipid layer that breaks down gradually throughout digestion. This delivers sustained, smooth focus for 6+ hours with zero sudden drop-off.',
      bulletList: [
        '100% extracted from unroasted green coffee beans',
        'Sustained mental alertness without cardiovascular spikes',
        'Zero synthetic caffeine anhydrous'
      ],
      icon: <Zap className="w-4 h-4 text-[#ffe600] stroke-[3]" />,
      badge: 'Proven Nootropic'
    },
    theanine: {
      title: 'L-Theanine Synergy',
      tagline: 'Green tea amino acid for flow state',
      subtitle: 'Engineered for sustained focus and cognition. When L-Theanine is combined with natural caffeine, it promotes an alpha brainwave state.',
      howItWorks: 'L-Theanine crosses the blood-brain barrier to promote calm, relaxed alertness. It counteracts vascular constriction, enhancing reaction time, working memory, and mental endurance.',
      bulletList: [
        'Natural amino acid from Camellia sinensis tea leaves',
        'Reduces mental fatigue during intense work or gaming sessions',
        'Eliminates the "jittery" edge of standard energy drinks'
      ],
      icon: <Sparkles className="w-4 h-4 text-[#0055ff] stroke-[3]" />,
      badge: 'Cognitive Flow'
    },
    tea: {
      title: 'Cold-Brewed Pure Tea Extracts',
      tagline: 'Authentic Ceylon, green tea & hibiscus',
      subtitle: 'We never use synthetic brown dyes or high-fructose corn syrups disguised as iced tea.',
      howItWorks: 'Our tea is gently cold-brewed and spray-dried to preserve delicate antioxidants, polyphenol catechins (EGCG), and authentic floral notes with zero added sugar.',
      bulletList: [
        'Directly cold-extracted from premium whole tea leaves',
        'Fortified with prebiotic inulin fiber for digestive wellbeing',
        'Rich in natural Vitamin C for immune support'
      ],
      icon: <Coffee className="w-4 h-4 text-[#ffe600] stroke-[3]" />,
      badge: '100% Botanical'
    },
    hydration: {
      title: 'Bioavailable Electrolyte Matrix',
      tagline: 'Freeze-dried coconut water + Na, K, Mg, Ca',
      subtitle: 'Plain water alone cannot rapidly replenish depleted cells without the precise osmolarity balance of vital electrolytes.',
      howItWorks: 'Freeze-dried young coconut water powder paired with pharmaceutical-grade potassium, magnesium, sodium, and calcium accelerates cellular fluid uptake.',
      bulletList: [
        'Freeze-dried coconut water preserving vital organic micronutrients',
        'Zero caffeine & zero sugar for sports or evening hydration',
        'Infused with antioxidant goji berry extract'
      ],
      icon: <Droplets className="w-4 h-4 text-[#10b981] stroke-[3]" />,
      badge: 'Rapid Recovery'
    }
  };

  const current = pillars[activePillar];

  return (
    <section id="ingredients-science-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 -skew-x-12 bg-[#10b981] text-black text-xs font-black italic uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
          <Leaf className="w-3.5 h-3.5 stroke-[3] text-black" />
          <span>FORMULATION & SCIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black italic text-white uppercase tracking-tight drop-shadow-[2px_2px_0px_#000]">
          ACTIVE BOTANICALS. TOTAL TRANSPARENCY.
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
          Every ingredient in Quick Sip is selected for clean bioavailability, real flavour notes, and zero compromises on your health.
        </p>
      </div>

      {/* 4 Pillar Selection Tabs (Slanted Persona 5 Buttons) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { id: 'nucaff', label: 'NuCaff® Caffeine', icon: <Zap className="w-3.5 h-3.5 stroke-[3]" /> },
          { id: 'theanine', label: 'L-Theanine Synergy', icon: <Sparkles className="w-3.5 h-3.5 stroke-[3]" /> },
          { id: 'tea', label: 'Cold-Brewed Tea', icon: <Coffee className="w-3.5 h-3.5 stroke-[3]" /> },
          { id: 'hydration', label: 'Electrolyte Matrix', icon: <Droplets className="w-3.5 h-3.5 stroke-[3]" /> },
        ].map((item, idx) => {
          const isActive = activePillar === item.id;
          const activeBg = idx % 3 === 0 ? 'bg-[#ffe600] text-black' : idx % 3 === 1 ? 'bg-[#0055ff] text-white' : 'bg-[#10b981] text-black';
          return (
            <button
              key={item.id}
              onClick={() => setActivePillar(item.id as any)}
              className={`flex items-center justify-center gap-2 p-3.5 -skew-x-12 border-2 border-black text-xs font-black italic uppercase transition-all cursor-pointer ${
                isActive
                  ? `${activeBg} shadow-[4px_4px_0px_#000]`
                  : 'bg-[#141824] hover:bg-white text-zinc-300 hover:text-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Card (Persona 5 Slanted Stage) */}
      <div className="bg-[#141824] -skew-x-2 border-4 border-white p-6 sm:p-9 shadow-[8px_8px_0px_#000] relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black italic uppercase tracking-wider px-2.5 py-0.5 -skew-x-8 bg-[#ffe600] text-black border border-black shadow-[2px_2px_0px_#000]">
                {current.badge}
              </span>
              <span className="text-xs text-[#10b981] font-bold uppercase">{current.tagline}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tight">
              {current.title}
            </h3>

            <p className="text-zinc-200 text-sm leading-relaxed font-medium">
              {current.subtitle}
            </p>

            <div className="bg-black/70 p-4 border-2 border-white/30 space-y-1.5 -skew-x-4">
              <span className="text-[10px] font-black uppercase text-[#ffe600] tracking-wider block">Bioavailability Mechanism:</span>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                {current.howItWorks}
              </p>
            </div>

            <ul className="space-y-2 pt-1 text-xs text-zinc-200 font-semibold">
              {current.bulletList.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#10b981] text-black border border-black flex items-center justify-center shrink-0 -skew-x-12">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Clean Standards Checklist in Comic Box */}
          <div className="lg:col-span-4 bg-black/80 p-6 border-3 border-black shadow-[4px_4px_0px_#000] -skew-x-4 space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-white/30 pb-2">
              <ShieldCheck className="w-5 h-5 text-[#10b981] stroke-[3]" />
              <h4 className="text-sm font-black italic text-white uppercase tracking-tight">Quick Sip Clean Standards</h4>
            </div>
            
            <div className="space-y-2.5 text-xs text-zinc-200 font-bold">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span>Sugar Added</span>
                <span className="text-[#ffe600] font-black">0g (None)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span>Synthetic Taurine</span>
                <span className="text-[#ffe600] font-black">0g (None)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span>Artificial Colours</span>
                <span className="text-[#10b981] font-black">0% (Plant-based)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span>Dietary Status</span>
                <span className="text-white font-black">100% Vegan & Gluten-Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Manufacturing</span>
                <span className="text-[#0055ff] text-white font-black">GMP & ISO Certified</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
