import React, { useState } from 'react';
import { Send, Check, X, MessageSquare, Clock } from 'lucide-react';
import sambathAvatar from '../assets/images/regenerated_image_1790326967289.jpg';

export const BorisSupportBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setIsSent(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsSent(false);
    setEmail('');
    setMessage('');
  };

  return (
    <>
      {/* Refined Sambath Support Banner in Persona 5 Theme */}
      <section className="w-full bg-[#0b0d14] py-8 sm:py-10 border-y-4 border-black relative overflow-hidden">
        {/* Halftone Comic Dots Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #0055ff 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left Content: Avatar + Copy */}
          <div className="flex items-center gap-4 sm:gap-5 text-center sm:text-left">
            {/* Sambath Avatar */}
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="w-16 h-16 sm:w-18 sm:h-18 -skew-x-8 overflow-hidden border-3 border-black shadow-[4px_4px_0px_#000] bg-white">
                <img
                  src={sambathAvatar}
                  alt="Sambath from Quick Sip Support"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#ffe600] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -skew-x-12 text-xs">
                HQ
              </div>
            </div>

            {/* Text Details */}
            <div>
              <h3 className="text-lg sm:text-2xl font-black italic text-white uppercase tracking-tight">
                HAVE QUESTIONS OR NEED A FLAVOUR RECOMMENDATION?
              </h3>
              <p className="text-xs sm:text-sm text-[#10b981] font-bold uppercase mt-0.5">
                Sambath and our hydration squad in Cambodia are ready to assist.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0">
            <button
              id="get-in-touch-sambath-btn"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ffe600] hover:bg-white text-black font-black italic text-xs sm:text-sm px-6 py-3 -skew-x-12 border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex items-center gap-2 cursor-pointer uppercase"
            >
              <MessageSquare className="w-4 h-4 stroke-[3]" />
              <span>ASK SAMBATH</span>
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Contact / Ask Sambath Modal in Persona 5 Style */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-[#141824] -skew-x-2 border-4 border-white shadow-[8px_8px_0px_#000] max-w-md w-full p-6 sm:p-7 relative space-y-5 text-white">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black flex items-center justify-center border-2 border-black -skew-x-8 shadow-[2px_2px_0px_#000] cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 -skew-x-8 overflow-hidden border-2 border-black bg-white shrink-0">
                <img
                  src={sambathAvatar}
                  alt="Sambath"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-black italic text-lg uppercase text-white tracking-tight">MESSAGE SAMBATH & SQUAD</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#ffe600] font-bold mt-0.5">
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>TYPICALLY RESPONDS WITHIN 15 MINUTES</span>
                </div>
              </div>
            </div>

            {isSent ? (
              <div className="p-6 text-center space-y-3 bg-black/60 border-2 border-[#10b981] -skew-x-4">
                <div className="w-12 h-12 bg-[#10b981] text-black border-2 border-black flex items-center justify-center mx-auto -skew-x-12 shadow-[3px_3px_0px_#000]">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-black italic uppercase text-white">DISPATCH TRANSMITTED!</h4>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  Thank you! Sambath or one of our beverage specialists will reply directly to <span className="text-[#ffe600] font-bold">{email}</span> shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 bg-[#ffe600] text-black font-black italic text-xs uppercase -skew-x-8 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer mt-2"
                >
                  RETURN TO STORE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase text-zinc-300 mb-1">
                    YOUR EMAIL ADDRESS:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-black/70 border-2 border-white/40 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffe600] -skew-x-4 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-zinc-300 mb-1">
                    HOW CAN WE ASSIST?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about caffeine levels, Cambodian delivery, or custom flavour packs..."
                    className="w-full bg-black/70 border-2 border-white/40 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffe600] -skew-x-4 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0055ff] hover:bg-[#ffe600] text-white hover:text-black font-black italic text-xs uppercase tracking-wider -skew-x-8 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5 stroke-[3]" />
                  <span>TRANSMIT TO SAMBATH ➔</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
