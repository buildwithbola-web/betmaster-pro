import React, { useEffect, useState } from 'react';
import { BrainCircuit, ChevronRight, Zap, Target, TrendingUp, Activity, ShieldAlert, Sparkles, BarChart2, Shield, Globe, Clock } from 'lucide-react';

interface HomePageProps {
  onLaunch: () => void;
  onDashboard: () => void;
  onArbitrage: () => void;
}

const TICKER_ITEMS = [
  "Sharp Money Detected: Real Madrid -1.5 (Volume: ₦4.2M)",
  "EV+ Value: Lakers Over 220.5 (+15% Edge)",
  "Injury Alert: Martin Odegaard OUT (-0.4 xG Impact)",
  "Live Momentum: Arsenal dominating 68% Possession",
  "Line Movement: Djokovic opening -150 ➔ current -210"
];

const HomePage: React.FC<HomePageProps> = ({ onLaunch, onDashboard, onArbitrage }) => {
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      setTickerOffset((elapsed / 30) % 2000);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Soft Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-orb"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] bg-emerald-600/10 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[35vw] h-[35vw] bg-blue-600/10 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-10s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-transparent gap-4 sm:gap-0 mt-2">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
            <BrainCircuit className="text-zinc-300 relative z-10" size={20} />
          </div>
          <span className="text-xl sm:text-xl font-bold tracking-tight text-zinc-100">
            BetMaster <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-semibold">Pro</span>
          </span>
        </div>
        <button 
          onClick={onLaunch}
          className="text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-5 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 shadow-sm"
        >
          Enter Terminal <ChevronRight size={14} />
        </button>
      </nav>

      {/* Live Signals Ticker */}
      <div className="relative z-40 bg-zinc-900/30 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden flex mt-2">
        <div className="text-emerald-400 px-4 sm:px-8 flex items-center font-medium text-xs border-r border-white/10 relative z-10 shrink-0 bg-[#050505]/50 shadow-[10px_0_15px_-3px_rgba(5,5,5,0.5)]">
          <Activity size={14} className="mr-2 animate-pulse" /> Live Feed
        </div>
        <div className="flex whitespace-nowrap items-center" style={{ transform: `translateX(-${tickerOffset}px)` }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="mx-6 sm:mx-10 text-xs font-medium text-zinc-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-32">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-32 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-500/10 text-purple-300 px-4 py-1.5 rounded-full text-xs font-medium mb-8 sm:mb-10 shadow-sm backdrop-blur-md">
            <Sparkles size={14} />
            <span>Powered by DeepSeek V3 AI</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6 sm:mb-8 text-white relative">
            The Unfair <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600">Advantage.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-zinc-400 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Execute high-fidelity predictive modeling. Track syndicate line movements. Exploit EV+ inefficiencies across global bookmakers with advanced AI.
          </p>
          
          <button 
            onClick={onLaunch}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-white text-black font-semibold text-sm sm:text-base hover:bg-zinc-200 transition-all rounded-full shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10">Start Analyzing</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </div>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          
          {/* Feature 1 - Large Span */}
          <div className="md:col-span-2 bg-white/[0.02] border border-white/[0.05] p-6 sm:p-10 rounded-[24px] hover:bg-white/[0.04] transition-colors group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[60px] group-hover:bg-cyan-500/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20">
                <Zap size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-zinc-100">In-Play Advisor</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                Track micro-momentum shifts. Compute live xG advantage before bookmaker algorithms adjust spreads. Stay ahead of the oddsmakers.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="md:col-span-1 bg-white/[0.02] border border-white/[0.05] p-6 sm:p-10 rounded-[24px] hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[50px] group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20">
                <Target size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 text-zinc-100">EV+ Scanner</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Isolate mathematical value. Extract true probabilities and exploit mispriced odds.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-1 bg-white/[0.02] border border-white/[0.05] p-6 sm:p-10 rounded-[24px] hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[50px] group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 text-amber-400 border border-amber-500/20">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 text-zinc-100">Sharp Money</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Monitor global betting volume. Detect sudden line crashes. Follow the syndicate capital.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 bg-white/[0.02] border border-white/[0.05] p-6 sm:p-10 rounded-[24px] hover:bg-white/[0.04] transition-colors group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[60px] group-hover:bg-rose-500/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6 text-rose-400 border border-rose-500/20">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-zinc-100">Absence Impact</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                Quantify injury severity. Calculate precise xG differentials and target vulnerable defensive lines.
              </p>
            </div>
            <div className="w-full sm:w-auto flex-shrink-0 bg-[#050505] border border-white/5 rounded-xl p-5 shadow-lg relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500/80 animate-pulse"></span>
                <span className="text-xs font-medium text-zinc-400">Impact Alert</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200">Key Player OUT</div>
              <div className="text-xs text-rose-400 mt-1.5 font-medium">Defensive Rating -15%</div>
            </div>
          </div>

        </div>

        {/* Action Cards: Dashboard & Arbitrage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <button
            onClick={onDashboard}
            className="bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 rounded-[24px] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 text-left group flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative overflow-hidden"
          >
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="h-12 w-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
              <BarChart2 size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight mb-1.5 text-zinc-100 group-hover:text-blue-300 transition-colors">ROI Dashboard</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Track your strike rate, ROI, profit/loss, and betting performance in real-time. Full analytics without API costs.
              </p>
            </div>
          </button>

          <button
            onClick={onArbitrage}
            className="bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 rounded-[24px] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 text-left group flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative overflow-hidden"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/10 transition-colors"></div>
            <div className="h-12 w-12 shrink-0 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
              <Shield size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold tracking-tight mb-1.5 text-zinc-100 group-hover:text-purple-300 transition-colors">Arbitrage Scanner</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Scan multiple sportsbooks for guaranteed-profit opportunities. AI-powered cross-bookmaker analysis.
              </p>
            </div>
          </button>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-transparent py-8 text-center text-zinc-500 text-xs relative z-20">
        &copy; {new Date().getFullYear()} BetMaster Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
