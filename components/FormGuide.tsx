import React from 'react';
import { FormMatch } from '../types';

interface FormGuideProps {
  history: FormMatch[];
  teamName: string;
  align?: 'left' | 'right';
}

const FormGuide: React.FC<FormGuideProps> = ({ history, teamName, align = 'left' }) => {
  const getResultColor = (result: string) => {
    const r = result.toUpperCase();
    if (r === 'W') return 'bg-emerald-500 text-black border-emerald-500';
    if (r === 'D') return 'bg-white text-black border-white';
    if (r === 'L') return 'bg-zinc-800 text-zinc-500 border-zinc-800';
    return 'bg-black border-white/10 text-zinc-500';
  };

  // Ensure we have 5 items (fill with empty if needed)
  const displayHistory = [...history].slice(0, 5);

  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} space-y-2`}>
      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">{teamName}</span>
      <div className="flex items-center gap-1.5">
        {displayHistory.map((match, idx) => (
          <div key={idx} className="group relative">
            {/* The Box */}
            <div 
              className={`h-5 w-5 flex items-center justify-center text-[10px] font-mono font-bold rounded-none border cursor-help transition-colors hover:bg-white hover:text-black ${getResultColor(match.result)}`}
            >
              {match.result.toUpperCase()}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-32 bg-black border border-white/10 rounded-none p-2 z-20 shadow-xl pointer-events-none">
              <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase text-center">vs {match.opponent}</div>
              <div className="text-sm text-white font-mono font-bold text-center mt-1">{match.score}</div>
              <div className="text-[10px] text-center font-mono tracking-widest mt-1 uppercase">
                 {match.result === 'W' ? <span className="text-emerald-500">WIN</span> : 
                  match.result === 'D' ? <span className="text-white">DRAW</span> : 
                  <span className="text-zinc-500">LOSS</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormGuide;