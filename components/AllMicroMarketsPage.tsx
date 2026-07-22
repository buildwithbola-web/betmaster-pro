import React from 'react';
import { ArrowLeft, Activity, Search, ShieldCheck } from 'lucide-react';

interface Props {
  data: any;
  onBack: () => void;
}

const AllMicroMarketsPage: React.FC<Props> = ({ data, onBack }) => {
  const matchName = data?.gamePredictions?.gameName || "AC Omonia Nicosia vs FC Kairat";
  const teamA = data?.teamComparison?.teamA || "AC Omonia Nicosia";

  // Combine some real data with expanded mock data to show a "full" page
  const microMarkets = [
    ...(data?.gamePredictions?.niche || []),
    { market: "Over 0.5 Goals", time: "1st Half", conf: 82, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10", odds: "1.45" },
    { market: "Over 2.5 Corners", time: "Match", conf: 67, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10", odds: "1.65" },
    { market: "Over 1.5 Cards", time: "Match", conf: 58, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10", odds: "1.50" },
    { market: "1st Goal Scorer", time: teamA, conf: 41, level: "Low Confidence", color: "text-emerald-400", bg: "bg-emerald-400/10", odds: "3.20" },
    { market: "Most Shots On Target", time: teamA, conf: 63, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10", odds: "1.85" },
    { market: "Team A Clean Sheet", time: "Match", conf: 75, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10", odds: "2.10" },
    { market: "Under 10.5 Corners", time: "Match", conf: 88, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10", odds: "1.35" },
    { market: "First Team To Score", time: teamA, conf: 79, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10", odds: "1.55" },
    { market: "Last Team To Score", time: teamA, conf: 72, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10", odds: "1.60" },
    { market: "Total Cards Under 4.5", time: "Match", conf: 65, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10", odds: "1.75" },
    { market: "Both Teams To Score in 2nd Half", time: "2nd Half", conf: 45, level: "Low Confidence", color: "text-emerald-400", bg: "bg-emerald-400/10", odds: "2.80" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to Analysis
      </button>

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">All Micro-Markets</h1>
          <p className="text-zinc-400 text-sm">Deep analysis for {matchName}</p>
        </div>
        <div className="hidden md:flex relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search markets..." 
            className="w-full bg-[#050505] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {microMarkets.map((item: any, i: number) => (
          <div key={i} className="bg-[#050505] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-8 h-8 rounded-full ${item.bg || 'bg-purple-500/10'} flex items-center justify-center ${item.color || 'text-purple-400'}`}>
                <Activity size={14}/>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-emerald-400">{item.odds}</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase">{item.conf || Math.floor(Math.random() * 40 + 50)}% CONF</div>
              </div>
            </div>
            <div className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{item.market}</div>
            <div className="text-xs text-zinc-500 mb-4">{item.time || item.selection || "Match"}</div>
            
            {item.reasoning && (
              <p className="text-[10px] text-zinc-400 mb-4 line-clamp-2">{item.reasoning}</p>
            )}

            <div className={`text-[9px] font-bold uppercase flex items-center gap-1.5 ${item.color || 'text-purple-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.color ? item.color.replace('text-', 'bg-') : 'bg-purple-400'}`}></div>
              {item.level || "Optimized Match"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMicroMarketsPage;
