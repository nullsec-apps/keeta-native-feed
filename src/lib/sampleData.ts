export interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  verified: boolean;
  text: string;
  createdAt: string;
  likes: number;
  reposts: number;
  replies: number;
}

export interface NewsArticle {
  id: string;
  source: string;
  title: string;
  snippet: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface PricePoint { t: number; p: number; }

export const sampleTweets: Tweet[] = [
  { id: 't1', author: 'Sarah Chen', handle: 'sarahonchain', avatar: 'https://i.pravatar.cc/80?img=47', verified: true, text: '$KTA throughput numbers are wild. keeta:native settlement is genuinely sub-second. The future of payment rails is here. #Keeta', createdAt: new Date(Date.now() - 120000).toISOString(), likes: 342, reposts: 88, replies: 21 },
  { id: 't2', author: 'DeFi Dan', handle: 'defidan', avatar: 'https://i.pravatar.cc/80?img=12', verified: false, text: 'Watching $KTA closely after the latest mainnet update. The Keeta network onboarding flow is the smoothest I have seen. @KeetaNetwork keep shipping', createdAt: new Date(Date.now() - 600000).toISOString(), likes: 120, reposts: 30, replies: 8 },
  { id: 't3', author: 'Crypto Maya', handle: 'cryptomaya', avatar: 'https://i.pravatar.cc/80?img=32', verified: true, text: 'New devs are building on keeta:native rails every week. Compliance-first design + speed is a rare combo. Bullish on $KTA long term. #crypto', createdAt: new Date(Date.now() - 1800000).toISOString(), likes: 510, reposts: 142, replies: 44 },
  { id: 't4', author: 'Marcus Lee', handle: 'marcustrades', avatar: 'https://i.pravatar.cc/80?img=68', verified: false, text: 'Just bridged some funds via keeta:native — settled before I could refresh the page. $KTA is underrated right now.', createdAt: new Date(Date.now() - 2700000).toISOString(), likes: 89, reposts: 14, replies: 5 },
  { id: 't5', author: 'Elena Rodriguez', handle: 'elena_eth', avatar: 'https://i.pravatar.cc/80?img=20', verified: true, text: 'The institutional angle on $KTA is what makes it interesting. Built-in compliance for regulated flows means real adoption potential. #Keeta #DeFi', createdAt: new Date(Date.now() - 5400000).toISOString(), likes: 267, reposts: 71, replies: 19 },
  { id: 't6', author: 'OnChain Oliver', handle: 'onchainoliver', avatar: 'https://i.pravatar.cc/80?img=53', verified: false, text: 'Volume on $KTA picking up nicely. keeta:native primitives integrating into more wallets. Watch this one. https://keeta.com', createdAt: new Date(Date.now() - 9000000).toISOString(), likes: 153, reposts: 38, replies: 11 },
];

export const sampleNews: NewsArticle[] = [
  { id: 'n1', source: 'coindesk.com', title: 'Keeta Network Expands Native Settlement Layer', snippet: 'The Keeta team announced upgrades to its native settlement infrastructure aimed at sub-second finality across cross-border transactions.', url: 'https://www.coindesk.com', publishedAt: new Date(Date.now() - 300000).toISOString(), sentiment: 'positive' },
  { id: 'n2', source: 'theblock.co', title: 'KTA Trading Volume Surges Amid Ecosystem Growth', snippet: 'On-chain activity for KTA has climbed as more applications integrate keeta:native primitives into their payment stacks.', url: 'https://www.theblock.co', publishedAt: new Date(Date.now() - 3600000).toISOString(), sentiment: 'neutral' },
  { id: 'n3', source: 'decrypt.co', title: "A Closer Look at Keeta's Compliance-First Design", snippet: 'Keeta positions itself with built-in compliance features for institutional flows, a differentiator in an increasingly regulated landscape.', url: 'https://decrypt.co', publishedAt: new Date(Date.now() - 7200000).toISOString(), sentiment: 'positive' },
  { id: 'n4', source: 'cointelegraph.com', title: 'Developers Flock to Keeta as Native Rails Mature', snippet: 'Developer activity around keeta:native tooling has accelerated, with new SDKs lowering the barrier to entry for builders.', url: 'https://cointelegraph.com', publishedAt: new Date(Date.now() - 14400000).toISOString(), sentiment: 'positive' },
  { id: 'n5', source: 'theblock.co', title: 'Market Watch: KTA Consolidates After Weekly Rally', snippet: 'KTA price action shows consolidation as traders digest recent gains. Analysts remain split on short-term direction.', url: 'https://www.theblock.co', publishedAt: new Date(Date.now() - 28800000).toISOString(), sentiment: 'neutral' },
];

export const samplePriceHistory: PricePoint[] = Array.from({ length: 48 }, (_, i) => ({
  t: Date.now() - (48 - i) * 1800000,
  p: 0.78 + Math.sin(i / 5) * 0.06 + Math.random() * 0.02,
}));

export const samplePrice = { usd: 0.842, usd_24h_change: 4.21, usd_market_cap: 84200000, usd_24h_vol: 12400000 };