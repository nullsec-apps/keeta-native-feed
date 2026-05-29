import { useState, useMemo } from 'react';
import { useNewsFeed } from '../hooks/useNewsFeed';
import FeedFilterBar from '../components/FeedFilterBar';
import NewsCard from '../components/NewsCard';
import EmptyState from '../components/EmptyState';
import LiveIndicator from '../components/LiveIndicator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { relativeTime } from '../lib/format';
import { ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function NewsPage() {
  const { items, loading, error, refresh } = useNewsFeed();
  const [sort, setSort] = useState('recent');
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    let arr = [...items];
    if (search) arr = arr.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.snippet.toLowerCase().includes(search.toLowerCase()) || a.source.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'positive') arr = arr.filter((a) => a.sentiment === 'positive');
    arr.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return arr;
  }, [items, sort, search]);

  const featured = list[0];
  const rest = list.slice(1);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="flex items-center gap-2 mb-5">
        <h1 className="font-display font-extrabold text-2xl text-[#E8F0EC]">News Feed</h1>
        <LiveIndicator className="ml-1" />
      </div>
      <FeedFilterBar sort={sort} onSortChange={setSort} search={search} onSearchChange={setSearch} onRefresh={refresh} sortOptions={[{ value: 'recent', label: 'Recent' }, { value: 'positive', label: 'Bullish' }]} />
      {loading && items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32 w-full bg-white/5 rounded-xl" />)}</div>
      ) : error && items.length === 0 ? (
        <EmptyState title="Feed unavailable" message={error} onRetry={refresh} />
      ) : list.length === 0 ? (
        <EmptyState title="No matches" message="Try a different search term." />
      ) : (
        <div className="space-y-6">
          {featured && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white/[0.03] border-[#00E599]/20 p-6 hover:border-[#00E599]/40 transition-all duration-200">
                <div className="flex items-center gap-2 text-xs text-[#E8F0EC]/40 mb-2 flex-wrap">
                  <Badge className="bg-[#00E599]/15 text-[#00E599]">Featured</Badge>
                  <span className="font-medium text-[#E8F0EC]/70">{featured.source}</span>
                  <span>·</span><span>{relativeTime(featured.publishedAt)}</span>
                </div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#E8F0EC] leading-tight">{featured.title}</h2>
                <p className="text-[#E8F0EC]/50 mt-2">{featured.snippet}</p>
                <Button asChild variant="link" className="px-0 mt-2 text-[#00E599] hover:text-[#00E599]/80 transition-colors duration-200"><a href={featured.url} target="_blank" rel="noreferrer">Read article <ExternalLink size={14} className="ml-1" /></a></Button>
              </Card>
            </motion.div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence initial={false}>
              {rest.map((a) => (
                <motion.div key={a.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  <NewsCard article={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}