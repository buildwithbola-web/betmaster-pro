import React from 'react';
import { BankerBet, BetSlipItem } from '../types';
import { ShieldCheck, ArrowRight, Zap, Plus, Star } from 'lucide-react';

interface BankerBetsSectionProps {
  bets: BankerBet[];
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
}

const BankerBetsSection: React.FC<BankerBetsSectionProps> = ({ bets, onGameClick, onAddBet }) => {
  // Find the bet with the highest confidence
  const bestBet = bets.length > 0 ? bets.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
            <span className="text-emerald-500 text-3xl">06.</span>
            SUREFIRE BANKER BETS
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1 flex items-center gap-2 tracking-widest">
            <ShieldCheck size={12} className="text-emerald-500" /> Lowest Odds • Uncommon Markets • Maximum Confidence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bets.map((bet, index) => {
          const isBestBet = bestBet && bet === bestBet;
          
          return (
            <div 
              key={index} 
              className={`group rounded-none p-5 border transition-all cursor-pointer flex flex-col h-full relative ${
                isBestBet 
                  ? 'bg-black hover:bg-white/5 border-emerald-500 hover:border-white overflow-hidden'
                  : 'bg-black hover:bg-white/5 border-white/10 hover:border-emerald-500'
              }`}
              onClick={() => onGameClick(bet.game)}
            >
              {isBestBet && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-mono font-bold px-3 py-1 rounded-none border border-black flex items-center gap-1 z-10">
                  <Star size={10} className="fill-black" /> SUREST PICK
                </div>
              )}
              <div className="mb-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-none border border-white/10 bg-black ${
                    isBestBet 
                      ? 'text-emerald-500' 
                      : 'text-white'
                  }`}>
                    {bet.market}
                  </span>
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white leading-tight pr-4">{bet.game}</h4>
              </div>

              <div className="flex-1 space-y-4">
                <div className={`p-3 rounded-none border text-center bg-black ${
                  isBestBet 
                    ? 'border-emerald-500' 
                    : 'border-white/10'
                }`}>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-1">Pick</div>
                  <div className={`text-sm font-bold flex items-center justify-center gap-1 uppercase tracking-widest ${
                    isBestBet ? 'text-emerald-500' : 'text-white'
                  }`}>
                    <Zap size={14} className={isBestBet ? 'text-emerald-500' : 'text-white'} />
                    {bet.selection}
                  </div>
                </div>

                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Odds</span>
                     <span className={`text-sm font-mono font-bold text-emerald-500`}>{bet.odds}</span>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Confidence</span>
                     <span className={`text-sm font-mono font-bold ${
                       isBestBet ? 'text-emerald-500' : 'text-white'
                     }`}>{bet.confidence}%</span>
                  </div>
                </div>

                <p className={`text-[10px] leading-relaxed border-l-2 pl-3 font-mono uppercase tracking-widest ${
                  isBestBet 
                    ? 'text-emerald-500 border-white/10' 
                    : 'text-zinc-400 border-white/10'
                }`}>
                  {bet.reasoning}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex justify-between items-center border-white/10`}>
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
                  className={`text-[10px] font-mono transition-colors flex items-center gap-1 px-2 py-1 rounded-none border border-transparent hover:border-emerald-500 hover:bg-emerald-500 hover:text-black bg-transparent text-emerald-500`}
                >
                  <Plus size={10} /> ADD TO SLIP
                </button>
                <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center gap-1 text-zinc-500 group-hover:text-emerald-500`}>
                  DEEP DIVE <ArrowRight size={10} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BankerBetsSection;
