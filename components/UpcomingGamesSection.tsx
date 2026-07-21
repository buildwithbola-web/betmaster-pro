import React, { useState, useMemo } from 'react';
import { UpcomingGame, BetSlipItem } from '../types';
import { Filter, CalendarClock, Trophy, ChevronRight, Activity, Plus } from 'lucide-react';

interface UpcomingGamesSectionProps {
  games: UpcomingGame[];
  onGameClick: (gameName: string) => void;
  onAddBet?: (bet: BetSlipItem) => void;
}

const UpcomingGamesSection: React.FC<UpcomingGamesSectionProps> = ({ games, onGameClick, onAddBet }) => {
  const [selectedSport, setSelectedSport] = useState<string>('All');

  // Extract unique sports for filter tabs
  const sports = useMemo(() => {
    const unique = Array.from(new Set(games.map(g => g.sport)));
    return ['All', ...unique];
  }, [games]);

  const filteredGames = selectedSport === 'All' 
    ? games 
    : games.filter(g => g.sport === selectedSport);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
           <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
            <span className="text-emerald-500 text-3xl">03.</span>
            PROBABILITY FEED
          </h3>
          <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mt-1 flex items-center gap-2">
             <Activity size={12} className="text-emerald-500" /> High Confidence (&gt;90%) • Multi-Sport Scan
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          <Filter size={14} className="text-zinc-500 flex-shrink-0 mr-2" />
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-1.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                selectedSport === sport
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-black text-zinc-500 border-white/10 hover:border-white hover:text-white'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game, index) => (
          <div 
            key={index}
            onClick={() => onGameClick(game.teams)}
            className="group relative bg-black border border-white/10 rounded-none p-4 hover:bg-white/5 hover:border-emerald-500 transition-all cursor-pointer flex flex-col h-full"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase bg-black px-2 py-0.5 rounded-none border border-white/10">
                {game.sport} • {game.league}
              </span>
              <span className="text-[10px] tracking-widest font-mono text-zinc-400 flex items-center gap-1 bg-black px-2 py-0.5 rounded-none">
                <CalendarClock size={10} />
                {game.startTime}
              </span>
            </div>

            {/* Teams */}
            <h4 className="text-white font-black text-base uppercase tracking-wider mb-3 group-hover:text-emerald-500 transition-colors line-clamp-1">
              {game.teams}
            </h4>

            {/* Selection Box */}
            <div className="bg-black rounded-none p-3 border border-white/10 mb-3 flex-1">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase">{game.market}</span>
                 <span className="text-emerald-500 font-mono font-bold">{game.odds}</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">{game.selection}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                 <div className="h-1 w-16 bg-black border border-white/10 rounded-none overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-none" 
                      style={{ width: `${Math.max(game.confidence, 10)}%` }}
                    ></div>
                 </div>
                 <span className="text-[10px] font-mono font-bold text-emerald-500">{game.confidence}%</span>
              </div>
              <div className="flex items-center gap-2 z-10 relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddBet?.({
                      id: `upcoming-${index}`,
                      game: game.teams,
                      market: game.market,
                      selection: game.selection,
                      odds: game.odds
                    });
                  }}
                  className="text-zinc-500 hover:text-black transition-colors p-1.5 bg-transparent hover:bg-emerald-500 border border-transparent hover:border-emerald-500 rounded-none"
                  title="Add to Slip"
                >
                  <Plus size={14} />
                </button>
                <ChevronRight size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </div>

          </div>
        ))}

        {filteredGames.length === 0 && (
           <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-none bg-black">
              <Trophy size={32} className="mx-auto text-zinc-700 mb-3" />
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">No high-probability matches found for this category.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingGamesSection;