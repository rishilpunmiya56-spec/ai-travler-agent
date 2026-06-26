import React, { useState } from 'react';
import { INITIAL_TRIPS } from './data';
import { ActiveView, Trip } from './types';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DiscoverView from './components/DiscoverView';
import OverviewView from './components/OverviewView';
import GenerativeCanvasView from './components/GenerativeCanvasView';
import VibeCheckView from './components/VibeCheckView';
import SpatialItineraryView from './components/SpatialItineraryView';
import OrbChat from './components/OrbChat';
import { Sparkles, Brain, Compass, X } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<ActiveView>('discover');
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTripIndex, setSelectedTripIndex] = useState(0); // 0 is Tokyo, 1 is Berlin
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // New trip input form states
  const [destVal, setDestVal] = useState('');
  const [datesVal, setDatesVal] = useState('');
  const [budgetVal, setBudgetVal] = useState('2000');

  const currentTrip = trips[selectedTripIndex];

  // Callback when a user enters an explore prompt on the landing page
  const handleExploreQuery = (query: string) => {
    setIsAiLoading(true);

    // Simulate smart AI generation sequence
    setTimeout(() => {
      setIsAiLoading(false);
      // Change view to overview dashboard to see their Tokyo trip!
      setView('overview');
      setSelectedTripIndex(0); // Focus Tokyo
    }, 2200);
  };

  const handleCreateNewTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destVal.trim()) return;

    setIsCreatingTrip(false);
    setIsAiLoading(true);

    setTimeout(() => {
      const newTrip: Trip = {
        id: `custom-trip-${Date.now()}`,
        name: `Odyssey in ${destVal}`,
        destination: destVal,
        dates: datesVal || 'Next Month',
        weather: '20°C Clear',
        budgetUsed: 150,
        budgetTotal: Number(budgetVal) || 2000,
        days: [
          {
            name: 'Day 01',
            date: 'Day 01',
            activities: [
              {
                id: `act-${Date.now()}-1`,
                time: '10:00 AM',
                category: 'Arrival',
                title: `${destVal} Exploration calibrated`,
                location: destVal,
                description: `Settle in. Aura has mapped verified walking nodes and optimized culinary spots.`,
                cost: 50,
                costFormatted: '$50.00',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo8JcTKNCfppr0gK7MW0xpgYlogfGp7im8KnTmhRmGSotIiUJoaj0DdPpMqp8u-JFMsH7uM-7g0fGOi7T7GItZPKZcHmoTUovrDeVuhUK_EqAtEd0a1eDut3RfDZnUF8ohbphVR6lzJMAejRb6Jq46kfo3Vp1dQ8r5naHqrzA78KT4CPhC0oVovnpLXqM6Vr216ReLHLboRCrr5m1p3082S3T4q5a0csVmR6Xp3NeQsXoDhSfjebgT9IyjbXbOBa2oe5alebrKrT4',
                tags: ['Aura Init', 'Fresh Start']
              }
            ]
          }
        ]
      };

      setTrips(prev => [newTrip, ...prev]);
      setSelectedTripIndex(0); // Select the newly created trip
      setIsAiLoading(false);
      setView('overview'); // Open Dashboard
    }, 2000);
  };

  const tripContextInfo = {
    name: currentTrip ? currentTrip.name : 'Aura Travel',
    tagline: currentTrip ? currentTrip.destination : 'Solar System',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXiXobakaUl5PnoWSw3a4gPebfF3xe_jcXSRAhWHloGG6mL6W4ap-g22_m8z61xQJ9xaxCcUUID29pAsK4ZX5LHgVOFPPzFOTkY8pbZIO1GbzywPn4EkS8gtGy6NvDomCGAJuSEapTZJKo9HCWs0DllVAsVJwv7nVEiqNDB6QGfEjoD6783IonBYHsU0cBwJY9gJIUFD3vz9EwOHkPffHZ50WpE_h39JFimvSOys9u5V4ywe0YE_5n2zDwU-58Gb7k15EAlZIGNgQ'
  };

  return (
    <div className="min-h-screen bg-[#050505] text-on-surface font-sans flex flex-col overflow-x-hidden select-none">
      
      {/* 1. Global AI Loading / Synthesis Overlay Animation */}
      {isAiLoading && (
        <div className="fixed inset-0 bg-[#050505]/95 z-[9999] flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
          <div className="relative mb-8 flex items-center justify-center">
            {/* Spinning orbit circles */}
            <div className="w-24 h-24 rounded-full border border-dashed border-aura-blue/30 animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-16 h-16 rounded-full border-2 border-aura-blue flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-black">
              <Brain size={28} className="text-aura-blue animate-pulse" />
            </div>
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            Synthesizing Spatial Horizon...
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono max-w-sm leading-relaxed">
            Aura AI engine is mapping topological elevations, weather vectors, transit checkpoints, and budget matrix modules.
          </p>
        </div>
      )}

      {/* 2. Create Trip Overlay Modal */}
      {isCreatingTrip && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-6 animate-fade-in select-none">
          <div className="glass-panel w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setIsCreatingTrip(false)}
              className="absolute top-6 right-6 p-1 text-on-surface-variant hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-1.5">
                <Sparkles size={18} className="text-aura-blue" />
                <span>Initialize Custom Journey</span>
              </h3>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">Quantum destination calibrator</p>
            </div>

            <form onSubmit={handleCreateNewTripSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-on-surface-variant mb-1.5">Target Destination</label>
                <input 
                  type="text" 
                  required
                  value={destVal}
                  onChange={(e) => setDestVal(e.target.value)}
                  placeholder="e.g. Reykjavik, Iceland"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-aura-blue text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-on-surface-variant mb-1.5">Date Span</label>
                <input 
                  type="text" 
                  value={datesVal}
                  onChange={(e) => setDatesVal(e.target.value)}
                  placeholder="e.g. Nov 14 — Nov 22, 2026"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-aura-blue text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-on-surface-variant mb-1.5">Budget Allocated (USD)</label>
                <input 
                  type="number" 
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(e.target.value)}
                  placeholder="2000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-aura-blue text-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-aura-blue hover:bg-aura-blue/90 text-white rounded-2xl font-bold text-xs tracking-wider font-mono uppercase transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                Synthesize Itinerary
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Mobile View Collapsible Navigation Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-[999] lg:hidden flex flex-col p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-display text-2xl font-bold tracking-tighter text-white">Aura</h1>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-on-surface-variant hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 font-mono text-base uppercase tracking-widest text-center mt-12">
            <button 
              onClick={() => { setView('discover'); setIsMobileMenuOpen(false); }}
              className={`py-3 ${currentView === 'discover' ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}
            >
              Discover
            </button>
            <button 
              onClick={() => { setView('overview'); setIsMobileMenuOpen(false); }}
              className={`py-3 ${currentView === 'overview' ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setView('canvas'); setIsMobileMenuOpen(false); }}
              className={`py-3 ${currentView === 'canvas' ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}
            >
              Generative Canvas
            </button>
            <button 
              onClick={() => { setView('chapters'); setIsMobileMenuOpen(false); }}
              className={`py-3 ${currentView === 'chapters' ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}
            >
              Vibe Chapters
            </button>
            <button 
              onClick={() => { setView('itinerary'); setIsMobileMenuOpen(false); }}
              className={`py-3 ${currentView === 'itinerary' ? 'text-aura-blue font-bold' : 'text-on-surface-variant'}`}
            >
              Day 04 Berlin
            </button>
          </div>

          <button 
            onClick={() => { setIsCreatingTrip(true); setIsMobileMenuOpen(false); }}
            className="w-full mt-auto py-4 bg-aura-blue text-white rounded-xl font-bold font-mono text-xs uppercase"
          >
            New Trip
          </button>
        </div>
      )}

      {/* 4. Top Main Navigation Row */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onExploreClick={() => setIsChatOpen(true)}
      />

      {/* 5. Main Content Area Panel Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav (Desktop only) */}
        {currentView !== 'discover' && currentView !== 'chapters' && (
          <Sidebar 
            currentView={currentView} 
            setView={setView} 
            onNewTrip={() => setIsCreatingTrip(true)}
            tripContext={tripContextInfo}
          />
        )}

        {/* View Switch / Render Container with active fade-in animations */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {currentView === 'discover' && (
            <DiscoverView 
              setView={setView} 
              onExploreQuery={handleExploreQuery} 
            />
          )}

          {currentView === 'overview' && currentTrip && (
            <OverviewView 
              trip={currentTrip} 
              setTrip={(updater) => {
                setTrips(prev => prev.map((t, i) => i === selectedTripIndex ? (typeof updater === 'function' ? updater(t) : updater) : t));
              }}
              setView={setView}
            />
          )}

          {currentView === 'canvas' && (
            <GenerativeCanvasView 
              setView={setView} 
              onOpenChat={() => setIsChatOpen(true)} 
            />
          )}

          {currentView === 'chapters' && (
            <VibeCheckView 
              setView={setView} 
            />
          )}

          {currentView === 'itinerary' && (
            <SpatialItineraryView 
              trip={trips[1] || trips[0]} // Fallback to second (Berlin) or first (Tokyo)
              setView={setView} 
            />
          )}

        </main>

      </div>

      {/* 6. Globally Floating Orb Chat dialog */}
      <div className="relative">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-aura-blue hover:bg-aura-blue/90 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer flex items-center justify-center transition-all ${
            isChatOpen ? 'rotate-90 scale-105' : 'hover:scale-105'
          } ${currentView === 'canvas' ? 'hidden' : ''}`} // Hide the floating trigger if on the generative canvas, as it has its own dedicated dock!
        >
          <Sparkles size={20} className="animate-pulse" />
        </button>

        <OrbChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      </div>

    </div>
  );
}
