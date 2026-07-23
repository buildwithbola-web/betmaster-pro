import React from 'react';
import { HeadToHeadMatch } from '../types';

interface TeamDuelsSectionProps {
  matches: HeadToHeadMatch[];
  teamA?: string;
  teamB?: string;
}

const TeamDuelsSection: React.FC<TeamDuelsSectionProps> = ({ matches, teamA = "Team A", teamB = "Team B" }) => {
  if (!matches || matches.length === 0) return null;

  // Group matches
  const teamAWins = matches.filter(m => {
    if (!m.score || !m.teamA || !m.teamB) return false;
    const scores = m.score.split('-').map(Number);
    if (scores.length !== 2 || isNaN(scores[0]) || isNaN(scores[1])) return false;
    if (m.teamA.toLowerCase().includes(teamA.toLowerCase())) {
      return scores[0] > scores[1];
    }
    if (m.teamB.toLowerCase().includes(teamA.toLowerCase())) {
      return scores[1] > scores[0];
    }
    return false;
  });

  const teamBWins = matches.filter(m => {
    if (!m.score || !m.teamA || !m.teamB) return false;
    const scores = m.score.split('-').map(Number);
    if (scores.length !== 2 || isNaN(scores[0]) || isNaN(scores[1])) return false;
    if (m.teamA.toLowerCase().includes(teamB.toLowerCase())) {
      return scores[0] > scores[1];
    }
    if (m.teamB.toLowerCase().includes(teamB.toLowerCase())) {
      return scores[1] > scores[0];
    }
    return false;
  });

  const draws = matches.filter(m => {
    if (!m.score) return false;
    const scores = m.score.split('-').map(Number);
    if (scores.length !== 2 || isNaN(scores[0]) || isNaN(scores[1])) return false;
    return scores[0] === scores[1];
  });

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-xl md:text-2xl font-black text-purple-500">09.</span>
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">HEAD TO HEAD (LAST 5 MATCHES)</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team A Wins */}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
          <div className="flex justify-between items-center text-xs text-emerald-400 font-bold mb-4 border-b border-white/5 pb-2">
            <span>{teamA} Wins</span>
            <span>{teamAWins.length}</span>
          </div>
          <div className="space-y-2 text-xs">
            {teamAWins.map((m, i) => (
              <div key={i} className="flex justify-between text-zinc-400">
                <span className="truncate w-32">vs {m.teamA === teamA ? m.teamB : m.teamA || 'Unknown'}</span>
                <span className="text-white font-bold">{m.score || '?'}</span>
                <span>{m.date ? (m.date.split('-')[0] || m.date) : ''}</span>
              </div>
            ))}
            {teamAWins.length === 0 && <div className="text-zinc-600 italic text-center py-2">No wins found</div>}
          </div>
        </div>

        {/* Draws */}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
          <div className="flex justify-between items-center text-xs text-zinc-400 font-bold mb-4 border-b border-white/5 pb-2">
            <span>Draws</span>
            <span>{draws.length}</span>
          </div>
          <div className="space-y-2 text-xs">
            {draws.map((m, i) => (
              <div key={i} className="flex justify-between text-zinc-400">
                <span className="truncate w-32">vs {m.teamA === teamA ? m.teamB : m.teamA || 'Unknown'}</span>
                <span className="text-white font-bold">{m.score || '?'}</span>
                <span>{m.date ? (m.date.split('-')[0] || m.date) : ''}</span>
              </div>
            ))}
            {draws.length === 0 && <div className="text-zinc-600 italic text-center py-2">No draws found</div>}
          </div>
        </div>

        {/* Team B Wins */}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
          <div className="flex justify-between items-center text-xs text-amber-400 font-bold mb-4 border-b border-white/5 pb-2">
            <span>{teamB} Wins</span>
            <span>{teamBWins.length}</span>
          </div>
          <div className="space-y-2 text-xs">
            {teamBWins.map((m, i) => (
              <div key={i} className="flex justify-between text-zinc-400">
                <span className="truncate w-32">vs {m.teamA === teamB ? m.teamB : m.teamA || 'Unknown'}</span>
                <span className="text-white font-bold">{m.score || '?'}</span>
                <span>{m.date ? (m.date.split('-')[0] || m.date) : ''}</span>
              </div>
            ))}
            {teamBWins.length === 0 && <div className="text-zinc-600 italic text-center py-2">No wins found</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDuelsSection;
