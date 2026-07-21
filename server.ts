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

  // --- VITE MIDDLEWARE (Must be after API routes) ---
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist/client")));
    app.use((req, res) => {
      res.sendFile(path.join(__dirname, "dist/client/index.html"));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createServer().catch(console.error);
