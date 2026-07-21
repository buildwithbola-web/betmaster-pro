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
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <Activity className="text-emerald-500" size={24} />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Line Movement <span className="text-emerald-500">& Smart Money</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movements.map((mov, idx) => (
          <div key={idx} className="bg-black border border-white/10 rounded-none p-5 hover:border-emerald-500 hover:bg-white/5 transition-all relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${mov.movementDirection === 'DOWN' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 bg-black px-2 py-0.5 rounded-none border border-white/10 uppercase">
                  {mov.market}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black rounded-none border border-white/10">
                <span className="text-[10px] font-mono text-zinc-500 line-through">{mov.openingOdds}</span>
                {mov.movementDirection === 'DOWN' ? <TrendingDown size={12} className="text-emerald-500" /> : <TrendingUp size={12} className="text-red-500" />}
                <span className={`text-xs font-mono font-bold ${mov.movementDirection === 'DOWN' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {mov.currentOdds}
                </span>
              </div>
            </div>

            <p className="text-sm font-black uppercase tracking-wider text-white mb-3 block">
              {mov.insight}
            </p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-zinc-500" />
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
                className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500 hover:bg-transparent text-black hover:text-emerald-500 px-3 py-1.5 rounded-none transition-colors font-bold border border-emerald-500"
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
