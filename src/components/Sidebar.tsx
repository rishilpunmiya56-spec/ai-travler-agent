import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  Wallet, 
  TrendingUp, 
  Plus, 
  HelpCircle, 
  Settings 
} from 'lucide-react';
import { ActiveView } from '../types';

interface SidebarProps {
  currentView: ActiveView;
  setView: (view: ActiveView) => void;
  onNewTrip: () => void;
  tripContext: {
    name: string;
    tagline: string;
    avatarUrl: string;
  };
}

export default function Sidebar({ currentView, setView, onNewTrip, tripContext }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as ActiveView, label: 'Overview', icon: LayoutDashboard },
    { id: 'itinerary' as ActiveView, label: 'Itinerary', icon: Map },
    { id: 'canvas' as ActiveView, label: 'Generative Canvas', icon: TrendingUp, badge: 'AI' },
    { id: 'chapters' as ActiveView, label: 'Vibe Chapters', icon: FileText },
  ];

  return (
    <aside className="hidden lg:flex flex-col h-full w-64 bg-[#0e0e0e] border-r border-white/10 z-40 shrink-0 p-gutter select-none">
      {/* Branding Header */}
      <div className="mb-8 px-4" onClick={() => setView('discover')} style={{ cursor: 'pointer' }}>
        <h1 className="font-display text-headline-xl font-bold text-[#f9fafb] tracking-tighter">
          Aura
        </h1>
        <p className="text-on-surface-variant text-xs mt-1 font-mono tracking-wider">
          SPATIAL TRAVEL OS
        </p>
      </div>

      {/* User Trip Context */}
      <div className="flex items-center gap-3 p-4 mb-6 bg-white/5 rounded-xl border border-white/5">
        <div className="w-10 h-10 rounded-full bg-aura-blue/20 flex items-center justify-center overflow-hidden border border-white/20">
          <img 
            className="w-full h-full object-cover" 
            src={tripContext.avatarUrl} 
            alt="Traveler Profile" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-on-surface truncate">{tripContext.name}</p>
          <p className="text-[10px] text-on-surface-variant font-mono truncate">{tripContext.tagline}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                isActive 
                  ? 'bg-white/5 border border-white/10 text-aura-blue font-semibold shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-aura-blue' : 'text-on-surface-variant'} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono uppercase bg-aura-blue/10 text-aura-blue px-1.5 py-0.5 rounded-full border border-aura-blue/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Primary New Trip Action */}
      <button 
        onClick={onNewTrip}
        className="w-full py-3 mb-6 bg-aura-blue hover:bg-aura-blue/90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.2)]"
      >
        <Plus size={16} />
        <span className="text-sm">New Trip</span>
      </button>

      {/* Support & Settings Foot */}
      <div className="pt-4 border-t border-white/10 space-y-1">
        <button 
          onClick={() => alert("Aura Support Desk: How can we assist you in your journey today?")}
          className="w-full flex items-center gap-3 text-on-surface-variant hover:bg-white/5 px-4 py-3 rounded-lg hover:text-on-surface transition-all duration-200 text-left cursor-pointer"
        >
          <HelpCircle size={16} />
          <span className="text-xs font-medium">Support Hub</span>
        </button>
        <button 
          onClick={() => alert("Aura Settings panel: Configuration, integrations and profile customization.")}
          className="w-full flex items-center gap-3 text-on-surface-variant hover:bg-white/5 px-4 py-3 rounded-lg hover:text-on-surface transition-all duration-200 text-left cursor-pointer"
        >
          <Settings size={16} />
          <span className="text-xs font-medium">System Settings</span>
        </button>
      </div>
    </aside>
  );
}
