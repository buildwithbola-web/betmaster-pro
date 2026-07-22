import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Trophy, Clock } from 'lucide-react';

interface SearchPageProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch, loading }) => {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const tabs = ['All', 'Matches', 'Leagues', 'Teams', 'Players'];

  const quickFilters = [
    { icon: Trophy, label: 'All Sports', active: true, color: 'text-purple-400' },
    { icon: Trophy, label: 'Football', active: false, color: 'text-zinc-400' },
    { icon: Trophy, label: 'Tennis', active: false, color: 'text-zinc-400' },
    { icon: Trophy, label: 'Basketball', active: false, color: 'text-zinc-400' },
    { icon: Trophy, label: 'Ice Hockey', active: false, color: 'text-zinc-400' },
    { icon: Trophy, label: 'Baseball', active: false, color: 'text-zinc-400' },
    { icon: Trophy, label: 'Esports', active: false, color: 'text-zinc-400' },
  ];

  useEffect(() => {
    fetch('/api/matches/upcoming')
      .then(res => res.json())
      .then(data => setUpcomingMatches(data.matches || []))
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 animate-fade-in-up">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8 relative">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Search</h1>
          <p className="text-zinc-400">Find any match, team, player or league and get AI-powered insights instantly.</p>
        </div>
        {/* Placeholder for the magnifying glass graphic */}
        <div className="absolute right-0 top-0 w-64 h-32 bg-gradient-to-l from-purple-500/10 to-transparent rounded-3xl border border-purple-500/20 flex items-center justify-center opacity-50 hidden md:flex">
          <Search size={48} className="text-purple-400/30" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative bg-[#0f0f0f] border border-white/10 rounded-xl p-1 flex items-center shadow-lg focus-within:border-purple-500/50 transition-colors">
          <div className="pl-4 pr-2 text-zinc-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search matches, leagues or teams..."
            className="w-full bg-transparent border-none text-white px-2 py-3 focus:ring-0 text-sm outline-none font-medium placeholder-zinc-600"
          />
          <div className="pr-4 flex items-center gap-2">
            <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded font-mono border border-zinc-700">⌘K</span>
          </div>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="mb-8 flex items-center gap-3">
        <span className="text-xs text-zinc-500 font-medium">Popular Searches</span>
        <div className="flex flex-wrap gap-2">
          {["Man City vs Real Madrid", "Jannik Sinner", "Arsenal vs Chelsea", "PSV vs Excelsior", "Lakers vs Nuggets"].map((term, i) => (
            <button key={i} onClick={() => onSearch(term)} className="text-xs bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded-full border border-white/5 transition-colors">
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Quick Filters</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs bg-white/5 text-zinc-300 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10">
              All Leagues <SlidersHorizontal size={12} />
            </button>
            <button className="flex items-center gap-2 text-xs bg-white/5 text-zinc-300 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10">
              <Clock size={12} /> Today <SlidersHorizontal size={12} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
          {quickFilters.map((filter, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center justify-center gap-2 w-20 h-20 rounded-xl border transition-all ${
                filter.active 
                  ? 'bg-purple-500/10 border-purple-500/30' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <filter.icon size={20} className={filter.color} />
              <span className={`text-xs ${filter.active ? 'text-white' : 'text-zinc-400'}`}>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Search Results</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>Sort by:</span>
            <button className="text-white bg-white/5 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
              Most Relevant <SlidersHorizontal size={10} />
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mb-4">{upcomingMatches.length} results found</p>
        
        <div className="space-y-3">
          {upcomingMatches.map((match: any) => (
            <div key={match.id} className="bg-[#0f0f0f] border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-center justify-between group transition-all cursor-pointer" onClick={() => onSearch(`${match.homeTeam} vs ${match.awayTeam}`)}>
              {/* Sport & League */}
              <div className="flex items-center gap-3 w-1/4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">⚽</div>
                <div>
                  <div className="text-sm font-bold text-white">{match.sport}</div>
                  <div className="text-xs text-zinc-500">{match.league}</div>
                </div>
              </div>

              {/* Time */}
              <div className="w-1/6">
                <div className="text-sm text-zinc-300">Today</div>
                <div className="text-xs text-zinc-500">{match.time.split(', ')[1]}</div>
              </div>

              {/* Teams */}
              <div className="w-1/4 space-y-2">
                <div className="flex items-center gap-2">
                  <img src={match.homeLogo} alt={match.homeTeam} className="w-5 h-5 object-contain" />
                  <span className="text-sm text-white font-medium">{match.homeTeam}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={match.awayLogo} alt={match.awayTeam} className="w-5 h-5 object-contain" />
                  <span className="text-sm text-white font-medium">{match.awayTeam}</span>
                </div>
              </div>

              {/* Primary Prediction */}
              <div className="w-1/4">
                <div className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 inline-block mb-1 font-semibold uppercase tracking-wider">{match.primaryPrediction.label}</div>
                <div className="text-sm text-white font-bold">{match.primaryPrediction.value}</div>
              </div>

              {/* AI Confidence */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="text-[10px] text-zinc-500 uppercase">AI Confidence</div>
                  <div className="text-lg font-bold text-emerald-400">{match.aiConfidence}%</div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="py-12 text-center text-zinc-500 animate-pulse">
              Running DeepSeek Pro Engine...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
