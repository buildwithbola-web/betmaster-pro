import React from 'react';
import { UserMinus, AlertCircle, ShieldAlert } from 'lucide-react';
import { AbsenceImpact } from '../types';

interface AbsenceImpactSectionProps {
  impacts: AbsenceImpact[];
}

const AbsenceImpactSection: React.FC<AbsenceImpactSectionProps> = ({ impacts }) => {
  if (!impacts || impacts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <UserMinus className="text-red-500" size={24} />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Absence <span className="text-red-500">& Injury Impact</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impacts.map((impact, idx) => (
          <div key={idx} className={`bg-black border rounded-none p-5 ${impact.severity === 'CRITICAL' ? 'border-red-500' : impact.severity === 'MODERATE' ? 'border-amber-500' : 'border-white/10'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-none ${impact.severity === 'CRITICAL' ? 'bg-red-500 text-black' : impact.severity === 'MODERATE' ? 'bg-amber-500 text-black' : 'bg-white/10 text-zinc-400'}`}>
                  {impact.severity === 'CRITICAL' ? <ShieldAlert size={20} /> : <AlertCircle size={20} />}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">{impact.missingPlayer}</h3>
                  <span className="text-[10px] uppercase font-mono text-zinc-500">{impact.team}</span>
                </div>
              </div>
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-none border ${impact.severity === 'CRITICAL' ? 'bg-red-500 border-red-500 text-black' : impact.severity === 'MODERATE' ? 'bg-amber-500 border-amber-500 text-black' : 'bg-black border-white/10 text-zinc-500'}`}>
                {impact.severity}
              </span>
            </div>
            
            <div className="bg-black rounded-none p-3 mb-3 border border-white/10">
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Impact Metric</div>
              <div className="text-sm font-bold text-red-400 font-mono">{impact.impactMetric}</div>
            </div>

            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 leading-relaxed border-t border-white/10 pt-3 mt-3">
              <span className="font-bold text-white">Betting Angle:</span> {impact.bettingAngle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbsenceImpactSection;
