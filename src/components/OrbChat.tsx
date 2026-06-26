import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface OrbChatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMessage?: (text: string) => void;
}

export default function OrbChat({ isOpen, onClose }: OrbChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'aura',
      text: 'Greetings. I am Aura, your Spatial travel operating concierge. How can I calibrate your itinerary, optimize budget efficiency, or suggest hidden architectural nodes today?',
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputVal,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate smart futuristic travel response
    setTimeout(() => {
      let replyText = "I have scanned our spatial archive index. Could you clarify if you'd like me to lock this node into your primary calendar sync?";
      const promptLower = userMsg.text.toLowerCase();

      if (promptLower.includes('tokyo') || promptLower.includes('japan') || promptLower.includes('ramen') || promptLower.includes('nakano')) {
        replyText = "Optimizing Tokyo Hub matrix. I highly suggest visiting the Nakano Brutalist Archive at exactly 10:00 AM on Tuesday for soft zenith concrete lighting. Following this, I have mapped a scenic route to Blue Note Kissa in Golden Gai for verified jazz vinyl sessions. Shall I finalize this operational day?";
      } else if (promptLower.includes('berlin') || promptLower.includes('germany') || promptLower.includes('jazz') || promptLower.includes('brutalist')) {
        replyText = "Berlin timeline calibrated. For Day 04, I have structured an express transit path from the Brutalist Museum to the hidden basement jazz cellars of Kreuzberg. The transit path is safe, avoiding heavy city demonstration sectors. The total estimated cost remains well within your €1000 budget.";
      } else if (promptLower.includes('budget') || promptLower.includes('cost') || promptLower.includes('price') || promptLower.includes('money')) {
        replyText = "Budget Pulse status: STABLE. Your current spent baseline is $1,240 out of a allocated $3,000. Under current currency forecasts, I predict an efficiency gain of 12% if we utilize verified local digital transactions rather than physical exchanges.";
      } else if (promptLower.includes('kyoto') || promptLower.includes('temple') || promptLower.includes('nature')) {
        replyText = "Synchronizing Chapter 01: The Neon Zen of Kyoto. Gion District light levels calibrate at peak beauty around 5:45 PM. I can load digital cherry blossom temple tickets directly into your Aura Wallet. Confirm calibration?";
      }

      const auraReply: ChatMessage = {
        id: `aura-${Date.now()}`,
        sender: 'aura',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, auraReply]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 md:right-12 z-50 w-[350px] sm:w-[420px] h-[500px] glass-card rounded-[24px] border border-aura-blue/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col overflow-hidden animate-fade-in select-none">
      
      {/* Drawer Header */}
      <div className="p-4 bg-white/[0.03] border-b border-white/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-aura-blue flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Sparkles size={14} className="text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white leading-none">Aura AI Concierge</h3>
            <span className="text-[9px] font-mono uppercase text-aura-blue tracking-widest mt-0.5 block">Quantum OS Link</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-black/20">
        {messages.map((msg) => {
          const isAura = msg.sender === 'aura';
          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 max-w-[85%] ${isAura ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
            >
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${
                isAura ? 'bg-aura-blue/10 text-aura-blue border border-aura-blue/20' : 'bg-white/10 text-white'
              }`}>
                {isAura ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                isAura 
                  ? 'bg-white/5 border border-white/5 text-on-surface-variant' 
                  : 'bg-aura-blue text-white shadow-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing loading bubble */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%] self-start">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-aura-blue/10 text-aura-blue border border-aura-blue/20">
              <Bot size={14} />
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-on-surface-variant text-xs flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-aura-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-aura-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-aura-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Submit form */}
      <form onSubmit={handleSend} className="p-3 bg-white/[0.02] border-t border-white/10 flex gap-2 shrink-0">
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Sync telemetry prompt..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-aura-blue/40 text-on-surface"
        />
        <button 
          type="submit"
          className="w-8 h-8 rounded-xl bg-aura-blue hover:bg-aura-blue/90 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <Send size={14} />
        </button>
      </form>

    </div>
  );
}
