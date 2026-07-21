
import React from 'react';
import { GamePredictions, Prediction, BetSlipItem } from '../types';
import { Target, TrendingUp, Zap, Gem, CheckCircle2, ShieldCheck, Plus } from 'lucide-react';

interface GamePredictionsCardProps {
  data: GamePredictions;
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
}

const PredictionList: React.FC<{ predictions: Prediction[], type: 'mainstream' | 'niche', onAddBet?: (bet: BetSlipItem) => void, gameName: string }> = ({ predictions, type, onAddBet, gameName }) => {
  const isMainstream = type === 'mainstream';
  const headerIcon = isMainstream ? <Zap size={18} className="text-emerald-500" /> : <ShieldCheck size={18} className="text-white" />;
  const headerTitle = isMainstream ? "Mainstream Likely Wins" : "High-Value Niche (90%+)";
  const headerColor = isMainstream ? "text-fuchsia-400" : "text-purple-300";
  const borderColor = "border-white/10";
  const bgBadge = isMainstream ? "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30" : "bg-purple-500/20 text-purple-300 border-purple-500/30";

  return (
    <div className={`flex flex-col h-full glass-panel rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:glow-purple`}>
      <div className={`p-5 border-b ${borderColor} bg-white/5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {headerIcon}
          <h3 className={`text-sm font-bold uppercase tracking-widest ${headerColor}`}>{headerTitle}</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Analysis Desk</span>
      </div>
      <div className="divide-y divide-white/10">
        {predictions.map((pred, index) => (
          <div key={index} className="group p-4 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start gap-4 mb-3">
                <span className={`text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full border ${bgBadge}`}>
                   {pred.market}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-fuchsia-400 font-bold text-sm bg-fuchsia-400/10 px-2 py-1 rounded-md">{pred.odds}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddBet?.({
                        id: `${type}-${index}`,
                        game: gameName,
                        market: pred.market,
                        selection: pred.selection,
                        odds: pred.odds
                      });
                    }}
                    className="text-zinc-400 hover:text-white transition-all p-1.5 bg-white/5 hover:bg-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] rounded-full shrink-0 opacity-0 group-hover:opacity-100"
                    title="Add to Slip"
                  >
                    <Plus size={16} />
                  </button>
                </div>
             </div>
             
             <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                   {pred.confidence >= 90 && (
                      <CheckCircle2 size={12} className="text-blue-400" />
                   )}
                   <h4 className="text-white font-bold leading-tight">{pred.selection}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-snug">{pred.reasoning}</p>
             </div>

             {/* Confidence Bar */}
             <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden shadow-inner">
                   <div 
                      className={`h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400`} 
                      style={{ width: `${pred.confidence}%` }}
                   ></div>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-500">{pred.confidence}%</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GamePredictionsCard: React.FC<GamePredictionsCardProps> = ({ data, onGameClick, onAddBet }) => {
  return (
    <div className="mb-12 animate-fade-in-up">
      {/* Header */}
      <div className="glass-panel rounded-3xl mb-6 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:glow-purple transition-all duration-300">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <Target size={28} className="text-purple-400" />
          </div>
          <div>
            <span className="text-xs font-mono text-purple-400/80 uppercase tracking-widest block mb-1">
              Deep Search Intelligence
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase flex items-center gap-3">
              {data.gameName}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">Confidence Score</span>
            <span className="text-xs font-mono font-bold text-emerald-500">OPTIMIZED 90%+</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl">
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Verified Markets</span>
          </div>
        </div>
      </div>

      {/* Grid for Two Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         {/* Column 1: Mainstream */}
         {data.mainstream && (
            <PredictionList predictions={data.mainstream.slice(0, 5)} type="mainstream" onAddBet={onAddBet} gameName={data.gameName} />
         )}

         {/* Column 2: Niche */}
         {data.niche && (
            <PredictionList predictions={data.niche.slice(0, 5)} type="niche" onAddBet={onAddBet} gameName={data.gameName} />
         )}
      </div>
      
      {/* Footer Info */}
      <div className="px-6 py-4 glass-panel rounded-2xl flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
         <span className="flex items-center gap-2"><TrendingUp size={14} className="text-purple-400" /> Sharp Action Scanned</span>
         <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-purple-400" /> Liquidity Verified</span>
         <span className="flex items-center gap-2"><Zap size={14} className="text-fuchsia-400" /> High Win Frequency</span>
      </div>
    </div>
  );
};

export default GamePredictionsCard;
