
import React, { useState, useEffect, useCallback } from 'react';
import { analyzeBets, fetchGameDetails } from './services/geminiService';
import { BetMasterResponse, GameDetails, PastSearchItem, AggregateStats } from './types';
import TeamComparisonSection from './components/TeamComparisonSection';
import AnalysisCard from './components/AnalysisCard';
import GamePredictionsCard from './components/GamePredictionsCard';
import MicroMarketsSection from './components/MicroMarketsSection';
import FirstSetWinnersSection from './components/FirstSetWinnersSection';
import ScorePredictionsSection from './components/ScorePredictionsSection';
import BankerBetsSection from './components/BankerBetsSection';
import SearchPage from './components/SearchPage';
import TopNav from './components/TopNav';
import AnalysisResults from './components/AnalysisResults';
import BetSlipDrawer from './components/BetSlipDrawer';
import OddsMovementSection from './components/OddsMovementSection';
import EvScannerSection from './components/EvScannerSection';
import BetHistoryPage from './components/BetHistoryPage';
import HomePage from './components/HomePage';
import UserDashboard from './components/UserDashboard';
import ArbitrageScanner from './components/ArbitrageScanner';
import AllBankerBetsPage from './components/AllBankerBetsPage';
import PastSearchesPage from './components/PastSearchesPage';
import AllMicroMarketsPage from './components/AllMicroMarketsPage';
import GameDetailModal from './components/GameDetailModal';
import ErrorBoundary from './components/ErrorBoundary';
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
  const [searchHistory, setSearchHistory] = useState<PastSearchItem[]>([]);
  const [currentPastSearchId, setCurrentPastSearchId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Aggregate Stats State
  const [aggregateStats, setAggregateStats] = useState<AggregateStats>({
    totalGradedMatches: 0,
    totalWon: 0,
    totalLost: 0,
    totalVoid: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('betmaster_search_history');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load search history');
      }
    }
    const savedStats = localStorage.getItem('betmaster_aggregate_stats');
    if (savedStats) {
      try {
        setAggregateStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to load aggregate stats');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('betmaster_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('betmaster_aggregate_stats', JSON.stringify(aggregateStats));
  }, [aggregateStats]);

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

  const handleUpdateBetStatus = useCallback((id: string, status: 'won' | 'lost' | 'pending' | 'void') => {
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

    setLoading(true);
    setError(null);
    setData(null);
    setCurrentPastSearchId(null);

    try {
      const result = await analyzeBets(promptToUse);
      setData(result);
      
      setSearchHistory(prev => {
        const newItem: PastSearchItem = {
          id: Math.random().toString(36).substring(7),
          query: promptToUse.trim(),
          date: new Date().toISOString(),
          data: result
        };
        const filtered = prev.filter(h => h.query.toLowerCase() !== promptToUse.trim().toLowerCase());
        return [newItem, ...filtered].slice(0, 10);
      });
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

  const handleGradePredictions = async () => {
    if (!currentPastSearchId || !data || !data.gamePredictions?.gameName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/grade-predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchName: data.gamePredictions.gameName, predictionsData: data })
      });
      
      if (!response.ok) throw new Error("Grading failed");
      
      const gradedData = await response.json();
      
      // Calculate won/lost/void
      let won = 0; let lost = 0; let voidCount = 0;
      const countStatus = (status?: string) => {
        if (status === 'won') won++;
        else if (status === 'lost') lost++;
        else if (status === 'void') voidCount++;
      };

      const checkItems = (items: any[]) => {
        if (!items) return;
        items.forEach(item => countStatus(item.status));
      };

      if (gradedData.gamePredictions) {
        checkItems(gradedData.gamePredictions.mainstream);
        checkItems(gradedData.gamePredictions.niche);
      }
      checkItems(gradedData.microMarkets);
      checkItems(gradedData.bankerBets);
      if (gradedData.scorePredictions) {
        gradedData.scorePredictions.forEach((p: any) => checkItems(p.correctScores));
      }
      
      setAggregateStats(prev => ({
        totalGradedMatches: prev.totalGradedMatches + 1,
        totalWon: prev.totalWon + won,
        totalLost: prev.totalLost + lost,
        totalVoid: prev.totalVoid + voidCount
      }));

      setData(gradedData);

      // Update in history
      setSearchHistory(prev => prev.map(h => 
        h.id === currentPastSearchId ? { ...h, data: gradedData } : h
      ));

    } catch (err: any) {
      setError(`Failed to auto-grade predictions: ${err.message}`);
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
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      <TopNav currentView={currentView} setCurrentView={setCurrentView} onOpenBetSlip={() => setIsBetSlipOpen(true)} />
      
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]/50 relative">
        {/* Dynamic Orbs background for main area */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-[0.02] mix-blend-overlay"></div>
          <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[120px] animate-orb"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-emerald-600/10 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8">

          {(currentView === 'search' || currentView === 'analysis') && (
            <SearchPage 
              onSearch={(query) => { handleAnalyze(undefined, query); setCurrentView('analysis'); }} 
              loading={loading}
              hasData={!!data}
              searchHistory={searchHistory}
            />
          )}

          {currentView === 'history' && (
            <ErrorBoundary>
              <BetHistoryPage 
                history={betHistory} 
                onBack={() => setCurrentView('analysis')} 
                onUpdateStatus={handleUpdateBetStatus}
              />
            </ErrorBoundary>
          )}

          {currentView === 'user-dashboard' && (
            <UserDashboard 
              history={betHistory} 
              onBack={() => setCurrentView('search')} 
              aggregateStats={aggregateStats}
            />
          )}

          {currentView === 'past-searches' && (
            <ErrorBoundary>
              <PastSearchesPage 
                searches={searchHistory}
                onBack={() => setCurrentView('home')}
                onSelectSearch={(search) => {
                  setData(search.data);
                  setCurrentPastSearchId(search.id);
                  setCurrentView('analysis');
                }}
              />
            </ErrorBoundary>
          )}

          {currentView === 'arbitrage' && (
            <ArbitrageScanner 
              onBack={() => setCurrentView('search')} 
            />
          )}

          {(currentView === 'analysis' || data) && (
            <div className={`max-w-5xl mx-auto pb-12 animate-fade-in-up ${currentView === 'analysis' ? 'block' : 'hidden'}`}>
              <ErrorBoundary>
                <AnalysisResults 
                  data={data} 
                  onAddBet={handleAddBet} 
                  setCurrentView={setCurrentView}
                  isPastSearch={!!currentPastSearchId}
                  onGradePredictions={handleGradePredictions}
                  isGrading={loading}
                />
              </ErrorBoundary>
            </div>
          )}
          
          {currentView === 'all-micro' && data && (
            <AllMicroMarketsPage data={data} onBack={() => setCurrentView('analysis')} />
          )}

          {currentView === 'all-bankers' && data && (
            <AllBankerBetsPage data={data} onBack={() => setCurrentView('analysis')} onAddBet={handleAddBet} />
          )}
          
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
