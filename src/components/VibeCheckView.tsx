import React, { useState, useRef } from 'react';
import { Sparkles, ArrowDown, ChevronDown, CheckCircle2, Navigation } from 'lucide-react';
import { CHAPTERS_DATA } from '../data';
import { ActiveView } from '../types';

interface VibeCheckViewProps {
  setView: (view: ActiveView) => void;
}

export default function VibeCheckView({ setView }: VibeCheckViewProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollPos = el.scrollTop;
    const height = el.clientHeight;
    const currentChapter = Math.round(scrollPos / height);
    if (currentChapter !== activeIdx && currentChapter < CHAPTERS_DATA.length) {
      setActiveIdx(currentChapter);
    }
  };

  const scrollToChapter = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const height = el.clientHeight;
    el.scrollTo({
      top: idx * height,
      behavior: 'smooth'
    });
    setActiveIdx(idx);
  };

  return (
    <div className="flex-1 bg-[#050505] relative h-[calc(100vh-64px)] overflow-hidden select-none">
      
      {/* Floating Indicator Dots on the right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {CHAPTERS_DATA.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollToChapter(idx)}
            className="group flex items-center justify-end gap-3 cursor-pointer"
          >
            <span className={`text-[10px] font-mono tracking-widest text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              idx === activeIdx ? 'text-aura-blue font-bold opacity-100' : 'text-on-surface-variant'
            }`}>
              {item.title}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
              idx === activeIdx 
                ? 'bg-aura-blue border-aura-blue scale-125 shadow-[0_0_12px_#3B82F6]' 
                : 'border-white/30 bg-transparent group-hover:border-white'
            }`} />
          </button>
        ))}
      </div>

      {/* Snap Scrollable Chapters Section Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-y-container no-scrollbar"
      >
        {CHAPTERS_DATA.map((chapter, idx) => (
          <section 
            key={chapter.id}
            className="snap-section relative flex flex-col justify-end p-8 md:p-16 overflow-hidden"
          >
            
            {/* Background hotlinked media elements */}
            <div className="absolute inset-0 z-0">
              <img 
                src={chapter.image} 
                alt={chapter.title}
                className="w-full h-full object-cover opacity-45 scale-100 hover:scale-105 transition-transform duration-[6000ms]"
                referrerPolicy="no-referrer"
              />
              {/* Overlay gradients of Obsidian & Glass */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-[circle_at_bottom_left,rgba(59,130,246,0.1)_0%,transparent_60%] pointer-events-none" />
            </div>

            {/* Floating Top indicators of chapter context */}
            <div className="absolute top-12 left-8 md:left-16 z-20 flex items-center gap-4">
              <span className="font-mono text-5xl md:text-7xl font-bold text-white/5 tracking-tighter">
                {chapter.chapterNum}
              </span>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-aura-blue block">VIBE PROFILE</span>
                <span className="font-display text-sm font-semibold text-white/80">{chapter.accent}</span>
              </div>
            </div>

            {/* Interactive Bottom Details content pane */}
            <div className="relative z-10 max-w-2xl flex flex-col items-start gap-6 pb-8 md:pb-12 animate-fade-in">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono tracking-widest uppercase text-aura-blue">
                <Sparkles size={10} className="animate-pulse" />
                <span>Synchronized Neural Immersion</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">
                {chapter.title}
              </h1>

              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                {chapter.description}
              </p>

              {/* Smart advice bubble tip */}
              <div className="glass-card p-4 rounded-2xl w-full border border-aura-blue/20 hover:border-aura-blue/40 shadow-xl flex gap-3.5 mt-2 bg-gradient-to-r from-aura-blue/5 to-transparent transition-all">
                <div className="w-8 h-8 rounded-full bg-aura-blue/10 flex items-center justify-center shrink-0 border border-aura-blue/20">
                  <Navigation size={12} className="text-aura-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-aura-blue">AURA SECURE TRAVEL ADVICE</p>
                  <p className="text-xs text-on-surface-variant/95 mt-1 font-sans leading-relaxed">{chapter.tip}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => alert(`Synchronizing destination parameters for: ${chapter.title}. This profile is now live in your navigation HUD.`)}
                  className="bg-white text-[#050505] hover:bg-white/95 px-6 py-2.5 rounded-full font-semibold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle2 size={12} />
                  <span>Calibrate Horizon</span>
                </button>
                
                {idx < CHAPTERS_DATA.length - 1 && (
                  <button 
                    onClick={() => scrollToChapter(idx + 1)}
                    className="border border-white/20 hover:bg-white/5 px-6 py-2.5 rounded-full font-semibold text-xs transition-all cursor-pointer flex items-center gap-2 text-white"
                  >
                    <span>Scroll to Chapter {CHAPTERS_DATA[idx + 1].chapterNum}</span>
                    <ChevronDown size={14} className="animate-bounce" />
                  </button>
                )}
              </div>

            </div>

          </section>
        ))}
      </div>

    </div>
  );
}
