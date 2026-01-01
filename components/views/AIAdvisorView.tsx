
import React, { useState, useContext, useRef, useEffect } from 'react';
import { BrainCircuit, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { DataContext } from '../../context/DataContext';
import { GoogleGenAI } from '@google/genai';

const AIAdvisorView: React.FC = () => {
  const context = useContext(DataContext);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Greetings, Sovereign Alex. I have analyzed your current mesh distribution. How may I optimize your economic trajectory today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [{ 
              text: `You are a world-class financial architect called 'The Sovereign Advisor'. 
              The user's current balance is $${context?.user.balance}. 
              They are in the 'Sovereign' tier. 
              Be highly professional, data-driven, and slightly futuristic. 
              User says: ${userText}` 
            }]
          }
        ],
      });

      const aiText = response.text || "I apologize, but my core synthesis engine encountered an anomaly. Please re-state your query.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "An error occurred while connecting to the intelligence mesh." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <BrainCircuit size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Sovereign Advisor</h1>
          <p className="text-gray-500 text-sm">Powered by Gemini-3 Flash Synthesis Engine</p>
        </div>
      </div>

      <div className="flex-1 glass rounded-2xl border border-white/5 p-4 overflow-y-auto custom-scrollbar min-h-[400px]">
        <div className="space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${m.role === 'ai' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30' : 'bg-white/10 text-gray-300 border border-white/10'}`}>
                {m.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'ai' ? 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5' : 'bg-cyan-600 text-white rounded-tr-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl text-gray-500 italic text-xs">Advisor is synthesizing data...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Query the sovereign advisor..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-16 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 text-gray-100 placeholder:text-gray-600 shadow-2xl transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIAdvisorView;
