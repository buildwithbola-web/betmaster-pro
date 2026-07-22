import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import {
  MODEL_NAME,
  SYSTEM_INSTRUCTION,
  GAME_DETAILS_INSTRUCTION,
  ARBITRAGE_INSTRUCTION,
} from "./constants";
import { searchMatchData, searchGameDetails, detectSport } from "./scraper";

const app = express();
app.use(express.json());

const isDev = process.env.NODE_ENV !== "production";

async function createServer() {
  let deepseekClient: OpenAI | null = null;

  function getDeepseekClient() {
    if (deepseekClient) return deepseekClient;
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("Missing DEEPSEEK_API_KEY environment variable. Add it to .env.local");
    }
    deepseekClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });
    return deepseekClient;
  }

  // Helper to strip markdown code fences from LLM responses
  function cleanJsonResponse(text: string): string {
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }
    return cleaned.trim();
  }

  // --- API ROUTES ---

  app.post("/api/analyze", async (req, res) => {
    try {
      const { userInput } = req.body;
      const client = getDeepseekClient();
      const searchQuery = userInput || "today's best football matches betting";

      console.log("Analyzing:", searchQuery);

      // Step 1: Detect Sport & Scrape live data
      const detectedSport = detectSport(searchQuery);
      console.log(`[Pipeline] Detected Sport: ${detectedSport}`);
      console.log("[Pipeline] Step 1: Fetching live web data...");
      const webContext = await searchMatchData(searchQuery, detectedSport);

      // Step 2: Feed real data + query to the AI
      console.log("[Pipeline] Step 2: Sending to DeepSeek for analysis...");
      const sportInstruction = detectedSport !== "Unknown" 
        ? `\nCRITICAL SPORT ADAPTATION RULE: This is a ${detectedSport} match. You MUST still return every single section in the JSON schema, but ADAPT the terminology inside them. For example, for Basketball, use '3-Point Sniper' or 'Rebound Machine' in microMarkets, and predict Quarter/Half scores in scorePredictions. For Tennis, use 'Ace Machine' in microMarkets, and predict Set scores. Never omit sections.`
        : "";

      const userMessage = `USER QUERY: ${searchQuery}
${sportInstruction}

=== LIVE WEB DATA (scraped just now — use this as your primary data source) ===
${webContext}
=== END OF LIVE DATA ===

Based on the LIVE WEB DATA above, provide your analysis. Combine the web context with your own elite sports knowledge to generate comprehensive predictions. NEVER say 'No data available'—always provide a complete and educated analysis.
CRITICAL REMINDER: Do NOT copy the example data from your instructions. You must generate 100% unique data for: ${searchQuery}.`;

      const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 8000,
      });

      const rawText = completion.choices[0]?.message?.content;
      if (!rawText) throw new Error("Empty response from AI");
      const jsonData = JSON.parse(cleanJsonResponse(rawText));
      console.log("[Pipeline] Analysis complete ✓");
      res.json(jsonData);
    } catch (error: any) {
      console.error("Pipeline error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/game-details", async (req, res) => {
    try {
      const { gameName } = req.body;
      const client = getDeepseekClient();
      console.log("Game details for:", gameName);

      // Step 1: Scrape detailed match data
      console.log("[Pipeline] Step 1: Fetching detailed web data...");
      const webContext = await searchGameDetails(gameName);

      // Step 2: Feed to AI
      console.log("[Pipeline] Step 2: Sending to DeepSeek for deep analysis...");
      const userMessage = `MATCH TO ANALYZE: ${gameName}

=== LIVE WEB DATA (scraped just now — use this as your primary data source) ===
${webContext}
=== END OF LIVE DATA ===

Based on the LIVE WEB DATA above, provide your detailed match analysis. Combine the web context with your expert knowledge to fill out all tactical and statistical fields. NEVER output 'No data available'.
CRITICAL REMINDER: Do NOT copy the example data from your instructions. You must generate 100% unique data for: ${gameName}.`;

      const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: GAME_DETAILS_INSTRUCTION },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 8000,
      });

      const rawText = completion.choices[0]?.message?.content;
      if (!rawText) throw new Error("Empty response from AI");
      const jsonData = JSON.parse(cleanJsonResponse(rawText));
      console.log("[Pipeline] Game details complete ✓");
      res.json(jsonData);
    } catch (error: any) {
      console.error("Game details error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/arbitrage", async (req, res) => {
    try {
      const { query } = req.body;
      const client = getDeepseekClient();
      console.log("Arbitrage scan for:", query);

      const userMessage = `SCAN REQUEST: ${query}

Find arbitrage and sure-bet opportunities for the above sport/league across Nigerian and global bookmakers. Return realistic odds discrepancies that create guaranteed profit opportunities.
CRITICAL: Generate unique, realistic data for: ${query}. Do NOT copy example data.`;

      const completion = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: ARBITRAGE_INSTRUCTION },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.5,
        max_tokens: 4000,
      });

      const rawText = completion.choices[0]?.message?.content;
      if (!rawText) throw new Error("Empty response from AI");
      const jsonData = JSON.parse(cleanJsonResponse(rawText));
      console.log("[Pipeline] Arbitrage scan complete ✓");
      res.json(jsonData);
    } catch (error: any) {
      console.error("Arbitrage scan error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/matches/upcoming", (req, res) => {
    // Returns realistic upcoming matches for the search list UI based on the design
    res.json({
      matches: [
        {
          id: "m1",
          sport: "Football",
          league: "UEFA Champions League",
          time: "Today, 20:00",
          homeTeam: "Man City",
          awayTeam: "Real Madrid",
          homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
          awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
          primaryPrediction: { label: "Score Prediction", value: "2-1 Man City Win" },
          aiConfidence: 92
        },
        {
          id: "m2",
          sport: "Tennis",
          league: "ATP Wimbledon",
          time: "Today, 14:30",
          homeTeam: "Jannik Sinner",
          awayTeam: "Daniil Medvedev",
          homeLogo: "https://ui-avatars.com/api/?name=JS&background=10B981&color=fff&rounded=true",
          awayLogo: "https://ui-avatars.com/api/?name=DM&background=3B82F6&color=fff&rounded=true",
          primaryPrediction: { label: "1st Set Winner", value: "Jannik Sinner" },
          aiConfidence: 94
        },
        {
          id: "m3",
          sport: "Football",
          league: "Premier League",
          time: "Today, 18:30",
          homeTeam: "Arsenal",
          awayTeam: "Chelsea",
          homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
          awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
          primaryPrediction: { label: "1st Half Draw", value: "No" },
          aiConfidence: 89
        },
        {
          id: "m4",
          sport: "Football",
          league: "Eredivisie",
          time: "Today, 20:00",
          homeTeam: "PSV",
          awayTeam: "Excelsior",
          homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/PSV_Eindhoven.svg/1200px-PSV_Eindhoven.svg.png",
          awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/SBV_Excelsior_logo.svg/1200px-SBV_Excelsior_logo.svg.png",
          primaryPrediction: { label: "Banker Bet", value: "PSV Win 1X2" },
          aiConfidence: 96
        },
        {
          id: "m5",
          sport: "Basketball",
          league: "NBA",
          time: "Today, 02:00",
          homeTeam: "Lakers",
          awayTeam: "Nuggets",
          homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png",
          awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/1200px-Denver_Nuggets.svg.png",
          primaryPrediction: { label: "1st Half Total", value: "Over 110.5 Points" },
          aiConfidence: 91
        }
      ]
    });
  });

  // --- VITE MIDDLEWARE (Must be after API routes) ---
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createServer().catch(console.error);
