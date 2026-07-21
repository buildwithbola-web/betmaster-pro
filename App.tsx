
import React, { useState, useEffect, useCallback } from 'react';
import { analyzeBets, fetchGameDetails } from './services/geminiService';
import { BetMasterResponse, GameDetails } from './types';
import TeamComparisonSection from './components/TeamComparisonSection';
import AnalysisCard from './components/AnalysisCard';
import GamePredictionsCard from './components/GamePredictionsCard';
import MicroMarketsSection from './components/MicroMarketsSection';
import FirstSetWinnersSection from './components/FirstSetWinnersSection';
import ScorePredictionsSection from './components/ScorePredictionsSection';
import BankerBetsSection from './components/BankerBetsSection';
import GameDetailModal from './components/GameDetailModal';
import BetSlipDrawer from './components/BetSlipDrawer';
import OddsMovementSection from './components/OddsMovementSection';
import EvScannerSection from './components/EvScannerSection';
import AbsenceImpactSection from './components/AbsenceImpactSection';
import TeamDuelsSection from './components/TeamDuelsSection';
import LiveMomentumSection from './components/LiveMomentumSection';
import BetHistoryPage from './components/BetHistoryPage';
import HomePage from './components/HomePage';
import UserDashboard from './components/UserDashboard';
import ArbitrageScanner from './components/ArbitrageScanner';
import { 
  PredictionSkeleton, 
  MicroMarketsSkeleton,
  FirstSetWinnersSkeleton,
  ScorePredictionsSkeleton,
  BankerBetsSkeleton
} from './components/SkeletonLoader';
import { Search, Loader2, BrainCircuit, Trophy, Globe, ExternalLink, Sparkles, Calendar, ListFilter, Zap, Receipt, History, Activity, Clock, BarChart2, Shield } from 'lucide-react';
import { BetSlipItem, BetHistoryItem } from './types';

const LOADING_MESSAGES = [
  "Initializing Fast-Track Algorithms...",
  "Parallel Scanning Live Odds...",
  "Syncing Micro-Market Data...",
  "Finalizing Pro Analysis..."
];

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<BetMasterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // App Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'history' | 'user-dashboard' | 'arbitrage'>('home');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState('');
  const [gameDetailData, setGameDetailData] = useState<GameDetails | null>(null);

  // Bet Slip State
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  // Search History State
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('betmaster_search_history');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load search history');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('betmaster_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleAddBet = useCallback((bet: BetSlipItem) => {
    setBetSlip(prev => {
      if (prev.find(b => b.id === bet.id)) return prev;
      return [...prev, bet];
    });
    setIsBetSlipOpen(true);
  }, []);

  const handleRemoveBet = useCallback((id: string) => {
    setBetSlip(prev => prev.filter(b => b.id !== id));
  }, []);

  const handlePlaceBet = useCallback((stakeAmount: number) => {
    if (betSlip.length === 0) return;
    
    const totalOdds = betSlip.reduce((acc, bet) => {
      const val = parseFloat(bet.odds);
      return acc * (isNaN(val) ? 1 : val);
    }, 1);

    const newHistoryItem: BetHistoryItem = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      bets: [...betSlip],
      totalOdds,
      stakeAmount,
      status: 'pending'
    };

    setBetHistory(prev => [newHistoryItem, ...prev]);
    setBetSlip([]);
  }, [betSlip]);

  const handleUpdateBetStatus = useCallback((id: string, status: 'won' | 'lost' | 'pending') => {
    setBetHistory(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
      setLoadingMsgIndex(0);
      setProgress(5);
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
        setProgress(prev => Math.min(prev + 15, 98));
      }, 800);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (e?: React.FormEvent, overridePrompt?: string) => {
    if (e) e.preventDefault();
    
    const promptToUse = overridePrompt || input;
    if (!promptToUse.trim()) return;

    setSearchHistory(prev => {
      const query = promptToUse.trim();
      const filtered = prev.filter(h => h.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5); // Keep last 5 searches
    });

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeBets(promptToUse);
      setData(result);
    } catch (err: any) {
      const errorMessage = err.message || err.toString();
      if (errorMessage.includes("429") || errorMessage.includes("quota")) {
        setError("API Quota Exceeded: Please check your Gemini API billing and plan details.");
      } else {
        setError(`Analysis interrupted. The algorithm is recalibrating live data streams. Error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGameClick = useCallback(async (gameName: string) => {
    setSelectedGameName(gameName);
    setModalOpen(true);
    setModalLoading(true);
    setGameDetailData(null);

    try {
      const details = await fetchGameDetails(gameName);
      setGameDetailData(details);
    } catch (err) {
      console.error("Failed to fetch game details", err);
    } finally {
      setModalLoading(false);
    }
  }, []);

  if (currentView === 'home') {
    return <HomePage onLaunch={() => setCurrentView('dashboard')} onDashboard={() => setCurrentView('user-dashboard')} onArbitrage={() => setCurrentView('arbitrage')} />;
  }

  if (currentView === 'history') {
    return (
      <BetHistoryPage 
        history={betHistory} 
        onBack={() => setCurrentView('dashboard')} 
        onUpdateStatus={handleUpdateBetStatus}
      />
    );
  }

  if (currentView === 'user-dashboard') {
    return (
      <UserDashboard 
        history={betHistory} 
        onBack={() => setCurrentView('dashboard')} 
      />
    );
  }

  if (currentView === 'arbitrage') {
    return (
      <ArbitrageScanner 
        onBack={() => setCurrentView('dashboard')} 
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20 bg-black text-white font-sans">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Sleek Navigation Bar */}
        <nav className="flex items-center justify-between mb-16 border-b border-white/10 pb-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </button>

          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <BrainCircuit className="text-white" size={20} />
            <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
              BETMASTER <span className="text-emerald-500">PRO</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentView('user-dashboard')}
              className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-zinc-500 hover:text-white"
              title="Dashboard"
            >
              <BarChart2 size={18} />
            </button>
            <button
              onClick={() => setCurrentView('arbitrage')}
              className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-zinc-500 hover:text-white"
              title="Arbitrage Scanner"
            >
              <Shield size={18} />
            </button>
            <button
              onClick={() => setCurrentView('history')}
              className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-zinc-500 hover:text-white"
              title="Bet History"
            >
              <History size={18} />
            </button>
            <div className="flex h-2 w-2 relative ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
            </div>
          </div>
        </nav>

        {/* Central Search Hub */}
        <div className="max-w-3xl mx-auto mb-12 text-center relative z-20">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">
            Who are you analyzing today?
          </h2>
          
          <form onSubmit={(e) => {
              e.preventDefault();
              setShowHistory(false);
              handleAnalyze(e);
            }} 
            className="relative w-full group animate-fade-in-up"
          >
            <div className="relative bg-black p-2 border border-white/10 flex items-center focus-within:border-emerald-500 transition-colors">
              <div className="pl-4 pr-2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                <Search size={28} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowHistory(true);
                }}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                placeholder="e.g. Real Madrid, Lakers, Carlos Alcaraz..."
                className="w-full bg-transparent border-none text-white px-2 py-4 focus:ring-0 text-xl md:text-2xl placeholder-zinc-600 font-mono uppercase tracking-widest outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-emerald-500 hover:bg-white disabled:opacity-50 text-black px-8 py-4 transition-colors font-black uppercase tracking-widest text-sm flex items-center gap-2"
              >
                Scan <Sparkles size={16} />
              </button>
            </div>

            {showHistory && searchHistory.filter(h => h.toLowerCase().includes(input.toLowerCase())).length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 overflow-hidden z-50">
                <div className="p-2">
                  <div className="text-xs font-mono text-zinc-500 mb-2 px-3 flex items-center gap-2 pt-2">
                    <History size={12} /> RECENT SCANS
                  </div>
                  {searchHistory.filter(h => h.toLowerCase().includes(input.toLowerCase())).map((historyItem, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInput(historyItem);
                        setShowHistory(false);
                        handleAnalyze(undefined, historyItem);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-mono uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3"
                    >
                      <Search size={14} className="text-zinc-500" />
                      {historyItem}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-10 p-4 bg-black border border-red-500 text-red-500 text-center font-mono text-sm uppercase tracking-widest">
            {error}
          </div>
        )}

        {data && !loading && (data.matchStatus || data.matchTime) && (
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               
               {/* Live Status Badge */}
               <div className={`flex items-center gap-3 px-8 py-4 border ${(data.matchStatus || '').toUpperCase().includes('LIVE') ? 'bg-black border-red-500' : 'bg-black border-emerald-500'}`}>
                 <Clock className={`${(data.matchStatus || '').toUpperCase().includes('LIVE') ? 'text-red-500' : 'text-emerald-500'} animate-pulse`} size={24} />
                 <span className={`${(data.matchStatus || '').toUpperCase().includes('LIVE') ? 'text-red-500' : 'text-emerald-500'} font-black tracking-[0.2em] text-xl uppercase`}>
                   {data.matchStatus || `KICKOFF: ${data.matchTime}`}
                 </span>
               </div>
               
               {/* Match Conditions Card */}
               {(data.stadium || data.weather) && (
                 <div className="flex items-center gap-4 bg-black border border-white/10 px-6 py-3">
                   {data.stadium && (
                     <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                       <Trophy className="text-white" size={16} />
                       <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">{data.stadium}</span>
                     </div>
                   )}
                   {data.weather && (
                     <div className="flex items-center gap-2 pl-2">
                       <Globe className="text-white" size={16} />
                       <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">{data.weather}</span>
                     </div>
                   )}
                 </div>
               )}

            </div>
          </div>
        )}

        {/* Global Loading Dashboard */}
        {loading && (
          <div className="space-y-12 animate-fade-in">
            <div className="sticky top-4 z-40 max-w-2xl mx-auto mb-12">
               <div className="bg-black p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                      {LOADING_MESSAGES[loadingMsgIndex]}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 border border-white/10">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
               </div>
            </div>

            <div className="space-y-16">
              <section>
                <div className="flex items-end justify-between mb-6 border-b border-zinc-800 pb-2">
                  <h3 className="text-2xl font-bold text-zinc-500 flex items-center gap-3">
                    <span className="text-zinc-500 text-3xl opacity-20">✦</span>
                    GAME INTELLIGENCE
                  </h3>
                </div>
                <PredictionSkeleton />
              </section>

              <section>
                <MicroMarketsSkeleton />
              </section>

              <section>
                <FirstSetWinnersSkeleton />
              </section>

              <section>
                <ScorePredictionsSkeleton />
              </section>

              <section>
                <BankerBetsSkeleton />
              </section>
            </div>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-16 animate-fade-in-up">
            
            {data.isFallback && (
              <div className="bg-black border border-amber-500 p-5 relative overflow-hidden animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-500 text-black mt-0.5">
                    <Sparkles size={16} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                      Local Simulation Active
                    </h4>
                    <p className="text-zinc-400 font-mono text-xs mt-2 leading-relaxed uppercase tracking-wider">
                      Due to high-volume API demand, the standard live search grounding channel has hit temporary quota limits.
                      The engine has successfully engaged its <strong>High-Fidelity Offline Predictive Model</strong>. All matchups, statistical models, and sub-market spreads are fully computed and ready for exploration.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* 0. Game Intelligence - Mainstream/Niche */}
            {data.gamePredictions && (
              <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-zinc-800 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Activity className="text-emerald-500" size={24} />
                    <h2 className="text-xl font-black tracking-tight text-white uppercase tracking-widest">
                      DeepSeek <span className="text-emerald-500">Intelligence</span>
                    </h2>
                  </div>
                </div>
                <GamePredictionsCard data={data.gamePredictions} />
              </section>
            )}

            {/* Micro-Markets & Player Props Module */}
            {data.microMarkets && data.microMarkets.length > 0 && (
              <section>
                <MicroMarketsSection insights={data.microMarkets} onAddBet={handleAddBet} />
              </section>
            )}

            {/* 1. Team Comparison */}
            {data.teamComparison && (
              <section>
                <TeamComparisonSection comparison={data.teamComparison} />
              </section>
            )}

            {data.firstSetWinners && data.firstSetWinners.length > 0 && (
               <section>
                  <FirstSetWinnersSection winners={data.firstSetWinners} onGameClick={handleGameClick} onAddBet={handleAddBet} />
               </section>
            )}

            {data.scorePredictions && data.scorePredictions.length > 0 && (
               <section>
                  <ScorePredictionsSection predictions={data.scorePredictions} onGameClick={handleGameClick} onAddBet={handleAddBet} />
               </section>
            )}

            {data.bankerBets && data.bankerBets.length > 0 && (
               <section>
                  <BankerBetsSection bets={data.bankerBets} onGameClick={handleGameClick} onAddBet={handleAddBet} />
               </section>
            )}

            {/* NEW PRO MODULES */}
            {data.liveMomentum && (
              <section>
                <LiveMomentumSection momentum={data.liveMomentum} onAddBet={handleAddBet} gameName={data.gamePredictions?.gameName || "Live Match"} />
              </section>
            )}

            {data.evScanner && data.evScanner.length > 0 && (
              <section>
                <EvScannerSection bets={data.evScanner} onAddBet={handleAddBet} gameName={data.gamePredictions?.gameName || "Match"} />
              </section>
            )}

            {data.oddsMovement && data.oddsMovement.length > 0 && (
              <section>
                <OddsMovementSection movements={data.oddsMovement} onAddBet={handleAddBet} gameName={data.gamePredictions?.gameName || "Match"} />
              </section>
            )}

            {data.absenceImpact && data.absenceImpact.length > 0 && (
              <section>
                <AbsenceImpactSection impacts={data.absenceImpact} />
              </section>
            )}

            {data.teamDuels && data.teamDuels.length > 0 && (
              <section>
                <TeamDuelsSection duels={data.teamDuels} />
              </section>
            )}
            
            {data.sources && data.sources.length > 0 && (
              <section className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800/50">
                <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 flex items-center gap-2">
                  <Globe size={14} />
                  Verified Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.sources.map((source, index) => (
                    <a 
                      key={index} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono uppercase tracking-widest bg-black hover:bg-white text-zinc-500 hover:text-black px-3 py-1.5 border border-white/10 transition-colors flex items-center gap-2 max-w-[200px] truncate"
                    >
                      <ExternalLink size={10} />
                      <span className="truncate">{source.title}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

        {!data && !loading && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            {/* Minimal Terminal Status */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-black border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-[0.2em]">PRO ENGINE ONLINE</span>
              </div>
              <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-1"><BrainCircuit size={12} className="text-white" /> DeepSeek V3</span>
                <span className="flex items-center gap-1"><Zap size={12} className="text-white" /> 14+ Cores</span>
                <span className="flex items-center gap-1"><Globe size={12} className="text-white" /> Web Grounding</span>
              </div>
            </div>

            {/* Quick Presets Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2">
                <Sparkles size={16} className="text-white" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-white">Popular Scans</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { game: "Real Madrid vs Barcelona", icon: "🇪🇸", league: "La Liga" },
                  { game: "Man City vs Arsenal", icon: "🇬🇧", league: "EPL" },
                  { game: "Lakers vs Celtics", icon: "🏀", league: "NBA" },
                  { game: "Alcaraz vs Sinner", icon: "🎾", league: "ATP" }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInput(preset.game);
                      handleAnalyze(undefined, preset.game);
                    }}
                    className="group bg-black hover:bg-white border border-white/10 hover:border-white p-4 transition-colors flex flex-col items-start gap-3"
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{preset.icon}</span>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 group-hover:text-black uppercase tracking-widest border border-white/10 group-hover:border-black px-2 py-0.5">
                        {preset.league}
                      </span>
                    </div>
                    <div className="text-left text-sm font-mono uppercase tracking-wider font-bold text-white group-hover:text-black transition-colors leading-snug">
                      {preset.game}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State Instruction */}
            <div className="text-center py-10 opacity-50">
              <p className="text-xs text-zinc-500 font-mono">
                Awaiting input stream...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAB for BetSlip */}
      <button 
        onClick={() => setIsBetSlipOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 text-black p-4 hover:bg-white transition-colors border border-emerald-500 hover:border-white"
      >
        <div className="relative">
          <Receipt size={24} />
          {betSlip.length > 0 && (
            <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-mono font-bold h-5 w-5 flex items-center justify-center border border-white">
              {betSlip.length}
            </span>
          )}
        </div>
      </button>

      <BetSlipDrawer 
        isOpen={isBetSlipOpen} 
        onClose={() => setIsBetSlipOpen(false)} 
        bets={betSlip}
        history={betHistory}
        onRemoveBet={handleRemoveBet} 
        onClear={() => setBetSlip([])}
        onPlaceBet={handlePlaceBet}
        onViewHistory={() => setCurrentView('history')}
      />

      <GameDetailModal 
        isOpen={modalOpen} 
        isLoading={modalLoading} 
        data={gameDetailData} 
        onClose={() => setModalOpen(false)}
        gameName={selectedGameName}
      />
    </div>
  );
};

export default App;
