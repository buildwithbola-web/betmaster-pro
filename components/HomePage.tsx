import React, { useEffect, useState } from 'react';
import { BrainCircuit, ChevronRight, Zap, Target, TrendingUp, Activity, ShieldAlert, Sparkles, BarChart2, Shield, Globe, Clock } from 'lucide-react';

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
      {/* Dynamic Background Orbs (Colorful & Alive but strictly on black BG) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/30 rounded-full blur-[120px] animate-orb"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-emerald-600/20 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[25vw] h-[25vw] bg-blue-600/20 rounded-full blur-[80px] animate-orb" style={{ animationDelay: '-10s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-white/10 bg-black/50 backdrop-blur-md gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BrainCircuit className="text-white relative z-10" size={28} />
            <div className="absolute inset-0 bg-purple-500 blur-md opacity-50"></div>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-[0.2em] uppercase">
            BETMASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PRO</span>
          </span>
        </div>
        <button 
          onClick={onLaunch}
          className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
        >
          <Zap size={14} className="text-yellow-400" />
          [ ENTER TERMINAL ]
        </button>
      </nav>

      {/* Live Signals Ticker */}
      <div className="relative z-40 bg-zinc-950/80 backdrop-blur-sm border-b border-white/10 py-2.5 overflow-hidden flex">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-black px-4 sm:px-6 py-2.5 flex items-center font-black uppercase text-[10px] sm:text-xs tracking-widest border-r border-black relative z-10 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <Activity size={14} className="mr-2 animate-pulse" /> LIVE FEED
        </div>
        <div className="flex whitespace-nowrap items-center" style={{ transform: `translateX(-${tickerOffset}px)` }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="mx-6 sm:mx-10 text-[10px] sm:text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24 pb-20 sm:pb-32">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-32 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-8 sm:mb-12 shadow-xl">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-zinc-300">SYSTEM VERSION:</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">DEEPSEEK V3</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8 uppercase text-white relative">
            UNFAIR <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-400 via-zinc-600 to-zinc-800">ADVANTAGE</span>
            
            {/* Floating Elements for "Alive" feel */}
            <div className="absolute top-0 left-[-5%] md:left-[-10%] opacity-50 md:opacity-100 animate-float hidden sm:block">
              <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 border-emerald-500/30 bg-black/60">
                <TrendingUp size={20} className="text-emerald-400" />
                <div className="text-left">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">ROI Tracker</div>
                  <div className="text-sm font-bold text-emerald-400">+24.5%</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 right-[-5%] md:right-[-10%] opacity-50 md:opacity-100 animate-float hidden sm:block" style={{ animationDelay: '-3s' }}>
              <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 border-purple-500/30 bg-black/60">
                <Target size={20} className="text-purple-400" />
                <div className="text-left">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">EV+ Edge</div>
                  <div className="text-sm font-bold text-purple-400">Found 12 Bets</div>
                </div>
              </div>
            </div>
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-400 mb-10 sm:mb-12 max-w-2xl mx-auto font-mono uppercase leading-relaxed px-2">
            Execute high-fidelity predictive modeling. Track syndicate line movements. Exploit EV+ inefficiencies across global bookmakers.
          </p>
          
          <button 
            onClick={onLaunch}
            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-sm sm:text-base hover:bg-zinc-200 transition-all rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
            <Activity size={20} className="text-purple-600" />
            <span className="relative z-10">INITIATE ENGINE</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid Features Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          
          {/* Feature 1 - Large Span */}
          <div className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-cyan transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest mb-3 text-white">IN-PLAY ADVISOR</h3>
                <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed max-w-md">
                  Track micro-momentum shifts. Compute live xG advantage before bookmaker algorithms adjust spreads. Stay ahead of the oddsmakers.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="md:col-span-1 glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-emerald transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-bl from-zinc-900/80 to-zinc-950/80">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[50px] group-hover:bg-emerald-500/20 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Target size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-3 text-white">EV+ SCANNER</h3>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                Isolate mathematical value. Extract true probabilities and exploit mispriced odds.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-1 glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-amber transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
            <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-colors"></div>
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-3 text-white">SHARP MONEY</h3>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                Monitor global betting volume. Detect sudden line crashes. Follow the syndicate capital.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-rose transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-tl from-zinc-900/80 to-zinc-950/80">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[60px] group-hover:bg-rose-500/20 transition-colors"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between h-full gap-6">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-6 text-rose-400 border border-rose-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest mb-3 text-white">ABSENCE IMPACT</h3>
                <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed max-w-md">
                  Quantify injury severity. Calculate precise xG differentials and target vulnerable defensive lines.
                </p>
              </div>
              <div className="w-full sm:w-auto flex-shrink-0 bg-black/40 border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Impact Alert</span>
                </div>
                <div className="text-sm font-bold text-white uppercase">Key Player OUT</div>
                <div className="text-xs font-mono text-rose-400 mt-1">Defensive Rating -15%</div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Cards: Dashboard & Arbitrage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <button
            onClick={onDashboard}
            className="glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-blue hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative overflow-hidden bg-zinc-900/50"
          >
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BarChart2 size={28} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-2 text-white group-hover:text-blue-300 transition-colors">ROI DASHBOARD</h3>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                Track your strike rate, ROI, profit/loss, and betting performance in real-time. Full analytics without API costs.
              </p>
            </div>
          </button>

          <button
            onClick={onArbitrage}
            className="glass-panel p-6 sm:p-8 rounded-[2rem] hover:glow-purple hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative overflow-hidden bg-zinc-900/50"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Shield size={28} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-2 text-white group-hover:text-purple-300 transition-colors">ARBITRAGE SCANNER</h3>
              <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                Scan multiple sportsbooks for guaranteed-profit opportunities. AI-powered cross-bookmaker analysis.
              </p>
            </div>
          </button>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md py-6 sm:py-8 text-center text-zinc-600 text-[10px] sm:text-xs font-mono uppercase tracking-widest relative z-20">
        &copy; {new Date().getFullYear()} BETMASTER PRO // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

export default HomePage;
