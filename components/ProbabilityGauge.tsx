import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProbabilityGaugeProps {
  value: number;
}

const ProbabilityGauge: React.FC<ProbabilityGaugeProps> = ({ value }) => {
  const isHighConfidence = value >= 95;
  
  const chartData = [
    { name: 'Confidence', value: value },
    { name: 'Risk', value: Math.max(0, 100 - value) }
  ];

  const COLORS = [
    isHighConfidence ? '#10b981' : '#ffffff',
    '#27272a'
  ];

  return (
    <div className="group relative h-16 w-16 flex items-center justify-center cursor-help">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={18}
            outerRadius={25}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className={`absolute text-[10px] font-bold font-mono ${isHighConfidence ? 'text-emerald-500' : 'text-white'}`}>
        {value}%
      </div>

      {/* Algorithm Logic Tooltip */}
      <div className="absolute bottom-full mb-3 right-0 w-56 p-3 bg-black border border-white/10 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
         <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-white/10">
            <div className={`h-2 w-2 rounded-none ${isHighConfidence ? 'bg-emerald-500' : 'bg-white'}`}></div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Algorithm Insight</span>
         </div>
         <p className="text-[10px] text-zinc-400 font-mono tracking-widest leading-relaxed uppercase">
           Based on historical data and current market trends, this selection has a <span className={`font-bold ${isHighConfidence ? 'text-emerald-500' : 'text-white'}`}>{value}%</span> probability of success.
         </p>
         
         {/* Decorative Arrow */}
         <div className="absolute top-full right-6 -mt-px border-8 border-transparent border-t-zinc-700"></div>
      </div>
    </div>
  );
};

export default ProbabilityGauge;