import React from 'react';
import { Zap, Radio } from 'lucide-react';
import { LiveMomentum, BetSlipItem } from '../types';

interface LiveMomentumSectionProps {
  momentum: LiveMomentum;
  onAddBet: (bet: BetSlipItem) => void;
  gameName: string;
}

const LiveMomentumSection: React.FC<LiveMomentumSectionProps> = ({ momentum, onAddBet, gameName }) => {
  if (!momentum || !momentum.currentMomentum) return null;

  return (
    <div className="bg-black border border-white/10 rounded-none overflow-hidden mb-8">
      <div className="bg-black p-4 border-b border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-8 w-8 rounded-none bg-black border border-white/10">
            <Radio size={16} className="text-emerald-500 relative z-10 animate-pulse" />
          </div>
          <h2 className="text-lg font-black text-white uppercase tracking-widest">
            Live In-Play <span className="text-emerald-500">Advisor</span>
          </h2>
        </div>
        <div className="px-3 py-1 bg-emerald-500 rounded-none border border-emerald-500 text-[10px] font-mono font-bold text-black uppercase tracking-widest flex items-center gap-2">
          <Zap size={12} />
          {momentum.confidence}% CONFIDENCE
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Current Match Flow</div>
            <p className="text-lg md:text-xl font-black uppercase tracking-wider text-white leading-tight border-l-2 border-emerald-500 pl-3">
              {momentum.currentMomentum}
            </p>
          </div>
          
          <div className="bg-black rounded-none p-4 border border-white/10">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Algorithmic Reasoning</div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              {momentum.reasoning}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto bg-black rounded-none p-5 border border-emerald-500 text-center flex flex-col justify-center min-w-[250px]">
          <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-2">Suggested Live Action</div>
          <div className="text-lg font-black uppercase tracking-wider text-white mb-4">
            {momentum.suggestedLiveBet}
          </div>
          <button 
            onClick={() => onAddBet({
              id: Math.random().toString(),
              game: gameName,
              market: "Live Action",
              selection: momentum.suggestedLiveBet,
              odds: momentum.odds
            })}
            className="w-full bg-emerald-500 hover:bg-transparent text-black hover:text-emerald-500 border border-emerald-500 py-3 rounded-none font-bold tracking-widest uppercase text-[10px] transition-all flex justify-between items-center px-4"
          >
            <span>BET NOW</span>
            <span className="font-mono">{momentum.odds}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMomentumSection;
