import React from 'react';
import { Swords, Trophy } from 'lucide-react';
import { TeamDuel } from '../types';

interface TeamDuelsSectionProps {
  duels: TeamDuel[];
}

const TeamDuelsSection: React.FC<TeamDuelsSectionProps> = ({ duels }) => {
  if (!duels || duels.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <Swords className="text-emerald-500" size={24} />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Head-to-Head <span className="text-emerald-500">Team Duels</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {duels.map((duel, idx) => (
          <div key={idx} className="bg-black border border-white/10 rounded-none p-5 relative hover:border-emerald-500 hover:bg-white/5 transition-all">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-white/10 rounded-none p-2">
              <Swords size={16} className="text-emerald-500" />
            </div>

            <div className="text-center mb-4 mt-2">
              <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-widest mb-1">Key Battle</div>
              <div className="text-[10px] font-mono tracking-widest font-bold text-black bg-emerald-500 inline-block px-3 py-1 rounded-none border border-emerald-500 uppercase">
                {duel.statFocus}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-5">
              <div className={`flex-1 text-center p-3 rounded-none border ${duel.winnerPrediction === duel.teamA ? 'bg-white/5 border-emerald-500 text-emerald-500' : 'bg-black border-white/10 opacity-60 text-zinc-500'}`}>
                <div className="text-sm font-black uppercase tracking-wider mb-1 truncate">{duel.teamA}</div>
                {duel.winnerPrediction === duel.teamA && <Trophy size={14} className="text-emerald-500 mx-auto" />}
              </div>
              <div className="text-xs font-mono font-bold text-zinc-600">VS</div>
              <div className={`flex-1 text-center p-3 rounded-none border ${duel.winnerPrediction === duel.teamB ? 'bg-white/5 border-emerald-500 text-emerald-500' : 'bg-black border-white/10 opacity-60 text-zinc-500'}`}>
                <div className="text-sm font-black uppercase tracking-wider mb-1 truncate">{duel.teamB}</div>
                {duel.winnerPrediction === duel.teamB && <Trophy size={14} className="text-emerald-500 mx-auto" />}
              </div>
            </div>

            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 text-center leading-relaxed px-4 border-t border-white/10 pt-4 mt-2">
              {duel.insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDuelsSection;
