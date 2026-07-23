import React from 'react';
import { PastSearchItem } from '../types';
import { ArrowLeft, Clock, Search, ChevronRight } from 'lucide-react';

interface PastSearchesPageProps {
  searches: PastSearchItem[];
  onBack: () => void;
  onSelectSearch: (search: PastSearchItem) => void;
}

const PastSearchesPage: React.FC<PastSearchesPageProps> = ({ searches, onBack, onSelectSearch }) => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2.5 hover:bg-white/10 bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-full transition-all text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <Search className="text-purple-500" size={28} />
              <h1 className="text-2xl font-black uppercase tracking-widest">Past Searches & Analyses</h1>
            </div>
          </div>
        </div>

        {/* List */}
        {searches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 space-y-4">
            <Clock size={64} className="opacity-20" />
            <p className="text-lg font-mono">No past searches found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searches.map(item => (
              <div 
                key={item.id} 
                onClick={() => onSelectSearch(item)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 cursor-pointer transition-all flex flex-col group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.data.gamePredictions?.gameName || item.query}</h3>
                <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                  {item.data.microMarkets?.length || 0} Micro Markets • {item.data.bankerBets?.length || 0} Bankers
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastSearchesPage;
