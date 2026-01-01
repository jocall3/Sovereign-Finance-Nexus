
import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const GlobalChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-cyan-600 text-white rounded-2xl shadow-2xl shadow-cyan-500/30 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all group"
        >
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="w-80 h-96 glass rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-right">
          <div className="p-4 bg-cyan-600/10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm font-bold text-white">Nexus Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed">
              Synthesizing current operational context... I am ready to assist with rapid command execution or data queries.
            </div>
          </div>

          <div className="p-3 bg-black/40">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type command..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-cyan-500/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalChatbot;
