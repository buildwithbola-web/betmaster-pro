import React from 'react';
import { ChevronRight, Calendar, Trophy, Zap, Clock, ShieldCheck, Activity, Target, Gem, Star, TrendingUp, Info, CheckCircle2 } from 'lucide-react';
import TeamComparisonSection from './TeamComparisonSection';
import TeamDuelsSection from './TeamDuelsSection';
import MicroMarketsSection from './MicroMarketsSection';
import FirstSetWinnersSection from './FirstSetWinnersSection';
import ScorePredictionsSection from './ScorePredictionsSection';
import BankerBetsSection from './BankerBetsSection';
import OddsMovementSection from './OddsMovementSection';
import EvScannerSection from './EvScannerSection';

interface AnalysisResultsProps {
  data: any;
  onAddBet: (bet: any) => void;
  setCurrentView?: (view: string) => void;
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

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onAddBet, setCurrentView }) => {
  if (!data) return null;
  const matchName = data.gamePredictions?.gameName || "AC OMONIA NICOSIA VS FC KAIRAT";
  const teamA = data.teamComparison?.teamA || "AC Omonia Nicosia";
  const teamB = data.teamComparison?.teamB || "FC Kairat";

  return (
    <div className="w-full space-y-12">
      {/* 01. DEEP SEARCH INTELLIGENCE */}
      <section id="section-predictions">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Target className="text-indigo-400" size={24} />
            </div>
            <div>
              <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Deep Search Intelligence</div>
              <h2 className="text-2xl md:text-3xl font-black text-white">{matchName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Confidence Score</div>
              <div className="text-emerald-400 font-black text-sm uppercase">Optimized 90%+</div>
            </div>
            <button className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors">
              Verified Markets
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mainstream Likely Wins Column */}
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                <h3 className="font-black text-white uppercase tracking-wider text-sm bg-blue-600/40 px-2 py-0.5">Mainstream Likely Wins</h3>
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Analysis Desk</span>
            </div>
            
            <div className="space-y-6">
              {(!data.gamePredictions?.mainstream || data.gamePredictions.mainstream.length === 0) && (
                <div className="text-zinc-500 text-sm italic">No mainstream predictions available for this match.</div>
              )}
              {(data.gamePredictions?.mainstream?.slice(0, 7) || []).map((item: any, i: number) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-amber-400/20 bg-amber-400/5 px-2 py-1 rounded">
                      {item.market}
                    </span>
                    <span className="font-bold text-emerald-400">{typeof item.odds === 'number' ? item.odds.toFixed(2) : item.odds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span className="font-bold text-white text-lg">{item.selection}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.reasoning}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.confidence}%` }}></div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold">{item.confidence}%</span>
                  </div>
                  {i < 6 && <div className="h-px w-full bg-white/5 mt-6"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* High-Value Niche Column */}
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-400" />
                <h3 className="font-black text-white uppercase tracking-wider text-sm bg-purple-900/40 px-2 py-0.5">High-Value Niche (90%+)</h3>
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Analysis Desk</span>
            </div>

            <div className="space-y-6">
              {(!data.gamePredictions?.niche || data.gamePredictions.niche.length === 0) && (
                <div className="text-zinc-500 text-sm italic">No niche predictions available for this match.</div>
              )}
              {(data.gamePredictions?.niche?.slice(0, 7) || []).map((item: any, i: number) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider border border-indigo-400/20 bg-indigo-400/5 px-2 py-1 rounded">
                      {item.market}
                    </span>
                    <span className="font-bold text-emerald-400">{typeof item.odds === 'number' ? item.odds.toFixed(2) : item.odds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span className="font-bold text-white text-lg">{item.selection}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.reasoning}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.confidence}%` }}></div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold">{item.confidence}%</span>
                  </div>
                  {i < 6 && <div className="h-px w-full bg-white/5 mt-6"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02. MICRO-MARKETS */}
      {data.microMarkets && data.microMarkets.length > 0 && (
        <section id="section-micro">
          <MicroMarketsSection insights={data.microMarkets} onAddBet={onAddBet} onViewAll={() => setCurrentView?.('all-micro')} />
        </section>
      )}

      {/* 03. TEAM COMPARISON */}
      <section id="section-comparison">
        {data.teamComparison ? (
          <>
            {renderSectionHeader("03", "Team Comparison")}
            <TeamComparisonSection comparison={data.teamComparison} />
          </>
        ) : (
          <>
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
          </>
        )}
      </section>

      {/* 04. 1ST SET & HALF */}
      {data.firstSetWinners && data.firstSetWinners.length > 0 && (
        <section id="section-first-half">
          <FirstSetWinnersSection winners={data.firstSetWinners} onGameClick={() => {}} onAddBet={onAddBet} />
        </section>
      )}

      {/* 05. SCORE PREDICTIONS */}
      {data.scorePredictions && data.scorePredictions.length > 0 && (
        <section id="section-scores">
          <ScorePredictionsSection predictions={data.scorePredictions} onAddBet={onAddBet} />
        </section>
      )}

      {/* 06. BANKER BETS */}
      {data.bankerBets && data.bankerBets.length > 0 && (
        <section id="section-bankers">
          <BankerBetsSection bets={data.bankerBets} onGameClick={() => {}} onAddBet={onAddBet} onViewAll={() => setCurrentView?.('all-bankers')} />
        </section>
      )}

      {/* 07. ODDS MOVEMENT */}
      {((data.oddsMovement && data.oddsMovement.length > 0) || (data.evScanner && data.evScanner.length > 0)) && (
        <section id="section-odds" className="space-y-8">
          {data.oddsMovement && data.oddsMovement.length > 0 && <OddsMovementSection movements={data.oddsMovement} onAddBet={onAddBet} />}
          {data.evScanner && data.evScanner.length > 0 && <EvScannerSection bets={data.evScanner} onAddBet={onAddBet} />}
        </section>
      )}

      {/* 08. FINAL VERDICT */}
      {data.teamComparison?.prediction && (
        <section id="section-verdict">
          {renderSectionHeader("08", "AI Match Insight & Final Verdict")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-[10px] text-purple-400 uppercase font-bold">
                <Star size={14} className="text-purple-500"/> AI Match Insight
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {data.teamComparison.prediction}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-1 rounded font-bold uppercase">AI Analyzed</span>
              </div>
            </div>
            {data.scorePredictions && data.scorePredictions.length > 0 && (
              <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-6 text-[10px] text-emerald-400 uppercase font-bold">
                  <Zap size={14} className="text-emerald-500"/> Final Verdict
                </div>
                <div className="flex items-center justify-between z-10 relative">
                  <div>
                    <h3 className="text-2xl font-black text-emerald-400 uppercase mb-2">Most Likely Score</h3>
                    <div className="text-lg font-bold text-white">{data.scorePredictions[0]?.correctScores?.[0]?.score || "N/A"}</div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-[6px] border-emerald-500/20 flex flex-col items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="34" cy="34" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-emerald-500" strokeDasharray="213" strokeDashoffset={`${213 - (213 * ((data.scorePredictions[0]?.correctScores?.[0]?.confidence || 75) / 100))}`} />
                    </svg>
                    <span className="text-[10px] text-zinc-500 -mb-1">Confidence</span>
                    <span className="text-lg font-black text-white">{data.scorePredictions[0]?.correctScores?.[0]?.confidence || 75}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 09. HEAD TO HEAD */}
      {data.headToHeadMatches && data.headToHeadMatches.length > 0 && (
        <TeamDuelsSection matches={data.headToHeadMatches} teamA={teamA} teamB={teamB} />
      )}

      
      <div className="text-center pb-8 pt-4">
        <p className="text-[10px] text-zinc-600">Data is AI-generated & for informational purposes only. Bet responsibly.</p>
      </div>
    </div>
  );
};

export default AnalysisResults;
