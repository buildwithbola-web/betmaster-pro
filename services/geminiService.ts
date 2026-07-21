import { BetMasterResponse, GameDetails, ArbitrageOpportunity } from "../types";

export const analyzeBets = async (userInput: string, customInstruction?: string): Promise<BetMasterResponse> => {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, customInstruction }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${response.status}`);
    }

    const data = await response.json() as BetMasterResponse;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const fetchGameDetails = async (gameName: string): Promise<GameDetails> => {
  try {
    const response = await fetch("/api/game-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameName }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${response.status}`);
    }

    const data = await response.json() as GameDetails;
    return data;
  } catch (error) {
    console.error("Gemini Details Error:", error);
    throw error;
  }
};

export const scanArbitrage = async (query: string): Promise<ArbitrageOpportunity[]> => {
  try {
    const response = await fetch("/api/arbitrage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${response.status}`);
    }

    const data = await response.json();
    return (data.opportunities || []) as ArbitrageOpportunity[];
  } catch (error) {
    console.error("Arbitrage Scan Error:", error);
    throw error;
  }
};
