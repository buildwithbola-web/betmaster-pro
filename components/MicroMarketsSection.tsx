
import React from 'react';
import { MicroMarketInsight, BetSlipItem } from '../types';
import { Target, Swords, BarChart2, Zap, ShieldAlert, TrendingDown, Flame, Plus } from 'lucide-react';

interface MicroMarketsSectionProps {
  insights: MicroMarketInsight[];
  onAddBet?: (bet: BetSlipItem) => void;
}

const MicroMarketsSection: React.FC<MicroMarketsSectionProps> = ({ insights, onAddBet }) => {
  if (!insights || insights.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'SHOT_SNIPER': return <Target className="text-white" size={24} />;
      case 'TACKLE_MACHINE': return <Swords className="text-white" size={24} />;
      case 'CRUMBLE_WATCH': return <TrendingDown className="text-white" size={24} />;
      case 'FAST_START': return <Zap className="text-white" size={24} />;
      default: return <BarChart2 className="text-white" size={24} />;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'SHOT_SNIPER': return 'Shot Sniper';
      case 'TACKLE_MACHINE': return 'Tackle Machine';
      case 'CRUMBLE_WATCH': return 'Crumble Watch';
      case 'FAST_START': return 'Fast Start Check';
      default: return 'Micro Market';
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'SHOT_SNIPER': return 'border-white/10 bg-black hover:border-white hover:bg-white/5';
      case 'TACKLE_MACHINE': return 'border-white/10 bg-black hover:border-white hover:bg-white/5';
      case 'CRUMBLE_WATCH': return 'border-white/10 bg-black hover:border-white hover:bg-white/5';
      case 'FAST_START': return 'border-white/10 bg-black hover:border-white hover:bg-white/5';
      default: return 'border-white/10 bg-black hover:border-white hover:bg-white/5';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <h3 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-3">
          <span className="text-emerald-500 text-3xl">07.</span>
          MICRO-MARKETS & PLAYER PROPS
        </h3>
        <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase flex items-center gap-1">
          Deep Prop Scanner
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className={`p-5 rounded-none border ${getColorClass(insight.type)} transition-all flex flex-col`}
          >
            <div className="flex items-center justify-between mb-4">
               <div className="p-2 bg-black rounded-none border border-white/10">
                {getIcon(insight.type)}
               </div>
               <span className="text-[10px] font-black font-mono text-zinc-500 uppercase tracking-widest">
                {insight.confidence}% Conf
               </span>
            </div>

            <h4 className="text-[10px] tracking-widest font-mono text-zinc-400 uppercase mb-1">
              {getLabel(insight.type)}
            </h4>
            
            <div className="mb-3">
              <span className="text-sm font-black uppercase tracking-wider text-white block truncate">
                {insight.player ? `${insight.player} (${insight.team})` : insight.team}
              </span>
            </div>

            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-4 flex-1 border-l-2 border-white/10 pl-2">
              "{insight.insight}"
            </p>

            <div className="bg-black p-3 rounded-none border border-white/10 flex justify-between items-center gap-1">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] tracking-widest font-mono text-zinc-500 uppercase">Value Prediction</span>
                <span className="text-xs font-mono font-bold text-emerald-500">
                  {insight.prediction}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddBet?.({
                    id: `micro-${idx}`,
                    game: insight.team,
                    market: getLabel(insight.type),
                    selection: insight.prediction,
                    odds: '1.00' // Placeholder odds, as micro markets might not have them returned in current schema
                  });
                }}
                className="text-zinc-500 hover:text-black transition-colors p-1.5 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none shrink-0"
                title="Add to Slip"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroMarketsSection;
