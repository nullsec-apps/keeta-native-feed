import { useSocialFeed } from '../hooks/useSocialFeed';
import PostCard from './PostCard';
import LiveIndicator from './LiveIndicator';
import EmptyState from './EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Twitter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props { headerLink?: React.ReactNode; }

export default function SocialFeed({ headerLink }: Props) {
  const { items, loading, error, refresh } = useSocialFeed();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <Twitter className="text-[#00E599]" size={18} strokeWidth={2} />
        <h2 className="font-display font-bold text-lg text-[#E8F0EC]">Social</h2>
        <LiveIndicator className="ml-1" />
        <div className="ml-auto">{headerLink}</div>
      </div>
      <div className="flex-1 overflow-y-auto pt-3 space-y-3 pr-1">
        {loading && items.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full bg-white/5 rounded-xl" />)
        ) : error && items.length === 0 ? (
          <EmptyState title="Feed unavailable" message={error} onRetry={refresh} />
        ) : items.length === 0 ? (
          <EmptyState title="No posts yet" message="Waiting for new $KTA chatter." />
        ) : (
          <AnimatePresence initial={false}>
            {items.map((t) => (
              <motion.div key={t.id} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <PostCard tweet={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}