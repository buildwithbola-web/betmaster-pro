import React, { useEffect, useState } from 'react';
import { BrainCircuit, ChevronRight, Zap, Target, TrendingUp, Activity, ShieldAlert, Sparkles, BarChart2, Shield } from 'lucide-react';

interface HomePageProps {
  onLaunch: () => void;
  onDashboard: () => void;
  onArbitrage: () => void;
}

const TICKER_ITEMS = [
  "SHARP MONEY DETECTED: Real Madrid -1.5 (Volume: ₦4.2M)",
  "EV+ VALUE: Lakers Over 220.5 (+15% Edge)",
  "INJURY ALERT: Martin Odegaard OUT (-0.4 xG Impact)",
  "LIVE MOMENTUM: Arsenal dominating 68% Possession",
  "LINE MOVEMENT: Djokovic opening -150 ➔ current -210"
];

const HomePage: React.FC<HomePageProps> = ({ onLaunch, onDashboard, onArbitrage }) => {
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      setTickerOffset((elapsed / 20) % 2000);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 border-b border-white/10 bg-black">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-white" size={24} />
          <span className="text-xl font-black tracking-[0.2em] uppercase">
            BETMASTER <span className="text-emerald-500">PRO</span>
          </span>
        </div>
        <button 
          onClick={onLaunch}
          className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/10 px-4 py-2 border border-transparent hover:border-white/10 transition-all"
        >
          [ ENTER TERMINAL ]
        </button>
      </nav>

      {/* Live Signals Ticker */}
      <div className="relative z-40 bg-zinc-950 border-b border-white/10 py-2 overflow-hidden flex">
        <div className="bg-emerald-500 text-black px-4 py-2 flex items-center font-black uppercase text-[10px] tracking-widest border-r border-black relative z-10 shrink-0">
          LIVE FEED
        </div>
        <div className="flex whitespace-nowrap items-center" style={{ transform: `translateX(-${tickerOffset}px)` }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="mx-8 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              {item}
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-32">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <div className="inline-block border border-white/10 bg-zinc-950 px-4 py-2 text-white text-xs font-mono uppercase tracking-[0.3em] mb-12">
            SYSTEM VERSION: DEEPSEEK V3
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase text-white">
            UNFAIR <br/> <span className="text-zinc-600">ADVANTAGE</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 mb-12 max-w-xl mx-auto font-mono uppercase leading-relaxed">
            Execute high-fidelity predictive modeling. Track syndicate line movements. Exploit EV+ inefficiencies.
          </p>
          <button 
            onClick={onLaunch}
            className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-black uppercase tracking-[0.2em] text-sm hover:from-purple-500 hover:to-blue-400 transition-all rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-1"
          >
            <Activity size={20} />
            INITIATE ENGINE
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Multi-Color Glass Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          
          <div className="glass-panel p-8 rounded-3xl hover:glow-cyan transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-white">IN-PLAY ADVISOR</h3>
            <p className="text-zinc-400 font-mono text-xs leading-loose">
              Track micro-momentum shifts. Compute live xG advantage before bookmaker algorithms adjust spreads.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:glow-emerald transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 text-emerald-400 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-white">EV+ SCANNER</h3>
            <p className="text-zinc-400 font-mono text-xs leading-loose">
              Isolate mathematical value. Extract true probabilities. Exploit mispriced odds in real-time.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:glow-amber transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 text-amber-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-white">SHARP MONEY</h3>
            <p className="text-zinc-400 font-mono text-xs leading-loose">
              Monitor global betting volume. Detect sudden line crashes. Follow the syndicate capital.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl hover:glow-rose transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-8 text-rose-400 group-hover:scale-110 transition-transform">
              <ShieldAlert size={32} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-white">ABSENCE IMPACT</h3>
            <p className="text-zinc-400 font-mono text-xs leading-loose">
              Quantify injury severity. Calculate precise xG differentials. Target vulnerable defensive lines.
            </p>
          </div>

        </div>

        {/* Action Cards: Dashboard & Arbitrage */}
        {/* Action Cards: Dashboard & Arbitrage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <button
            onClick={onDashboard}
            className="glass-panel p-8 rounded-3xl hover:glow-blue hover:-translate-y-2 transition-all duration-300 text-left group flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <BarChart2 size={32} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-black uppercase tracking-widest mb-3 text-white">ROI DASHBOARD</h3>
              <p className="text-zinc-400 font-mono text-xs leading-loose">
                Track your strike rate, ROI, profit/loss, and betting performance in real-time. Full analytics without API costs.
              </p>
            </div>
          </button>

          <button
            onClick={onArbitrage}
            className="glass-panel p-8 rounded-3xl hover:glow-purple hover:-translate-y-2 transition-all duration-300 text-left group flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-black uppercase tracking-widest mb-3 text-white">ARBITRAGE SCANNER</h3>
              <p className="text-zinc-400 font-mono text-xs leading-loose">
                Scan Bet9ja, SportyBet, 1xBet & more for guaranteed-profit opportunities. AI-powered cross-bookmaker analysis.
              </p>
            </div>
          </button>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black py-8 text-center text-zinc-600 text-xs font-mono uppercase tracking-widest">
        &copy; {new Date().getFullYear()} BETMASTER PRO // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

export default HomePage;
