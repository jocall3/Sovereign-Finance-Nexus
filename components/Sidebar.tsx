
import React from 'react';
import { View } from '../types';
import { 
  LayoutDashboard, 
  Wallet, 
  BrainCircuit, 
  History, 
  Network, 
  GanttChartSquare, 
  Settings,
  ShieldCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const menuGroups = [
    {
      title: "Navigation",
      items: [
        { id: View.MetaDashboard, icon: Network, label: "Meta Dashboard" },
        { id: View.Dashboard, icon: LayoutDashboard, label: "Personal Wealth" },
        { id: View.Transactions, icon: History, label: "Activity Ledger" },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { id: View.AIAdvisor, icon: BrainCircuit, label: "AI Sovereign Advisor" },
        { id: View.AgentMarketplace, icon: ShieldCheck, label: "Security Governance" },
      ]
    },
    {
      title: "Platform",
      items: [
        { id: View.DataMesh, icon: Network, label: "Global Data Mesh" },
        { id: View.Orchestration, icon: GanttChartSquare, label: "Economic Synthesis" },
        { id: View.Settings, icon: Settings, label: "Nexus Configuration" },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 glass z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col h-full border-r border-white/5">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center neon-border">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SOVEREIGN</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-4 mb-2">{group.title}</h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group
                          ${isActive 
                            ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_12px_rgba(34,211,238,0.1)]' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                        `}
                      >
                        <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'} />
                        {item.label}
                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-xl border border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">System Health</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-500 font-mono">ALL NODES ACTIVE</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={48} />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
