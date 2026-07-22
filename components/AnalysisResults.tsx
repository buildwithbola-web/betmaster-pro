import React from 'react';
import { ChevronRight, Target, ShieldCheck, Activity, Gem, Trophy, Star } from 'lucide-react';

interface AnalysisResultsProps {
  data: any;
  onAddBet: (bet: any) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onAddBet }) => {
  if (!data) return null;
  const matchName = data.gamePredictions?.gameName || "LIVE MATCH";

  const renderSectionHeader = (number: string, title: string) => (
    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
      <span className="text-xl md:text-2xl font-black text-purple-400">{number}.</span>
      <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">{title}</h2>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* 01. MATCH WINNER & MARKETS */}
      <section className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        {renderSectionHeader("01", matchName)}
        
        {data.gamePredictions?.mainMarkets ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Split markets into two columns */}
            {data.gamePredictions.mainMarkets.slice(0, Math.ceil(data.gamePredictions.mainMarkets.length / 2)).map((market: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between text-xs text-zinc-400 uppercase font-semibold">
                  <span>{market.market}</span>
                  <span className="text-emerald-400">{market.confidence}% <ChevronRight size={14} className="inline"/></span>
                </div>
                <div className="text-sm font-bold text-white mb-2">{market.selection}</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${market.confidence}%` }}></div>
                </div>
              </div>
            ))}
            {data.gamePredictions.mainMarkets.slice(Math.ceil(data.gamePredictions.mainMarkets.length / 2)).map((market: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between text-xs text-zinc-400 uppercase font-semibold">
                  <span>{market.market}</span>
                  <span className="text-emerald-400">{market.confidence}% <ChevronRight size={14} className="inline"/></span>
                </div>
                <div className="text-sm font-bold text-white mb-2">{market.selection}</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${market.confidence}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">Main market data not available for this analysis.</p>
        )}
        <div className="mt-8 text-center">
          <button className="text-xs text-zinc-400 hover:text-white border border-white/10 rounded-full px-4 py-2 transition-colors">
            View Full Match Analysis <ChevronRight size={12} className="inline"/>
          </button>
        </div>
      </section>

      {/* 02. MICRO-MARKETS */}
      {data.microMarkets && data.microMarkets.length > 0 && (
        <section>
          {renderSectionHeader("02", "Micro-Markets & Player Props")}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.microMarkets.map((market: any, idx: number) => (
              <div key={idx} onClick={() => onAddBet({ ...market, id: `micro-${idx}` })} className="bg-[#0a0a0a] border border-white/5 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                    <Activity size={16}/>
                  </div>
                  <div className="text-xl font-black text-white">{market.confidence}%</div>
                </div>
                <div className="text-xs font-bold text-white mb-1 line-clamp-1">{market.selection}</div>
                <div className="text-[10px] text-zinc-500 uppercase">{market.market}</div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold">
                  <span className={market.confidence > 75 ? 'text-emerald-400' : 'text-amber-400'}>
                    {market.confidence > 75 ? 'High Confidence' : 'Medium Confidence'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 03. TEAM COMPARISON */}
      {data.teamComparison && (
        <section>
          {renderSectionHeader("03", "Team Comparison")}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Trophy size={18} className="text-emerald-500"/>
                </div>
                <span className="font-bold text-white uppercase text-sm md:text-base">{data.teamComparison.homeTeam?.name || 'Home'}</span>
              </div>
              <span className="text-xs font-black text-zinc-600">VS</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-white uppercase text-sm md:text-base">{data.teamComparison.awayTeam?.name || 'Away'}</span>
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Trophy size={18} className="text-purple-500"/>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Goals Scored (Avg)", home: data.teamComparison.homeTeam?.stats?.goalsScored, away: data.teamComparison.awayTeam?.stats?.goalsScored },
                { label: "Goals Conceded (Avg)", home: data.teamComparison.homeTeam?.stats?.goalsConceded, away: data.teamComparison.awayTeam?.stats?.goalsConceded },
                { label: "Possession (Avg)", home: data.teamComparison.homeTeam?.stats?.possession?.replace('%',''), away: data.teamComparison.awayTeam?.stats?.possession?.replace('%','') }
              ].map((stat, idx) => (
                stat.home && stat.away && (
                  <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                    <span className="w-12 text-emerald-400 font-mono text-right">{stat.home}</span>
                    <div className="flex-1 flex gap-1 items-center justify-center relative">
                      <span className="absolute -top-4 text-[10px] text-zinc-500 uppercase">{stat.label}</span>
                      <div className="h-1 flex-1 bg-emerald-500/20 rounded-l-full overflow-hidden flex justify-end">
                        <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: `${Math.min(100, (Number(stat.home) / (Number(stat.home) + Number(stat.away))) * 100)}%` }}></div>
                      </div>
                      <div className="h-1 flex-1 bg-purple-500/20 rounded-r-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-r-full" style={{ width: `${Math.min(100, (Number(stat.away) / (Number(stat.home) + Number(stat.away))) * 100)}%` }}></div>
                      </div>
                    </div>
                    <span className="w-12 text-purple-400 font-mono">{stat.away}</span>
                  </div>
                )
              ))}
            </div>

            {data.gamePredictions?.narrative && (
              <div className="mt-8 bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex gap-4 items-start">
                <Star size={20} className="text-purple-400 shrink-0 mt-1"/>
                <div>
                  <h4 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">AI Match Insight</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{data.gamePredictions.narrative}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 04 & 05. SETS & SCORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.firstSetWinners && data.firstSetWinners.length > 0 && (
          <section>
            {renderSectionHeader("04", "1st Set & Half Analysis")}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
               {data.firstSetWinners.slice(0, 2).map((item: any, idx: number) => (
                 <div key={idx} className="mb-6 last:mb-0">
                   <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold mb-2">
                     <span>{item.market || '1st Half'}</span>
                     <span className="text-emerald-400">{item.confidence}% Confidence</span>
                   </div>
                   <div className="text-xl font-bold text-white mb-2">{item.selection || item.winner}</div>
                   <p className="text-xs text-zinc-400">{item.reasoning}</p>
                 </div>
               ))}
            </div>
          </section>
        )}
        
        {data.scorePredictions && data.scorePredictions.length > 0 && (
          <section>
            {renderSectionHeader("05", "Score & Goal Analysis")}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
              {data.scorePredictions.slice(0, 3).map((item: any, idx: number) => (
                 <div key={idx} className="flex items-center justify-between border-b border-white/5 last:border-0 py-4 first:pt-0 last:pb-0">
                   <div>
                     <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{item.market || 'Correct Score'}</div>
                     <div className="text-lg font-bold text-white">{item.prediction || item.selection}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-lg font-black text-emerald-400">{item.confidence}%</div>
                   </div>
                 </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 06. BANKER BETS */}
      {data.bankerBets && data.bankerBets.length > 0 && (
        <section>
          {renderSectionHeader("06", "Surefire Banker Bets")}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.bankerBets.map((bet: any, idx: number) => (
              <div key={idx} onClick={() => onAddBet({ ...bet, id: `banker-${idx}` })} className={`bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 cursor-pointer relative overflow-hidden group ${idx === 0 ? 'border-purple-500/30' : ''}`}>
                {idx === 0 && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-emerald-500"></div>}
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-4 text-center">Banker</div>
                <div className="text-sm font-bold text-white text-center mb-1 leading-snug">{bet.selection || bet.bet}</div>
                <div className="text-[10px] text-zinc-500 text-center mb-6">{bet.market}</div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <div>
                    <div className="text-xl font-black text-emerald-400">{bet.confidence}%</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Confidence</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{bet.odds || '1.X'}</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Odds</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07 & 08. HIDDEN GEMS & VERDICT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          {renderSectionHeader("07", "Hidden Gems & Value Bets")}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-full">
            {data.evScanner ? data.evScanner.slice(0, 4).map((bet: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <span className="text-sm font-medium text-white">{bet.selection}</span>
                <div className="flex gap-4 items-center">
                  <span className="text-sm font-bold text-white">{bet.odds}</span>
                  <span className="text-xs font-bold text-emerald-400 w-16 text-right">Value</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-zinc-500">No high-EV hidden gems identified.</p>
            )}
          </div>
        </section>

        <section>
          {renderSectionHeader("08", "AI Final Verdict")}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f1714] border border-emerald-500/20 rounded-2xl p-6 h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]"></div>
             <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
               <ShieldCheck size={14}/> Final Verdict
             </div>
             
             {data.gamePredictions?.mainMarkets?.[0] ? (
               <>
                 <div className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                   {data.gamePredictions.mainMarkets[0].selection}
                 </div>
                 {data.scorePredictions?.[0] && (
                   <div className="text-lg font-bold text-emerald-400">
                     Score Prediction: {data.scorePredictions[0].prediction || data.scorePredictions[0].selection}
                   </div>
                 )}
                 <div className="mt-8 flex gap-2 flex-wrap">
                   <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded font-bold uppercase">High Confidence</span>
                   <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold uppercase">Good Form</span>
                 </div>
               </>
             ) : (
               <p className="text-sm text-zinc-400">Verdict generating...</p>
             )}
          </div>
        </section>
      </div>

    </div>
  );
};

export default AnalysisResults;
