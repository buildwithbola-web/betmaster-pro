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
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <Calculator className="text-emerald-500" size={24} />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          EV+ Scanner <span className="text-emerald-500">& Value Bets</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bets.map((bet, idx) => (
          <div key={idx} className="bg-black border border-white/10 rounded-none p-5 hover:border-emerald-500 hover:bg-white/5 transition-all relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded-none border border-black">
              +{bet.evPercentage}% EV
            </div>
            
            <div className="mb-4">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{bet.market}</div>
              <div className="text-lg font-black uppercase tracking-wider text-white">{bet.selection}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black rounded-none border border-white/10 p-2 text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-1">True Odds (AI)</div>
                <div className="text-sm font-mono text-emerald-500 font-bold">{bet.trueOdds} ({bet.aiProbability}%)</div>
              </div>
              <div className="bg-black rounded-none border border-white/10 p-2 text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-1">Bookmaker</div>
                <div className="text-sm font-mono text-white font-bold">{bet.bookmakerOdds}</div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <div className="flex items-center gap-1.5 text-emerald-500">
                <AlertTriangle size={14} />
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
                className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500 hover:bg-transparent text-black hover:text-emerald-500 px-4 py-1.5 rounded-none transition-colors font-bold border border-emerald-500"
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
