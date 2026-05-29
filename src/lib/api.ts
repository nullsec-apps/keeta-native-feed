import { sampleTweets, sampleNews, samplePrice, samplePriceHistory, type Tweet, type NewsArticle, type PricePoint } from './sampleData';

async function safeFetch(url: string, timeout = 8000): Promise<any> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error('bad status');
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

export interface PriceData { usd: number; usd_24h_change: number; usd_market_cap: number; usd_24h_vol: number; }

const KTA_ADDRESS = '0xc0634090f2fe6c6d75e61be2b949464abb498973';

export async function fetchPrice(): Promise<PriceData> {
  try {
    const data = await safeFetch('https://api.coingecko.com/api/v3/simple/price?ids=keeta&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true');
    if (data.keeta && data.keeta.usd) return data.keeta;
  } catch { /* fall through */ }
  try {
    const data = await safeFetch(`https://api.dexscreener.com/latest/dex/tokens/${KTA_ADDRESS}`);
    const pair = data?.pairs?.[0];
    if (pair && pair.priceUsd) {
      return {
        usd: parseFloat(pair.priceUsd),
        usd_24h_change: pair.priceChange?.h24 ?? 0,
        usd_market_cap: pair.fdv ?? 0,
        usd_24h_vol: pair.volume?.h24 ?? 0,
      };
    }
  } catch { /* fall through */ }
  return samplePrice;
}

export async function fetchPriceHistory(): Promise<PricePoint[]> {
  try {
    const data = await safeFetch('https://api.coingecko.com/api/v3/coins/keeta/market_chart?vs_currency=usd&days=1');
    if (data.prices && data.prices.length) return data.prices.map((p: [number, number]) => ({ t: p[0], p: p[1] }));
  } catch { /* fall through */ }
  return samplePriceHistory;
}

export async function fetchSocial(): Promise<Tweet[]> {
  return sampleTweets;
}

export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const data = await safeFetch('https://hn.algolia.com/api/v1/search_by_date?query=keeta%20crypto&tags=story&hitsPerPage=8');
    if (data?.hits?.length) {
      const mapped: NewsArticle[] = data.hits
        .filter((h: any) => h.title && (h.url || h.story_url))
        .map((h: any) => ({
          id: 'hn-' + h.objectID,
          source: h.url ? new URL(h.url).hostname.replace('www.', '') : 'news.ycombinator.com',
          title: h.title,
          snippet: h.story_text ? h.story_text.slice(0, 160) : 'Community discussion about Keeta and the KTA ecosystem.',
          url: h.url || h.story_url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          publishedAt: h.created_at,
          sentiment: 'neutral' as const,
        }));
      if (mapped.length) return [...mapped, ...sampleNews].slice(0, 8);
    }
  } catch { /* fall through */ }
  return sampleNews;
}