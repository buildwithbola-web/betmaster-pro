import React from 'react';
import { ChevronRight, Calendar, Trophy, Zap, Clock, ShieldCheck, Activity, Target, Gem, Star, TrendingUp, Info } from 'lucide-react';

interface AnalysisResultsProps {
  data: any;
  onAddBet: (bet: any) => void;
}

const renderSectionHeader = (number: string, title: string, rightContent?: React.ReactNode) => (
  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
    <div className="flex items-center gap-4">
      <span className="text-xl md:text-2xl font-black text-purple-500">{number}.</span>
      <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">{title}</h2>
    </div>
    {rightContent && <div>{rightContent}</div>}
  </div>
);

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onAddBet }) => {
  if (!data) return null;
  const matchName = data.gamePredictions?.gameName || "AC OMONIA NICOSIA VS FC KAIRAT";
  const teamA = data.teamComparison?.teamA || "AC Omonia Nicosia";
  const teamB = data.teamComparison?.teamB || "FC Kairat";

  return (
    <div className="w-full space-y-12">
      {/* 01. MATCH WINNER & MARKETS */}
      <section>
        {renderSectionHeader("01", matchName, (
          <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-bold uppercase">
            <span>UEFA CL - Q1</span>
            <div className="flex items-center gap-1"><Calendar size={12}/> Today, 20:00</div>
          </div>
        ))}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team A Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck size={16} className="text-emerald-500" />
                </div>
                <h3 className="font-bold text-white text-lg">{teamA}</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Match Winner", value: teamA, conf: 78 },
                  { label: "Both Teams to Score", value: "Yes", conf: 64 },
                  { label: "Over / Under 2.5", value: "Over 2.5 Goals", conf: 69 },
                  { label: "Correct Score", value: "2-1", conf: 13 },
                  { label: "Double Chance", value: `${teamA} or Draw`, conf: 86 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <div>
                        <div className="text-zinc-500">{stat.label}</div>
                        <div className="text-zinc-300 font-bold">{stat.value}</div>
                      </div>
                      <div className="text-purple-400 font-bold flex items-center gap-1">{stat.conf}% <ChevronRight size={14}/></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${stat.conf}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team B Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Trophy size={16} className="text-amber-500" />
                </div>
                <h3 className="font-bold text-white text-lg">{teamB}</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Match Winner", value: teamB, conf: 22 },
                  { label: "Both Teams to Score", value: "No", conf: 36 },
                  { label: "Over / Under 2.5", value: "Under 2.5 Goals", conf: 31 },
                  { label: "Correct Score", value: "1-1", conf: 9 },
                  { label: "Double Chance", value: `${teamB} or Draw`, conf: 48 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <div>
                        <div className="text-zinc-500">{stat.label}</div>
                        <div className="text-zinc-300 font-bold">{stat.value}</div>
                      </div>
                      <div className="text-purple-400 font-bold flex items-center gap-1">{stat.conf}% <ChevronRight size={14}/></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${stat.conf}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button className="text-xs text-zinc-400 hover:text-white transition-colors">
              View Full Match Analysis <ChevronRight size={12} className="inline"/>
            </button>
          </div>
        </div>
      </section>

      {/* 02. MICRO-MARKETS */}
      <section>
        {renderSectionHeader("02", "Micro-Markets & Player Props")}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { market: "Over 0.5 Goals", time: "1st Half", conf: 82, level: "High Confidence", color: "text-red-400", bg: "bg-red-400/10" },
            { market: "Over 2.5 Corners", time: "Match", conf: 67, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10" },
            { market: "Over 1.5 Cards", time: "Match", conf: 58, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10" },
            { market: "1st Goal Scorer", time: teamA, conf: 41, level: "Low Confidence", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { market: "Most Shots On Target", time: teamA, conf: 63, level: "Medium Confidence", color: "text-amber-400", bg: "bg-amber-400/10" }
          ].map((item, i) => (
            <div key={i} className="bg-[#050505] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-6 h-6 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                  <Activity size={12}/>
                </div>
                <div className="text-lg font-bold text-white">{item.conf}%</div>
              </div>
              <div className="text-[10px] font-bold text-white mb-0.5">{item.market}</div>
              <div className="text-[9px] text-zinc-500 mb-4">{item.time}</div>
              <div className={`text-[8px] font-bold uppercase flex items-center gap-1 ${item.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
                {item.level}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-[10px] text-zinc-500 hover:text-zinc-300">View All Micro-Markets +</button>
        </div>
      </section>

      {/* 03. TEAM COMPARISON */}
      <section>
        {renderSectionHeader("03", "Team Comparison")}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck size={12} className="text-emerald-500"/>
              </div>
              <span className="font-bold text-white uppercase text-sm">{teamA}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-zinc-500">VS</div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-white uppercase text-sm">{teamB}</span>
              <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Trophy size={12} className="text-amber-500"/>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex gap-2 text-emerald-500"><span>W</span><span>W</span><span>D</span><span>W</span><span className="text-red-500">L</span></div>
              <div className="text-[10px] text-zinc-500 uppercase">Form (Last 5)</div>
              <div className="flex gap-2 text-emerald-500"><span>W</span><span className="text-zinc-500">D</span><span className="text-zinc-500">D</span><span className="text-red-500">L</span><span>W</span></div>
            </div>

            {[
              { label: "Goals Scored (Avg)", home: "1.80", away: "1.20", hColor: "bg-emerald-500", aColor: "bg-purple-600" },
              { label: "Goals Conceded (Avg)", home: "0.80", away: "1.40", hColor: "bg-emerald-500", aColor: "bg-purple-600" },
              { label: "Possession (Avg)", home: "56%", away: "48%", hColor: "bg-emerald-500", aColor: "bg-purple-600" },
              { label: "Shots (Avg)", home: "12.4", away: "9.1", hColor: "bg-emerald-500", aColor: "bg-purple-600" },
              { label: "Pass Accuracy", home: "84%", away: "78%", hColor: "bg-emerald-500", aColor: "bg-purple-600" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-xs relative">
                <span className="w-8 text-emerald-400 font-mono text-left">{stat.home}</span>
                <div className="flex-1 flex gap-2 items-center justify-center">
                  <div className="h-0.5 w-1/3 bg-white/5 relative">
                    <div className={`absolute right-0 top-0 h-full ${stat.hColor}`} style={{ width: `${Math.random()*60+40}%` }}></div>
                  </div>
                  <span className="w-32 text-center text-[10px] text-zinc-500 uppercase">{stat.label}</span>
                  <div className="h-0.5 w-1/3 bg-white/5 relative">
                    <div className={`absolute left-0 top-0 h-full ${stat.aColor}`} style={{ width: `${Math.random()*60+40}%` }}></div>
                  </div>
                </div>
                <span className="w-8 text-amber-400 font-mono text-right">{stat.away}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
              <Zap size={14} className="text-purple-400"/>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-purple-400 uppercase mb-1">AI Match Insight</h4>
              <p className="text-xs text-zinc-300">
                {data.teamComparison?.prediction || `${teamA} have been strong at home with a solid defense and high possession. ${teamB} are dangerous on the counter but struggle against high-pressing teams.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. 1ST SET & HALF */}
      <section>
        {renderSectionHeader("04", "1st Set & Half Critical Analysis")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "1ST HALF DRAW", sub: "Will the 1st half end in a draw?", ans: "No", conf: "70%", text: `${teamA}'s strong home record and early goal tendency suggest a winner in the 1st half.` },
            { label: "1ST HALF OVER 0.5 GOALS", sub: "Over 0.5 goals in 1st half?", ans: "Yes", conf: "81%", text: `Both teams average over 0.5 goals in 1st half in 7/10 recent matches.` }
          ].map((item, i) => (
            <div key={i} className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex gap-6 items-center">
              <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center shrink-0 border border-white/10">
                <Target size={24} className="text-zinc-600"/>
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-purple-400 font-bold uppercase mb-1">{item.label}</div>
                <div className="text-xs text-zinc-500 mb-3">{item.sub}</div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-2xl font-bold text-white">{item.ans}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">{item.conf} Confidence</div>
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight">Reasoning: {item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. SCORE & GOAL ANALYSIS */}
      <section>
        {renderSectionHeader("05", "Score & Goal Analysis")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Correct Score Prediction</div>
              <div className="text-xl font-bold text-white">2 - 1</div>
              <div className="text-[9px] text-zinc-500 mt-1">Most Likely</div>
            </div>
            <div className="text-lg font-bold text-emerald-400">11.2%</div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Score Range</div>
              <div className="text-xl font-bold text-white">2-0 / 2-1 / 3-1</div>
              <div className="text-[9px] text-zinc-500 mt-1">High Probability</div>
            </div>
            <div className="text-lg font-bold text-purple-500">64%</div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Total Goals</div>
              <div className="text-xl font-bold text-white">Over 2.5 Goals</div>
              <div className="text-[9px] text-zinc-500 mt-1">Confidence</div>
            </div>
            <div className="text-lg font-bold text-purple-500">69%</div>
          </div>
        </div>
      </section>

      {/* 06. BANKER BETS */}
      <section>
        {renderSectionHeader("06", "Surefire Banker Bets", <span className="text-[10px] text-pink-500 border border-pink-500/30 bg-pink-500/10 px-2 py-1 rounded-full">4 Today's Best Bankers</span>)}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { tag: "Best Banker", title: "Over 1.5 Goals", sub: "Match", conf: 95, odds: "1.28", glow: true },
            { tag: "Banker", title: `${teamA} or Draw`, sub: "Double Chance", conf: 93, odds: "1.35", glow: false },
            { tag: "Banker", title: "Over 0.5 Goals", sub: "1st Half", conf: 90, odds: "1.22", glow: false },
            { tag: "Banker", title: "Over 3.5 Corners", sub: "Match", conf: 89, odds: "1.30", glow: false }
          ].map((bet, i) => (
            <div key={i} className={`bg-[#050505] rounded-2xl p-5 relative overflow-hidden flex flex-col items-center justify-center text-center ${bet.glow ? 'border border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.15)]' : 'border border-white/5 hover:border-white/20'}`}>
              {bet.glow && <div className="absolute top-0 inset-x-0 h-6 bg-pink-500 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-widest">{bet.tag}</div>}
              {!bet.glow && <div className="text-[9px] text-zinc-500 uppercase font-bold mb-3">{bet.tag}</div>}
              <div className={`font-bold text-white mb-1 ${bet.glow ? 'mt-6 text-lg' : 'text-sm'}`}>{bet.title}</div>
              <div className="text-[10px] text-zinc-500 mb-6">{bet.sub}</div>
              <div className="flex w-full justify-between items-end">
                <div className="text-left">
                  <div className={`font-bold ${bet.glow ? 'text-amber-400 text-xl' : 'text-emerald-400 text-lg'}`}>{bet.conf}%</div>
                  <div className="text-[9px] text-zinc-500">Confidence</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-white ${bet.glow ? 'text-xl' : 'text-lg'}`}>{bet.odds}</div>
                  <div className="text-[9px] text-zinc-500">Odds</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-[10px] text-zinc-500 hover:text-zinc-300">View All Banker Bets ➔</button>
        </div>
      </section>

      {/* 07. HIDDEN GEMS & VALUE BETS */}
      <section>
        {renderSectionHeader("07", "Hidden Gems & Value Bets")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 text-[10px] text-zinc-400 uppercase font-bold">
              <Gem size={14} className="text-zinc-500"/> Hidden Gems
            </div>
            <div className="space-y-4">
              {[
                { title: `${teamA} to Score First`, odds: "2.10", tag: "Good Value", tagColor: "text-emerald-400" },
                { title: "Over 9.5 Corners", odds: "1.95", tag: "Good Value", tagColor: "text-emerald-400" },
                { title: "Exact Score 3-1", odds: "2.80", tag: "High Value", tagColor: "text-emerald-400" }
              ].map((bet, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="text-zinc-300">{bet.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white">{bet.odds} <ChevronRight size={12} className="inline text-red-500"/></span>
                    <span className={`text-[10px] font-bold ${bet.tagColor}`}>{bet.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 text-[10px] text-zinc-400 uppercase font-bold">
              <TrendingUp size={14} className="text-zinc-500"/> Value Bets
            </div>
            <div className="space-y-4">
              {[
                { title: "Over 2.5 Goals", odds: "1.68", tag: "Value", tagColor: "text-emerald-400" },
                { title: "Both Teams to Score - Yes", odds: "1.75", tag: "Value", tagColor: "text-emerald-400" },
                { title: `${teamA} Win & Over 1.5 Goals`, odds: "2.20", tag: "Great Value", tagColor: "text-emerald-400" }
              ].map((bet, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <span className="text-zinc-300">{bet.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white">{bet.odds} <ChevronRight size={12} className="inline text-red-500"/></span>
                    <span className={`text-[10px] font-bold ${bet.tagColor}`}>{bet.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 08. AI MATCH INSIGHT & FINAL VERDICT */}
      <section>
        {renderSectionHeader("08", "AI Match Insight & Final Verdict")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-[10px] text-purple-400 uppercase font-bold">
              <Star size={14} className="text-purple-500"/> AI Match Insight
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {teamA}'s home advantage, attacking form and {teamB}'s defensive weaknesses make the hosts strong favorites. Expect an early goal and control throughout the match.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-1 rounded font-bold uppercase">High Confidence</span>
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] px-2 py-1 rounded font-bold uppercase">Good Form</span>
              <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] px-2 py-1 rounded font-bold uppercase">Home Advantage</span>
            </div>
          </div>
          <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-6 text-[10px] text-emerald-400 uppercase font-bold">
              <Zap size={14} className="text-emerald-500"/> Final Verdict
            </div>
            <div className="flex items-center justify-between z-10 relative">
              <div>
                <h3 className="text-2xl font-black text-emerald-400 uppercase mb-2">{teamA} WIN</h3>
                <div className="text-lg font-bold text-white">2 - 1</div>
              </div>
              <div className="w-20 h-20 rounded-full border-[6px] border-emerald-500/20 flex flex-col items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="34" cy="34" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-emerald-500" strokeDasharray="213" strokeDashoffset="46" />
                </svg>
                <span className="text-xs text-zinc-500 -mb-1">Confidence</span>
                <span className="text-xl font-black text-white">78%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. HEAD TO HEAD */}
      <section>
        {renderSectionHeader("09", "Head to Head (Last 5 Matches)")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center text-xs text-emerald-400 font-bold mb-4 border-b border-white/5 pb-2">
              <span>{teamA} Wins</span>
              <span>2</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamB}</span><span className="text-white font-bold">2-1</span><span>2022</span></div>
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamB}</span><span className="text-white font-bold">1-0</span><span>2019</span></div>
            </div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center text-xs text-zinc-400 font-bold mb-4 border-b border-white/5 pb-2">
              <span>Draws</span>
              <span>2</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamB}</span><span className="text-white font-bold">1-1</span><span>2021</span></div>
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamB}</span><span className="text-white font-bold">0-0</span><span>2018</span></div>
            </div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center text-xs text-amber-400 font-bold mb-4 border-b border-white/5 pb-2">
              <span>{teamB} Wins</span>
              <span>1</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamA}</span><span className="text-white font-bold">0-1</span><span>2022</span></div>
              <div className="flex justify-between text-zinc-400"><span className="truncate w-32">vs {teamA}</span><span className="text-white font-bold">3-0</span><span>2017</span></div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-center pb-8 pt-4">
        <p className="text-[10px] text-zinc-600">Data is AI-generated & for informational purposes only. Bet responsibly.</p>
      </div>
    </div>
  );
};

export default AnalysisResults;
