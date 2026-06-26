import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Clock, 
  Brain, 
  Layers, 
  Rotate3d, 
  Paperclip, 
  Mic, 
  Send, 
  Activity as ActivityIcon,
  RefreshCw,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { ActiveView, ChatMessage } from '../types';

interface GenerativeCanvasViewProps {
  setView: (view: ActiveView) => void;
  onOpenChat: () => void;
}

export default function GenerativeCanvasView({ setView, onOpenChat }: GenerativeCanvasViewProps) {
  const [vibeMood, setVibeMood] = useState<'Brutalist' | 'Cyberpunk' | 'Sleek' | 'Serene'>('Brutalist');
  const [isRefreshingVibe, setIsRefreshingVibe] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isRotatingMap, setIsRotatingMap] = useState(false);

  // Cycle different moods for interactive feel
  const handleReRollVibe = () => {
    setIsRefreshingVibe(true);
    setTimeout(() => {
      const moods: ('Brutalist' | 'Cyberpunk' | 'Sleek' | 'Serene')[] = ['Brutalist', 'Cyberpunk', 'Sleek', 'Serene'];
      const nextIndex = (moods.indexOf(vibeMood) + 1) % moods.length;
      setVibeMood(moods[nextIndex]);
      setIsRefreshingVibe(false);
    }, 1000);
  };

  const moodsData = {
    Brutalist: {
      title: 'Modern Architect',
      description: 'Your current itinerary aligns with high-precision design, brutalist aesthetics, and structured exploration.',
      indicator: 'STABLE'
    },
    Cyberpunk: {
      title: 'Neon Nomad',
      description: 'Vibrant hyper-reality environments, high-key contrasts, and spontaneous nocturnal discoveries.',
      indicator: 'DENSE'
    },
    Sleek: {
      title: 'Minimal Sophist',
      description: 'Curated premium lounges, seamless luxury transits, and quiet intellectual spaces.',
      indicator: 'OPTIMAL'
    },
    Serene: {
      title: 'Zen Pilgrim',
      description: 'Ancient shrines, bio-luminescent gardens, quiet meditations, and mindful human recovery.',
      indicator: 'SERENE'
    }
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;
    // Just trigger chat dialog opening with this prefilled message!
    onOpenChat();
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-screen p-6 md:p-12 pb-32 text-on-surface bg-[#050505] relative select-none">
      
      {/* Background radial spotlights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Header section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">Generative Canvas</h2>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">
            Welcome back, your <span className="text-aura-blue font-semibold">Lunar Odyssey</span> is 82% visualized.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReRollVibe}
            disabled={isRefreshingVibe}
            className="glass-card hover:bg-white/10 px-4 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 border border-white/10 text-on-surface hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw size={12} className={isRefreshingVibe ? 'animate-spin' : ''} />
            <span>Generate Alternative</span>
          </button>
          <button 
            onClick={() => alert("Syncing Neural link with co-explorers... Connection secure.")}
            className="bg-primary hover:bg-primary-fixed-dim text-[#050505] px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer"
          >
            Sync Neural Link
          </button>
        </div>
      </header>

      {/* Main Bento Layout Grid */}
      <div className="grid grid-cols-12 gap-6 pb-20">
        
        {/* Large Spatial Explorer Map widget */}
        <div className="col-span-12 lg:col-span-8 h-[450px] glass-card rounded-[24px] overflow-hidden relative group border border-white/5 shadow-2xl">
          <div className="absolute inset-0 z-0 bg-[#070707]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEMo6OlGQgOG-jwUWRKPZwSnRYydj7s4XMRSf1KziPPonqgaM358haza29kHeHnPDLPnZfwq0suff3qQlZyOkYLg8PCCsZ8rbfZGkpEuV_jZ7x_19qFnVV1DXwDNKpYnWURHml0aV5CIs6fIN2OTp5f9GIKkrLGq5KvXUOboarzZMxrpy_sOmSL8aHZj-5JZ9IIswcq_jj5zRrL1Xa04C1vv-bEtviKeM9VYTy4MiUbQtZSw3jSHTtBQXGXoQvfZi-GixeQnHzQJo" 
              alt="3D Spatial Flow Map"
              className={`w-full h-full object-cover opacity-50 hover:opacity-70 transition-all duration-1000 ${
                isRotatingMap ? 'rotate-12 scale-125 saturate-150' : 'rotate-0 scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>

          {/* Top Left Indicator overlay */}
          <div className="absolute top-6 left-6 p-4 glass-card rounded-2xl backdrop-blur-3xl border border-white/10 z-10 max-w-xs">
            <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <Compass size={14} className="text-aura-blue animate-pulse" />
              <span>Spatial Explorer Matrix</span>
            </h3>
            <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">En route to Sector 7 • ETA 14:00</p>
          </div>

          {/* Bottom Controls / Status overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
            <div className="flex gap-2">
              <button 
                onClick={() => alert("Layers updated: Traffic overlay and neural landmarks visible.")}
                className="p-3 glass-card rounded-full hover:bg-white/10 text-on-surface hover:text-white transition-all cursor-pointer"
                title="Toggles Map Layers"
              >
                <Layers size={14} />
              </button>
              <button 
                onClick={() => setIsRotatingMap(!isRotatingMap)}
                className={`p-3 glass-card rounded-full hover:bg-white/10 text-on-surface hover:text-white transition-all cursor-pointer ${
                  isRotatingMap ? 'bg-aura-blue/20 text-aura-blue border-aura-blue/40' : ''
                }`}
                title="Rotate Map Camera"
              >
                <Rotate3d size={14} />
              </button>
            </div>
            
            <div className="text-right font-mono">
              <p className="text-[9px] text-on-surface-variant uppercase tracking-widest mb-0.5">Atmosphere Density</p>
              <p className="text-xl font-bold text-aura-blue animate-pulse">
                {moodsData[vibeMood].indicator}
              </p>
            </div>
          </div>
        </div>

        {/* Vibe Check Panel */}
        <div className="col-span-12 lg:col-span-4 h-[450px] glass-card rounded-[24px] p-8 flex flex-col justify-between border border-white/5 shadow-2xl relative overflow-hidden">
          
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-1.5">
                <Brain size={16} className="text-aura-blue" />
                <span>Vibe Check</span>
              </h3>
              <span className="text-[9px] font-mono uppercase bg-aura-blue/10 text-aura-blue px-2 py-0.5 rounded-full">Active</span>
            </div>

            {/* Circular Gauge Graphic representation of mood */}
            <div className="relative w-full aspect-square max-h-[180px] my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Outer spinning dash ring */}
                <div className="w-36 h-36 rounded-full border border-dashed border-aura-blue/20 animate-[spin_30s_linear_infinite]" />
                
                {/* Medium glowing focus ring */}
                <div className="absolute w-28 h-28 rounded-full border border-aura-blue/35 flex items-center justify-center bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <ActivityIcon size={32} className="text-aura-blue animate-pulse" />
                </div>

                {/* Satellite indicators */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white] top-4 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>

          <div className="text-center relative z-10">
            <h4 className="font-display text-lg font-bold text-white mb-1.5">
              {moodsData[vibeMood].title}
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {moodsData[vibeMood].description}
            </p>
          </div>
        </div>

        {/* Smart Timeline section */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-[24px] p-8 border border-white/5 shadow-2xl">
          <h3 className="font-display text-base font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={16} className="text-aura-blue" />
            <span>Smart Timeline</span>
          </h3>

          <div className="space-y-6">
            
            {/* Entry 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-aura-blue shadow-[0_0_10px_#3B82F6]" />
                <div className="w-px h-12 bg-white/10 mt-2" />
              </div>
              <div>
                <p className="text-aura-blue font-mono text-[9px] uppercase tracking-wider mb-0.5">CURRENT</p>
                <h4 className="text-xs md:text-sm font-bold text-white">Neo-Brutalist Gallery</h4>
                <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">Private tour • 2h remaining</p>
              </div>
            </div>

            {/* Entry 2 Skeletal Shimmer loading states */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border border-white/20" />
                <div className="w-px h-12 bg-white/10 mt-2" />
              </div>
              <div className="w-full">
                <p className="text-on-surface-variant/40 font-mono text-[9px] uppercase tracking-wider mb-1">UPCOMING</p>
                <div className="h-4 w-3/4 bg-white/5 rounded-md animate-pulse mb-1.5" />
                <div className="h-3 w-1/2 bg-white/5 rounded-md animate-pulse opacity-50" />
              </div>
            </div>

            {/* Entry 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border border-white/20" />
              </div>
              <div className="w-full">
                <p className="text-on-surface-variant/40 font-mono text-[9px] uppercase tracking-wider mb-1">EVENING</p>
                <div className="h-4 w-1/2 bg-white/5 rounded-md animate-pulse" />
              </div>
            </div>

          </div>
        </div>

        {/* Budget Pulse widget */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-[24px] p-8 flex flex-col items-center justify-center relative overflow-hidden border border-white/5 shadow-2xl">
          <h3 className="font-display text-base font-bold text-white self-start mb-6">Budget Pulse</h3>
          
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" fill="transparent" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle 
                cx="80" 
                cy="80" 
                fill="transparent" 
                r="70" 
                stroke="#3B82F6" 
                strokeDasharray="440" 
                strokeDashoffset="120" 
                strokeLinecap="round" 
                strokeWidth="6"
                className="glow-path transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-2xl font-bold text-white">$12.4k</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Remaining</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-2">
            <div className="p-3 glass-card rounded-xl text-center">
              <p className="text-[9px] text-on-surface-variant font-mono uppercase">Daily Avg</p>
              <p className="font-bold text-xs text-white mt-1">$840</p>
            </div>
            <div className="p-3 glass-card rounded-xl text-center">
              <p className="text-[9px] text-on-surface-variant font-mono uppercase">Efficiency</p>
              <p className="font-bold text-xs text-aura-blue mt-1">+12%</p>
            </div>
          </div>
        </div>

        {/* Mood gallery bonus widget */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-[24px] overflow-hidden relative group border border-white/5 shadow-2xl h-[300px] lg:h-auto">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgUrRfpi_T4k140ldMPeE_138o0tpoPQMaeVKfCjz80yTaQClMgkFyxTBM1kwXaY1ekwunqHJkWZOTu-emmjpZ1AWaZIahFq3qtqucSxlyDq-eAn-_GyAMKJfovhIL6zmo6tv_q3y1K_sCAYJeHwygZJP1ZRQUKuYnSsDJoH-Q8mlElnjRSFlefY29bJMbUYSasgxGaBUXTc_3mbLALFdMAZE_tgeYDflVwqERQLodqmlyaq4TJw3sRoERN6iA14Sgk0I2p9wDiDo" 
            alt="Mood Gallery Luxury Transits"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button 
              onClick={handleReRollVibe}
              className="bg-white text-black hover:bg-white/90 font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
            >
              <Sparkles size={12} className="text-aura-blue animate-pulse" />
              <span>Re-Roll Mood Grid</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Concierge Orb search input bar at bottom */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6">
        <form 
          onSubmit={handlePromptSubmit}
          className="glass-card rounded-full p-2 flex items-center gap-4 border-aura-blue/20 shadow-[0_0_40px_rgba(59,130,246,0.3)] select-none hover:border-aura-blue/40 transition-all"
        >
          <div 
            onClick={onOpenChat}
            className="w-12 h-12 rounded-full bg-aura-blue flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
          >
            <Sparkles size={18} className="text-white animate-pulse" />
          </div>
          
          <input 
            type="text" 
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="Ask your Concierge Orb..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 text-sm md:text-base py-2 px-1"
          />
          
          <div className="flex gap-2 pr-2.5">
            <button 
              type="button" 
              onClick={onOpenChat}
              className="p-2 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <Mic size={18} />
            </button>
            <button 
              type="button" 
              onClick={onOpenChat}
              className="p-2 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <Paperclip size={18} />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
