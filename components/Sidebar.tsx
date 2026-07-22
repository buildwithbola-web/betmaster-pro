import React from 'react';
import Logo from './Logo';
import { Home, BrainCircuit, Activity, Target, ShieldCheck, TrendingUp, Gem, Receipt, LineChart, History, Search, Bell, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'ai-predictions', icon: BrainCircuit, label: 'AI Predictions' },
    { id: '1st-set-half', icon: Activity, label: '1st Set & Half', badge: 'NEW' },
    { id: '2-odds', icon: TrendingUp, label: '2-Odds 🔥' },
    { id: 'banker-bets', icon: ShieldCheck, label: 'Banker Bets' },
    { id: 'micro-markets', icon: Target, label: 'Micro-Markets', badge: 'NEW' },
    { id: 'score-predictions', icon: Target, label: 'Score Predictions' },
    { id: 'hidden-gems', icon: Gem, label: 'Hidden Gems' },
  ];

  const personalItems = [
    { id: 'bet-slip', icon: Receipt, label: 'Bet Slip', count: 3 },
    { id: 'my-bets', icon: LineChart, label: 'My Bets' },
    { id: 'history', icon: History, label: 'History' },
  ];

  const bottomItems = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'notifications', icon: Bell, label: 'Notifications', count: 2 },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-white/5 h-screen flex flex-col hidden md:flex shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
            BetMaster
            <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold border border-purple-500/20">Pro</span>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={currentView === item.id ? 'text-purple-400' : 'text-zinc-500'} />
                {item.label}
              </div>
              {item.badge && (
                <span className="text-[9px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="my-6 border-t border-white/5"></div>
        
        <div className="space-y-1">
          {personalItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={currentView === item.id ? 'text-emerald-400' : 'text-zinc-500'} />
                {item.label}
              </div>
              {item.count && (
                <span className="bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="my-6 border-t border-white/5"></div>
        
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={currentView === item.id ? 'text-white' : 'text-zinc-500'} />
                {item.label}
              </div>
              {item.count && (
                <span className="bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Premium Upgrade Card */}
        <div className="mt-8 bg-gradient-to-br from-zinc-900 to-black border border-purple-500/20 p-4 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
            Unlock Premium <span className="text-amber-400">👑</span>
          </h4>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Get access to exclusive picks, hidden gems and advanced stats.
          </p>
          <button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-black font-bold text-xs py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Upgrade Now
          </button>
        </div>

        {/* Your Stats (Static) */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold uppercase tracking-wider px-1 mb-3">
            <span>Your Stats</span>
            <span className="text-[10px]">Last 30 Days</span>
          </div>
          <div className="space-y-2 px-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Win Rate</span>
              <span className="text-emerald-400 font-bold">68%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">ROI</span>
              <span className="text-emerald-400 font-bold">+24.7%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Tips</span>
              <span className="text-white font-medium">142</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Avg. Odds</span>
              <span className="text-amber-400 font-medium">1.82</span>
            </div>
          </div>
          {/* Mock Graph */}
          <div className="h-12 mt-4 flex items-end justify-between px-1 gap-1">
            <div className="w-full bg-purple-500/20 h-3 rounded-t-sm"></div>
            <div className="w-full bg-purple-500/30 h-5 rounded-t-sm"></div>
            <div className="w-full bg-purple-500/40 h-4 rounded-t-sm"></div>
            <div className="w-full bg-emerald-500/50 h-8 rounded-t-sm"></div>
            <div className="w-full bg-emerald-500/70 h-6 rounded-t-sm"></div>
            <div className="w-full bg-emerald-500/90 h-10 rounded-t-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
