import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface HeroVisualPodsProps {
  onSelectFlavor?: (flavor: string) => void;
}

export const HeroVisualPods: React.FC<HeroVisualPodsProps> = ({ onSelectFlavor }) => {
  const [activePod, setActivePod] = useState<number>(0);
  const [intensityDial, setIntensityDial] = useState<number>(3);

  const pods = [
    {
      name: 'Peach Iced Tea',
      tag: 'Real Tea Extract',
      bgColor: 'from-amber-500 to-orange-500',
      badge: 'Bestseller',
      fruit: '🍑',
      podBg: '#f97316',
    },
    {
      name: 'Sour Apple Zing',
      tag: 'Crisp & Tangy',
      bgColor: 'from-emerald-500 to-green-600',
      badge: 'New Drop',
      fruit: '🍏',
      podBg: '#10b981',
    },
    {
      name: 'Sicilian Lemon',
      tag: 'Floral Citrus',
      bgColor: 'from-amber-400 to-yellow-500',
      badge: 'Top Rated',
      fruit: '🍋',
      podBg: '#eab308',
    },
    {
      name: 'Wild Berry Chill',
      tag: 'Summer Berries',
      bgColor: 'from-rose-500 to-pink-600',
      badge: 'Fan Favorite',
      fruit: '🫐',
      podBg: '#f43f5e',
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center select-none">
      
      {/* Tabletop Surface / Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-end justify-center pb-2">
        
        {/* Soft shadow under products on stage */}
        <div className="absolute bottom-4 w-11/12 h-6 bg-zinc-900/5 rounded-full blur-md" />

        {/* 4 Pod Boxes */}
        <div className="relative z-10 flex items-end justify-center -space-x-3 sm:-space-x-5 mb-2">
          {pods.map((pod, index) => {
            const isSelected = activePod === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setActivePod(index);
                  if (onSelectFlavor) onSelectFlavor(pod.name);
                }}
                className={`relative cursor-pointer transition-all duration-200 group ${
                  isSelected ? '-translate-y-3 scale-105 z-20' : 'hover:-translate-y-1 z-10 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Clean Packaging Card */}
                <div
                  className={`w-20 sm:w-26 md:w-28 h-36 sm:h-46 md:h-52 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between border border-zinc-200/80 shadow-soft-sm bg-gradient-to-b ${pod.bgColor} text-white`}
                >
                  {/* Top Branding */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[9px] tracking-tight bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded">
                      QUICK SIP
                    </span>
                    <span className="text-[8px] font-medium uppercase bg-white/20 backdrop-blur-xs text-white px-1.5 py-0.5 rounded-full">
                      3-Pack
                    </span>
                  </div>

                  {/* Fruit Icon */}
                  <div className="my-auto flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl sm:text-2xl shadow-soft-xs border border-white/20">
                      {pod.fruit}
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="bg-black/60 backdrop-blur-xs text-white rounded-lg p-1.5 text-center">
                    <div className="text-[8px] sm:text-[9px] font-medium tracking-tight truncate">
                      {pod.name}
                    </div>
                    <div className="text-[7px] text-zinc-300 font-normal">
                      0% Sugar • Cold Brew
                    </div>
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[9px] font-medium px-2 py-0.5 rounded-full shadow-soft-xs whitespace-nowrap">
                    Active
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Syrup Bottle Graphic with Flavor Dial */}
        <div className="relative z-20 -ml-2 sm:-ml-4 flex flex-col items-center">
          <div className="relative w-22 sm:w-28 md:w-32 h-44 sm:h-58 md:h-64 flex flex-col items-center">
            
            {/* Bottle Cap with Dial */}
            <div className="w-10 sm:w-14 h-7 sm:h-8 bg-zinc-900 rounded-t-lg border border-zinc-800 flex items-center justify-center shadow-soft-xs relative">
              <span className="text-[8px] font-medium text-zinc-300 uppercase tracking-wider">Dial {intensityDial}</span>
            </div>

            {/* Bottle Neck */}
            <div className="w-6 sm:w-8 h-3 bg-zinc-200 border-x border-zinc-300" />

            {/* Bottle Body */}
            <div className="w-full flex-1 bg-white/95 backdrop-blur-md rounded-b-2xl border border-zinc-200/80 shadow-soft-md p-3 flex flex-col items-center justify-between relative overflow-hidden">
              
              <div className="font-semibold text-xs sm:text-sm text-zinc-400 tracking-widest transform -rotate-90 my-auto">
                QUICK SIP
              </div>

              {/* Flavor Pod Loaded inside the chamber */}
              <div
                className="w-full py-1 px-2 rounded-lg text-center text-white font-medium text-[9px] sm:text-[10px] shadow-soft-xs flex items-center justify-between"
                style={{ backgroundColor: pods[activePod].podBg }}
              >
                <span>{pods[activePod].fruit}</span>
                <span className="truncate">{pods[activePod].name}</span>
                <span className="text-[7px] bg-black/30 px-1 rounded">12L</span>
              </div>

            </div>

            {/* Dial Controller Interactive Tooltip */}
            <div className="absolute -bottom-2.5 bg-zinc-900 text-white text-[9px] font-normal px-2.5 py-1 rounded-full border border-zinc-800 shadow-soft-xs whitespace-nowrap flex items-center gap-1.5">
              <span className="text-zinc-400">Intensity:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIntensityDial(level);
                    }}
                    className={`w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-medium transition-colors ${
                      intensityDial >= level ? 'bg-amber-400 text-zinc-950 font-semibold' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Flavor Pod Switcher Bar */}
      <div className="mt-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-200/80 text-[11px] text-zinc-600 shadow-soft-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Selected profile:</span>
        <span className="font-medium text-zinc-900">
          {pods[activePod].name}
        </span>
      </div>

    </div>
  );
};
