
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
import SearchPage from './components/SearchPage';
import Sidebar from './components/Sidebar';
import AnalysisResults from './components/AnalysisResults';
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
import { Search, Loader2, BrainCircuit, Trophy, Globe, ExternalLink, Sparkles, Calendar, ListFilter, Zap, Receipt, History, Activity, Clock, BarChart2, Shield, Bell } from 'lucide-react';
import { BetSlipItem, BetHistoryItem } from './types';

const LOADING_MESSAGES = [
  "Initializing Fast-Track Algorithms...",
  "Parallel Scanning Live Odds...",
  "Syncing Micro-Market Data...",
  "Finalizing Pro Analysis..."
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<BetMasterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // App Navigation State

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

  // --- Layout Render ---

  if (currentView === 'home') {
    return <HomePage onLaunch={() => setCurrentView('search')} onDashboard={() => setCurrentView('user-dashboard')} onArbitrage={() => setCurrentView('arbitrage')} />;
  }

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]/50 relative">
        {/* Dynamic Orbs background for main area */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-[0.02] mix-blend-overlay"></div>
          <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[120px] animate-orb"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-emerald-600/10 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Top User Nav */}
          <div className="flex items-center justify-end p-6 gap-4">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Trophy size={20} />
            </button>
            <div className="relative">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center ml-2 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User&background=27272a&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          {currentView === 'search' && !data && (
            <SearchPage onSearch={(query) => { handleAnalyze(undefined, query); setCurrentView('analysis'); }} loading={loading} />
          )}

          {currentView === 'history' && (
            <BetHistoryPage 
              history={betHistory} 
              onBack={() => setCurrentView('search')} 
              onUpdateStatus={handleUpdateBetStatus}
            />
          )}

          {currentView === 'user-dashboard' && (
            <UserDashboard 
              history={betHistory} 
              onBack={() => setCurrentView('search')} 
            />
          )}

          {currentView === 'arbitrage' && (
            <ArbitrageScanner 
              onBack={() => setCurrentView('search')} 
            />
          )}

          {(currentView === 'analysis' || data) && (
            <div className="max-w-5xl mx-auto p-6 md:p-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="text-purple-400" /> DeepSeek Pro Analysis
                </h1>
                <button onClick={() => { setData(null); setCurrentView('search'); }} className="text-sm text-zinc-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 transition-colors">
                  New Search
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 flex items-center justify-center mb-6">
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyzing with DeepSeek...</h3>
                  <p className="text-sm text-zinc-400">Processing live odds and historical data.</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl mb-8">
                  {error}
                </div>
              )}

              {data && !loading && (
                <div className="space-y-8">
                  {/* Match Conditions Card */}
                  {(data.stadium || data.weather) && (
                    <div className="flex items-center gap-4 glass-panel rounded-full px-8 py-4 transition-all hover:-translate-y-1">
                      {data.stadium && (
                        <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                          <Trophy className="text-indigo-400" size={18} />
                          <span className="text-zinc-300 font-mono text-sm uppercase tracking-wide">{data.stadium}</span>
                        </div>
                      )}
                      {data.weather && (
                        <div className="flex items-center gap-3 pl-2">
                          <Globe className="text-amber-400" size={18} />
                          <span className="text-zinc-300 font-mono text-sm uppercase tracking-wide">{data.weather}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unified Analysis Results View */}
                  <AnalysisResults data={data} onAddBet={handleAddBet} />
                </div>
              )}
            </div>
          )}

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
        </div>
      </main>
      
      {modalOpen && (
        <GameDetailModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          gameName={selectedGameName} 
          gameData={gameDetailData}
          loading={modalLoading}
        />
      )}
    </div>
  );
};

export default App;
