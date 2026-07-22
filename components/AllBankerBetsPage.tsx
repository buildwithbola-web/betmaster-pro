import React from 'react';
import { ArrowLeft, Gem, Search, CheckCircle2 } from 'lucide-react';

interface Props {
  data: any;
  onBack: () => void;
  onAddBet: (bet: any) => void;
}

const AllBankerBetsPage: React.FC<Props> = ({ data, onBack, onAddBet }) => {
  const matchName = data?.gamePredictions?.gameName || "AC Omonia Nicosia vs FC Kairat";
  
  // Mix API data with mock expansion
  const bankerBets = [
    ...(data?.bankerBets || []),
    { market: "Over 1.5 Goals", selection: "Over 1.5", odds: "1.25", confidence: 95, reasoning: "Extremely high probability based on both teams scoring records." },
    { market: "Team A to Score", selection: "Yes", odds: "1.18", confidence: 98, reasoning: "Team A has scored in their last 15 home matches." },
    { market: "Under 4.5 Cards", selection: "Under 4.5", odds: "1.30", confidence: 88, reasoning: "Both teams have excellent disciplinary records." },
    { market: "First Half Under 1.5 Goals", selection: "Under 1.5", odds: "1.45", confidence: 82, reasoning: "Both teams typically start slow." },
    { market: "Most Corners", selection: data?.teamComparison?.teamA || "Home Team", odds: "1.55", confidence: 85, reasoning: "Home team dominates possession and width." },
    { market: "No Red Card", selection: "Yes", odds: "1.12", confidence: 99, reasoning: "Neither team has received a red card this season." }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 py-8 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Back to Analysis
      </button>

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Gem size={24} className="text-pink-500" />
            <h1 className="text-3xl font-black text-white">All Banker Bets</h1>
          </div>
          <p className="text-zinc-400 text-sm">Ultra-high confidence picks for {matchName}</p>
        </div>
        <div className="hidden md:flex relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search bankers..." 
            className="w-full bg-[#050505] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-pink-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankerBets.map((bet: any, i: number) => (
          <div key={i} className="bg-[#050505] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg z-10">
                Absolute Best
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-pink-500/20 text-pink-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{bet.selection}</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{bet.market}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">{bet.odds}</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase">{bet.confidence}% CONF</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6 relative z-10">
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">AI Reasoning</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{bet.reasoning}</p>
            </div>

            <button 
              onClick={() => onAddBet({
                id: Math.random().toString(36).substring(7),
                game: matchName,
                market: bet.market,
                selection: bet.selection,
                odds: bet.odds
              })}
              className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors relative z-10
                ${i === 0 
                  ? 'bg-pink-600 hover:bg-pink-500 text-white' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
            >
              Add to Bet Slip
            </button>

            {i === 0 && (
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBankerBetsPage;
