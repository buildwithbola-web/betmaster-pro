import React from 'react';
import { Target, Calculator, AlertTriangle } from 'lucide-react';
import { EvScannerBet, BetSlipItem } from '../types';

interface EvScannerSectionProps {
  bets: EvScannerBet[];
  onAddBet: (bet: BetSlipItem) => void;
  gameName: string;
}

const EvScannerSection: React.FC<EvScannerSectionProps> = ({ bets, onAddBet, gameName }) => {
  if (!bets || bets.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="bg-orange-500/20 p-3 rounded-2xl">
          <Calculator className="text-orange-400" size={28} />
        </div>
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          EV+ Scanner <span className="text-orange-400">& Value Bets</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bets.map((bet, idx) => (
          <div key={idx} className="glass-panel border-orange-500/20 rounded-3xl p-6 hover:border-orange-500/50 hover:glow-orange hover:-translate-y-2 transition-all duration-300 relative">
            <div className="absolute top-4 right-4 bg-orange-500/20 text-orange-400 text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-orange-500/30">
              +{bet.evPercentage}% EV
            </div>
            
            <div className="mb-5 mt-2">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">{bet.market}</div>
              <div className="text-lg font-black uppercase tracking-wider text-white pr-16">{bet.selection}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-3 text-center shadow-inner">
                <div className="text-[9px] text-zinc-400 uppercase font-mono tracking-widest mb-1">True Odds (AI)</div>
                <div className="text-sm font-mono text-orange-400 font-bold">{bet.trueOdds} <span className="text-zinc-500 font-normal">({bet.aiProbability}%)</span></div>
              </div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-3 text-center shadow-inner">
                <div className="text-[9px] text-zinc-400 uppercase font-mono tracking-widest mb-1">Bookmaker</div>
                <div className="text-sm font-mono text-white font-bold">{bet.bookmakerOdds}</div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-orange-400">
                <AlertTriangle size={16} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Misprized Market</span>
              </div>
              <button 
                onClick={() => onAddBet({
                  id: Math.random().toString(),
                  game: gameName,
                  market: bet.market,
                  selection: bet.selection,
                  odds: bet.bookmakerOdds
                })}
                className="text-[10px] font-mono uppercase tracking-widest bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full transition-all font-bold shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_20px_rgba(234,88,12,0.6)]"
              >
                EXPLOIT VALUE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvScannerSection;
