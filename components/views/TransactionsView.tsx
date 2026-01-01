
import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Search, Filter, Download, MoreHorizontal, ArrowDown, ArrowUp } from 'lucide-react';

const TransactionsView: React.FC = () => {
  const context = useContext(DataContext);
  if (!context) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Activity Ledger</h1>
          <p className="text-gray-500 mt-1">Immutable transaction history across the mesh.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-sm hover:bg-white/5 transition-all">
          <Download size={16} /> Export Ledger
        </button>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter by hash, vendor, or category..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/2 pb-4">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Asset/Vendor</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Hash/ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Classification</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Magnitude</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {context.transactions.map((t) => (
                <tr key={t.id} className="group hover:bg-white/2 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.amount < 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                        {t.amount < 0 ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
                      </div>
                      <span className="text-sm font-bold text-gray-200">{t.merchant}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">0x{t.id.repeat(4)}...{t.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{t.category}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-bold ${t.amount < 0 ? 'text-gray-200' : 'text-green-400'}`}>
                      {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-green-500' : t.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-bold uppercase text-gray-500">{t.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-600 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
