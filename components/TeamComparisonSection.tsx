import React from 'react';
import { TeamComparison } from '../types';
import { Swords, ShieldAlert, Zap, Trophy, User } from 'lucide-react';

interface TeamComparisonSectionProps {
  comparison: TeamComparison;
}

const TeamComparisonSection: React.FC<TeamComparisonSectionProps> = ({ comparison }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="bg-black p-2 rounded-none border border-white/10">
          <Swords className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest">Team Comparison</h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Head-to-head analysis</p>
        </div>
      </div>

      <div className="bg-black rounded-none border border-white/10 overflow-hidden">
        {/* Teams Header */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center p-6 border-b border-white/10 bg-black">
          <div className="text-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest">{comparison.teamA}</h3>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block uppercase tracking-widest">HOME / TEAM A</span>
          </div>
          <div className="px-6 flex flex-col items-center">
            <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center border border-white/10 shadow-inner">
              <span className="font-bold font-mono text-zinc-500">VS</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest">{comparison.teamB}</h3>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block uppercase tracking-widest">AWAY / TEAM B</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Team A Stats */}
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <Trophy size={14} className="text-emerald-500" /> Recent Form
              </div>
              <div className="text-lg font-mono font-bold text-emerald-400">{comparison.teamAStats.form}</div>
            </div>
            
            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <User size={14} className="text-blue-500" /> Key Player
              </div>
              <div className="text-zinc-200">{comparison.teamAStats.keyPlayer}</div>
            </div>

            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <Zap size={14} className="text-amber-500" /> Strengths
              </div>
              <ul className="space-y-1">
                {comparison.teamAStats.strengths.map((str, idx) => (
                  <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <ShieldAlert size={14} className="text-red-500" /> Weaknesses
              </div>
              <ul className="space-y-1">
                {comparison.teamAStats.weaknesses.map((wk, idx) => (
                  <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span> {wk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team B Stats */}
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <Trophy size={14} className="text-emerald-500" /> Recent Form
              </div>
              <div className="text-lg font-mono font-bold text-emerald-400">{comparison.teamBStats.form}</div>
            </div>
            
            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <User size={14} className="text-blue-500" /> Key Player
              </div>
              <div className="text-zinc-200">{comparison.teamBStats.keyPlayer}</div>
            </div>

            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <Zap size={14} className="text-amber-500" /> Strengths
              </div>
              <ul className="space-y-1">
                {comparison.teamBStats.strengths.map((str, idx) => (
                  <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
                <ShieldAlert size={14} className="text-red-500" /> Weaknesses
              </div>
              <ul className="space-y-1">
                {comparison.teamBStats.weaknesses.map((wk, idx) => (
                  <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span> {wk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Head-to-Head & Tactical Summary */}
        <div className="border-t border-white/10 bg-black p-6 space-y-6">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Head-to-Head History</div>
            <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-white/10 pl-3 font-mono uppercase tracking-widest">
              {comparison.headToHead}
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Tactical Matchup</div>
            <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-white/10 pl-3 font-mono uppercase tracking-widest">
              {comparison.tacticalMatchup}
            </p>
          </div>
          <div className="bg-black border border-emerald-500 rounded-none p-4">
             <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap size={14} /> AI Prediction
             </div>
             <p className="text-sm text-white leading-relaxed font-mono uppercase tracking-widest">
               {comparison.prediction}
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamComparisonSection;
