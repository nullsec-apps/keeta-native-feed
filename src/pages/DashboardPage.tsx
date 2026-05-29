import { Link } from 'react-router-dom';
import SocialFeed from '../components/SocialFeed';
import NewsFeed from '../components/NewsFeed';
import PriceSparkline from '../components/PriceSparkline';
import { usePrice } from '../hooks/usePrice';
import { formatUSD, formatPct, formatCompact } from '../lib/format';
import { cn } from '../lib/utils';
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

function ViewAll({ to }: { to: string }) {
  return (
    <Link to={to} className="text-xs text-[#00E599] hover:text-[#00E599]/80 inline-flex items-center gap-0.5 transition-colors duration-200">View all <ArrowUpRight size={12} /></Link>
  );
}

const fade = { hidden: { opacity: 0, y: 16 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }) };

export default function DashboardPage() {
  const { data } = usePrice();
  return (
    <div className="space-y-6">
      <motion.div variants={fade} custom={0} initial="hidden" animate="show">
        <Card className="bg-white/[0.03] border-white/5 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm text-[#E8F0EC]/40">Keeta · $KTA / USD</p>
            <div className="flex items-end gap-3 mt-1 flex-wrap">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#E8F0EC]">{formatUSD(data?.usd)}</h1>
              <span className={cn('font-semibold pb-1.5', (data?.usd_24h_change ?? 0) >= 0 ? 'text-[#00E599]' : 'text-[#FF4D4F]')}>{formatPct(data?.usd_24h_change)}</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-[#E8F0EC]/50">
              <span>Vol 24h <span className="text-[#E8F0EC]/80">{formatCompact(data?.usd_24h_vol)}</span></span>
              <span>Market Cap <span className="text-[#E8F0EC]/80">{formatCompact(data?.usd_market_cap)}</span></span>
            </div>
          </div>
          <PriceSparkline width={220} height={64} className="relative z-10" />
        </Card>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fade} custom={1} initial="hidden" animate="show">
          <Card className="bg-white/[0.02] border-white/5 p-5 h-[520px] sm:h-[640px]">
            <SocialFeed headerLink={<ViewAll to="/social" />} />
          </Card>
        </motion.div>
        <motion.div variants={fade} custom={2} initial="hidden" animate="show">
          <Card className="bg-white/[0.02] border-white/5 p-5 h-[520px] sm:h-[640px]">
            <NewsFeed headerLink={<ViewAll to="/news" />} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}