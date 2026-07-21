import * as cheerio from "cheerio";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface WebSearchResult {
  title: string;
  snippet: string;
  url: string;
}

function decodeBingUrl(bingUrl: string): string {
  try {
    if (bingUrl.includes("bing.com/ck/a")) {
      const urlObj = new URL(bingUrl.startsWith("http") ? bingUrl : `https://www.bing.com${bingUrl}`);
      const uParam = urlObj.searchParams.get("u");
      if (uParam && uParam.startsWith("a1")) {
        return Buffer.from(uParam.substring(2), "base64").toString("utf-8");
      }
    }
  } catch (e) {}
  return bingUrl;
}

async function scrapeBing(query: string): Promise<WebSearchResult[]> {
  try {
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      console.warn(`[Scraper] DDG returned ${response.status} for query: ${query}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: WebSearchResult[] = [];

    $('.result').each((i, el) => {
      const title = $(el).find('.result__title').text().trim();
      const snippet = $(el).find('.result__snippet').text().trim();
      const url = $(el).find('.result__url').attr('href') || "";
      
      if (title && snippet) {
        results.push({
          title,
          snippet,
          url: url.startsWith('//') ? 'https:' + url : url,
        });
      }
    });

    return results;
  } catch (err) {
    return [];
  }
}

async function fetchArticleText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      signal: AbortSignal.timeout(3000) // 3-second timeout per article to avoid hanging
    });
    if (!response.ok) return "";
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove scripts and styles
    $("script, style, nav, footer, header, aside").remove();
    
    // Extract paragraphs and headings
    let text = "";
    $("p, h1, h2, h3, li").each((_, el) => {
      text += $(el).text().trim() + " ";
    });
    
    return text.replace(/\s+/g, " ").substring(0, 5000); // Max 5000 chars per article
  } catch (err) {
    return "";
  }
}

export type Sport = "Football" | "Basketball" | "Tennis" | "Unknown";

export function detectSport(query: string): Sport {
  const q = query.toLowerCase();
  if (q.match(/\b(nba|basketball|lakers|celtics|warriors|bulls|heat|knicks|nets|sixers|bucks|suns|mavericks|nuggets|points|rebounds|quarters)\b/)) return "Basketball";
  if (q.match(/\b(tennis|atp|wta|wimbledon|us open|french open|australian open|djokovic|alcaraz|sinner|nadal|federer|swiatek|sabalenka|sets|aces)\b/)) return "Tennis";
  if (q.match(/\b(football|soccer|premier league|la liga|serie a|bundesliga|ligue 1|champions league|fc|real madrid|barcelona|arsenal|chelsea|manchester|liverpool|bayern|juventus|psg|goals|corners|fenerbahce|galatasaray|besiktas)\b/)) return "Football";
  // Fallback heuristic: check if words match generic European team suffixes (united, city, fc, sc, afc, cf, sk, fk, club, spor, istanbul)
  if (q.match(/\b(united|city|sc|afc|cf|sk|fk|club|spor|istanbul)\b/)) return "Football";
  return "Unknown";
}

export async function searchMatchData(query: string, sport: Sport = "Unknown"): Promise<string> {
  const q = query.toLowerCase();
  
  try {
    console.log(`[Scraper] Fetching live sports data from API-SPORTS for: "${query}"`);
    
    const today = new Date().toISOString().split("T")[0];
    let apiSportsEndpoints: string[] = [];
    let useRapidApiTennis = false;
    let sportApiEndpoints: string[] = [];

    if (sport === "Football") {
      apiSportsEndpoints.push(`https://v3.football.api-sports.io/fixtures?date=${today}`);
      sportApiEndpoints.push('https://sportapi7.p.rapidapi.com/api/v1/sport/football/events/live');
    } else if (sport === "Basketball") {
      apiSportsEndpoints.push(`https://v1.basketball.api-sports.io/games?date=${today}`);
      sportApiEndpoints.push('https://sportapi7.p.rapidapi.com/api/v1/sport/basketball/events/live');
    } else if (sport === "Tennis") {
      useRapidApiTennis = true;
      sportApiEndpoints.push('https://sportapi7.p.rapidapi.com/api/v1/sport/tennis/events/live');
    } else {
      apiSportsEndpoints = [
        `https://v3.football.api-sports.io/fixtures?date=${today}`,
        `https://v1.basketball.api-sports.io/games?date=${today}`
      ];
      sportApiEndpoints = [
        'https://sportapi7.p.rapidapi.com/api/v1/sport/football/events/live',
        'https://sportapi7.p.rapidapi.com/api/v1/sport/basketball/events/live',
        'https://sportapi7.p.rapidapi.com/api/v1/sport/tennis/events/live'
      ];
      useRapidApiTennis = true;
    }

    const headers = { 'x-apisports-key': process.env.API_SPORTS_KEY || '' };
    
    // Fire all requests concurrently
    const fetchPromises = apiSportsEndpoints.map(url => fetch(url, { headers }));
    
    if (useRapidApiTennis && process.env.RAPIDAPI_TENNIS_KEY) {
      console.log(`[Scraper] Fetching live sports data from RapidAPI Tennis...`);
      fetchPromises.push(
        fetch('https://tennis-live-api.p.rapidapi.com/tennis/v2/extend/api/events/live', {
          headers: {
            'x-rapidapi-host': 'tennis-live-api.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_TENNIS_KEY
          }
        })
      );
    }

    if (process.env.RAPIDAPI_TENNIS_KEY) {
      console.log(`[Scraper] Fetching live sports data from SportAPI (Sofascore)...`);
      sportApiEndpoints.forEach(url => {
        fetchPromises.push(
          fetch(url, {
            headers: {
              'x-rapidapi-host': 'sportapi7.p.rapidapi.com',
              'x-rapidapi-key': process.env.RAPIDAPI_TENNIS_KEY
            }
          })
        );
      });
    }

    const responses = await Promise.allSettled(fetchPromises);
    let allEvents: any[] = [];
    
    for (const res of responses) {
      if (res.status === "fulfilled" && res.value.ok) {
        const data = await res.value.json();
        // Handle API-SPORTS format
        if (data.response && Array.isArray(data.response)) {
           allEvents = allEvents.concat(data.response);
        }
        // Handle RapidAPI Tennis format
        if (data.results && Array.isArray(data.results)) {
           allEvents = allEvents.concat(data.results);
        }
        // Handle SportAPI (Sofascore) format
        if (data.events && Array.isArray(data.events)) {
           allEvents = allEvents.concat(data.events);
        }
      }
    }
    
    const searchTerms = q.replace(/(vs|live|score|update|today|2026|-)/g, " ").trim().split(/\s+/).filter(x=>x.length > 2);
    
    let matchedEvent = null;
    for (const event of allEvents) {
      const str = JSON.stringify(event).toLowerCase();
      if (searchTerms.every(term => str.includes(term))) {
        matchedEvent = event;
        break;
      }
    }
    
    if (!matchedEvent && allEvents.length > 0 && searchTerms.length > 0) {
      const str0 = searchTerms[0];
      matchedEvent = allEvents.find((e: any) => JSON.stringify(e).toLowerCase().includes(str0));
    }

    if (!matchedEvent) {
      console.log(`[Scraper] No live match found on API-SPORTS for ${query}, falling back to Bing Deep Scraping.`);
      
      const year = "2026";
      const searches = [
        `${query} live score update today ${year}`,
        `${query} match betting odds predictions ${year}`,
        `${query} head to head form statistics ${year}`,
      ];

      if (sport === "Football") {
        searches.push(`${query} expected goals xG cards corners news ${year}`);
        searches.push(`${query} injuries starting lineups soccer ${year}`);
      } else if (sport === "Basketball") {
        searches.push(`${query} points rebounds assists player props ${year}`);
        searches.push(`${query} quarters spread nba basketball ${year}`);
      } else if (sport === "Tennis") {
        searches.push(`${query} aces double faults sets tennis ${year}`);
        searches.push(`${query} court surface stats h2h ${year}`);
      } else {
        searches.push(`${query} team news injuries lineup ${year}`);
      }

      console.log(`[Scraper] Running ${searches.length} sequential Bing searches for: "${query}"...`);

      const results = [];
      for (let i = 0; i < searches.length; i++) {
        try {
          const snippets = await scrapeBing(searches[i]);
          results.push({ status: "fulfilled", value: snippets });
        } catch (e) {
          results.push({ status: "rejected", reason: e });
        }
        if (i < searches.length - 1) await delay(600);
      }

      const allResults: WebSearchResult[] = results
        .filter((r) => r.status === "fulfilled")
        .flatMap((r: any) => r.value)
        .filter(Boolean);

      const seen = new Set<string>();
      const unique = allResults.filter((r) => {
        if (seen.has(r.url)) return false;
        seen.add(r.url);
        return true;
      });

      console.log(`[Scraper] Found ${unique.length} unique results from Bing Fallback`);

      if (unique.length === 0) {
        return "No live web data found on API-SPORTS or Bing. Please use your best reasoning to estimate the match outcomes.";
      }

      const topUrls = unique.slice(0, 3).filter(r => r.url.startsWith("http"));
      let deepContext = "";
      
      for (let i = 0; i < topUrls.length; i++) {
        console.log(`[Scraper] Extracting URL ${i+1}: ${topUrls[i].url}`);
        const articleText = await fetchArticleText(topUrls[i].url);
        if (articleText.length > 200) {
          deepContext += `\n\n--- ARTICLE ${i+1} SOURCE: ${topUrls[i].url} ---\n${topUrls[i].title}\n${articleText}`;
        }
      }

      const context = unique
        .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}`)
        .join("\n\n");

      return `=== BING SNIPPETS (API-SPORTS FALLBACK) ===\n${context}\n\n=== DEEP ARTICLES ===\n${deepContext}`.substring(0, 20000);
    }

    console.log(`[Scraper] Match found on API-SPORTS!`);
    
    // Pass the raw API-SPORTS payload to DeepSeek to parse
    let context = `=== API-SPORTS LIVE MATCH DATA ===\n`;
    context += `RAW JSON PAYLOAD:\n`;
    context += JSON.stringify(matchedEvent, null, 2);
    
    return context;

  } catch (err: any) {
    console.error("[Scraper] API-SPORTS Error:", err.message);
    return "API-SPORTS failed. No live data available.";
  }
}

export async function searchGameDetails(gameName: string): Promise<string> {
  const searches = [
    `${gameName} detailed match preview odds`,
    `${gameName} tactical analysis injuries`,
  ];

  console.log(`[Scraper] Running ${searches.length} detail searches for: "${gameName}"`);

  try {
    const results = await Promise.allSettled(searches.map(scrapeBing));

    const allResults: WebSearchResult[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") {
        allResults.push(...result.value);
      }
    }

    const seen = new Set<string>();
    const unique = allResults.filter((r) => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });

    console.log(`[Scraper] Found ${unique.length} unique detail results`);

    if (unique.length === 0) {
      return "No live web data found. Please use your best reasoning to estimate the match outcomes.";
    }

    const context = unique
      .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}`)
      .join("\n\n");

    return context.substring(0, 5000);
  } catch (error: any) {
    console.error("[Scraper] Detail search failed:", error.message);
    return "";
  }
}
