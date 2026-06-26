import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  Car, 
  Music, 
  Compass, 
  DollarSign, 
  Clock, 
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Trip, ActiveView } from '../types';

interface SpatialItineraryViewProps {
  trip: Trip;
  setView: (view: ActiveView) => void;
}

export default function SpatialItineraryView({ trip, setView }: SpatialItineraryViewProps) {
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(1); // Default to the middle "Taxi Transit" or "Museum"

  const timelineNodes = [
    {
      time: '14:00',
      label: 'Archival Search',
      title: 'Aura Search Calibrated',
      location: 'Berlin Hub',
      description: 'Aura identified critical Brutalist geometry monuments and reserve slots at underground cellars.',
      cost: 'Free',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzwDU9nybQZAg7iTmKEMUrRlabd-R-q85flneCOsCrUYkqR9S6Q68M-lyS0FIpBgHy1iyn_8WQiiI4UKaajcyoSaRsS2tqhJUua_XZlYKb8J1pft0XwRI-HTSLzmk3N2yDdIBT02XNMSEteUy0fjdxxlJnAwcnpuu_1nxsofRqbe7GSFCfwIKWRsKzt_cZ-2-cuJWASDu-Sroua2DhYQsYIlev1IN1DvdTlZJC7EQ9OaeffyNP0opoAmM0ug3fBlNV9iimg28VYEs',
      type: 'search'
    },
    {
      time: '18:00',
      label: 'Museum Visit',
      title: 'Brutalist Museum Tour',
      location: 'Mitte District, Berlin',
      description: 'Private architectural tour highlighting 1970s geometric archiving and expressive raw concrete works.',
      cost: '€45.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ynx6UNmbqRhO4BU_ASqt6sD5DcxwMpTzxOW_fdQwoIBAnIqzkaQKaEeKS6xjBwnh4tkuEvk2MLjpokQTHQE5ZmpJMeu4Fc_xwGPP0xZUxupJ1fXzUIpi018C6hFLCtkSxejgyvRCvHizHQVATY1aiu1ewPkofzFZuVJHGm0VXaa1faNOIOYdAsnR5BS68jGxm71AUTtzFmMVoTwhIqlBoevCMsTPtQimvov60F__FNjlY1NADk6iprRL0tWihwNhezs8M0M5dlM',
      type: 'museum'
    },
    {
      time: '20:00',
      label: 'Taxi Transit',
      title: 'Aura Transit System (Taxi)',
      location: 'Mitte ➔ Kreuzberg',
      description: 'Aura automated vehicle routing through city alleys, avoiding current demonstration checkpoints.',
      cost: '€12.50',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXiXobakaUl5PnoWSw3a4gPebfF3xe_jcXSRAhWHloGG6mL6W4ap-g22_m8z61xQJ9xaxCcUUID29pAsK4ZX5LHgVOFPPzFOTkY8pbZIO1GbzywPn4EkS8gtGy6NvDomCGAJuSEapTZJKo9HCWs0DllVAsVJwv7nVEiqNDB6QGfEjoD6783IonBYHsU0cBwJY9gJIUFD3vz9EwOHkPffHZ50WpE_h39JFimvSOys9u5V4ywe0YE_5n2zDwU-58Gb7k15EAlZIGNgQ',
      type: 'taxi'
    },
    {
      time: '22:00',
      label: 'Jazz Session',
      title: 'Hidden Undergound Jazz Cellar',
      location: 'Kreuzberg, Berlin',
      description: 'An impeccably hidden live session cellar featuring modular vinyl setups and intimate table stages.',
      cost: '€25.00 entry',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD75ryoCzi68c8pk5vYst12KGh1PZTPCVXVGk6ZvzErJIH6d-Uo3jK57GV-d6d2U-qKBuh9Ju0Pmvbif4K1VxMX5hcEcV6PM97qad8XT9DsCn-GMuV1kmzSRtMh8Zy9EZEjr4PKGe5luDbE7hHrfIuzUx5uTKJAKiXk_fySpzvevmtEPUiidMICxWf9QHGREUM2x8mVLabRKe6NUa66k5I0vKFjNPpA2KR2uL9qvxfxEkuleqHmiGP831mmbyJmn8Eq776fQ-7M9cc',
      type: 'jazz'
    }
  ];

  const activeNode = timelineNodes[selectedNodeIdx];

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden text-on-surface bg-[#050505] relative select-none">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Left Pane: Route Transit Path SVG visualization map */}
      <section className="flex-[1.3] relative bg-[#070707] border-r border-white/5 flex flex-col justify-between p-8 md:p-12 h-full">
        
        {/* Header summary info */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-aura-blue rounded-full animate-ping" />
            <span className="font-mono text-xs text-aura-blue uppercase tracking-widest">Berlin, Germany</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tighter leading-none mb-4">
            Day 04 Timeline
          </h2>
          <p className="text-sm text-on-surface-variant font-mono flex items-center gap-1.5">
            <Clock size={14} className="text-aura-blue" />
            <span>8:25 PM • Aura Transit System: Optimized Path Active</span>
          </p>
        </div>

        {/* High-fidelity SVG transit path vector visualization */}
        <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
          
          <svg className="w-full max-w-[500px] aspect-video" viewBox="0 0 500 280">
            
            {/* Custom vector filters for glowing shadows */}
            <defs>
              <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Path lines */}
            {/* Path 1: Archival to Museum */}
            <path 
              d="M 50,140 Q 150,70 230,140" 
              fill="none" 
              stroke={selectedNodeIdx >= 1 ? "#3B82F6" : "rgba(255,255,255,0.1)"} 
              strokeWidth="2" 
              strokeDasharray={selectedNodeIdx === 1 ? "5,5" : ""}
              className="transition-all duration-500"
            />
            {/* Path 2: Museum to Taxi */}
            <path 
              d="M 230,140 Q 320,210 350,140" 
              fill="none" 
              stroke={selectedNodeIdx >= 2 ? "#3B82F6" : "rgba(255,255,255,0.1)"} 
              strokeWidth="2.5" 
              strokeDasharray="4,4"
              className="transition-all duration-500"
            />
            {/* Path 3: Taxi to Jazz Cellar */}
            <path 
              d="M 350,140 Q 400,90 450,140" 
              fill="none" 
              stroke={selectedNodeIdx >= 3 ? "#3B82F6" : "rgba(255,255,255,0.1)"} 
              strokeWidth="2"
              className="transition-all duration-500"
            />

            {/* Glowing active pulse circle */}
            {selectedNodeIdx === 1 && <circle cx="230" cy="140" r="14" fill="rgba(59,130,246,0.2)" className="animate-pulse" />}
            {selectedNodeIdx === 2 && <circle cx="350" cy="140" r="14" fill="rgba(59,130,246,0.2)" className="animate-pulse" />}
            {selectedNodeIdx === 3 && <circle cx="450" cy="140" r="14" fill="rgba(59,130,246,0.2)" className="animate-pulse" />}

            {/* Transit Nodes */}
            {/* Node 0: Archival */}
            <g transform="translate(50, 140)" className="cursor-pointer" onClick={() => setSelectedNodeIdx(0)}>
              <circle cx="0" cy="0" r="8" fill="#1f1f1f" stroke="#3B82F6" strokeWidth="2" />
              <text x="0" y="-18" textAnchor="middle" fill="#888" fontSize="8" fontFamily="monospace">14:00</text>
            </g>

            {/* Node 1: Museum */}
            <g transform="translate(230, 140)" className="cursor-pointer" onClick={() => setSelectedNodeIdx(1)}>
              <circle cx="0" cy="0" r="10" fill={selectedNodeIdx === 1 ? "#3B82F6" : "#1f1f1f"} stroke="#3B82F6" strokeWidth="2" filter={selectedNodeIdx === 1 ? "url(#glow-blue)" : ""} />
              <text x="0" y="-18" textAnchor="middle" fill={selectedNodeIdx === 1 ? "#3B82F6" : "#888"} fontSize="8" fontFamily="monospace">18:00</text>
            </g>

            {/* Node 2: Taxi */}
            <g transform="translate(350, 140)" className="cursor-pointer" onClick={() => setSelectedNodeIdx(2)}>
              <circle cx="0" cy="0" r="10" fill={selectedNodeIdx === 2 ? "#3B82F6" : "#1f1f1f"} stroke="#3B82F6" strokeWidth="2" filter={selectedNodeIdx === 2 ? "url(#glow-blue)" : ""} />
              <text x="0" y="-18" textAnchor="middle" fill={selectedNodeIdx === 2 ? "#3B82F6" : "#888"} fontSize="8" fontFamily="monospace">20:00</text>
            </g>

            {/* Node 3: Jazz Cellar */}
            <g transform="translate(450, 140)" className="cursor-pointer" onClick={() => setSelectedNodeIdx(3)}>
              <circle cx="0" cy="0" r="10" fill={selectedNodeIdx === 3 ? "#3B82F6" : "#1f1f1f"} stroke="#3B82F6" strokeWidth="2" filter={selectedNodeIdx === 3 ? "url(#glow-blue)" : ""} />
              <text x="0" y="-18" textAnchor="middle" fill={selectedNodeIdx === 3 ? "#3B82F6" : "#888"} fontSize="8" fontFamily="monospace">22:00</text>
            </g>

          </svg>

        </div>

        {/* Quick controls help label */}
        <p className="text-[10px] font-mono text-on-surface-variant/40 mt-4 flex items-center gap-1.5 self-center">
          <HelpCircle size={12} />
          <span>Click node symbols in the SVG vector path to explore telemetry details.</span>
        </p>

      </section>

      {/* Right Pane: Timeline Node Focus Detail card */}
      <section className="flex-1 glass-panel border-l border-white/10 flex flex-col justify-between p-8 md:p-12 bg-[#050505]/95 z-10 relative">
        
        {/* Detail Image and main metadata */}
        <div className="space-y-6">
          <div className="h-56 rounded-2xl overflow-hidden relative shadow-2xl border border-white/5">
            <img 
              src={activeNode.image} 
              alt={activeNode.title}
              className="w-full h-full object-cover transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
            
            {/* Overlay Cost and time bubble */}
            <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full font-mono text-[10px] border-white/15 text-aura-blue font-semibold">
              {activeNode.cost}
            </div>
            
            <div className="absolute bottom-4 left-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-aura-blue">{activeNode.time} • ACTIVE STEP</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-1">{activeNode.title}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
              <MapPin size={12} className="text-aura-blue" />
              <span>{activeNode.location}</span>
            </div>
            
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              {activeNode.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-3 py-1 rounded-full uppercase">Berlin, DE</span>
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-3 py-1 rounded-full uppercase">Spatial HUD Sync</span>
              <span className="text-[10px] font-mono bg-aura-blue/10 border border-aura-blue/20 text-aura-blue px-3 py-1 rounded-full uppercase">Optimal Routing</span>
            </div>
          </div>
        </div>

        {/* Draggable/Interactive Horizontal Time Scrubber */}
        <div className="pt-8 border-t border-white/5 mt-8">
          <p className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40 mb-3">Time Scrubber Dial</p>
          
          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-2xl relative select-none">
            {timelineNodes.map((node, idx) => {
              const isSelected = idx === selectedNodeIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedNodeIdx(idx)}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    isSelected ? 'scale-105' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className={`text-[9px] font-mono ${isSelected ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}>
                    {node.time}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    isSelected ? 'bg-aura-blue border-aura-blue shadow-[0_0_8px_#3B82F6]' : 'border-white/30 bg-transparent'
                  }`} />
                  <span className="text-[8px] font-mono scale-90 text-on-surface-variant max-w-[60px] truncate">
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
