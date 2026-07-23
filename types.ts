
export interface BetSlipItem {
  id: string;
  game: string;
  market: string;
  selection: string;
  odds: string;
}

export interface BetHistoryItem {
  id: string;
  date: string;
  bets: BetSlipItem[];
  totalOdds: number;
  stakeAmount: number;
  status: 'won' | 'lost' | 'pending' | 'void';
}

export interface ArbitrageOpportunity {
  game: string;
  sport: string;
  bookmakerA: { name: string; market: string; selection: string; odds: string };
  bookmakerB: { name: string; market: string; selection: string; odds: string };
  bookmakerC?: { name: string; market: string; selection: string; odds: string };
  guaranteedProfit: number;
  recommendedStakes: { stakeA: string; stakeB: string; stakeC?: string };
  riskLevel: 'SURE_BET' | 'LOW_RISK' | 'MODERATE';
  expiresIn: string;
  reasoning: string;
}



export interface Source {
  title: string;
  uri: string;
}

export interface Prediction {
  market: string;
  selection: string;
  odds: string;
  confidence: number;
  reasoning: string;
}

export interface GamePredictions {
  gameName: string;
  mainstream: Prediction[];
  niche: Prediction[];
}

export interface MicroMarketInsight {
  type: 'SHOT_SNIPER' | 'TACKLE_MACHINE' | 'CRUMBLE_WATCH' | 'FAST_START';
  player?: string;
  team: string;
  insight: string;
  prediction: string;
  confidence: number;
}

export interface FirstSetWinner {
  game: string;
  sport: 'Tennis' | 'Football' | 'Basketball' | string;
  predictedWinner: string;
  confidence: number;
  reasoning: string;
  odds: string;
  extensiveAnalysis: string;
}

export interface ScorePredictionMatch {
  game: string;
  correctScores: { score: string; confidence: number; odds: string }[];
  exactGoalRange: { range: string; confidence: number; odds: string };
  multiScores: { scores: string; confidence: number; odds: string };
}

export interface BankerBet {
  game: string;
  market: string;
  selection: string;
  odds: string;
  confidence: number;
  reasoning: string;
}

export interface TeamStats {
  form: string;
  keyPlayer: string;
  strengths: string[];
  weaknesses: string[];
  goalsScoredAvg?: number;
  goalsConcededAvg?: number;
  possessionAvg?: number;
  shotsAvg?: number;
  passAccuracy?: number;
}

export interface TeamComparison {
  teamA: string;
  teamB: string;
  headToHead: string;
  teamAStats: TeamStats;
  teamBStats: TeamStats;
  tacticalMatchup: string;
  prediction: string;
}

export interface OddsMovement {
  market: string;
  openingOdds: string;
  currentOdds: string;
  movementDirection: 'UP' | 'DOWN';
  sharpMoneyVolume: string;
  insight: string;
}

export interface EvScannerBet {
  market: string;
  selection: string;
  bookmakerOdds: string;
  aiProbability: number;
  trueOdds: string;
  evPercentage: number;
}

export interface AbsenceImpact {
  missingPlayer: string;
  team: string;
  impactMetric: string;
  bettingAngle: string;
  severity: 'CRITICAL' | 'MODERATE' | 'LOW';
}

export interface HeadToHeadMatch {
  date: string;
  teamA: string;
  teamB: string;
  score: string;
  competition: string;
}

export interface LiveMomentum {
  currentMomentum: string;
  suggestedLiveBet: string;
  odds: string;
  confidence: number;
  reasoning: string;
}

export interface BetMasterResponse {
  teamComparison?: TeamComparison;
  matchTime?: string; // Keep for legacy / fallback
  matchStatus?: string; // E.g., 'LIVE - 40\'' or 'KICKOFF: 20:30'
  stadium?: string;
  weather?: string;
  sources?: Source[];
  gamePredictions?: GamePredictions;
  microMarkets?: MicroMarketInsight[];
  firstSetWinners?: FirstSetWinner[];
  scorePredictions?: ScorePredictionMatch[];
  bankerBets?: BankerBet[];
  
  // NEW PRO MODULES
  oddsMovement?: OddsMovement[];
  evScanner?: EvScannerBet[];
  absenceImpact?: AbsenceImpact[];
  headToHeadMatches?: HeadToHeadMatch[];
  liveMomentum?: LiveMomentum;

  isFallback?: boolean;
  fallbackReason?: string;
}

export interface FormMatch {
  result: 'W' | 'D' | 'L' | string;
  opponent: string;
  score: string;
}

export interface TimelineStat {
  period: string;
  homeValue: number;
  awayValue: number;
}

export interface SportStat {
  label: string;
  homeValue: string;
  awayValue: string;
  insight?: string;
}

export interface SituationalAlert {
  type: 'MOTIVATION' | 'FATIGUE' | 'TACTICAL' | 'SQUAD';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  impact: string;
}

export interface GameDetails {
  game: string;
  matchContext: string;
  headToHead: string;
  recentForm: string;
  injuries: string;
  
  situationalAlerts?: SituationalAlert[];

  conditions?: {
    referee?: string;
    weather?: string;
    location?: string;
  };

  fatigue?: {
    homeDaysRest: number;
    awayDaysRest: number;
    isHighTravel: boolean;
  };

  winProbability?: {
    home: number;
    draw: number;
    away: number;
  };

  firstHalfIntelligence?: {
    homeHTScoredFreq: number;
    awayHTScoredFreq: number;
    htDrawRate: number;
    insight: string;
  };

  asianHandicapMarkets?: {
    line: string;
    odds: string;
    confidence: number;
  }[];

  firstToScoreData?: {
    homeFirstScoreFreq: number;
    awayFirstScoreFreq: number;
    avgFirstGoalTime: string;
  };

  marketMetrics?: {
    publicSentiment: { home: number; away: number };
    oddsTrend: string;
    smartMoney?: string;
  };

  formHistory?: {
    home: FormMatch[];
    away: FormMatch[];
  };

  timelineStats?: TimelineStat[];
  sportSpecificStats?: SportStat[];
  firstSetPrediction?: {
    predictedWinner: string;
    confidence: number;
    reasoning: string;
  };
  isFallback?: boolean;
}
