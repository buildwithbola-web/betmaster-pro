import React from 'react';
import { TeamComparison } from '../types';
import { ShieldAlert, Zap } from 'lucide-react';

interface TeamComparisonSectionProps {
  comparison: TeamComparison;
}

const renderForm = (formStr: any, align: 'left' | 'right') => {
  if (!formStr || typeof formStr !== 'string') return null;
  const chars = formStr.split('').filter(c => c.match(/[WDLH]/i));
  return (
    <div className={`flex gap-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      {chars.map((char, idx) => {
        let colorClass = "text-zinc-500";
        if (char.toUpperCase() === 'W') colorClass = "text-emerald-500";
        if (char.toUpperCase() === 'L') colorClass = "text-red-500";
        if (char.toUpperCase() === 'D' || char.toUpperCase() === 'H') colorClass = "text-zinc-400";
        return <span key={idx} className={`font-bold text-xs ${colorClass}`}>{char.toUpperCase()}</span>;
      })}
    </div>
  );
};

const TeamComparisonSection: React.FC<TeamComparisonSectionProps> = ({ comparison }) => {
  const { teamA, teamB, teamAStats = {} as any, teamBStats = {} as any } = comparison || {};

  const renderStatRow = (label: string, valA: number | string | undefined, valB: number | string | undefined, maxVal: number, suffix: string = '') => {
    const numA = typeof valA === 'number' ? valA : parseFloat(valA as string) || 0;
    const numB = typeof valB === 'number' ? valB : parseFloat(valB as string) || 0;
    
    const pctA = Math.min(100, Math.max(0, (numA / maxVal) * 100));
    const pctB = Math.min(100, Math.max(0, (numB / maxVal) * 100));

    return (
      <div className="grid grid-cols-3 items-center py-3 text-xs md:text-sm">
        {/* Team A */}
        <div className="flex items-center gap-3 pr-4 justify-between">
          <span className="text-emerald-400 font-bold w-12">{valA !== undefined ? `${valA}${suffix}` : 'N/A'}</span>
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden flex justify-end">
             <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pctA}%` }}></div>
          </div>
        </div>
        
        {/* Label */}
        <div className="text-center text-white text-[10px] md:text-xs tracking-widest uppercase">
          {label}
        </div>

        {/* Team B */}
        <div className="flex items-center gap-3 pl-4 justify-between">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pctB}%` }}></div>
          </div>
          <span className="text-amber-400 font-bold w-12 text-right">{valB !== undefined ? `${valB}${suffix}` : 'N/A'}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-xl md:text-2xl font-black text-blue-500">03.</span>
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">TEAM COMPARISON</h2>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
               <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
            </div>
            <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-widest truncate max-w-[150px] md:max-w-none">{teamA}</h3>
          </div>
          <div className="text-xs font-mono font-bold text-zinc-500 border border-white/10 rounded-full px-3 py-1">VS</div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-widest truncate max-w-[150px] md:max-w-none text-right">{teamB}</h3>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
               <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Form Row */}
        <div className="grid grid-cols-3 items-center py-3 mb-2">
          <div>{renderForm(teamAStats.form, 'left')}</div>
          <div className="text-center text-white text-[10px] md:text-xs tracking-widest uppercase">Form (Last 5)</div>
          <div>{renderForm(teamBStats.form, 'right')}</div>
        </div>

        {/* Stats Rows */}
        <div className="space-y-1">
          {renderStatRow("Goals Scored (Avg)", teamAStats.goalsScoredAvg, teamBStats.goalsScoredAvg, 4)}
          {renderStatRow("Goals Conceded (Avg)", teamAStats.goalsConcededAvg, teamBStats.goalsConcededAvg, 4)}
          {renderStatRow("Possession (Avg)", teamAStats.possessionAvg, teamBStats.possessionAvg, 100, '%')}
          {renderStatRow("Shots (Avg)", teamAStats.shotsAvg, teamBStats.shotsAvg, 25)}
          {renderStatRow("Pass Accuracy", teamAStats.passAccuracy, teamBStats.passAccuracy, 100, '%')}
        </div>

        {/* AI Insight */}
        <div className="mt-8 bg-purple-900/10 border border-purple-500/20 rounded-2xl p-5 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
            <Zap size={18} className="text-purple-400" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold mb-1">AI Match Insight</div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {comparison.tacticalMatchup || "Tactical matchup analysis is not available for this game yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComparisonSection;
