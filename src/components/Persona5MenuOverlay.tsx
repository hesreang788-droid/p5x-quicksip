import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, Sparkles, ShoppingBag, Flame, Zap, ArrowRight, Coffee, Droplets, Gift, HelpCircle, MessageSquare } from 'lucide-react';
import { ProductCategory } from '../types';

interface Persona5MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCollab: () => void;
  onOpenQuiz: () => void;
  onOpenBundleBuilder: () => void;
  onOpenCart: () => void;
  onOpenSupport: () => void;
  cartCount: number;
}

export const Persona5MenuOverlay: React.FC<Persona5MenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenCollab,
  onOpenQuiz,
  onOpenBundleBuilder,
  onOpenCart,
  onOpenSupport,
  cartCount,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('p5_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API on user demand
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play synthesized Persona 5 style UI audio
  const playSfx = (type: 'hover' | 'select' | 'open' | 'close') => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'hover') {
        // Quick energetic high-frequency pip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(1180, now + 0.05);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        // Multi-tone comic attack strike chime
        [523.25, 659.25, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.02);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.18);

          gain.gain.setValueAtTime(0.12, now + idx * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.02);
          osc.stop(now + 0.22);
        });
      } else if (type === 'open') {
        // Dramatic slash whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'close') {
        // Reverse sweep cancel sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.09);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // Toggle Sound with persistence
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem('p5_sound_enabled', String(next));
    } catch {}
    if (next) {
      setTimeout(() => playSfx('hover'), 50);
    }
  };

  // Play open sound on modal appearance
  useEffect(() => {
    if (isOpen) {
      playSfx('open');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          playSfx('close');
          onClose();
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          setActiveTab((prev) => (prev + 1) % menuItems.length);
          playSfx('hover');
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
          setActiveTab((prev) => (prev - 1 + menuItems.length) % menuItems.length);
          playSfx('hover');
        } else if (e.key === 'Enter') {
          menuItems[activeTab]?.action();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, activeTab]);

  // Kinetic Particle Bursts (Persona 5 comic stars, jagged shards, slash sparks)
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    rotation: number;
    vRot: number;
    color: string;
    type: 'star' | 'shard' | 'slash';
    alpha: number;
    life: number;
    maxLife: number;
  }

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const spawnBurst = (originX: number, originY: number) => {
    const colors = ['#0055ff', '#10b981', '#ffe600', '#ffffff'];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 9;
      const types: ('star' | 'shard' | 'slash')[] = ['star', 'shard', 'slash'];
      const chosenType = types[Math.floor(Math.random() * types.length)];

      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 16,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: chosenType,
        alpha: 1,
        life: 0,
        maxLife: 28 + Math.random() * 20,
      });
    }

    if (!animFrameRef.current) {
      renderParticles();
    }
  };

  const renderParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.rotation += p.vRot;
      p.life++;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.type === 'star') {
        // Draw 4-pointed P5 star
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      } else if (p.type === 'slash') {
        // Draw long comic speed slash
        ctx.beginPath();
        ctx.moveTo(-p.size * 1.5, -2);
        ctx.lineTo(p.size * 1.5, -2);
        ctx.lineTo(p.size * 1.8, 2);
        ctx.lineTo(-p.size * 1.2, 2);
        ctx.closePath();
        ctx.fill();
      } else {
        // Jagged triangular shard
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.6, p.size * 0.8);
        ctx.lineTo(-p.size * 0.6, p.size * 0.4);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    });

    particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(renderParticles);
    } else {
      animFrameRef.current = null;
    }
  };

  // Canvas size sync
  useEffect(() => {
    if (isOpen) {
      const resize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, [isOpen]);

  const handleTabClick = (e: React.MouseEvent, action: () => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    playSfx('select');
    setTimeout(() => {
      action();
      onClose();
    }, 160);
  };

  const menuItems = [
    {
      id: 'enter-store',
      num: '01',
      title: 'ENTER STORE (EXPLORE ALL)',
      sub: 'Load full Quick Sip store & browse all zero-sugar flavours',
      tag: 'ENTER NOW',
      icon: <ArrowRight className="w-5 h-5 stroke-[3]" />,
      action: () => {
        onSelectCategory('all');
        const el = document.getElementById('shop-catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'collab',
      num: '02',
      title: 'QUICK SIP × HOLY SIP',
      sub: 'Exclusive limited collaboration menu & flavours',
      tag: 'NEW RELEASE',
      icon: <Flame className="w-5 h-5 stroke-[2.5] text-amber-300" />,
      action: () => {
        onOpenCollab();
      },
    },
    {
      id: 'energy-tubs',
      num: '03',
      title: 'ENERGY POWDERS',
      sub: '160mg NuCaff® slow-release caffeine & L-Theanine',
      tag: 'HIGH FOCUS',
      icon: <Zap className="w-5 h-5 stroke-[2.5] text-lime-400" />,
      action: () => {
        onSelectCategory('energy');
        const el = document.getElementById('shop-catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'tea-tubs',
      num: '04',
      title: 'COLD-BREWED ICED TEA',
      sub: 'Real brewed Ceylon tea with natural botanicals',
      tag: 'ZERO CRASH',
      icon: <Coffee className="w-5 h-5 stroke-[2.5] text-orange-400" />,
      action: () => {
        onSelectCategory('iced-tea');
        const el = document.getElementById('shop-catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'hydration-tubs',
      num: '05',
      title: 'ELECTROLYTE HYDRATION',
      sub: 'Freeze-dried coconut water • 100% caffeine-free',
      tag: 'ANYTIME',
      icon: <Droplets className="w-5 h-5 stroke-[2.5] text-sky-400" />,
      action: () => {
        onSelectCategory('hydration');
        const el = document.getElementById('shop-catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'quiz',
      num: '06',
      title: 'FLAVOUR MATCH QUIZ',
      sub: 'Find your custom zero-sugar drink in 30 seconds',
      tag: 'INTERACTIVE',
      icon: <Sparkles className="w-5 h-5 stroke-[2.5] text-purple-300" />,
      action: () => {
        onOpenQuiz();
      },
    },
    {
      id: 'bundle',
      num: '07',
      title: '3-TUB BUNDLE BUILDER',
      sub: 'Mix & match 150 drinks + free 500ml shaker (Save 20%)',
      tag: 'SPECIAL DEAL',
      icon: <Gift className="w-5 h-5 stroke-[2.5] text-emerald-300" />,
      action: () => {
        onOpenBundleBuilder();
      },
    },
    {
      id: 'cart',
      num: '08',
      title: `SQUAD CART (${cartCount})`,
      sub: 'Review your order, voucher codes & express delivery',
      tag: 'CHECKOUT',
      icon: <ShoppingBag className="w-5 h-5 stroke-[2.5]" />,
      action: () => {
        onOpenCart();
      },
    },
    {
      id: 'support',
      num: '09',
      title: 'TALK TO SAMBATH',
      sub: 'Direct support line • Average response under 15 mins',
      tag: 'CAMBODIA HQ',
      icon: <MessageSquare className="w-5 h-5 stroke-[2.5]" />,
      action: () => {
        onOpenSupport();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans">
          
          {/* Layer 1: Dramatic Persona 5 Diagonal Slice Curtains (Blue, Green, Yellow, White) */}
          <motion.div
            initial={{ x: '-100%', skewX: -14 }}
            animate={{ x: '0%', skewX: -14 }}
            exit={{ x: '-100%', skewX: -14 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300, mass: 0.8 }}
            className="absolute -inset-x-32 inset-y-0 bg-[#0055ff] z-10 origin-top"
          />

          <motion.div
            initial={{ x: '100%', skewX: -14 }}
            animate={{ x: '0%', skewX: -14 }}
            exit={{ x: '100%', skewX: -14 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, delay: 0.04 }}
            className="absolute -inset-x-32 inset-y-0 bg-[#080a12] z-20 origin-bottom"
          />

          {/* Halftone Comic Dot Texture Overlay */}
          <div
            className="absolute inset-0 z-25 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFFFFF 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Animated Comic Speed Slash Background Accents */}
          <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[140vw] h-14 bg-[#E60012]/30 -rotate-12 blur-xs" />
            <div className="absolute top-3/5 -left-20 w-[140vw] h-28 bg-[#FFFFFF]/5 -rotate-12 blur-xs" />
          </div>

          {/* Canvas for Interactive Kinetic Particle Bursts */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-40 pointer-events-none"
          />

          {/* Layer 2: Main Menu Foreground Container */}
          <div className="relative z-30 w-full h-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-y-auto">
            
            {/* Top Bar: P5 Calling Card Brand Header + Controls */}
            <div className="flex items-center justify-between gap-4 border-b-4 border-white pb-4">
              <div className="flex items-center gap-3">
                {/* Skewed Blue Brand Tag */}
                <div className="bg-[#0055ff] text-white font-black italic tracking-tighter text-sm sm:text-base px-3 py-1 -skew-x-12 border-2 border-white shadow-[3px_3px_0px_#000]">
                  QUICK SIP
                </div>
                <div className="text-white font-black tracking-wider text-xs sm:text-sm uppercase flex items-center gap-2">
                  <span className="text-[#ffe600] font-black tracking-tight">QUICKSIP MENU</span>
                  <span className="hidden sm:inline text-zinc-300">• TASTE PERFECTION</span>
                </div>
              </div>

              {/* Sound, Enter Store & Close Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={(e) => {
                    handleTabClick(e, () => {
                      onSelectCategory('all');
                      const el = document.getElementById('shop-catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    });
                  }}
                  className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#ffe600] hover:bg-white text-black font-black text-xs uppercase flex items-center gap-1.5 -skew-x-12 border-2 border-black transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  <span>ENTER STORE</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <button
                  onClick={toggleSound}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-900 border-2 border-white text-white text-xs font-bold flex items-center gap-1.5 -skew-x-12 hover:bg-[#10b981] hover:text-black transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                  title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#ffe600]" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-400" />}
                  <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
                </button>

                <button
                  onClick={() => {
                    playSfx('close');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#0055ff] hover:bg-white text-white hover:text-black font-black text-xs uppercase flex items-center gap-1 -skew-x-12 border-2 border-white transition-all shadow-[2px_2px_0px_#000] cursor-pointer"
                  aria-label="Close QuickSip Menu"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                  <span className="hidden sm:inline">EXIT [ESC]</span>
                </button>
              </div>
            </div>

            {/* Central Stage: Slanted Polygon Menu Tabs */}
            <div className="my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
              
              {/* Left Column: The Signature Slanted Menu Stack */}
              <div className="lg:col-span-8 space-y-2.5">
                {menuItems.map((item, idx) => {
                  const isHovered = activeTab === idx;
                  const itemColor = idx % 3 === 0 ? '#0055ff' : idx % 3 === 1 ? '#10b981' : '#ffe600';
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.03, duration: 0.2 }}
                      onMouseEnter={() => {
                        setActiveTab(idx);
                        playSfx('hover');
                      }}
                      onClick={(e) => handleTabClick(e, item.action)}
                      className={`group relative cursor-pointer -skew-x-12 transition-all duration-150 transform ${
                        isHovered ? 'translate-x-3 scale-[1.02] z-20' : 'hover:translate-x-1 z-10'
                      }`}
                    >
                      {/* Polygon Card Body with Dramatic High-Contrast Inversion */}
                      <div
                        className={`p-3 sm:p-4 border-2 sm:border-3 transition-colors flex items-center justify-between gap-4 shadow-[4px_4px_0px_#000] ${
                          isHovered
                            ? 'bg-white text-black border-black'
                            : 'bg-black/90 text-white border-white hover:border-[#ffe600]'
                        }`}
                      >
                        {/* Number & Main Title */}
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <span
                            className={`font-black italic text-sm sm:text-base px-2 py-0.5 border ${
                              isHovered
                                ? 'bg-[#0055ff] text-white border-black'
                                : 'bg-white text-black border-white'
                            }`}
                          >
                            {item.num}
                          </span>

                          <div className="min-w-0">
                            <h3 className="font-black italic text-base sm:text-xl lg:text-2xl tracking-tighter uppercase truncate leading-tight">
                              {item.title}
                            </h3>
                            <p
                              className={`text-[11px] sm:text-xs truncate font-medium ${
                                isHovered ? 'text-zinc-700' : 'text-zinc-400'
                              }`}
                            >
                              {item.sub}
                            </p>
                          </div>
                        </div>

                        {/* Right Pill Badge & Icon */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span
                            className={`hidden sm:inline-block text-[10px] font-black uppercase px-2 py-0.5 border tracking-wider ${
                              isHovered
                                ? 'bg-black text-[#ffe600] border-black'
                                : 'bg-[#10b981] text-black border-black font-black'
                            }`}
                          >
                            {item.tag}
                          </span>

                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center border transition-colors ${
                              isHovered
                                ? 'bg-[#0055ff] text-white border-black'
                                : 'bg-zinc-900 text-white border-white'
                            }`}
                          >
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </div>
                        </div>
                      </div>

                      {/* Accent Slash Indicator on Active Tab */}
                      {isHovered && (
                        <div className="absolute -left-2 top-0 bottom-0 w-2 bg-[#ffe600] border-y-2 border-l-2 border-black" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Persona 5 Cut-In Silhouette & Calling Card Info */}
              <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center text-center space-y-4">
                
                {/* Slanted Calling Card Display in Cobalt Blue */}
                <div className="w-full bg-[#0055ff] border-4 border-white p-6 -skew-x-12 shadow-[8px_8px_0px_#000] relative overflow-hidden text-left">
                  
                  {/* Comic Stars & Halftone Pattern */}
                  <div className="absolute top-2 right-2 text-[#ffe600] text-3xl font-black">
                    ★ ★ ★
                  </div>

                  <span className="text-xs font-black uppercase tracking-widest bg-[#ffe600] text-black px-2.5 py-0.5 border border-black inline-block mb-3">
                    TARGET: ZERO-SUGAR DRINKS
                  </span>

                  <h4 className="text-2xl font-black italic text-white tracking-tighter leading-none mb-2">
                    TAKE YOUR REFRESHMENT
                  </h4>

                  <p className="text-xs text-white/95 font-medium leading-relaxed mb-4">
                    Sir / Madam Drinker: You have been consuming too much supermarket sugar and artificial syrups. Tonight, Quick Sip & Holy Sip will steal your thirst and awaken your clean energy.
                  </p>

                  <div className="border-t-2 border-white/60 pt-3 flex items-center justify-between text-xs font-bold text-white">
                    <span className="text-[#10b981] bg-black/60 px-2 py-0.5 border border-white/40">SQUAD DISPATCH: 1-2 DAYS</span>
                    <span className="text-[#ffe600]">PHNOM PENH HQ</span>
                  </div>

                  <button
                    onClick={(e) => {
                      handleTabClick(e, () => {
                        onSelectCategory('all');
                        const el = document.getElementById('shop-catalog-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      });
                    }}
                    className="w-full mt-4 py-3 bg-[#ffe600] hover:bg-white text-black font-black italic text-xs uppercase tracking-wider border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] transition-all cursor-pointer"
                  >
                    <span>ENTER QUICK SIP STORE ➔</span>
                  </button>
                </div>

                {/* Keyboard Navigation Guide */}
                <div className="bg-black/80 border border-white/30 px-4 py-2 -skew-x-12 text-zinc-300 text-[11px] font-semibold flex items-center gap-3">
                  <span>[W/S] or [↑/↓] NAVIGATE</span>
                  <span>•</span>
                  <span>[ENTER] SELECT</span>
                </div>

              </div>

            </div>

            {/* Bottom Footer Ribbon */}
            <div className="border-t-2 border-white/40 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 font-bold uppercase tracking-wider">
              <div>
                <span>© QUICK SIP × HOLY SIP PHANTOM NAVIGATION SYSTEM</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span>0g SUGAR</span>
                <span>•</span>
                <span>NATURAL BOTANICALS</span>
                <span>•</span>
                <span>EXPRESS CAMBODIA DISPATCH</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
