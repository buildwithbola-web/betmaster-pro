import React from 'react';
import { DeepDiveGame, BetSlipItem } from '../types';
import { Crosshair, Gem, BarChart3, Radio, Clock, CalendarDays, MousePointerClick, Zap, Plus } from 'lucide-react';

interface AnalysisCardProps {
  data: DeepDiveGame;
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
  index: number;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ data, onGameClick, onAddBet, index }) => {
  const isSmartMoney = /smart money|sharp bets|sharp action/i.test(data.dataBacking);

  return (
    <div 
      onClick={() => onGameClick(data.teams)}
      className="bg-black rounded-none border border-white/10 hover:border-emerald-500 overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer group"
    >
      {/* Header */}
      <div className="bg-black px-5 py-4 border-b border-white/10 flex justify-between items-start gap-4 hover:bg-white/5 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase bg-black px-2 py-0.5 rounded-none border border-white/10">
              {data.sport}
            </span>
            {data.isLive ? (
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-emerald-500 animate-pulse uppercase">
                <Radio size={10} /> LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] tracking-widest font-mono text-zinc-500 uppercase">
                <Clock size={10} /> {data.startTime}
              </span>
            )}
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-wider leading-tight group-hover:text-emerald-500 transition-colors">{data.teams}</h3>
        </div>
        <MousePointerClick size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
      </div>

      <div className="p-5 space-y-5 flex-1 flex flex-col">
        {/* Main Market */}
        <div className="relative pl-4 border-l-2 border-white/10">
          <h4 className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
            <BarChart3 size={12} />
            Consensus
          </h4>
          <p className="text-white font-mono uppercase tracking-widest text-sm">{data.mainMarket}</p>
        </div>

        {/* Hidden Gem */}
        <div className="relative pl-4 border-l-2 border-white/10 bg-black rounded-none py-3 pr-2">
          <div className="flex justify-between items-start mb-1">
             <div className="flex items-center gap-2">
               <h4 className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase flex items-center gap-2">
                <Gem size={12} />
                Hidden Gem
               </h4>
               {isSmartMoney && (
                 <span className="flex items-center gap-1 text-[9px] font-bold text-black bg-emerald-500 border border-black px-1.5 py-0.5 rounded-none tracking-widest animate-pulse uppercase">
                    <Zap size={10} className="fill-black text-black" />
                    SMART MONEY
                 </span>
               )}
             </div>
            {data.bookmaker && (
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                via {data.bookmaker}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-white text-lg font-black uppercase tracking-widest">{data.hiddenGem}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddBet?.({
                  id: `deepdive-${index}`,
                  game: data.teams,
                  market: 'Hidden Gem',
                  selection: data.hiddenGem,
                  odds: '1.00' // Extract odds if possible, or leave dummy
                });
              }}
              className="text-emerald-500 hover:text-black transition-colors p-1.5 bg-black hover:bg-emerald-500 border border-emerald-500 rounded-none shrink-0 ml-2"
              title="Add to Slip"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Data Backing */}
        <div className="mt-auto bg-black p-3 rounded-none border border-white/10">
          <h4 className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
            <Crosshair size={12} />
            Stats Engine
          </h4>
          <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 leading-relaxed">
            {data.dataBacking}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;