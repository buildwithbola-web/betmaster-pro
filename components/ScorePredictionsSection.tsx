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
            <span className="text-teal-500 text-3xl">05.</span>
            SCORE & GOAL MARKETS
          </h3>
          <p className="text-[10px] tracking-widest text-teal-400/80 font-mono uppercase mt-1 flex items-center gap-2">
            <Target size={12} className="text-teal-500" /> Correct Score, Exact Goals & Multi Scores
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((match, index) => (
          <div 
            key={index} 
            className="group glass-panel rounded-3xl p-6 hover:glow-teal hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={() => onGameClick(match.game)}
          >
            <div className="mb-5 border-b border-white/10 pb-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white leading-tight">{match.game}</h4>
            </div>

            <div className="flex-1 space-y-4">
              {/* Correct Scores */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-colors">
                <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-3">Correct Score</div>
                <div className="space-y-3">
                  {(match.correctScores || []).map((cs, idx) => (
                    <div key={idx} className="flex justify-between items-center group/score">
                      <span className="text-sm font-bold text-white">{cs.score}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-400">{cs.confidence}%</span>
                        <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">{cs.odds}</span>
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
                          className="opacity-0 group-hover/score:opacity-100 text-teal-300 hover:text-white transition-all p-1.5 bg-white/5 hover:bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Goal Range */}
              {match.exactGoalRange && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-colors group/range">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-3">Exact Goal Range</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white">{match.exactGoalRange.range}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-zinc-400">{match.exactGoalRange.confidence}%</span>
                      <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">{match.exactGoalRange.odds}</span>
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
                        className="opacity-0 group-hover/range:opacity-100 text-teal-300 hover:text-white transition-all p-1.5 bg-white/5 hover:bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi Scores */}
              {match.multiScores && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-colors group/multi">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mb-3">Multi Scores</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white">{match.multiScores.scores}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-zinc-400">{match.multiScores.confidence}%</span>
                      <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">{match.multiScores.odds}</span>
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
                        className="opacity-0 group-hover/multi:opacity-100 text-teal-300 hover:text-white transition-all p-1.5 bg-white/5 hover:bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 group-hover:text-teal-400 transition-colors">
              <span>EXPLORE ALL {match.game} MARKETS</span>
              <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScorePredictionsSection;
