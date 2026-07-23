import React from 'react';
import { BankerBet, BetSlipItem } from '../types';
import { ShieldCheck, ArrowRight, Zap, Plus, Star } from 'lucide-react';

interface BankerBetsSectionProps {
  bets: BankerBet[];
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
  onViewAll?: () => void;
}

const BankerBetsSection: React.FC<BankerBetsSectionProps> = ({ bets, onGameClick, onAddBet, onViewAll }) => {
  // Find the bet with the highest confidence
  const bestBet = bets.length > 0 ? bets.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
            <span className="text-rose-500 text-3xl">06.</span>
            SUREFIRE BANKER BETS
          </h3>
          <p className="text-[10px] text-rose-400/80 font-mono uppercase mt-1 flex items-center gap-2 tracking-widest">
            <ShieldCheck size={12} className="text-rose-500" /> Lowest Odds • Uncommon Markets • Maximum Confidence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bets.map((bet, index) => {
          const isBestBet = bestBet && bet === bestBet;
          
          return (
            <div 
              key={index} 
              className={`group glass-panel rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col h-full relative hover:-translate-y-2 ${
                isBestBet 
                  ? 'border-rose-500/50 hover:glow-rose overflow-hidden bg-rose-500/5'
                  : 'border-white/10 hover:border-rose-500/30'
              }`}
              onClick={() => onGameClick(bet.game)}
            >
              {isBestBet && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-mono font-bold px-4 py-1.5 rounded-bl-2xl flex items-center gap-1 z-10 shadow-lg">
                  <Star size={10} className="fill-white" /> SUREST PICK
                </div>
              )}
              <div className="mb-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    isBestBet 
                      ? 'border-rose-500/30 bg-rose-500/20 text-rose-300' 
                      : 'border-white/10 bg-white/5 text-white'
                  }`}>
                    {bet.market}
                  </span>
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white leading-tight pr-4">{bet.game}</h4>
              </div>

              <div className="flex-1 space-y-5">
                <div className={`p-4 rounded-2xl border text-center ${
                  isBestBet 
                    ? 'border-rose-500/30 bg-rose-500/10' 
                    : 'border-white/10 bg-white/5'
                }`}>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-2">Pick</div>
                  <div className={`text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-widest ${
                    isBestBet ? 'text-rose-400' : 'text-white'
                  }`}>
                    <Zap size={16} className={isBestBet ? 'text-rose-400' : 'text-zinc-400'} />
                    {bet.selection}
                    {bet.status === 'won' && <span className="text-sm ml-1" title="Won">✅</span>}
                    {bet.status === 'lost' && <span className="text-sm ml-1" title="Lost">❌</span>}
                    {bet.status === 'void' && <span className="text-sm ml-1" title="Void">🟡</span>}
                  </div>
                </div>

                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-1">Odds</span>
                     <span className={`text-sm font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded w-fit`}>{bet.odds}</span>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-1">Confidence</span>
                     <span className={`text-sm font-mono font-bold ${
                       isBestBet ? 'text-rose-400' : 'text-white'
                     }`}>{bet.confidence}%</span>
                  </div>
                </div>

                <p className={`text-[10px] leading-relaxed border-l-2 pl-3 font-mono uppercase tracking-widest ${
                  isBestBet 
                    ? 'text-rose-400 border-rose-500/30' 
                    : 'text-zinc-400 border-white/10'
                }`}>
                  {bet.reasoning}
                </p>
              </div>

              <div className={`mt-5 pt-4 border-t flex justify-between items-center border-white/10`}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddBet?.({
                      id: `banker-${index}`,
                      game: bet.game,
                      market: bet.market,
                      selection: bet.selection,
                      odds: bet.odds
                    });
                  }}
                  className={`p-2 rounded-full text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] ${
                    isBestBet 
                      ? 'bg-rose-500 hover:bg-rose-400' 
                      : 'bg-white/10 hover:bg-rose-500'
                  }`}
                  title="Add to Slip"
                >
                  <Plus size={16} />
                </button>
                <span className={`text-[10px] font-mono tracking-widest transition-colors flex items-center gap-1 ${
                  isBestBet ? 'text-rose-400' : 'text-zinc-500 group-hover:text-rose-400'
                }`}>
                  VIEW DETAILS <ArrowRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {onViewAll && (
        <div className="mt-8 flex justify-center">
          <button onClick={onViewAll} className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
            View All Banker Bets <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BankerBetsSection;
