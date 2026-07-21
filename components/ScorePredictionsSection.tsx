import React from 'react';
import { ScorePredictionMatch, BetSlipItem } from '../types';
import { Target, ArrowRight, Plus } from 'lucide-react';

interface ScorePredictionsSectionProps {
  predictions: ScorePredictionMatch[];
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
}

const ScorePredictionsSection: React.FC<ScorePredictionsSectionProps> = ({ predictions, onGameClick, onAddBet }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
            <span className="text-emerald-500 text-3xl">05.</span>
            SCORE & GOAL MARKETS
          </h3>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mt-1 flex items-center gap-2">
            <Target size={12} className="text-emerald-500" /> Correct Score, Exact Goals & Multi Scores
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((match, index) => (
          <div 
            key={index} 
            className="group bg-black hover:bg-white/5 rounded-none p-5 border border-white/10 hover:border-emerald-500 transition-all cursor-pointer flex flex-col h-full"
            onClick={() => onGameClick(match.game)}
          >
            <div className="mb-4 border-b border-white/10 pb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-white leading-tight">{match.game}</h4>
            </div>

            <div className="flex-1 space-y-4">
              {/* Correct Scores */}
              <div className="bg-black p-3 rounded-none border border-white/10">
                <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-2">Correct Score</div>
                <div className="space-y-2">
                  {match.correctScores.map((cs, idx) => (
                    <div key={idx} className="flex justify-between items-center group/score">
                      <span className="text-sm font-bold text-white">{cs.score}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500">{cs.confidence}%</span>
                        <span className="text-xs font-mono font-bold text-emerald-500">{cs.odds}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddBet?.({
                              id: `score-${index}-${idx}`,
                              game: match.game,
                              market: 'Correct Score',
                              selection: cs.score,
                              odds: cs.odds
                            });
                          }}
                          className="opacity-0 group-hover/score:opacity-100 text-zinc-500 hover:text-black transition-all p-1 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Goal Range */}
              <div className="bg-black p-3 rounded-none border border-white/10 group/range">
                <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-2">Exact Goal Range</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-white">{match.exactGoalRange.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">{match.exactGoalRange.confidence}%</span>
                    <span className="text-xs font-mono font-bold text-emerald-500">{match.exactGoalRange.odds}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddBet?.({
                          id: `range-${index}`,
                          game: match.game,
                          market: 'Exact Goal Range',
                          selection: match.exactGoalRange.range,
                          odds: match.exactGoalRange.odds
                        });
                      }}
                      className="opacity-0 group-hover/range:opacity-100 text-zinc-500 hover:text-black transition-all p-1 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Multi Scores */}
              <div className="bg-black p-3 rounded-none border border-white/10 group/multi">
                <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-2">Multi Scores</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-white">{match.multiScores.scores}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">{match.multiScores.confidence}%</span>
                    <span className="text-xs font-mono font-bold text-emerald-500">{match.multiScores.odds}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddBet?.({
                          id: `multi-${index}`,
                          game: match.game,
                          market: 'Multi Scores',
                          selection: match.multiScores.scores,
                          odds: match.multiScores.odds
                        });
                      }}
                      className="opacity-0 group-hover/multi:opacity-100 text-zinc-500 hover:text-black transition-all p-1 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 group-hover:text-emerald-500 transition-colors flex items-center gap-1">
                DEEP DIVE <ArrowRight size={10} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScorePredictionsSection;
