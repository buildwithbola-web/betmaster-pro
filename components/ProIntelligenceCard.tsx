import React from 'react';
import { Prediction, GamePredictions } from '../types';
import { Timer, Globe, Zap, Percent, ChevronRight, Activity, TrendingUp, BarChart } from 'lucide-react';

interface ProIntelligenceCardProps {
  data: GamePredictions;
  onGameClick: () => void;
}

const ProMarketRow: React.FC<{ pred: Prediction; accentColor: string }> = ({ pred, accentColor }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-black rounded-none border border-white/10 hover:border-white transition-all gap-3 group/row">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-none border border-white/10 bg-black text-emerald-500`}>
          {pred.market}
        </span>
        <span className="text-sm font-bold text-white uppercase tracking-widest">{pred.selection}</span>
      </div>
      <p className="text-[10px] text-zinc-500 leading-tight border-l-2 border-white/10 pl-2 font-mono uppercase tracking-widest">"{pred.reasoning}"</p>
    </div>
    <div className="flex items-center gap-4 self-end sm:self-center">
      <div className="text-right">
        <span className="block text-[8px] text-zinc-500 uppercase font-mono tracking-widest">Odds</span>
        <span className={`text-sm font-mono font-black text-emerald-500`}>{pred.odds}</span>
      </div>
      <div className="flex flex-col items-center">
         <span className="text-[8px] text-zinc-500 uppercase font-mono tracking-widest">Conf</span>
         <span className="text-[10px] font-mono font-bold text-zinc-400">{pred.confidence}%</span>
      </div>
    </div>
  </div>
);

const ProIntelligenceCard: React.FC<ProIntelligenceCardProps> = ({ data, onGameClick }) => {
  if (!data) return null;

  const { 
    firstHalf = [], 
    asianHandicap = [], 
    firstHalfMetrics, 
    asianHandicapMetrics 
  } = data;

  return (
    <div className="bg-black rounded-none border border-white/10 overflow-hidden mb-12 animate-fade-in-up">
      <div className="bg-black px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-none border border-white/10">
            <Zap className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-widest uppercase">Pro-Desk Intelligence</h2>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">High Volume • Asian Markets • 1st Half Focus</p>
          </div>
        </div>
        <button 
          onClick={onGameClick}
          className="text-[10px] font-mono tracking-widest font-bold text-emerald-500 hover:text-white flex items-center gap-1 uppercase transition-colors group"
        >
          View Full Deep-Dive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First Half Desk */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-white" />
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">1st Half Specialist</h3>
            </div>
            {firstHalfMetrics && (
               <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                     <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">HT Draw %</span>
                     <span className="text-[10px] font-mono font-bold text-white">{firstHalfMetrics.htDrawRate}%</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10"></div>
                  <div className="flex flex-col items-end">
                     <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">Early Goal %</span>
                     <span className="text-[10px] font-mono font-bold text-white">{firstHalfMetrics.earlyGoalRate}%</span>
                  </div>
               </div>
            )}
          </div>

          {/* 1H Metrics Strip */}
          {firstHalfMetrics && (
            <div className="grid grid-cols-3 gap-2 py-1">
               <div className="bg-black p-2 rounded-none border border-white/10 text-center">
                  <span className="block text-[8px] text-zinc-500 font-mono tracking-widest uppercase mb-0.5">HT Over 0.5</span>
                  <span className="text-xs font-black text-white">{firstHalfMetrics.htOver05Rate}%</span>
               </div>
               <div className="bg-black p-2 rounded-none border border-white/10 text-center flex flex-col items-center justify-center">
                  <Activity size={10} className="text-white mb-0.5" />
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">Scoring Heat</span>
               </div>
               <div className="bg-black p-2 rounded-none border border-white/10 text-center">
                  <span className="block text-[8px] text-zinc-500 font-mono tracking-widest uppercase mb-0.5">Confidence</span>
                  <span className="text-xs font-black text-emerald-500 tracking-widest">OPTIMAL</span>
               </div>
            </div>
          )}

          <div className="space-y-2">
            {firstHalf.map((pred, i) => (
              <ProMarketRow key={i} pred={pred} accentColor="text-amber-400" />
            ))}
          </div>
        </section>

        {/* Asian Handicap Desk */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-white" />
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Asian Handicap Desk</h3>
            </div>
            {asianHandicapMetrics && (
               <span className="text-[9px] px-2 py-0.5 rounded-none border border-white/10 bg-black text-emerald-500 font-mono tracking-widest uppercase">
                  Line {asianHandicapMetrics.lineMovement}
               </span>
            )}
          </div>

          {/* AH Metrics Strip */}
          {asianHandicapMetrics && (
            <div className="grid grid-cols-3 gap-2 py-1">
               <div className="bg-black p-2 rounded-none border border-white/10 text-center">
                  <span className="block text-[8px] text-zinc-500 font-mono tracking-widest uppercase mb-0.5">Home Cover</span>
                  <span className="text-xs font-black text-white">{asianHandicapMetrics.homeCoverRate}%</span>
               </div>
               <div className="bg-black p-2 rounded-none border border-white/10 text-center">
                  <span className="block text-[8px] text-zinc-500 font-mono tracking-widest uppercase mb-0.5">Away Cover</span>
                  <span className="text-xs font-black text-white">{asianHandicapMetrics.awayCoverRate}%</span>
               </div>
               <div className="bg-black p-2 rounded-none border border-white/10 text-center flex flex-col items-center justify-center">
                  <TrendingUp size={10} className="text-white mb-0.5" />
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">Line Integrity</span>
               </div>
            </div>
          )}

          <div className="space-y-2">
            {asianHandicap.map((pred, i) => (
              <ProMarketRow key={i} pred={pred} accentColor="text-emerald-400" />
            ))}
          </div>
        </section>
      </div>

      <div className="px-6 py-3 bg-black border-t border-white/10 flex justify-center">
         <div className="flex items-center gap-6 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Percent size={10} className="text-white" /> Value Optimized</span>
            <span className="flex items-center gap-1"><BarChart size={10} className="text-white" /> Liquidity Verified</span>
            <span className="flex items-center gap-1"><Zap size={10} className="text-white" /> Sharp Money Scan</span>
         </div>
      </div>
    </div>
  );
};

export default ProIntelligenceCard;