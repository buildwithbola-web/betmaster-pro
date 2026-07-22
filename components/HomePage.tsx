import React from 'react';
import Logo from './Logo';
import { ChevronRight, Target, ShieldCheck, Activity, Gem, Receipt, Trophy, Shield, Users, CheckCircle, BrainCircuit, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onLaunch: () => void;
  onDashboard: () => void;
  onArbitrage: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLaunch, onDashboard, onArbitrage }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      
      {/* 1. TOP NAV */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
            BetMaster
            <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold border border-purple-500/20">Pro</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={onLaunch} className="text-emerald-400 relative">Home<div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-400"></div></button>
          <button onClick={onLaunch} className="text-zinc-400 hover:text-white transition-colors">Predictions</button>
          <button onClick={onLaunch} className="text-zinc-400 hover:text-white transition-colors">1st Set & Half</button>
          <button onClick={onLaunch} className="text-zinc-400 hover:text-white transition-colors">Banker Bets</button>
          <button onClick={onLaunch} className="text-zinc-400 hover:text-white transition-colors">Micro-Markets</button>
          <button onClick={onLaunch} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">More <ChevronRight size={14} className="rotate-90"/></button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onLaunch} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Login</button>
          <button onClick={onLaunch} className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Sign Up
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Background Gradients & Placeholders for Assets */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] bg-purple-600/15 rounded-full blur-[100px]"></div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
            <BrainCircuit size={14} /> AI-Powered. Data-Driven. Bet Smarter.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Smarter Predictions.<br/>
            Bigger <span className="text-purple-500">Wins.</span>
          </h1>
          
          <p className="text-lg text-zinc-400 mb-8 max-w-md leading-relaxed">
            AI-driven insights, real-time data and expert analysis to give you the edge in football, basketball & tennis.
          </p>
          
          <div className="flex items-center gap-6 mb-10">
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-emerald-400 font-bold"><Target size={16}/> 95%+</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">High Confidence Picks</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-purple-400 font-bold"><Users size={16}/> 10K+</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Active Bettors</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-amber-400 font-bold">★ 4.8</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Trusted by Bettors</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={onLaunch} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2">
              Get Started Free <ChevronRight size={18} />
            </button>
            <button onClick={onLaunch} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              Explore Predictions
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500">
            <CheckCircle size={12} className="text-emerald-500"/> No credit card required
          </div>
        </div>

        {/* Visual / Asset Placeholder */}
        <div className="w-full md:w-1/2 mt-16 md:mt-0 relative z-10 flex justify-center items-center">
          <img 
            src="/hero-asset.jpg" 
            alt="BetMaster Pro App" 
            className="w-full max-w-[700px] h-auto object-contain transform scale-110 md:scale-125"
          />
        </div>
      </section>

      {/* 3. SPORTS CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={onLaunch} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-1 flex items-center gap-2">Football</h3>
              <p className="text-xs text-zinc-400 max-w-[150px] mb-4">AI predictions, score forecasts, micro-markets and more.</p>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors"><ChevronRight size={14}/></div>
            </div>
            <div className="w-24 h-24 rounded-full border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden shrink-0">
              <img src="/category-football.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Football" />
            </div>
          </div>
          
          <div onClick={onLaunch} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-amber-500/30 transition-all cursor-pointer">
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-1 flex items-center gap-2">Basketball</h3>
              <p className="text-xs text-zinc-400 max-w-[150px] mb-4">1st half totals, player props, high probability picks.</p>
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors"><ChevronRight size={14}/></div>
            </div>
            <div className="w-24 h-24 rounded-full border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)] overflow-hidden shrink-0">
              <img src="/category-basketball.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Basketball" />
            </div>
          </div>

          <div onClick={onLaunch} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-1 flex items-center gap-2">Tennis</h3>
              <p className="text-xs text-zinc-400 max-w-[150px] mb-4">1st set winners, match predictions and deep analysis.</p>
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors"><ChevronRight size={14}/></div>
            </div>
            <div className="w-24 h-24 rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] overflow-hidden shrink-0">
              <img src="/category-tennis.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Tennis" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. POWERFUL FEATURES */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Powerful Features</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">Everything You Need. All in One Place.</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <BrainCircuit size={32} className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">AI Predictions</h4>
            <p className="text-[10px] text-zinc-400">Real-time AI analysis with live data.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <Target size={32} className="text-purple-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">1st Set & Half</h4>
            <p className="text-[10px] text-zinc-400">Specialized early game analysis.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <ShieldCheck size={32} className="text-amber-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">Banker Bets</h4>
            <p className="text-[10px] text-zinc-400">High probability daily rollover picks.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <Activity size={32} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">Micro-Markets</h4>
            <p className="text-[10px] text-zinc-400">Player props and in-game edges.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-rose-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <Gem size={32} className="text-rose-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">Hidden Gems</h4>
            <p className="text-[10px] text-zinc-400">Uncover hidden value others don't see.</p>
          </div>
          <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform group">
            <Receipt size={32} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform"/>
            <h4 className="font-bold text-sm text-white mb-2">Bet Slip</h4>
            <p className="text-[10px] text-zinc-400">Add picks to your slip and track.</p>
          </div>
        </div>
      </section>

      {/* 5. LIVE TOP PICKS */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            Live Top Picks <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h3>
          <button onClick={onLaunch} className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
            View All Predictions <ChevronRight size={14}/>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {/* Card 1: Tottenham vs MK Dons */}
          <div onClick={onLaunch} className="cursor-pointer min-w-[300px] bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shrink-0 hover:border-emerald-500/30 transition-colors">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-4 font-semibold uppercase">
              <span className="flex items-center gap-1">⚽ Club Friendlies</span>
              <span>17:00</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=TH&background=ffffff&color=000080&rounded=true&bold=true" className="w-full h-full object-contain" alt="Spurs"/></div><span className="text-xs font-bold text-white">Tottenham</span></div>
              <div className="text-[10px] font-bold text-zinc-600">VS</div>
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=MK&background=ffffff&color=ff0000&rounded=true&bold=true" className="w-full h-full object-contain" alt="MK Dons"/></div><span className="text-xs font-bold text-white">MK Dons</span></div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">1X2</div>
                <div className="text-sm font-bold text-white">Tottenham Win</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                <div className="text-xl font-black text-emerald-400">92%</div>
              </div>
            </div>
          </div>

          {/* Card 2: Lynx vs Storm */}
          <div onClick={onLaunch} className="cursor-pointer min-w-[300px] bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shrink-0 hover:border-emerald-500/30 transition-colors">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-4 font-semibold uppercase">
              <span className="flex items-center gap-1">🏀 WNBA</span>
              <span>12:00</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=ML&background=002B5C&color=78BE20&rounded=true&bold=true" className="w-full h-full object-contain" alt="Lynx"/></div><span className="text-xs font-bold text-white">Lynx</span></div>
              <div className="text-[10px] font-bold text-zinc-600">VS</div>
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=SS&background=2C5234&color=FBE122&rounded=true&bold=true" className="w-full h-full object-contain" alt="Storm"/></div><span className="text-xs font-bold text-white">Storm</span></div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Total Points</div>
                <div className="text-sm font-bold text-white">Over 155.5</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                <div className="text-xl font-black text-emerald-400">88%</div>
              </div>
            </div>
          </div>
          
          {/* Card 3: Sun vs Fever */}
          <div onClick={onLaunch} className="cursor-pointer min-w-[300px] bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shrink-0 hover:border-emerald-500/30 transition-colors">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-4 font-semibold uppercase">
              <span className="flex items-center gap-1">🏀 WNBA</span>
              <span>20:00</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=CS&background=FC4C02&color=041E42&rounded=true&bold=true" className="w-full h-full object-contain" alt="Sun"/></div><span className="text-xs font-bold text-white">Sun</span></div>
              <div className="text-[10px] font-bold text-zinc-600">VS</div>
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 flex items-center justify-center p-0.5"><img src="https://ui-avatars.com/api/?name=IF&background=041E42&color=C8102E&rounded=true&bold=true" className="w-full h-full object-contain" alt="Fever"/></div><span className="text-xs font-bold text-white">Fever</span></div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Moneyline</div>
                <div className="text-sm font-bold text-white">Sun Win</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                <div className="text-xl font-black text-emerald-400">90%</div>
              </div>
            </div>
          </div>

          {/* Card 4: Hüsler vs Fonseca */}
          <div onClick={onLaunch} className="cursor-pointer min-w-[300px] bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shrink-0 hover:border-emerald-500/30 transition-colors">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-4 font-semibold uppercase">
              <span className="flex items-center gap-1">🎾 ATP Zug Challenger</span>
              <span>14:30</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 overflow-hidden"><img src="https://ui-avatars.com/api/?name=MH&background=10B981&color=fff&rounded=true&bold=true" className="w-full h-full object-cover" alt="Hüsler"/></div><span className="text-xs font-bold text-white">M. Hüsler</span></div>
              <div className="text-[10px] font-bold text-zinc-600">VS</div>
              <div className="text-center"><div className="w-10 h-10 rounded-full bg-white/5 mx-auto mb-2 overflow-hidden"><img src="https://ui-avatars.com/api/?name=JF&background=3B82F6&color=fff&rounded=true&bold=true" className="w-full h-full object-cover" alt="Fonseca"/></div><span className="text-xs font-bold text-white">J. Fonseca</span></div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">1st Set Winner</div>
                <div className="text-sm font-bold text-white">Fonseca</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                <div className="text-xl font-black text-emerald-400">85%</div>
              </div>
            </div>
          </div>
          </div>
      </section>

      {/* 6. STATS ROW */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 divide-x divide-white/5">
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">72.6%</div>
              <div className="text-[10px] text-zinc-400">Prediction Accuracy</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">+18.4%</div>
              <div className="text-[10px] text-zinc-400">ROI (Return on Investment)</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">12.8K+</div>
              <div className="text-[10px] text-zinc-400">Active Users</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Shield size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">100%</div>
              <div className="text-[10px] text-zinc-400">Secure & Reliable</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER & FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-[#0a0a0a] to-[#12121a] border border-white/5 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center gap-6 relative z-10 mb-8 md:mb-0">
            <div className="w-24 h-24 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden shrink-0">
              <img src="/trophy-neon.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Trophy" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Ready to Start Winning?</h2>
              <p className="text-zinc-400 text-sm">Join thousands of smart bettors making better decisions every day.</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 relative z-10 w-full md:w-auto">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs text-zinc-300"><CheckCircle size={14} className="text-emerald-500"/> AI-Powered Predictions</div>
              <div className="flex items-center gap-2 text-xs text-zinc-300"><CheckCircle size={14} className="text-emerald-500"/> Daily Banker & 2-Odds</div>
              <div className="flex items-center gap-2 text-xs text-zinc-300"><CheckCircle size={14} className="text-emerald-500"/> Real-Time Match Insights</div>
            </div>
            <button onClick={onLaunch} className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] mt-2">
              Create Free Account <ChevronRight size={16} className="inline ml-1"/>
            </button>
            <span className="text-[10px] text-zinc-500">✓ No credit card required</span>
          </div>
        </div>

        {/* Global Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size={24} />
              <span className="font-bold text-lg text-white">BetMaster <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded uppercase">Pro</span></span>
            </div>
            <p className="text-xs text-zinc-500 mb-6">AI-powered predictions for smarter bettors.</p>
            <div className="flex gap-4 text-zinc-400">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white cursor-pointer transition-colors">𝕏</div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white cursor-pointer transition-colors">I</div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white cursor-pointer transition-colors">Y</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-zinc-500 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Predictions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">1st Set & Half</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Banker Bets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Micro-Markets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Score Predictions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-zinc-500 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Affiliates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-xs text-zinc-500 mb-4">Get the best predictions and updates delivered to your inbox.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-[#0a0a0a] border border-white/10 text-white text-xs px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-purple-500/50" />
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-r-lg transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-600">
          <p>© 2026 BetMaster Pro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>18+</span>
            <span>Play Responsibly</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
