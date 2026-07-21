import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Sparkles, Shield, AlertTriangle, Zap, TrendingUp, Clock, Loader2, RefreshCw } from 'lucide-react';
import { ArbitrageOpportunity } from '../types';
import { scanArbitrage } from '../services/geminiService';

interface ArbitrageScannerProps {
  onBack: () => void;
}

const RISK_CONFIG: Record<string, { border: string; bg: string; text: string; label: string }> = {
  'SURE_BET': { border: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-black', label: 'SURE BET' },
  'LOW_RISK': { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-black', label: 'LOW RISK' },
  'MODERATE': { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-black', label: 'MODERATE' },
};

const PRESETS = [
  { label: 'EPL Today', query: 'Premier League matches today' },
  { label: 'La Liga', query: 'La Liga matches today' },
  { label: 'NBA', query: 'NBA games today' },
  { label: 'ATP Tennis', query: 'ATP Tennis matches today' },
];

const ArbitrageScanner: React.FC<ArbitrageScannerProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [results, setResults] = useState<ArbitrageOpportunity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const messages = [
      'Scanning bookmaker feeds...',
      'Comparing odds across markets...',
      'Calculating arbitrage margins...',
      'Identifying guaranteed returns...',
      'Verifying stake distributions...',
    ];
    let i = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingMsg(messages[i]);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleScan = async (overrideQuery?: string) => {
    const q = overrideQuery || query;
    if (!q.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);

    try {
      const data = await scanArbitrage(q.trim());
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Scan failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-none transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <Shield className="text-emerald-500" size={28} />
              <h1 className="text-2xl font-black uppercase tracking-widest">Arbitrage Scanner</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest bg-emerald-950/30 px-2 py-0.5 border border-emerald-500/20">
              DeepSeek V3
            </span>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="relative">
            <div className="bg-black p-2 border border-white/10 flex items-center focus-within:border-emerald-500 transition-colors">
              <div className="pl-4 pr-2 text-zinc-500">
                <Search size={24} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Premier League, NBA, Champions League..."
                className="w-full bg-transparent border-none text-white px-2 py-3 text-lg placeholder-zinc-600 font-mono uppercase tracking-widest outline-none"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-emerald-500 hover:bg-white disabled:opacity-50 text-black px-6 py-3 transition-colors font-black uppercase tracking-widest text-sm flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {loading ? 'Scanning' : 'Scan'}
              </button>
            </div>
          </form>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset.query);
                  handleScan(preset.query);
                }}
                disabled={loading}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-black bg-black hover:bg-white px-3 py-2 border border-white/10 hover:border-white transition-colors disabled:opacity-50"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-black p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Loader2 size={16} className="text-emerald-500 animate-spin" />
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                  {loadingMsg}
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 border border-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-black border border-white/10 rounded-none p-6 animate-pulse">
                  <div className="h-4 bg-white/5 w-3/4 mb-4"></div>
                  <div className="h-3 bg-white/5 w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-white/5"></div>
                    <div className="h-12 bg-white/5"></div>
                  </div>
                  <div className="h-8 bg-white/5 mt-4 w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-black border border-red-500 p-4 text-red-500 font-mono text-sm uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-emerald-500" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-white">
                  {results.length} Opportunit{results.length === 1 ? 'y' : 'ies'} Found
                </h3>
              </div>
              <button
                onClick={() => handleScan()}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-white/20 transition-colors"
              >
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((opp, idx) => {
                const config = RISK_CONFIG[opp.riskLevel] || RISK_CONFIG['MODERATE'];
                return (
                  <div key={idx} className={`bg-black border ${config.border} rounded-none overflow-hidden`}>
                    {/* Card Header */}
                    <div className="p-5 border-b border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{opp.sport}</span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 ${config.bg} ${config.text} border ${config.border}`}>
                          {config.label}
                        </span>
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-white">{opp.game}</h4>
                    </div>

                    {/* Bookmaker Rows */}
                    <div className="divide-y divide-white/10">
                      {/* Bookmaker A */}
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">{opp.bookmakerA.name}</div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">{opp.bookmakerA.selection}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{opp.bookmakerA.market}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black font-mono text-emerald-500">{opp.bookmakerA.odds}</div>
                          <div className="text-[10px] font-mono text-zinc-500">Stake: {opp.recommendedStakes.stakeA}</div>
                        </div>
                      </div>

                      {/* Bookmaker B */}
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">{opp.bookmakerB.name}</div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">{opp.bookmakerB.selection}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{opp.bookmakerB.market}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black font-mono text-emerald-500">{opp.bookmakerB.odds}</div>
                          <div className="text-[10px] font-mono text-zinc-500">Stake: {opp.recommendedStakes.stakeB}</div>
                        </div>
                      </div>

                      {/* Bookmaker C (optional, for 3-way) */}
                      {opp.bookmakerC && (
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">{opp.bookmakerC.name}</div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider">{opp.bookmakerC.selection}</div>
                            <div className="text-[10px] font-mono text-zinc-500">{opp.bookmakerC.market}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black font-mono text-emerald-500">{opp.bookmakerC.odds}</div>
                            <div className="text-[10px] font-mono text-zinc-500">Stake: {opp.recommendedStakes.stakeC}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profit Footer */}
                    <div className="p-5 border-t border-white/10 bg-black">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Guaranteed Profit</span>
                        <span className="text-xl font-black font-mono text-emerald-500">+{opp.guaranteedProfit}%</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={10} className="text-zinc-500" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Window: {opp.expiresIn}</span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 leading-relaxed border-t border-white/10 pt-3 mt-2">
                        {opp.reasoning}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state after search */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="border border-white/10 bg-black p-16 text-center">
            <AlertTriangle size={48} className="text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-2">No arbitrage opportunities found</p>
            <p className="text-zinc-600 font-mono text-xs">Try a different league or sport. Arbitrage windows are narrow and close quickly.</p>
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !hasSearched && (
          <div className="border border-white/10 bg-black p-16 text-center space-y-4">
            <Shield size={64} className="text-zinc-800 mx-auto" />
            <h3 className="text-lg font-black uppercase tracking-widest text-zinc-400">Ready to Scan</h3>
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest max-w-md mx-auto leading-loose">
              Enter a sport or league above to scan for arbitrage opportunities across Nigerian and global bookmakers. The AI will identify odds discrepancies that guarantee profit.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ArbitrageScanner;
