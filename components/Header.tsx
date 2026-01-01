
import React, { useContext } from 'react';
import { Menu, Search, Bell, User, Zap } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { View } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  activeView: View;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, activeView }) => {
  const context = useContext(DataContext);
  if (!context) return null;

  const { user } = context;

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-500 font-medium">Path:</span>
          <span className="text-gray-300 font-mono opacity-80 uppercase tracking-tighter text-xs">ROOT // SOVEREIGN // {activeView}</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Global Search Ops..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-gray-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-gray-950" />
        </button>
        
        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white tracking-wide">{user.name}</p>
            <div className="flex items-center justify-end gap-1">
              <Zap size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase">{user.tier} ACCESS</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg group cursor-pointer hover:border-cyan-500/50 transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
