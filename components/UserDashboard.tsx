import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Target, DollarSign, BarChart2, Trophy, Percent, Activity, Zap, Star } from 'lucide-react';
import { BetHistoryItem, AggregateStats } from '../types';

interface UserDashboardProps {
  history: BetHistoryItem[];
  onBack: () => void;
  aggregateStats?: AggregateStats;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ history, onBack, aggregateStats }) => {
  // Compute all stats from history
  const totalBets = history.length;
  const wonBets = history.filter(b => b.status === 'won');
  const lostBets = history.filter(b => b.status === 'lost');
  const pendingBets = history.filter(b => b.status === 'pending');
  const settledBets = wonBets.length + lostBets.length;

  const strikeRate = settledBets > 0 ? ((wonBets.length / settledBets) * 100) : 0;
  const totalStaked = history.reduce((sum, b) => sum + (b.stakeAmount || 0), 0);
  const totalReturns = wonBets.reduce((sum, b) => sum + ((b.stakeAmount || 0) * b.totalOdds), 0);
  const netProfitLoss = totalReturns - totalStaked;
  const roi = totalStaked > 0 ? ((netProfitLoss / totalStaked) * 100) : 0;
  const avgOdds = totalBets > 0 ? (history.reduce((sum, b) => sum + b.totalOdds, 0) / totalBets) : 0;

  const bestWin = wonBets.length > 0 
    ? wonBets.reduce((best, b) => {
        const payout = (b.stakeAmount || 0) * b.totalOdds;
        return payout > best ? payout : best;
      }, 0)
    : 0;

  const kpis = [
    { label: 'Total Bets', value: totalBets.toString(), icon: Activity, color: 'text-white' },
    { label: 'Strike Rate', value: `${strikeRate.toFixed(1)}%`, icon: Target, color: strikeRate >= 50 ? 'text-emerald-500' : 'text-red-500' },
    { label: 'ROI', value: `${roi >= 0 ? '+' : ''}${roi.toFixed(1)}%`, icon: Percent, color: roi >= 0 ? 'text-emerald-500' : 'text-red-500' },
    { label: 'Net P/L', value: `${netProfitLoss >= 0 ? '+' : ''}₦${Math.abs(netProfitLoss).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: netProfitLoss >= 0 ? TrendingUp : TrendingDown, color: netProfitLoss >= 0 ? 'text-emerald-500' : 'text-red-500' },
    { label: 'Total Staked', value: `₦${totalStaked.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: DollarSign, color: 'text-white' },
    { label: 'Total Returns', value: `₦${totalReturns.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: BarChart2, color: 'text-emerald-500' },
  ];

  const recentBets = history.slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-none transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <BarChart2 className="text-emerald-500" size={28} />
              <h1 className="text-2xl font-black uppercase tracking-widest">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest hidden sm:block">Live Tracking</span>
          </div>
        </div>

        {/* KPI Grid */}
        {aggregateStats && aggregateStats.totalGradedMatches > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-white">AI Automated Grading Accuracy</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 bg-white/5">
              <div className="p-4 border-r border-b md:border-b-0 border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Total Graded</div>
                <div className="text-xl md:text-2xl font-black font-mono text-white">{aggregateStats.totalGradedMatches} matches</div>
              </div>
              <div className="p-4 border-r border-b md:border-b-0 border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Win Rate</div>
                <div className="text-xl md:text-2xl font-black font-mono text-emerald-400">
                  {aggregateStats.totalWon + aggregateStats.totalLost > 0 
                    ? ((aggregateStats.totalWon / (aggregateStats.totalWon + aggregateStats.totalLost)) * 100).toFixed(1) + '%' 
                    : 'N/A'}
                </div>
              </div>
              <div className="p-4 border-r border-white/10">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Won Predictions</div>
                <div className="text-xl md:text-2xl font-black font-mono text-emerald-400">{aggregateStats.totalWon}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Lost / Void</div>
                <div className="text-xl md:text-2xl font-black font-mono text-zinc-400">
                  <span className="text-red-400">{aggregateStats.totalLost}</span> / <span className="text-yellow-400">{aggregateStats.totalVoid}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Betting Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-white/10">
          {kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className={`p-6 bg-black border-r border-b border-white/10 last:border-r-0 flex flex-col justify-between gap-4 ${idx >= 4 ? 'lg:border-b-0' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{kpi.label}</span>
                <kpi.icon size={14} className="text-zinc-600" />
              </div>
              <div className={`text-xl md:text-2xl font-black font-mono tracking-tight ${kpi.color}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Win/Loss Distribution Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-white" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-white">Win / Loss Distribution</h3>
          </div>
          
          <div className="border border-white/10 bg-black p-6 space-y-4">
            {settledBets > 0 ? (
              <>
                <div className="h-4 w-full flex overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${(wonBets.length / totalBets) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-red-500 h-full transition-all duration-500"
                    style={{ width: `${(lostBets.length / totalBets) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{ width: `${(pendingBets.length / totalBets) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-emerald-500"></div>
                    <span className="text-zinc-400">Won: <span className="text-white font-bold">{wonBets.length}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-red-500"></div>
                    <span className="text-zinc-400">Lost: <span className="text-white font-bold">{lostBets.length}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-amber-500"></div>
                    <span className="text-zinc-400">Pending: <span className="text-white font-bold">{pendingBets.length}</span></span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-zinc-500 text-sm font-mono text-center py-4">No settled bets yet. Place some bets to see your distribution.</p>
            )}

            {/* Additional Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 mt-4">
              <div className="p-4 border-r border-white/10">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Avg Odds</div>
                <div className="text-lg font-black font-mono text-white">{avgOdds.toFixed(2)}</div>
              </div>
              <div className="p-4 border-r border-white/10">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Best Win</div>
                <div className="text-lg font-black font-mono text-emerald-500">₦{bestWin.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
              </div>
              <div className="p-4 border-r border-white/10">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Won Bets</div>
                <div className="text-lg font-black font-mono text-emerald-500">{wonBets.length}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Lost Bets</div>
                <div className="text-lg font-black font-mono text-red-500">{lostBets.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-white" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-white">Recent Activity</h3>
          </div>
          
          {recentBets.length === 0 ? (
            <div className="border border-white/10 bg-black p-12 text-center">
              <Activity size={48} className="text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">No activity yet. Start placing bets to see your history here.</p>
            </div>
          ) : (
            <div className="border border-white/10 bg-black divide-y divide-white/10">
              {recentBets.map((item) => {
                const potentialReturn = (item.stakeAmount || 0) * item.totalOdds;
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Status Indicator */}
                      <div className={`h-2 w-2 ${
                        item.status === 'won' ? 'bg-emerald-500' : 
                        item.status === 'lost' ? 'bg-red-500' : 
                        'bg-amber-500 animate-pulse'
                      }`}></div>
                      <div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">
                          {item.bets.map(b => b.game).join(', ').slice(0, 50)}{item.bets.map(b => b.game).join(', ').length > 50 ? '...' : ''}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                          {new Date(item.date).toLocaleDateString()} • {item.bets.length} selection{item.bets.length > 1 ? 's' : ''} • Odds: {item.totalOdds.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-black font-mono ${
                        item.status === 'won' ? 'text-emerald-500' : 
                        item.status === 'lost' ? 'text-zinc-600 line-through' : 
                        'text-white'
                      }`}>
                        {item.status === 'won' ? '+' : ''}₦{potentialReturn.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                        item.status === 'won' ? 'text-emerald-500' : 
                        item.status === 'lost' ? 'text-red-500' : 
                        'text-amber-500'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
