import React, { useState } from 'react';
import { FirstSetWinner, BetSlipItem } from '../types';
import { 
  Trophy, 
  ArrowRight, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  Clock, 
  Flame, 
  TrendingUp, 
  FileText,
  ShieldAlert
} from 'lucide-react';

interface FirstSetWinnersSectionProps {
  winners: FirstSetWinner[];
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
}

const FirstSetWinnersSection: React.FC<FirstSetWinnersSectionProps> = ({ winners, onGameClick, onAddBet }) => {
  // Track which games have their extensive analysis expanded
  const [expandedGames, setExpandedGames] = useState<Record<number, boolean>>({
    0: true, // Default open the first one for high-impact visibility
  });

  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGames(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getSportConfig = (sport: string) => {
    const s = sport.toLowerCase();
    if (s.includes('tennis')) {
      return {
        name: 'Tennis',
        themeColor: 'emerald',
        bgBadge: 'bg-black text-emerald-500 border-white/10',
        bgPanel: 'bg-black border-white/10',
        textColor: 'text-emerald-500',
        focusBorder: 'hover:border-emerald-500',
        label: '1st Set Winner',
        icon: <Activity size={14} className="text-white" />
      };
    } else if (s.includes('basketball')) {
      return {
        name: 'Basketball',
        themeColor: 'white',
        bgBadge: 'bg-black text-white border-white/10',
        bgPanel: 'bg-black border-white/10',
        textColor: 'text-white',
        focusBorder: 'hover:border-white',
        label: '1st Half Points Total',
        icon: <Flame size={14} className="text-white" />
      };
    } else {
      // Default to Football/Soccer
      return {
        name: 'Football',
        themeColor: 'white',
        bgBadge: 'bg-black text-white border-white/10',
        bgPanel: 'bg-black border-white/10',
        textColor: 'text-white',
        focusBorder: 'hover:border-white',
        label: '1st Half Draw Verdict',
        icon: <Clock size={14} className="text-white" />
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <span className="text-emerald-500 text-3xl">04.</span>
            1ST SET & HALF CRITICAL ANALYSIS
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1 flex items-center gap-2 tracking-widest">
            <Trophy size={12} className="text-emerald-500" /> Advanced Momentum & Early-Game Advantage Metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {winners.map((winner, index) => {
          const config = getSportConfig(winner.sport || 'Football');
          const isExpanded = !!expandedGames[index];

          return (
            <div 
              key={index} 
              className={`group bg-black hover:bg-white/5 rounded-none border border-white/10 hover:border-emerald-500 transition-all cursor-pointer flex flex-col h-full overflow-hidden`}
              onClick={() => onGameClick(winner.game)}
            >
              {/* Card Header with Sport Badge */}
              <div className="p-5 pb-3 border-b border-white/10 flex justify-between items-center bg-black">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border ${config.bgBadge} flex items-center gap-1.5`}>
                    {config.icon}
                    {config.name}
                  </span>
                </div>
                <div className="text-[10px] font-mono font-bold text-emerald-500 bg-black border border-white/10 px-2 py-0.5 rounded-none tracking-widest">
                  {winner.confidence}% CONFIDENCE
                </div>
              </div>

              {/* Match and Odds */}
              <div className="p-5 pb-3 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-base font-black uppercase tracking-wider text-white leading-snug">{winner.game}</h4>
                  <span className="text-[10px] tracking-widest text-zinc-500 font-mono mt-1 block uppercase">{config.label} Analysis</span>
                </div>
                <div className="bg-black px-3 py-1.5 rounded-none border border-white/10 text-center min-w-[70px]">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block mb-0.5">Odds</span>
                  <span className="text-sm font-mono font-bold text-emerald-500">{winner.odds}</span>
                </div>
              </div>

              {/* Main Prediction Value Display */}
              <div className="px-5 pb-3">
                <div className={`p-3.5 rounded-none border ${config.bgPanel} flex items-center justify-between`}>
                  <div>
                    <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono font-bold block mb-1">Target Prediction</span>
                    <span className={`text-base font-bold uppercase tracking-widest ${config.textColor}`}>
                      {winner.predictedWinner}
                    </span>
                  </div>
                  <div className="bg-black border border-white/10 p-2 rounded-none">
                    <TrendingUp size={16} className={config.textColor} />
                  </div>
                </div>
              </div>

              {/* Core Summary */}
              <div className="px-5 pb-4 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 leading-relaxed border-l-2 border-white/10 pl-3">
                  {winner.reasoning}
                </p>
              </div>

              {/* Interactive Extensive Analysis Section */}
              <div className="border-t border-white/10 bg-black">
                <button
                  type="button"
                  onClick={(e) => toggleExpand(index, e)}
                  className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                    <FileText size={12} className="text-zinc-500" />
                    Critical Scouting Report
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={14} className="text-zinc-500" />
                  ) : (
                    <ChevronDown size={14} className="text-zinc-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/10 animate-fade-in text-[10px] font-mono uppercase tracking-widest text-zinc-400 leading-relaxed space-y-2.5">
                    <div className="p-3 bg-black rounded-none border border-white/10 whitespace-pre-line text-zinc-300">
                      {winner.extensiveAnalysis}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-3 border-t border-white/10 flex justify-between items-center bg-black">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddBet?.({
                      id: `firstset-${index}`,
                      game: winner.game,
                      market: config.label,
                      selection: winner.predictedWinner,
                      odds: winner.odds
                    });
                  }}
                  className="text-[10px] font-mono font-bold text-emerald-500 hover:text-black transition-colors flex items-center gap-1 bg-black hover:bg-emerald-500 px-2.5 py-1.5 rounded-none border border-emerald-500 tracking-widest"
                >
                  <Plus size={10} /> ADD TO SLIP
                </button>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 group-hover:text-emerald-500 transition-colors flex items-center gap-1">
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

export default FirstSetWinnersSection;
