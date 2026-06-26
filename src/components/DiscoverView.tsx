import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Brain, 
  Map as MapIcon, 
  Wallet, 
  Sparkles, 
  Play, 
  Info, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';
import { ActiveView } from '../types';

interface DiscoverViewProps {
  setView: (view: ActiveView) => void;
  onExploreQuery: (query: string) => void;
}

export default function DiscoverView({ setView, onExploreQuery }: DiscoverViewProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive Particles Aura Globe Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = 40;
    const particles: { x: number; y: number; r: number; speed: number; angle: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 120,
        y: height / 2 + (Math.random() - 0.5) * 120,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 0.4 + 0.1,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let globalRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw large radial glow center
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) / 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw wireframe globe circle lines
      globalRotation += 0.003;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1;

      // Latitude lines
      for (let r = 40; r <= 200; r += 40) {
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, r, r * 0.5, globalRotation * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(
          width / 2,
          height / 2,
          200,
          Math.abs(200 * Math.sin(globalRotation + (i * Math.PI) / 4)),
          globalRotation,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Drawing outer high tech hud bounds
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 220, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.setLineDash([5, 15]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw and update particles
      ctx.fillStyle = 'rgba(173, 198, 255, 0.4)';
      particles.forEach((p) => {
        p.angle += p.speed * 0.05;
        // Float in orbits around center
        const orbitRadius = 150 + Math.sin(p.angle * 2) * 40;
        p.x = width / 2 + Math.cos(p.angle) * orbitRadius;
        p.y = height / 2 + Math.sin(p.angle * 0.5) * orbitRadius * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleExploreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Simulate high tech loading sequence
    setTimeout(() => {
      setIsGenerating(false);
      onExploreQuery(prompt);
    }, 2000);
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="relative min-h-screen text-on-surface bg-[#050505]">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 px-6 md:px-12 overflow-hidden">
        
        {/* Animated ThreeJS/Canvas backdrop inside limits */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] opacity-70">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>

        {/* Hero Interactive UI overlay */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Subtle badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest uppercase text-aura-blue">
            <Sparkles size={10} className="animate-pulse" />
            <span>AI Spatial Travel Ecosystem</span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#adc6ff] to-white mb-6 leading-none">
            The Future of Exploration.
          </h1>
          
          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Aura is the Spatial Travel OS for the modern explorer. Seamlessly blending artificial intelligence with real-world intuition.
          </p>

          {/* Interactive Aura Prompt Box */}
          <div className="w-full max-w-2xl mx-auto px-4">
            <form 
              onSubmit={handleExploreSubmit}
              className="glass-card rounded-2xl p-2.5 flex items-center group focus-within:ring-2 focus-within:ring-aura-blue/40 focus-within:border-aura-blue/40 transition-all duration-500 shadow-2xl relative"
            >
              <div className="flex items-center pl-3 text-aura-blue shrink-0">
                <Brain size={20} className={isGenerating ? 'animate-spin' : ''} />
              </div>
              
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isGenerating ? "Aura intelligence analyzing target matrix..." : "Where does your curiosity lead you?"}
                disabled={isGenerating}
                className="bg-transparent border-none focus:outline-none focus:ring-0 w-full py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40"
              />

              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="bg-aura-blue hover:bg-aura-blue/90 disabled:bg-white/10 disabled:text-white/40 text-white px-6 py-3 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <span>{isGenerating ? "Synthesizing" : "Explore"}</span>
                <ArrowRight size={14} className={isGenerating ? 'animate-ping' : 'group-hover:translate-x-1 transition-transform'} />
              </button>
            </form>
            
            {/* Quick-Prompt suggestions */}
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              <span className="text-[11px] text-on-surface-variant/50 self-center">Try:</span>
              {[
                "Plan a tech-retreat in Tokyo",
                "Explore brutalist galleries in Berlin",
                "Find eco-resorts in Iceland"
              ].map((text, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(text)}
                  className="text-[11px] bg-white/5 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all cursor-pointer"
                >
                  "{text}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-aura-blue mb-2">SYSTEM PARAMETERS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">Advanced Spatial Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-aura-blue/10 flex items-center justify-center group-hover:bg-aura-blue transition-all duration-500">
              <Brain size={24} className="text-aura-blue group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">AI Planning</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Generative itineraries that adapt to your mood, energy levels, and local weather in real-time.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-aura-blue/10 flex items-center justify-center group-hover:bg-aura-blue transition-all duration-500">
              <MapIcon size={24} className="text-aura-blue group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">Real-time Map</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Dynamic spatial mapping that overlays digital intent onto the physical world with centimeter precision.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-aura-blue/10 flex items-center justify-center group-hover:bg-aura-blue transition-all duration-500">
              <Wallet size={24} className="text-aura-blue group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">Smart Budget</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Automated expense tracking with predictive currency optimization for every global destination.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="glass-card rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Travel, reimagined in spatial detail.
            </h2>
            
            <p className="text-sm md:text-base text-on-surface-variant mb-8 leading-relaxed">
              Aura captures the essence of your journey using advanced spatial sensors. Relive every sunset, every hidden alleyway, and every flavor through a vivid digital twin of your experience.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setView('chapters')}
                className="bg-white text-black hover:bg-white/95 px-6 py-3 rounded-full font-semibold text-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <Info size={14} />
                <span>Learn More</span>
              </button>
              <button 
                onClick={() => setView('overview')}
                className="border border-white/20 hover:bg-white/5 px-6 py-3 rounded-full font-semibold text-xs transition-all cursor-pointer flex items-center gap-2 text-white"
              >
                <Play size={12} fill="currentColor" />
                <span>View Demo Canvas</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden h-full min-h-[350px]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-UMqEMBe8jiaRKGGKIoNG6F-fB2PATeNvHd0oxODPanMoTicbY2ZygZoCTnj0f4EBvpRwLVNegWxra_KsZQx05QTwndnYl2a8h393Pq5Ja7JPzfp559LjAWqmxglY2aQYA_rEFuuIDWfiZvPFC8FYVVNQgTS-5uMOl3IQ3C2nqkMC_npUNRuh39dXwIQLLgpkX_EOUTpGd0COj-ecHtxefNgMuxvQOT1y-nAX6OjyJMqXxjeaGZktfSmvqj2NAm_-U8b6IItowVA" 
              alt="AR Glasses Traveler"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
          </div>

        </div>
      </section>

      {/* Dynamic Curated Horizons */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <span className="text-aura-blue font-mono text-[10px] tracking-widest uppercase mb-2 block">TRENDING NOW</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">Curated Horizons.</h2>
          </div>
          <button 
            onClick={() => setView('chapters')}
            className="flex items-center gap-2 text-on-surface hover:text-aura-blue transition-colors group cursor-pointer font-mono text-xs"
          >
            <span>View All Realities</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="flex gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar pb-10 custom-scrollbar max-w-[1440px] mx-auto">
          
          {/* Card 1 */}
          <div 
            onClick={() => setView('chapters')}
            className="min-w-[300px] sm:min-w-[400px] h-[480px] rounded-3xl overflow-hidden glass-card relative group cursor-pointer shrink-0 border border-white/10"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq5KZQON6tgiBkB2gvnEsjkPHJX1sXBg-avoQRb7cuSaxh0sp_t6UQ1iEDWQ3RA2B3LsNNf6Ncl493-mx-T52Ml6-garjTvjNln2mjgaVf65D3jeXGDebCT5wEnWihgWJ0rkrhgD6fqHtW0CpxTwj00LkRwCxXAF3pukFAcR-GGN1PvvKw8Y-SGANp3TOTFDTUIIhJhagMSAMpX6CeMrwLY-8o-5Fvea3KWq_jYq_evLU_vjOWaQwRQ_VLJ5G8m13kGneBj34v7RQ" 
              alt="Reykjavík Heights"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="font-mono text-[10px] uppercase text-aura-blue tracking-wider">Europe</span>
              <h4 className="font-display text-2xl font-bold text-white mt-1">Reykjavík Heights</h4>
              <p className="text-xs text-on-surface-variant/80 mt-2 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Eco-resorts nestled under the magical northern lights.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setView('chapters')}
            className="min-w-[300px] sm:min-w-[400px] h-[480px] rounded-3xl overflow-hidden glass-card relative group cursor-pointer shrink-0 border border-white/10"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3jF-jDMJ1eBhTUM_e85nSml2OKTq22A8C7Wm7Rg7717n_UyfYwDJlTiU0m5mD-QJjTpQ1UiosgiLlp5V38hlPrFok8Y3Cxoe1_Q64B_7pHktwvy1P92jGyPK_Rrh2uQ-wyyo9Jx9LeLM5ioXnhEgXtLlhlwaGwgV1EG2reLeskmhhzg6E4ELkXq7tG8B0UWxa8ZqQoR35EKPbMAYB89E5a2l_vHaXZVfKYtvdNNpK2GH6bKcIoeZstskxyhYUhAwyNGRvpT9jVIg" 
              alt="Kyoto Neon-Zen"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="font-mono text-[10px] uppercase text-aura-blue tracking-wider">Asia</span>
              <h4 className="font-display text-2xl font-bold text-white mt-1">Kyoto Neon-Zen</h4>
              <p className="text-xs text-on-surface-variant/80 mt-2 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Traditional wooden temples lit by holographic gardens.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setView('chapters')}
            className="min-w-[300px] sm:min-w-[400px] h-[480px] rounded-3xl overflow-hidden glass-card relative group cursor-pointer shrink-0 border border-white/10"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo8JcTKNCfppr0gK7MW0xpgYlogfGp7im8KnTmhRmGSotIiUJoaj0DdPpMqp8u-JFMsH7uM-7g0fGOi7T7GItZPKZcHmoTUovrDeVuhUK_EqAtEd0a1eDut3RfDZnUF8ohbphVR6lzJMAejRb6Jq46kfo3Vp1dQ8r5naHqrzA78KT4CPhC0oVovnpLXqM6Vr216ReLHLboRCrr5m1p3082S3T4q5a0csVmR6Xp3NeQsXoDhSfjebgT9IyjbXbOBa2oe5alebrKrT4" 
              alt="Maldives Crystal Lagoon"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="font-mono text-[10px] uppercase text-aura-blue tracking-wider">Oceania</span>
              <h4 className="font-display text-2xl font-bold text-white mt-1">Maldives Crystal Lagoon</h4>
              <p className="text-xs text-on-surface-variant/80 mt-2 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ultra-modern villas constructed from transparent crystalline glass.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Footer */}
      <footer className="w-full bg-[#0c0c0c] border-t border-white/5 py-12 px-6 md:px-12 select-none">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="font-display text-2xl font-bold text-white tracking-tighter">Aura</div>
            <p className="text-xs text-on-surface-variant/60 max-w-xs text-center md:text-left">
              The spatial travel operating system for a borderless world. Built for high-precision journeys.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-on-surface-variant/60 font-mono">
            <a href="#" className="hover:text-aura-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aura-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-aura-blue transition-colors">Neural Sync FAQ</a>
          </div>

          <div className="text-xs text-on-surface-variant/40 font-mono">
            © 2026 Aura Travel OS. Designed for the future of exploration.
          </div>

        </div>
      </footer>

    </div>
  );
}
