
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
  
  const baseClasses = "flex items-start gap-3 p-3 rounded-none border animate-fade-in";
  const colors = isCritical 
    ? "bg-black border-red-500 text-red-500" 
    : isWarning 
    ? "bg-black border-amber-500 text-amber-500" 
    : "bg-black border-blue-500 text-blue-500";

  const Icon = alert.type === 'SQUAD' ? ShieldAlert : alert.type === 'FATIGUE' ? Timer : alert.type === 'MOTIVATION' ? Flame : Target;

  return (
    <div className={`${baseClasses} ${colors}`}>
       <div className={`p-1.5 rounded-none ${isCritical ? 'bg-red-500 text-black' : isWarning ? 'bg-amber-500 text-black' : 'bg-blue-500 text-black'}`}>
          <Icon size={18} />
       </div>
       <div>
          <div className="flex items-center gap-2 mb-0.5">
             <span className="text-[10px] font-black uppercase tracking-widest">{alert.type} ALERT</span>
             <span className={`text-[9px] px-1 rounded font-bold ${isCritical ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                {alert.severity}
             </span>
          </div>
          <p className="text-xs font-bold leading-tight mb-1">{alert.message}</p>
          <p className="text-[10px] opacity-70 italic font-medium">Impact: {alert.impact}</p>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>

      <div className="relative bg-black border border-white/10 w-full max-w-4xl rounded-none shadow-none overflow-hidden animate-fade-in-up max-h-[95vh] flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <div className="h-[2px] w-full bg-emerald-500 animate-scan"></div>
          </div>
        )}

        <div className="p-4 md:p-6 border-b border-white/10 flex items-start justify-between bg-black">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest bg-emerald-950/30 px-2 py-0.5 rounded-none border border-emerald-500/20">
                 Pro intelligence Layer
               </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white tracking-tight leading-none truncate pr-4">
              {gameName}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-none transition-colors text-zinc-400 hover:text-white border border-transparent hover:border-white/10">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 relative">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
               {/* Skeleton: Alerts HUD */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2].map(i => <div key={i} className="h-20 bg-black rounded-none border border-white/10"></div>)}
               </div>
               {/* Skeleton: Market Specialty */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1,2,3].map(i => <div key={i} className="h-32 bg-black rounded-none border border-white/10"></div>)}
               </div>
               <div className="h-40 bg-black rounded-none border border-white/10"></div>
            </div>
          ) : data ? (
            <>
              {data.isFallback && (
                <div className="bg-black border border-amber-500 text-amber-500 rounded-none p-4 flex items-start gap-3 animate-fade-in mb-2">
                  <div className="p-1.5 bg-amber-500 text-black rounded-none mt-0.5">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                      Local Simulation Active
                    </h4>
                    <p className="text-zinc-400 text-[10px] leading-relaxed mt-0.5">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {/* Asian Handicap Desk */}
                 <div className="bg-black rounded-none p-4 border border-white/10 flex flex-col h-full">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Zap size={12} className="text-emerald-500" /> Asian Handicap
                    </h3>
                    <div className="space-y-2 flex-1">
                       {data.asianHandicapMarkets?.map((market, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-black p-2 rounded-none border border-white/10">
                             <span className="text-xs font-bold text-white">{market.line}</span>
                             <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-500">{market.confidence}%</span>
                                <span className="text-xs font-mono font-bold text-emerald-400">{market.odds}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* 1st Half Intelligence */}
                 <div className="bg-black rounded-none p-4 border border-white/10 flex flex-col h-full">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Timer size={12} className="text-emerald-500" /> HT intelligence
                    </h3>
                    <div className="space-y-3 flex-1">
                       <div className="flex justify-between text-xs border-b border-zinc-800 pb-1">
                          <span className="text-zinc-500">HT Draw Rate</span>
                          <span className="text-white font-bold">{data.firstHalfIntelligence?.htDrawRate}%</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="flex-1 text-center">
                             <div className="text-lg font-black text-indigo-400">{data.firstHalfIntelligence?.homeHTScoredFreq}%</div>
                             <div className="text-[9px] text-zinc-500 uppercase">Home Scored</div>
                          </div>
                          <div className="h-8 w-[1px] bg-zinc-800"></div>
                          <div className="flex-1 text-center">
                             <div className="text-lg font-black text-emerald-400">{data.firstHalfIntelligence?.awayHTScoredFreq}%</div>
                             <div className="text-[9px] text-zinc-500 uppercase">Away Scored</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* First Strike Analytics */}
                 <div className="bg-black rounded-none p-4 border border-white/10 flex flex-col h-full">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Target size={12} className="text-emerald-500" /> First Strike
                    </h3>
                    <div className="space-y-3 flex-1">
                       <div className="h-1.5 w-full bg-zinc-800 rounded-none overflow-hidden flex">
                          <div style={{ width: `${data.firstToScoreData?.homeFirstScoreFreq || 50}%` }} className="bg-emerald-500 h-full"></div>
                          <div className="flex-1 bg-emerald-500 h-full"></div>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-indigo-400">HOME: {data.firstToScoreData?.homeFirstScoreFreq}%</span>
                          <span className="text-emerald-400">AWAY: {data.firstToScoreData?.awayFirstScoreFreq}%</span>
                       </div>
                       <div className="mt-2 bg-indigo-500/5 border border-indigo-500/20 p-2 rounded text-center">
                          <span className="text-[9px] text-zinc-500 uppercase block">Avg Goal Time</span>
                          <span className="text-xs font-mono font-bold text-indigo-200">{data.firstToScoreData?.avgFirstGoalTime}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* 1st Set Prediction */}
              {data.firstSetPrediction && (
                 <div className="bg-black rounded-none p-4 border border-white/10">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Trophy size={12} className="text-emerald-500" /> 1st Set Winner Prediction
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                       <div className="bg-black border border-emerald-500 px-4 py-2 rounded-none flex items-center gap-3">
                          <span className="text-sm font-bold text-white">{data.firstSetPrediction.predictedWinner}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">{data.firstSetPrediction.confidence}% CONFIDENCE</span>
                       </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-zinc-800 pl-3">
                       {data.firstSetPrediction.reasoning}
                    </p>
                 </div>
              )}

              {/* ... Rest of existing sections (Win Prob, Market Metrics, Form History, etc.) ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-black p-4 rounded-none border border-white/10">
                    <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold text-xs uppercase tracking-wider">
                       <History size={12} /> H2H Context
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{data.headToHead}</p>
                 </div>
                 <div className="bg-black p-4 rounded-none border border-red-500 text-red-500">
                    <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                       <AlertTriangle size={12} /> Team News
                    </div>
                    <p className="text-red-200/80 text-sm leading-relaxed">{data.injuries}</p>
                 </div>
              </div>

              {/* Standard Stats Section */}
              <div className="bg-black rounded-none p-4 border border-white/10 overflow-y-auto">
                 <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Activity size={12} /> Core Metrics
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.sportSpecificStats?.map((stat, idx) => (
                       <div key={idx} className="bg-black p-2 rounded-none border border-white/10 flex flex-col">
                          <div className="text-[10px] text-zinc-500 uppercase font-bold text-center mb-1">{stat.label}</div>
                          <div className="flex justify-between items-center font-mono text-sm font-bold text-white px-2">
                             <span className="text-indigo-400">{stat.homeValue}</span>
                             <div className="h-0.5 w-12 bg-zinc-800"></div>
                             <span className="text-emerald-400">{stat.awayValue}</span>
                          </div>
                          {stat.insight && (
                             <div className="mt-1 text-[9px] text-indigo-300 italic px-1 leading-tight text-center">{stat.insight}</div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
            </>
          ) : (
             <div className="flex items-center justify-center h-full text-zinc-500">No data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
