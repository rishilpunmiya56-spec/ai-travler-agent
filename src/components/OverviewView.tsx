import React, { useState } from 'react';
import { 
  MapPin, 
  Sun, 
  Cloud, 
  Search, 
  Bell, 
  Edit, 
  Share2, 
  Plus, 
  Sparkles, 
  Check, 
  Calendar, 
  DollarSign,
  Map as MapIcon,
  ChevronRight
} from 'lucide-react';
import { Trip, Activity, ActiveView } from '../types';

interface OverviewViewProps {
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip>>;
  setView: (view: ActiveView) => void;
}

export default function OverviewView({ trip, setTrip, setView }: OverviewViewProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Default to Day 2 (Tue 15)
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActTitle, setNewActTitle] = useState('');
  const [newActDesc, setNewActDesc] = useState('');
  const [newActTime, setNewActTime] = useState('02:00 PM');
  const [newActCost, setNewActCost] = useState('20');
  const [showThinkingToast, setShowThinkingToast] = useState(true);

  const selectedDay = trip.days[selectedDayIndex] || trip.days[0];

  const handleToggleCompleted = (activityId: string) => {
    setTrip(prevTrip => {
      const updatedDays = prevTrip.days.map(day => {
        const updatedActivities = day.activities.map(act => {
          if (act.id === activityId) {
            const newCompleted = !act.completed;
            const costDiff = newCompleted ? act.cost : -act.cost;
            return { ...act, completed: newCompleted };
          }
          return act;
        });
        return { ...day, activities: updatedActivities };
      });

      // Recalculate budget used
      let totalUsed = 0;
      updatedDays.forEach(day => {
        day.activities.forEach(act => {
          if (act.completed) {
            totalUsed += act.cost;
          }
        });
      });

      return {
        ...prevTrip,
        days: updatedDays,
        budgetUsed: Math.max(1240, totalUsed + 1200) // Baseline budget cushion + completed
      };
    });
  };

  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const newActivity: Activity = {
      id: `tokyo-custom-${Date.now()}`,
      time: newActTime,
      category: 'Explore',
      title: newActTitle,
      location: 'Custom Tokyo Area',
      description: newActDesc || 'Custom planned itinerary node recommended by Aura AI optimizer.',
      cost: Number(newActCost) || 0,
      costFormatted: `¥${(Number(newActCost) * 140).toLocaleString()}`,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo8JcTKNCfppr0gK7MW0xpgYlogfGp7im8KnTmhRmGSotIiUJoaj0DdPpMqp8u-JFMsH7uM-7g0fGOi7T7GItZPKZcHmoTUovrDeVuhUK_EqAtEd0a1eDut3RfDZnUF8ohbphVR6lzJMAejRb6Jq46kfo3Vp1dQ8r5naHqrzA78KT4CPhC0oVovnpLXqM6Vr216ReLHLboRCrr5m1p3082S3T4q5a0csVmR6Xp3NeQsXoDhSfjebgT9IyjbXbOBa2oe5alebrKrT4',
      tags: ['Aura Generated', 'Tokyo Core']
    };

    setTrip(prevTrip => {
      const updatedDays = prevTrip.days.map((day, idx) => {
        if (idx === selectedDayIndex) {
          return {
            ...day,
            activities: [...day.activities, newActivity]
          };
        }
        return day;
      });
      return {
        ...prevTrip,
        days: updatedDays
      };
    });

    setNewActTitle('');
    setNewActDesc('');
    setIsAddingActivity(false);
    
    // Toast alert for optimized routing
    setShowThinkingToast(true);
    setTimeout(() => {
      setShowThinkingToast(false);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden text-on-surface bg-[#050505] relative select-none">
      
      {/* Dynamic Aura Intelligence Status Toast */}
      {showThinkingToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-5 py-2.5 flex items-center gap-3 border-aura-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-bounce">
          <Sparkles size={16} className="text-aura-blue animate-spin" />
          <span className="text-xs font-mono font-medium text-aura-blue">
            Aura Engine Active: Rerouting itineraries for optimal energy flow...
          </span>
          <button onClick={() => setShowThinkingToast(false)} className="text-[10px] text-on-surface-variant/50 hover:text-white pl-2">✕</button>
        </div>
      )}

      {/* Left Panel: Dynamic Interactive Map Visual */}
      <section className="flex-[1.4] relative overflow-hidden bg-[#0a0a0a] border-r border-white/5 h-full hidden md:block">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzwDU9nybQZAg7iTmKEMUrRlabd-R-q85flneCOsCrUYkqR9S6Q68M-lyS0FIpBgHy1iyn_8WQiiI4UKaajcyoSaRsS2tqhJUua_XZlYKb8J1pft0XwRI-HTSLzmk3N2yDdIBT02XNMSEteUy0fjdxxlJnAwcnpuu_1nxsofRqbe7GSFCfwIKWRsKzt_cZ-2-cuJWASDu-Sroua2DhYQsYIlev1IN1DvdTlZJC7EQ9OaeffyNP0opoAmM0ug3fBlNV9iimg28VYEs" 
            alt="Tokyo Dark Digital Map"
            className="w-full h-full object-cover opacity-60 hover:scale-105 transition-all duration-[3000ms]"
            referrerPolicy="no-referrer"
          />
          {/* Spatial Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(59,130,246,0.15)_0%,transparent_75%] pointer-events-none" />
        </div>

        {/* Floating Interactive Map Widgets */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-4 z-20">
          
          {/* Smart Budget Panel */}
          <div className="glass-panel p-5 rounded-2xl w-72 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] tracking-wider text-on-surface-variant uppercase">Smart Budget Meter</span>
              <span className="text-aura-blue font-semibold text-xs font-mono">Live</span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-display font-bold text-white">
                ${trip.budgetUsed.toLocaleString()}
              </span>
              <span className="text-on-surface-variant text-xs font-mono">/ ${trip.budgetTotal.toLocaleString()}</span>
            </div>
            
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-aura-blue shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500" 
                style={{ width: `${(trip.budgetUsed / trip.budgetTotal) * 100}%` }}
              />
            </div>
            
            <p className="text-[10px] text-on-surface-variant/60 mt-2 font-mono">
              Aura predicts a potential ${(trip.budgetTotal - trip.budgetUsed).toLocaleString()} remaining.
            </p>
          </div>

          {/* Real-time Weather Panel */}
          <div className="glass-panel p-5 rounded-2xl w-72 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Cloud className="text-aura-blue animate-pulse" size={24} />
                <div>
                  <p className="text-2xl font-bold font-display text-white">18°C</p>
                  <p className="text-[10px] text-on-surface-variant font-mono">Cloudy • Tokyo Hub</p>
                </div>
              </div>
              <div className="text-right border-l border-white/10 pl-4 font-mono text-[10px]">
                <p className="text-on-surface-variant">TOMORROW</p>
                <p className="text-aura-blue font-bold text-sm">22°C Clear</p>
              </div>
            </div>
          </div>

        </div>

        {/* Spatial Dynamic Beacon Marker on Nakano */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="w-5 h-5 bg-aura-blue rounded-full shadow-[0_0_20px_#3b82f6] animate-ping absolute" />
          <div className="w-4 h-4 bg-white rounded-full border-4 border-aura-blue z-10" />
          <div className="mt-2.5 glass-card px-3 py-1.5 rounded-lg border-aura-blue/30 shadow-lg">
            <span className="text-[10px] font-mono font-bold text-aura-blue uppercase tracking-wider">Nakano Beacon</span>
          </div>
        </div>

      </section>

      {/* Right Panel: Scrollable Detailed Itinerary Stream */}
      <section className="flex-1 glass-panel border-l border-white/10 flex flex-col h-full bg-[#050505]/95 z-10">
        
        {/* Detail Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-end shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin size={12} className="text-aura-blue" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60">{trip.destination}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">{trip.name}</h2>
            <p className="text-xs text-on-surface-variant/80 font-mono mt-1">{trip.dates}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => alert("Itinerary editing initialized. Configure destination properties.")}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => alert("Trip link copied! Share with your co-travelers via Aura Neural Network.")}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Day Selector Ribbon */}
        <div className="flex px-8 py-4 gap-6 overflow-x-auto no-scrollbar border-b border-white/10 bg-white/[0.01] shrink-0">
          {trip.days.map((day, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex-shrink-0 font-mono text-xs pb-2 transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'text-aura-blue border-b-2 border-aura-blue font-bold scale-105' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {day.name}
              </button>
            );
          })}
        </div>

        {/* Selected Day Activity Feed Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          
          {selectedDay.activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Calendar size={40} className="text-on-surface-variant/30 mb-4 animate-pulse" />
              <p className="text-sm text-on-surface-variant font-medium">No custom operations scheduled for this block.</p>
              <p className="text-xs text-on-surface-variant/50 max-w-xs mt-1">
                Aura AI optimizer suggests injecting dynamic explorations or rest cycles.
              </p>
            </div>
          ) : (
            selectedDay.activities.map((act) => (
              <div key={act.id} className="group relative">
                
                {/* Timeline Line Decorator */}
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-white/10 group-last:bottom-auto group-last:h-8" />
                <div className={`absolute -left-[19px] top-4 w-2.5 h-2.5 rounded-full border-2 border-[#050505] transition-all duration-300 ${
                  act.completed ? 'bg-aura-blue scale-125' : 'bg-white/30'
                }`} />

                {/* Timeline Item Card content */}
                <div className="pl-6">
                  
                  {/* Category & Time stamp */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-aura-blue">
                      {act.time} • {act.category}
                    </span>
                    <button 
                      onClick={() => handleToggleCompleted(act.id)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                        act.completed 
                          ? 'bg-aura-blue/20 border-aura-blue/40 text-aura-blue' 
                          : 'border-white/10 text-on-surface-variant hover:text-white'
                      }`}
                    >
                      {act.completed ? <Check size={10} /> : null}
                      <span>{act.completed ? 'Spent' : 'Verify'}</span>
                    </button>
                  </div>

                  {/* Glassmorphic Panel */}
                  <div className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 shadow-xl border border-white/5 hover:border-white/15">
                    
                    {/* Background Header Image */}
                    <div className="h-44 relative overflow-hidden">
                      <img 
                        src={act.image} 
                        alt={act.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-display text-lg font-bold text-white">{act.title}</h3>
                        <p className="text-[10px] font-mono text-on-surface-variant">{act.location}</p>
                      </div>

                      {/* Display Cost badge */}
                      <div className="absolute top-4 right-4 bg-[#050505]/60 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border border-white/10 text-[#adc6ff]">
                        {act.costFormatted}
                      </div>
                    </div>

                    {/* Detailed text */}
                    <div className="p-5">
                      <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-4">
                        {act.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {act.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase text-on-surface-variant"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))
          )}

          {/* Add Activity Button / Interactive Inline Form */}
          <div className="pl-6">
            {!isAddingActivity ? (
              <button 
                onClick={() => setIsAddingActivity(true)}
                className="w-full py-5 rounded-2xl border-2 border-dashed border-white/10 hover:border-aura-blue/30 text-on-surface-variant hover:text-aura-blue flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer"
              >
                <Plus size={24} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono font-semibold">Inject custom node to {selectedDay.name}</span>
              </button>
            ) : (
              <form 
                onSubmit={handleAddActivitySubmit}
                className="glass-panel rounded-2xl p-6 border border-aura-blue/20 shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                  <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles size={14} className="text-aura-blue animate-pulse" />
                    <span>Aura Node Plan Form</span>
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingActivity(false)}
                    className="text-xs text-on-surface-variant hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Activity Title</label>
                    <input 
                      type="text" 
                      required
                      value={newActTitle}
                      onChange={(e) => setNewActTitle(e.target.value)}
                      placeholder="e.g. Shibuya Sky Deck Session"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-aura-blue/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Time & Target Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        value={newActTime}
                        onChange={(e) => setNewActTime(e.target.value)}
                        placeholder="e.g. 03:00 PM"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:border-aura-blue/40"
                      />
                      <input 
                        type="number" 
                        value={newActCost}
                        onChange={(e) => setNewActCost(e.target.value)}
                        placeholder="Cost in USD ($)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:border-aura-blue/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-on-surface-variant mb-1">Description Matrix</label>
                    <textarea 
                      value={newActDesc}
                      onChange={(e) => setNewActDesc(e.target.value)}
                      placeholder="e.g. Immersive 360-degree views of Tokyo's neon skyline..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:border-aura-blue/40"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-aura-blue hover:bg-aura-blue/90 text-white rounded-xl text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer"
                  >
                    Optimise & Inject
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </section>

    </div>
  );
}
