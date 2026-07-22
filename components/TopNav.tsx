import React from 'react';
import Logo from './Logo';
import { Search, Bell, Settings } from 'lucide-react';

interface TopNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ currentView, setCurrentView }) => {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Predictions' },
    { id: '1st-half', label: '1st Set & Half' },
    { id: 'bankers', label: 'Banker Bets' },
    { id: 'micro', label: 'Micro-Markets' },
    { id: 'more', label: 'More', isDropdown: true },
  ];

  return (
    <nav className="w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-12">
        <button onClick={() => setCurrentView('home')} className="hover:opacity-80 transition-opacity">
          <Logo size={24} className="text-white" />
        </button>
        
        {/* Center: Links (Hidden on small screens) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.id === 'search' || link.id === 'home') {
                  setCurrentView(link.id);
                } else {
                  setCurrentView('analysis');
                  setTimeout(() => {
                    if (link.id === '1st-half') document.getElementById('section-first-half')?.scrollIntoView({ behavior: 'smooth' });
                    if (link.id === 'bankers') document.getElementById('section-bankers')?.scrollIntoView({ behavior: 'smooth' });
                    if (link.id === 'micro') document.getElementById('section-micro')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
              className={`text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-1
                ${currentView === link.id || (currentView === 'analysis' && ['1st-half', 'bankers', 'micro'].includes(link.id)) ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              {link.label}
              {link.isDropdown && <span className="ml-1 text-[8px] opacity-50">▼</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <Search size={18} />
        </button>
        <button className="text-zinc-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 p-[2px] ml-2">
          <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
