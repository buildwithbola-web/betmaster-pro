import React from 'react';
import { TrendingDown, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { OddsMovement, BetSlipItem } from '../types';

interface OddsMovementSectionProps {
  movements: OddsMovement[];
  onAddBet: (bet: BetSlipItem) => void;
  gameName: string;
}

const OddsMovementSection: React.FC<OddsMovementSectionProps> = ({ movements, onAddBet, gameName }) => {
  if (!movements || movements.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="bg-fuchsia-500/20 p-3 rounded-2xl">
          <Activity className="text-fuchsia-400" size={28} />
        </div>
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Line Movement <span className="text-fuchsia-400">& Smart Money</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movements.map((mov, idx) => (
          <div key={idx} className="glass-panel border-fuchsia-500/20 rounded-3xl p-6 hover:border-fuchsia-500/50 hover:glow-fuchsia hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${mov.movementDirection === 'DOWN' ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]' : 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-fuchsia-300 bg-fuchsia-500/20 px-3 py-1 rounded-full border border-fuchsia-500/30 uppercase">
                  {mov.market}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="text-[10px] font-mono text-zinc-400 line-through">{mov.openingOdds}</span>
                {mov.movementDirection === 'DOWN' ? <TrendingDown size={14} className="text-fuchsia-400" /> : <TrendingUp size={14} className="text-pink-400" />}
                <span className={`text-xs font-mono font-bold ${mov.movementDirection === 'DOWN' ? 'text-fuchsia-400' : 'text-pink-400'}`}>
                  {mov.currentOdds}
                </span>
              </div>
            </div>

            <p className="text-sm font-black uppercase tracking-wider text-white mb-3 block">
              {mov.insight}
            </p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <BarChart2 size={16} className="text-fuchsia-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Volume: <span className="text-white font-bold">{mov.sharpMoneyVolume}</span></span>
              </div>
              <button 
                onClick={() => onAddBet({
                  id: Math.random().toString(),
                  game: gameName,
                  market: mov.market,
                  selection: "Follow Sharp Money",
                  odds: mov.currentOdds
                })}
                className="text-[10px] font-mono uppercase tracking-widest bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-full transition-all font-bold shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]"
              >
                ADD TO SLIP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OddsMovementSection;
