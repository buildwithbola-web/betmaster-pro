
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
  const headerColor = isMainstream ? "text-emerald-500" : "text-white";
  const borderColor = "border-white/10";
  const bgBadge = isMainstream ? "bg-emerald-500 text-black border-emerald-500" : "bg-black text-white border-white/10";

  return (
    <div className={`flex flex-col h-full bg-black rounded-none border ${borderColor} overflow-hidden`}>
      <div className={`p-4 border-b ${borderColor} bg-black flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {headerIcon}
          <h3 className={`text-sm font-bold uppercase tracking-wider ${headerColor}`}>{headerTitle}</h3>
        </div>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Analysis Desk</span>
      </div>
      <div className="divide-y divide-white/10">
        {predictions.map((pred, index) => (
          <div key={index} className="group p-4 hover:bg-white/5 transition-colors">
             <div className="flex justify-between items-start gap-4 mb-2">
                <span className={`text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5 rounded-none border ${bgBadge}`}>
                   {pred.market}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-400 font-bold text-sm">{pred.odds}</span>
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
                    className="text-zinc-500 hover:text-black transition-colors p-1 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none shrink-0 opacity-0 group-hover:opacity-100"
                    title="Add to Slip"
                  >
                    <Plus size={14} />
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
             <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-black border border-white/10 rounded-none overflow-hidden">
                   <div 
                      className={`h-full rounded-none bg-emerald-500`} 
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
    <div className="bg-black rounded-none border border-white/10 mb-12 animate-fade-in-up">
      {/* Header */}
      <div className="bg-black px-6 py-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-none bg-black border border-white/10 flex items-center justify-center">
            <Target size={24} className="text-white" />
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              Deep Search Intelligence
            </span>
            <h2 className="text-2xl font-black text-white tracking-widest uppercase flex items-center gap-2">
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
          <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-none border border-white/10">
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Verified Markets</span>
          </div>
        </div>
      </div>

      {/* Grid for Two Categories */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="px-6 py-3 bg-black border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-zinc-500 text-[9px] font-mono uppercase font-bold tracking-widest">
         <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-white" /> Sharp Action Scanned</span>
         <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-white" /> Liquidity Verified</span>
         <span className="flex items-center gap-1.5"><Zap size={12} className="text-white" /> High Win Frequency</span>
      </div>
    </div>
  );
};

export default GamePredictionsCard;
