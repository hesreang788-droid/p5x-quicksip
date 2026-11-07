import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Zap, Coffee, Droplets } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface FlavorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FlavorQuizModal: React.FC<FlavorQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onQuickView,
}) => {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'energy' | 'tea' | 'hydration'>('energy');
  const [tastePreference, setTastePreference] = useState<'sweet-berry' | 'citrus-sour' | 'tropical-peach'>('sweet-berry');
  const [caffeineLevel, setCaffeineLevel] = useState<'full' | 'mild' | 'zero'>('full');

  if (!isOpen) return null;

  const handleFinishQuiz = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setStep(4);
  };

  const getRecommendations = (): Product[] => {
    if (goal === 'hydration' || caffeineLevel === 'zero') {
      return products.filter(p => p.category === 'hydration').slice(0, 2);
    }
    if (goal === 'tea' || caffeineLevel === 'mild') {
      return products.filter(p => p.category === 'iced-tea').slice(0, 2);
    }
    if (tastePreference === 'citrus-sour') {
      return products.filter(p => p.id.includes('citrus') || p.id.includes('apple') || p.id.includes('starter-set-energy')).slice(0, 2);
    }
    return products.filter(p => p.id.includes('raspberry') || p.id.includes('shark') || p.isStarterSet).slice(0, 2);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        id="flavor-quiz-modal"
        className="relative w-full max-w-2xl bg-[#141824] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] -skew-x-2 overflow-hidden my-auto text-white"
      >
        {/* Decorative Persona 5 comic stripes */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#0055ff]/20 rotate-45 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#ffe600]/15 -rotate-12 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black text-white hover:text-black hover:bg-[#ffe600] border-2 border-white/30 hover:border-black transition-transform hover:scale-105 active:scale-95 -skew-x-6 shadow-[3px_3px_0px_#000] z-20 cursor-pointer"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {step < 4 ? (
          <div className="space-y-6 relative z-10">
            
            {/* Step header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-3 py-1 border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] inline-block">
                  PHASE 0{step} / 03
                </span>
                <span className="text-xs font-black text-[#10b981] flex items-center gap-1.5 uppercase tracking-wide bg-black/40 px-2.5 py-0.5 border border-[#10b981]/40 -skew-x-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" /> 30-Sec Flavour Analysis
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight italic uppercase">
                {step === 1 && "What is your primary drink goal?"}
                {step === 2 && "What fruit flavours hit your palate?"}
                {step === 3 && "Dial in your target caffeine potency:"}
              </h2>
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  type="button"
                  onClick={() => setGoal('energy')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    goal === 'energy'
                      ? 'bg-[#0055ff] text-white border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#ffe600]'
                  }`}
                >
                  <div className={`w-9 h-9 border-2 border-black flex items-center justify-center -skew-x-6 font-black ${goal === 'energy' ? 'bg-[#ffe600] text-black shadow-[2px_2px_0px_#000]' : 'bg-black text-[#ffe600]'}`}>
                    <Zap className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">High Focus & Energy</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    NuCaff® slow-release fuel for gaming, late-night code, and deep study sprints.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal('tea')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    goal === 'tea'
                      ? 'bg-[#10b981] text-black border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#10b981]'
                  }`}
                >
                  <div className={`w-9 h-9 border-2 border-black flex items-center justify-center -skew-x-6 font-black ${goal === 'tea' ? 'bg-black text-[#10b981] shadow-[2px_2px_0px_#000]' : 'bg-black text-[#10b981]'}`}>
                    <Coffee className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Cold-Brewed Tea</h3>
                  <p className={`text-xs leading-relaxed font-medium ${goal === 'tea' ? 'text-black/90' : 'text-zinc-300'}`}>
                    Real steeped tea leaves with zero sugar. Smooth, botanical, all-day sip.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setGoal('hydration')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    goal === 'hydration'
                      ? 'bg-[#0055ff] text-white border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#0055ff]'
                  }`}
                >
                  <div className={`w-9 h-9 border-2 border-black flex items-center justify-center -skew-x-6 font-black ${goal === 'hydration' ? 'bg-[#ffe600] text-black shadow-[2px_2px_0px_#000]' : 'bg-black text-[#0055ff]'}`}>
                    <Droplets className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Pure Hydration</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    Zero caffeine, full coconut mineral electrolytes for sports, gym & evenings.
                  </p>
                </button>
              </div>
            )}

            {/* Step 2: Taste Preference */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  type="button"
                  onClick={() => setTastePreference('sweet-berry')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    tastePreference === 'sweet-berry'
                      ? 'bg-[#0055ff] text-white border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#ffe600]'
                  }`}
                >
                  <span className="text-2xl block">🫐 🍓</span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Sweet & Berry</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    Blue Raspberry, wild woodland berry, and lush candy-crisp finish.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTastePreference('citrus-sour')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    tastePreference === 'citrus-sour'
                      ? 'bg-[#10b981] text-black border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#10b981]'
                  }`}
                >
                  <span className="text-2xl block">🍋 🍏</span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Crisp & Tangy</h3>
                  <p className={`text-xs leading-relaxed font-medium ${tastePreference === 'citrus-sour' ? 'text-black/90' : 'text-zinc-300'}`}>
                    Crisp Granny Smith apple, calamansi lime, and sour shock punch.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTastePreference('tropical-peach')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    tastePreference === 'tropical-peach'
                      ? 'bg-[#ffe600] text-black border-black shadow-[6px_6px_0px_#0055ff] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#ffe600]'
                  }`}
                >
                  <span className="text-2xl block">🍑 🍍</span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Juicy & Tropical</h3>
                  <p className={`text-xs leading-relaxed font-medium ${tastePreference === 'tropical-peach' ? 'text-black/90' : 'text-zinc-300'}`}>
                    White peach iced tea, passionfruit nectar, and tropical sun notes.
                  </p>
                </button>
              </div>
            )}

            {/* Step 3: Caffeine Potency */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  type="button"
                  onClick={() => setCaffeineLevel('full')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    caffeineLevel === 'full'
                      ? 'bg-[#0055ff] text-white border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#ffe600]'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-2 py-0.5 border border-black inline-block -skew-x-6">
                    160MG NUCAFF®
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Full Energy Kick</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    Timed-release encapsulation: 6+ hours of smooth laser focus with zero crash.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCaffeineLevel('mild')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    caffeineLevel === 'mild'
                      ? 'bg-[#10b981] text-black border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#10b981]'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white text-black px-2 py-0.5 border border-black inline-block -skew-x-6">
                    15MG TEA CAFFEINE
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Gentle & Botanical</h3>
                  <p className={`text-xs leading-relaxed font-medium ${caffeineLevel === 'mild' ? 'text-black/90' : 'text-zinc-300'}`}>
                    Pure leaf steeped notes. Enough kick for refreshing all-day sipping.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCaffeineLevel('zero')}
                  className={`p-4 sm:p-5 border-3 text-left space-y-2.5 transition-all cursor-pointer -skew-x-2 ${
                    caffeineLevel === 'zero'
                      ? 'bg-[#0055ff] text-white border-black shadow-[6px_6px_0px_#ffe600] scale-[1.02]'
                      : 'bg-[#1a2030] hover:bg-[#222b40] text-white border-black shadow-[4px_4px_0px_#000] hover:border-[#0055ff]'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black px-2 py-0.5 border border-black inline-block -skew-x-6">
                    0MG CAFFEINE
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight">Pure Caffeine-Free</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    Zero stimulants. 100% hydration with real potassium, magnesium & zinc.
                  </p>
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-5 border-t-2 border-white/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Previous
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-[#ffe600] hover:bg-white text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-black -skew-x-6 shadow-[4px_4px_0px_#000] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                <button
                  id="finish-flavor-quiz-btn"
                  onClick={handleFinishQuiz}
                  className="px-7 py-3 bg-[#10b981] hover:bg-[#ffe600] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-black -skew-x-6 shadow-[5px_5px_0px_#000] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Execute Flavour Match</span>
                  <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Quiz Results Screen - Persona 5 styled */
          <div className="space-y-6 relative z-10 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#10b981] px-4 py-1 border-2 border-black -skew-x-6 shadow-[3px_3px_0px_#000] inline-block">
                ★ TACTICAL FLAVOUR MATCH COMPLETE ★
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white italic uppercase tracking-tight">
                RECOMMENDED FOR YOU
              </h2>
              <p className="text-xs text-zinc-300 font-medium max-w-md mx-auto">
                Engineered for <span className="text-[#ffe600] font-black uppercase">{tastePreference.replace('-', ' ')}</span> flavor profiles with <span className="text-[#10b981] font-black uppercase">{caffeineLevel} caffeine</span> potency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 bg-[#1a2030] border-3 border-black shadow-[6px_6px_0px_#000] -skew-x-2 flex flex-col justify-between space-y-4 hover:border-[#ffe600] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 bg-white border-2 border-black p-1 -skew-x-3 shadow-[2px_2px_0px_#000] shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        onError={(e) => {
                          if (rec.fallbackImage && e.currentTarget.src !== rec.fallbackImage) {
                            e.currentTarget.src = rec.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="inline-block text-[10px] font-black uppercase bg-[#0055ff] text-white px-2 py-0.5 border border-black mb-1 -skew-x-6">
                        {rec.badge || 'MATCH'}
                      </div>
                      <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">{rec.name}</h4>
                      <p className="text-[11px] text-[#10b981] font-bold uppercase truncate">{rec.flavorName}</p>
                      <p className="text-sm font-black text-[#ffe600] mt-1 tracking-tight">{formatPrice(rec.price)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => onQuickView(rec)}
                      className="flex-1 py-2 bg-black hover:bg-zinc-800 text-white font-black text-xs border-2 border-white/30 hover:border-white uppercase tracking-wider -skew-x-6 shadow-[2px_2px_0px_#000] transition-colors cursor-pointer text-center"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(rec);
                        onClose();
                      }}
                      className="flex-1 py-2 bg-[#ffe600] hover:bg-white text-black font-black text-xs border-2 border-black uppercase tracking-wider -skew-x-6 shadow-[3px_3px_0px_#000] hover:scale-105 active:scale-95 transition-transform cursor-pointer text-center"
                    >
                      Take It!
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-white/10">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#ffe600] font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Re-Run Analysis</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0055ff] hover:bg-[#ffe600] hover:text-black text-white text-xs font-black uppercase tracking-wider border-2 border-black -skew-x-6 shadow-[4px_4px_0px_#000] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Enter Full Store →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
