import React, { useState } from 'react';
import { History, ArrowLeft, Trophy, XCircle, Clock } from 'lucide-react';
import { BetHistoryItem } from '../types';

interface BetHistoryPageProps {
  history: BetHistoryItem[];
  onBack: () => void;
  onUpdateStatus: (id: string, status: 'won' | 'lost' | 'pending') => void;
}

const BetHistoryPage: React.FC<BetHistoryPageProps> = ({ history, onBack, onUpdateStatus }) => {
  const [filter, setFilter] = useState<'all' | 'won' | 'lost' | 'pending' | 'void'>('all');

  const filteredHistory = history.filter(item => filter === 'all' || item.status === filter);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2.5 hover:bg-white/10 bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-full transition-all text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <History className="text-emerald-500" size={28} />
              <h1 className="text-2xl font-black uppercase tracking-widest">Betting History</h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            {['all', 'pending', 'won', 'lost', 'void'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 sm:px-5 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 space-y-4">
            <History size={64} className="opacity-20" />
            <p className="text-lg font-mono">No betting history found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredHistory.map(item => (
              <div key={item.id} className="glass-panel border-emerald-500/20 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
                {/* Item Header */}
                <div className="bg-white/5 px-6 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 font-mono uppercase">Ticket ID</span>
                      <span className="text-sm font-mono text-zinc-300">{item.id.slice(0, 8)}...</span>
                    </div>
                    <div className="w-px h-8 bg-zinc-800 hidden sm:block"></div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 font-mono uppercase">Date</span>
                      <span className="text-sm font-mono text-zinc-300">
                        {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border flex items-center gap-2 ${
                      item.status === 'won' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
                      item.status === 'lost' ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                      item.status === 'void' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.2)]' :
                      'bg-zinc-500/20 border-zinc-500/50 text-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.2)]'
                    }`}>
                      {item.status === 'won' && <span>✅</span>}
                      {item.status === 'lost' && <span>❌</span>}
                      {item.status === 'void' && <span>🟡</span>}
                      {item.status === 'pending' && <Clock size={14} />}
                      {item.status}
                    </span>

                    {/* Developer test toggles */}
                    <div className="flex border border-white/10 rounded-xl overflow-hidden opacity-30 hover:opacity-100 transition-opacity">
                      <button onClick={() => onUpdateStatus(item.id, 'won')} className="px-3 py-1 bg-white/5 hover:bg-emerald-500 hover:text-white border-r border-white/10 text-[10px] text-zinc-400 transition-colors font-bold">W</button>
                      <button onClick={() => onUpdateStatus(item.id, 'lost')} className="px-3 py-1 bg-white/5 hover:bg-red-500 hover:text-white border-r border-white/10 text-[10px] text-zinc-400 transition-colors font-bold">L</button>
                      <button onClick={() => onUpdateStatus(item.id, 'void')} className="px-3 py-1 bg-white/5 hover:bg-yellow-500 hover:text-white text-[10px] text-zinc-400 transition-colors font-bold">V</button>
                    </div>
                  </div>
                </div>

                {/* Bets */}
                <div className="p-6 space-y-4">
                  {item.bets.map((bet, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <div>
                        <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">{typeof bet.market === 'string' ? bet.market : "MARKET"}</div>
                        <div className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{typeof bet.game === 'string' ? bet.game : "UNKNOWN GAME"}</div>
                        <div className="text-xs text-zinc-400 font-mono uppercase tracking-widest">{typeof bet.selection === 'string' ? bet.selection : "SELECTION"}</div>
                      </div>
                      <div className="text-sm font-mono font-bold text-emerald-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                        {typeof bet.odds === 'string' ? bet.odds : bet.odds?.toString() || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer / Stakes */}
                <div className="bg-black/40 p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                  <div className="grid grid-cols-2 sm:flex gap-6 sm:gap-12 w-full sm:w-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Total Odds</span>
                      <span className="text-lg font-bold font-mono text-white">{item.totalOdds.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Stake Amount</span>
                      {/* Assuming stakeAmount is passed from the updated BetSlipDrawer, falling back to 0 if legacy */}
                      <span className="text-lg font-bold font-mono text-zinc-300">₦{(item as any).stakeAmount?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col text-right w-full sm:w-auto border-t sm:border-0 border-white/10 pt-4 sm:pt-0">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Potential Returns</span>
                    <span className={`text-2xl font-black font-mono ${
                      item.status === 'lost' ? 'text-zinc-600 line-through' :
                      item.status === 'void' ? 'text-zinc-400' :
                      'text-emerald-400'
                    }`}>
                      ₦{((item as any).stakeAmount * item.totalOdds || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BetHistoryPage;
