import React, { useState } from 'react';
import { Search, Trophy, Clock } from 'lucide-react';

interface SearchPageProps {
  onSearch: (query: string) => void;
  loading: boolean;
  hasData: boolean;
  searchHistory?: string[];
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch, loading, hasData, searchHistory = [] }) => {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'recent'>('search');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      {/* Search Header Area */}
      <div className="flex flex-col items-center justify-center text-center mt-8 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">Who are you analyzing today?</h1>
        
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative mb-6 z-20">
          <div className="absolute inset-0 bg-purple-500/10 blur-2xl rounded-full pointer-events-none"></div>
          <div className="relative bg-[#050505] border border-white/10 rounded-full flex items-center p-1.5 shadow-2xl transition-all focus-within:border-purple-500/50 hover:border-white/20">
            <div className="pl-4 pr-2 text-zinc-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="AC Omonia Nicosia vs FC Kairat"
              className="flex-1 bg-transparent border-none text-white px-2 py-3 focus:ring-0 text-sm outline-none placeholder-zinc-600"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-full transition-colors disabled:opacity-50 text-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Suggestion Pills */}
        {!hasData && activeTab === 'search' && (
          <div className="flex flex-wrap justify-center gap-3 relative z-20">
            {[
              { label: "Man City vs Real Madrid", icon: Trophy, color: "text-emerald-400" },
              { label: "Jannik Sinner", icon: Trophy, color: "text-emerald-400" },
              { label: "Lakers vs Nuggets", icon: Trophy, color: "text-zinc-400" }
            ].map((pill, i) => (
              <button 
                key={i} 
                onClick={() => onSearch(pill.label)} 
                className="flex items-center gap-2 text-xs bg-[#0a0a0a] hover:bg-white/10 text-zinc-300 px-4 py-2 rounded-full border border-white/5 transition-colors"
              >
                <pill.icon size={14} className={pill.color} />
                {pill.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/10 mb-8 max-w-5xl mx-auto px-4 md:px-0">
        <button 
          onClick={() => setActiveTab('search')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 ${activeTab === 'search' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-500 hover:text-white'}`}
        >
          <Search size={14} /> Search Results
        </button>
        <button 
          onClick={() => setActiveTab('recent')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 ${activeTab === 'recent' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-500 hover:text-white'}`}
        >
          <Clock size={14} /> Recent Searches ({searchHistory.length})
        </button>
      </div>

      {/* Recent Searches Content */}
      {activeTab === 'recent' && (
        <div className="max-w-5xl mx-auto px-4 md:px-0 mb-12">
          {searchHistory.length === 0 ? (
            <div className="text-center text-zinc-500 py-12 bg-[#050505] border border-white/5 rounded-2xl">
              No recent searches found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchHistory.map((item: any, i) => {
                const query = typeof item === 'string' ? item : (item.query || 'Unknown Search');
                return (
                  <button 
                    key={i}
                    onClick={() => onSearch(typeof query === 'string' ? query : 'Unknown Search')}
                    className="flex items-center justify-between p-4 bg-[#050505] hover:bg-white/5 border border-white/5 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-zinc-500" />
                      <span className="text-white font-bold">{typeof query === 'string' ? query : 'Unknown Search'}</span>
                    </div>
                    <span className="text-xs text-purple-400">Re-analyze ➔</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
