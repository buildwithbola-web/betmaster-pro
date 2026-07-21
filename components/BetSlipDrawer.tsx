import React, { useState, useRef } from 'react';
import { X, Receipt, TrendingUp, History, CheckCircle2 } from 'lucide-react';
import { BetSlipItem, BetHistoryItem } from '../types';
import confetti from 'canvas-confetti';

interface BetSlipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bets: BetSlipItem[];
  history?: BetHistoryItem[];
  onRemoveBet: (id: string) => void;
  onClear: () => void;
  onPlaceBet?: (stakeAmount: number) => void;
  onViewHistory?: () => void;
}

const BetSlipDrawer: React.FC<BetSlipDrawerProps> = ({ isOpen, onClose, bets, history = [], onRemoveBet, onClear, onPlaceBet, onViewHistory }) => {
  const [stake, setStake] = useState<string>('1000');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalOdds = bets.reduce((acc, bet) => {
    const val = parseFloat(bet.odds);
    return acc * (isNaN(val) ? 1 : val);
  }, 1);

  const potentialReturns = totalOdds * (parseFloat(stake) || 0);

  const handlePlaceBet = () => {
    if (onPlaceBet) {
      onPlaceBet(parseFloat(stake) || 0);
    }
    
    // Trigger confetti from the bottom of the drawer
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true
      });
      
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 1 },
        colors: ['#10b981', '#34d399', '#059669', '#ffffff'] // emerald theme
      });
    }

    // After bet is placed, close drawer and optionally navigate to history
    setTimeout(() => {
      onClose();
      if (onViewHistory) onViewHistory();
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-50"
        />

        <div className="p-4 border-b border-white/10 bg-black flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="text-emerald-500" size={20} />
              <h2 className="text-lg font-black uppercase tracking-[0.2em] text-white">BET SLIP</h2>
              {bets.length > 0 && (
                <span className="bg-emerald-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-none">
                  {bets.length}
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 rounded-none transition-colors relative z-50">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-none border border-white/10 transition-colors flex items-center justify-center gap-2 relative z-50 bg-white/5 text-white`}
            >
              <Receipt size={14} /> Current Slip
            </button>
            <button 
              onClick={() => {
                onClose();
                if (onViewHistory) onViewHistory();
              }}
              className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-none border border-transparent hover:border-white/10 transition-colors flex items-center justify-center gap-2 relative z-50 text-zinc-500 hover:text-white hover:bg-white/5`}
            >
              <History size={14} /> History
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative z-10">
          {bets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <Receipt size={48} className="opacity-20" />
              <p className="text-sm font-mono">Your bet slip is empty</p>
            </div>
          ) : (
            bets.map((bet) => (
              <div key={bet.id} className="bg-black border border-white/10 rounded-none p-3 relative group hover:border-white/30 transition-colors">
                <button 
                  onClick={() => onRemoveBet(bet.id)}
                  className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1 flex gap-2 pr-6 tracking-widest">
                  <span className="text-emerald-500">{bet.market}</span>
                </div>
                <div className="text-sm font-bold text-white leading-tight pr-6 uppercase tracking-wider">{bet.game}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-zinc-400 font-mono uppercase tracking-widest">{bet.selection}</div>
                  <div className="text-sm font-mono font-bold text-emerald-500">{bet.odds}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {bets.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-black space-y-4 relative z-50">
            <div className="flex justify-between items-center bg-black p-3 rounded-none border border-white/10 focus-within:border-emerald-500 transition-colors">
              <span className="text-sm text-zinc-400 uppercase font-mono tracking-widest">Stake (₦)</span>
              <input 
                type="number" 
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="bg-transparent text-right text-lg font-mono font-bold text-white outline-none w-24 placeholder-zinc-700"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400 uppercase font-mono tracking-widest">Total Odds</span>
              <span className="text-lg font-bold text-emerald-500 font-mono flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500/50" />
                {totalOdds.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <span className="text-xs text-zinc-400 uppercase font-mono tracking-widest">Pot. Returns</span>
              <span className="text-xl font-black text-white font-mono flex items-center gap-2">
                ₦{potentialReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={onClear}
                className="py-3 rounded-none border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-mono font-bold uppercase tracking-widest"
              >
                Clear All
              </button>
              <button 
                onClick={handlePlaceBet}
                className="py-3 rounded-none bg-emerald-500 hover:bg-white text-black transition-colors text-xs font-mono font-bold uppercase tracking-widest border border-emerald-500 hover:border-white"
              >
                Place Bet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BetSlipDrawer;
