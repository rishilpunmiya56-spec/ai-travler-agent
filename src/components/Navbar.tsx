import React from 'react';
import { Bell, Compass, Globe, Sparkles, LogOut, Menu, User } from 'lucide-react';
import { ActiveView } from '../types';

interface NavbarProps {
  currentView: ActiveView;
  setView: (view: ActiveView) => void;
  onOpenMobileMenu?: () => void;
  onExploreClick: () => void;
}

export default function Navbar({ currentView, setView, onOpenMobileMenu, onExploreClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        
        {/* Left Side: Mobile Menu Trigger + Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>
          
          <div 
            onClick={() => setView('discover')} 
            className="font-display text-2xl font-bold text-[#f9fafb] tracking-tighter cursor-pointer flex items-center gap-2"
          >
            <span>Aura</span>
            <div className="w-1.5 h-1.5 bg-aura-blue rounded-full animate-pulse" />
          </div>
        </div>

        {/* Center: Editorial Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setView('discover')}
            className={`text-xs font-mono tracking-widest uppercase pb-1 transition-all duration-300 cursor-pointer ${
              currentView === 'discover' 
                ? 'text-aura-blue border-b-2 border-aura-blue font-semibold' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Discover
          </button>
          <button 
            onClick={() => setView('chapters')}
            className={`text-xs font-mono tracking-widest uppercase pb-1 transition-all duration-300 cursor-pointer ${
              currentView === 'chapters' 
                ? 'text-aura-blue border-b-2 border-aura-blue font-semibold' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Vibe Check
          </button>
          <button 
            onClick={() => setView('overview')}
            className={`text-xs font-mono tracking-widest uppercase pb-1 transition-all duration-300 cursor-pointer ${
              currentView === 'overview' 
                ? 'text-aura-blue border-b-2 border-aura-blue font-semibold' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Right Side: Status widgets & Profile actions */}
        <div className="flex items-center gap-4">
          {/* Quick Explore Assist Badge */}
          <button 
            onClick={onExploreClick}
            className="hidden sm:flex items-center gap-1.5 bg-aura-blue/10 border border-aura-blue/20 px-3 py-1.5 rounded-full text-xs text-aura-blue cursor-pointer hover:bg-aura-blue/20 transition-all duration-300"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span className="font-medium font-mono">Ask Aura Orb</span>
          </button>

          <button 
            onClick={() => alert("Aura System Alerts: All systems nominal. 1 new system update in Japan itineraries.")}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-full transition-all cursor-pointer relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-aura-blue rounded-full" />
          </button>

          <button 
            onClick={() => setView('overview')}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-full transition-all cursor-pointer"
          >
            <User size={18} />
          </button>
          
          <button 
            onClick={() => setView('discover')}
            className="hidden sm:inline-flex bg-white text-[#050505] hover:bg-white/90 px-5 py-2 rounded-full font-semibold text-xs transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
          >
            Plan Now
          </button>
        </div>
      </div>
    </nav>
  );
}
