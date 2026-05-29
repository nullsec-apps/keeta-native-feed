import { useState, useMemo } from 'react';
import { useSocialFeed } from '../hooks/useSocialFeed';
import FeedFilterBar from '../components/FeedFilterBar';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import LiveIndicator from '../components/LiveIndicator';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';

export default function SocialPage() {
  const { items, loading, error, refresh } = useSocialFeed();
  const [sort, setSort] = useState('recent');
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    let arr = [...items];
    if (search) arr = arr.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()) || t.author.toLowerCase().includes(search.toLowerCase()) || t.handle.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'popular') arr.sort((a, b) => b.likes - a.likes);
    else arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return arr;
  }, [items, sort, search]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="flex items-center gap-2 mb-5">
        <h1 className="font-display font-extrabold text-2xl text-[#E8F0EC]">Social Feed</h1>
        <LiveIndicator className="ml-1" />
      </div>
      <FeedFilterBar sort={sort} onSortChange={setSort} search={search} onSearchChange={setSearch} onRefresh={refresh} sortOptions={[{ value: 'recent', label: 'Recent' }, { value: 'popular', label: 'Popular' }]} />
      {loading && items.length === 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 w-full bg-white/5 rounded-xl" />)}</div>
      ) : error && items.length === 0 ? (
        <EmptyState title="Feed unavailable" message={error} onRetry={refresh} />
      ) : list.length === 0 ? (
        <EmptyState title="No matches" message="Try a different search term." />
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          <AnimatePresence initial={false}>
            {list.map((t) => (
              <motion.div key={t.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="break-inside-avoid">
                <PostCard tweet={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}