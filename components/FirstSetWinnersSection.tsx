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
        themeColor: 'cyan',
        bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        bgPanel: 'bg-white/5 border-white/10',
        textColor: 'text-cyan-400',
        focusBorder: 'hover:border-cyan-500',
        label: '1st Set Winner',
        icon: <Activity size={14} className="text-cyan-400" />
      };
    } else if (s.includes('basketball')) {
      return {
        name: 'Basketball',
        themeColor: 'teal',
        bgBadge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        bgPanel: 'bg-white/5 border-white/10',
        textColor: 'text-teal-400',
        focusBorder: 'hover:border-teal-500',
        label: '1st Half Points Total',
        icon: <Flame size={14} className="text-teal-400" />
      };
    } else {
      // Default to Football/Soccer
      return {
        name: 'Football',
        themeColor: 'cyan',
        bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        bgPanel: 'bg-white/5 border-white/10',
        textColor: 'text-cyan-400',
        focusBorder: 'hover:border-cyan-500',
        label: '1st Half Draw Verdict',
        icon: <Clock size={14} className="text-cyan-400" />
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <span className="text-cyan-500 text-3xl">04.</span>
            1ST SET & HALF CRITICAL ANALYSIS
          </h3>
          <p className="text-[10px] text-cyan-400/80 font-mono uppercase mt-1 flex items-center gap-2 tracking-widest">
            <Trophy size={12} className="text-cyan-500" /> Advanced Momentum & Early-Game Advantage Metrics
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
              className={`group glass-panel rounded-3xl hover:glow-${config.themeColor} hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden`}
              onClick={() => onGameClick(winner.game)}
            >
              {/* Card Header with Sport Badge */}
              <div className="p-5 pb-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-1.5 ${config.bgBadge}`}>
                    {config.icon}
                    {config.name}
                  </span>
                </div>
                <div className={`text-[10px] font-mono font-bold ${config.textColor} bg-white/5 border border-white/10 px-3 py-1 rounded-full tracking-widest`}>
                  {winner.confidence}% CONFIDENCE
                </div>
              </div>

              {/* Match and Odds */}
              <div className="p-5 pb-3 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-base font-black uppercase tracking-wider text-white leading-snug">{winner.game}</h4>
                  <span className="text-[10px] tracking-widest text-zinc-400 font-mono mt-1 block uppercase">{config.label} Analysis</span>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center min-w-[70px]">
                  <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest block mb-0.5">Odds</span>
                  <span className={`text-sm font-mono font-bold ${config.textColor}`}>{winner.odds}</span>
                </div>
              </div>

              {/* Main Prediction Value Display */}
              <div className="px-5 pb-3">
                <div className={`p-4 rounded-2xl border ${config.bgPanel} flex items-center justify-between shadow-inner`}>
                  <div>
                    <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono font-bold block mb-1">Target Prediction</span>
                    <span className={`text-base font-bold uppercase tracking-widest ${config.textColor}`}>
                      {winner.predictedWinner}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                    <TrendingUp size={18} className={config.textColor} />
                  </div>
                </div>
              </div>

              {/* Core Summary */}
              <div className="px-5 pb-4 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 leading-relaxed border-l-2 border-cyan-500/30 pl-3">
                  {winner.reasoning}
                </p>
              </div>

              {/* Interactive Extensive Analysis Section */}
              <div className="border-t border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={(e) => toggleExpand(index, e)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/10 transition-all"
                >
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" />
                    Critical Scouting Report
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-cyan-400" />
                  ) : (
                    <ChevronDown size={16} className="text-cyan-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 animate-fade-in text-[10px] font-mono uppercase tracking-widest text-zinc-300 leading-relaxed space-y-2.5">
                    <div className="p-4 glass-panel rounded-2xl whitespace-pre-line text-zinc-200">
                      {winner.extensiveAnalysis}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-4 border-t border-white/10 flex justify-between items-center bg-white/5">
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
                  className="text-[10px] font-mono font-bold text-white hover:text-cyan-900 transition-all flex items-center gap-2 bg-cyan-600 hover:bg-cyan-400 px-4 py-2 rounded-full tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Plus size={12} /> ADD TO SLIP
                </button>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  DEEP DIVE <ArrowRight size={12} />
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
