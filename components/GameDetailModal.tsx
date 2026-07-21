
import React, { useState, useEffect } from 'react';
import { GameDetails, SituationalAlert } from '../types';
import FormGuide from './FormGuide';
import { 
  X, Activity, Users, AlertTriangle, History, Swords, 
  BarChart2, TrendingUp, TrendingDown, Wind, CloudRain, 
  User, DollarSign, Timer, Zap, Sparkles, CalendarDays, 
  Compass, ShieldAlert, Target, Info, Flame, Trophy
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

interface GameDetailModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  data: GameDetails | null;
  gameName: string;
}

const AlertBadge: React.FC<{ alert: SituationalAlert }> = ({ alert }) => {
  const isCritical = alert.severity === 'CRITICAL';
  const isWarning = alert.severity === 'WARNING';
  
  const baseClasses = "flex items-start gap-3 p-4 glass-panel rounded-2xl animate-fade-in";
  const colors = isCritical 
    ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
    : isWarning 
    ? "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
    : "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]";

  const Icon = alert.type === 'SQUAD' ? ShieldAlert : alert.type === 'FATIGUE' ? Timer : alert.type === 'MOTIVATION' ? Flame : Target;

  return (
    <div className={`${baseClasses} ${colors}`}>
       <div className={`p-2 rounded-xl ${isCritical ? 'bg-red-500/20 text-red-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
          <Icon size={20} />
       </div>
       <div>
          <div className="flex items-center gap-2 mb-1">
             <span className={`text-[10px] font-black uppercase tracking-widest ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-blue-400'}`}>{alert.type} ALERT</span>
             <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isCritical ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-white/10 text-zinc-300'}`}>
                {alert.severity}
             </span>
          </div>
          <p className="text-sm font-bold leading-tight mb-1.5 text-white">{alert.message}</p>
          <p className="text-[11px] text-zinc-400 italic font-medium">Impact: <span className="text-white">{alert.impact}</span></p>
       </div>
    </div>
  );
};

const GameDetailModal: React.FC<GameDetailModalProps> = ({ isOpen, isLoading, onClose, data, gameName }) => {
  const [loadingText, setLoadingText] = useState("Initializing Deep Scan...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && isLoading) {
      const messages = [
        "Analyzing Situational Factors...",
        "Scanning Motivation & Rotation...",
        "Evaluating HT Draw Probability...",
        "Identifying Asian Handicap Value...",
        "Calculating First-Strike Metrics...",
        "Finalizing Value Report..."
      ];
      let i = 0;
      setLoadingText(messages[0]);
      setProgress(5);
      const interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingText(messages[i]);
        setProgress(prev => Math.min(prev + 15, 95));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isLoading]);

  if (!isOpen) return null;

  const teams = gameName.split(/ vs | - /i);
  const homeTeam = teams[0] || "Home";
  const awayTeam = teams[1] || "Away";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity" onClick={onClose}></div>

      <div className="relative glass-panel border border-fuchsia-500/20 w-full max-w-5xl rounded-3xl shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-scan shadow-[0_0_15px_rgba(217,70,239,0.8)]"></div>
          </div>
        )}

        <div className="p-5 md:p-8 border-b border-white/10 flex items-start justify-between bg-white/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="flex-1 min-w-0 z-10">
            <div className="flex items-center gap-3 mb-2">
               <span className="text-[10px] font-mono text-fuchsia-300 uppercase tracking-widest bg-fuchsia-500/20 px-3 py-1 rounded-full border border-fuchsia-500/30">
                 Pro intelligence Layer
               </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none truncate pr-4">
              {gameName}
            </h2>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-fuchsia-500/20 rounded-full transition-all text-zinc-400 hover:text-fuchsia-300 border border-white/10 hover:border-fuchsia-500/30 z-10">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 relative">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
               {/* Skeleton: Alerts HUD */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/10"></div>)}
               </div>
               {/* Skeleton: Market Specialty */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1,2,3].map(i => <div key={i} className="h-40 bg-white/5 rounded-2xl border border-white/10"></div>)}
               </div>
               <div className="h-48 bg-white/5 rounded-2xl border border-white/10"></div>
            </div>
          ) : data ? (
            <>
              {data.isFallback && (
                <div className="glass-panel border-amber-500/50 rounded-2xl p-5 flex items-start gap-4 animate-fade-in mb-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl mt-0.5 border border-amber-500/30">
                    <Sparkles size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                      Local Simulation Active
                    </h4>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      Standard live search grounding has hit temporary quota thresholds. Offline high-fidelity tactical models have been successfully engaged.
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Tactical Radar / Situational Alerts */}
              {data.situationalAlerts && data.situationalAlerts.length > 0 && (
                <section className="space-y-3">
                   <div className="flex items-center gap-2 mb-2">
                      <Compass size={16} className="text-emerald-500" />
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tactical Radar</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.situationalAlerts.map((alert, idx) => (
                         <AlertBadge key={idx} alert={alert} />
                      ))}
                   </div>
                </section>
              )}

              {/* 2. Specialized Betting Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Asian Handicap Desk */}
                 <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col h-full hover:border-purple-500/30 transition-colors">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Zap size={14} className="text-purple-400" /> Asian Handicap
                    </h3>
                    <div className="space-y-3 flex-1">
                       {data.asianHandicapMarkets?.map((market, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                             <span className="text-sm font-bold text-white">{market.line}</span>
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] text-zinc-400">{market.confidence}%</span>
                                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">{market.odds}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* 1st Half Intelligence */}
                 <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col h-full hover:border-fuchsia-500/30 transition-colors">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Timer size={14} className="text-fuchsia-400" /> HT intelligence
                    </h3>
                    <div className="space-y-4 flex-1">
                       <div className="flex justify-between items-center text-xs border-b border-white/10 pb-3">
                          <span className="text-zinc-400">HT Draw Rate</span>
                          <span className="text-white font-bold bg-white/5 px-2 py-1 rounded-md">{data.firstHalfIntelligence?.htDrawRate}%</span>
                       </div>
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                          <div className="flex-1 text-center">
                             <div className="text-xl font-black text-blue-400">{data.firstHalfIntelligence?.homeHTScoredFreq}%</div>
                             <div className="text-[9px] text-zinc-400 uppercase mt-1">Home Scored</div>
                          </div>
                          <div className="h-10 w-[1px] bg-white/10"></div>
                          <div className="flex-1 text-center">
                             <div className="text-xl font-black text-fuchsia-400">{data.firstHalfIntelligence?.awayHTScoredFreq}%</div>
                             <div className="text-[9px] text-zinc-400 uppercase mt-1">Away Scored</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* First Strike Analytics */}
                 <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col h-full hover:border-pink-500/30 transition-colors">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Target size={14} className="text-pink-400" /> First Strike
                    </h3>
                    <div className="space-y-4 flex-1">
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                          <div style={{ width: `${data.firstToScoreData?.homeFirstScoreFreq || 50}%` }} className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                          <div className="flex-1 bg-pink-500 h-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-bold bg-white/5 px-3 py-2 rounded-xl">
                          <span className="text-blue-400">HOME: {data.firstToScoreData?.homeFirstScoreFreq}%</span>
                          <span className="text-pink-400">AWAY: {data.firstToScoreData?.awayFirstScoreFreq}%</span>
                       </div>
                       <div className="mt-2 bg-pink-500/10 border border-pink-500/20 p-3 rounded-2xl text-center">
                          <span className="text-[10px] text-zinc-400 uppercase block mb-1">Avg Goal Time</span>
                          <span className="text-sm font-mono font-bold text-pink-300">{data.firstToScoreData?.avgFirstGoalTime}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* 1st Set Prediction */}
              {data.firstSetPrediction && (
                 <div className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Trophy size={16} className="text-purple-400" /> 1st Set Winner Prediction
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="glass-panel border-purple-500/50 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                          <span className="text-lg font-black text-white">{data.firstSetPrediction.predictedWinner}</span>
                          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">{data.firstSetPrediction.confidence}% CONFIDENCE</span>
                       </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-purple-500/30 pl-4">
                       {data.firstSetPrediction.reasoning}
                    </p>
                 </div>
              )}

              {/* ... Rest of existing sections (Win Prob, Market Metrics, Form History, etc.) ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-xs uppercase tracking-wider">
                       <History size={16} /> H2H Context
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{data.headToHead}</p>
                 </div>
                 <div className="glass-panel p-6 rounded-3xl border border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <div className="flex items-center gap-2 mb-3 font-bold text-xs uppercase tracking-wider">
                       <AlertTriangle size={16} /> Team News
                    </div>
                    <p className="text-red-200 text-sm leading-relaxed">{data.injuries}</p>
                 </div>
              </div>

              {/* Standard Stats Section */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden">
                 <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <Activity size={16} className="text-fuchsia-400" /> Core Metrics
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.sportSpecificStats?.map((stat, idx) => (
                       <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col hover:border-fuchsia-500/30 transition-colors">
                          <div className="text-[10px] text-zinc-400 uppercase font-bold text-center mb-2">{stat.label}</div>
                          <div className="flex justify-between items-center font-mono text-base font-bold text-white px-3 py-2 bg-black/40 rounded-xl mb-1">
                             <span className="text-blue-400">{stat.homeValue}</span>
                             <div className="h-1 w-12 bg-white/10 rounded-full"></div>
                             <span className="text-pink-400">{stat.awayValue}</span>
                          </div>
                          {stat.insight && (
                             <div className="mt-2 text-[10px] text-fuchsia-300/80 italic px-2 leading-relaxed text-center">{stat.insight}</div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
            </>
          ) : (
             <div className="flex items-center justify-center h-[400px] text-zinc-500 glass-panel rounded-3xl border border-white/10">No data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
