
import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Users, Database, Cpu } from 'lucide-react';

const MetaDashboardView: React.FC = () => {
  const context = useContext(DataContext);
  if (!context) return null;

  const { transactions, user } = context;

  const chartData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 600 },
    { name: 'Sat', value: 900 },
    { name: 'Sun', value: 1100 },
  ];

  const stats = [
    { label: "Net Asset Value", value: `$${user.balance.toLocaleString()}`, trend: "+12.4%", icon: TrendingUp, color: "text-cyan-400" },
    { label: "Mesh Nodes", value: "2,408", trend: "+5", icon: Database, color: "text-purple-400" },
    { label: "Active Agents", value: "12", trend: "0", icon: Users, color: "text-emerald-400" },
    { label: "Sync Latency", value: "14ms", trend: "-2ms", icon: Cpu, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-gray-500 mt-1">Real-time orchestration and global liquidity monitoring.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono">Last Synced: 2s ago</span>
          <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95">Trigger Manual Sync</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:translate-y-[-2px] group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5">
                <span className={`text-xs font-bold flex items-center ${stat.trend.startsWith('+') ? 'text-green-400' : stat.trend.startsWith('-') ? 'text-cyan-400' : 'text-gray-400'}`}>
                  {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : stat.trend.startsWith('-') ? <ArrowDownRight size={14} /> : null}
                  {stat.trend}
                </span>
                <span className="text-[10px] text-gray-600 font-bold uppercase">vs cycle average</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Mesh Throughput</h3>
              <p className="text-sm text-gray-500">Aggregated transactional flow across all sovereign nodes.</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-xs rounded-lg px-3 py-1 outline-none text-gray-400">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity Ledger</h3>
          <div className="space-y-4 flex-1">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.amount < 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200">{t.merchant}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{t.category} • {t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${t.amount < 0 ? 'text-gray-200' : 'text-green-400'}`}>
                    {t.amount < 0 ? '' : '+'}${Math.abs(t.amount).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 mt-6 border border-white/5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            View Expanded Ledger
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetaDashboardView;
