import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';

export const SquadReviews: React.FC = () => {
  return (
    <section id="community-squad-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Join the squad! Section in Persona 5 Theme */}
      <div className="bg-[#141824] -skew-x-2 border-4 border-white p-8 sm:p-12 shadow-[8px_8px_0px_#000] overflow-hidden text-white relative">
        
        {/* Halftone Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffe600 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 -skew-x-12 bg-[#0055ff] text-white text-xs font-black italic uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
              <Users className="w-3.5 h-3.5 stroke-[3] text-[#ffe600]" />
              <span>COMMUNITY & CULTURE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black italic text-white uppercase tracking-tight leading-tight drop-shadow-[2px_2px_0px_#000]">
              JOIN THE QUICK SIP SQUAD.
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
              Over 500,000 creators, athletes, and iced beverage enthusiasts across Southeast Asia have transitioned to Quick Sip. Follow along for limited seasonal drops and community events.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#ffe600] hover:bg-white text-black font-black italic text-xs sm:text-sm px-6 py-3 -skew-x-8 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex items-center gap-1.5 uppercase"
              >
                <span>FOLLOW @QUICKSIP.KH</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#10b981] hover:bg-white text-black font-black italic text-xs sm:text-sm px-6 py-3 -skew-x-8 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex items-center gap-1.5 uppercase"
              >
                <span>JOIN DISCORD SQUAD</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>
          </div>

          {/* Wooden slatted wall community photo in comic border */}
          <div className="lg:col-span-6">
            <div className="relative -skew-x-4 overflow-hidden border-3 border-black shadow-[5px_5px_0px_#000] aspect-16/10 group bg-black">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Quick Sip Squad Community"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black text-[#ffe600] text-[10px] font-black italic uppercase px-3 py-1 -skew-x-8 border border-white shadow-[2px_2px_0px_#000]">
                QUICK SIP HQ CREW
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
