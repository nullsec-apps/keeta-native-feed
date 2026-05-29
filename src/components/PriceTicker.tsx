import { usePrice } from '../hooks/usePrice';
import { formatUSD, formatPct, formatCompact } from '../lib/format';
import { cn } from '../lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import PriceSparkline from './PriceSparkline';
import LiveIndicator from './LiveIndicator';

export default function PriceTicker() {
  const { data, prev, loading } = usePrice();
  const dir = data && prev != null ? (data.usd > prev ? 'up' : data.usd < prev ? 'down' : '') : '';
  return (
    <div className="sticky top-14 z-30 border-b border-white/5 bg-[#0A0E0D]/90 backdrop-blur">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-4 sm:gap-6 overflow-x-auto">
        <LiveIndicator />
        {loading ? (
          <Skeleton className="h-6 w-40 bg-white/5" />
        ) : (
          <div className={cn('flex items-center gap-4 sm:gap-6 text-sm rounded px-2 transition-colors', dir === 'up' && 'flash-up', dir === 'down' && 'flash-down')}>
            <span className="font-display text-base text-[#E8F0EC] whitespace-nowrap">$KTA {formatUSD(data?.usd)}</span>
            <span className={cn('font-semibold whitespace-nowrap', (data?.usd_24h_change ?? 0) >= 0 ? 'text-[#00E599]' : 'text-[#FF4D4F]')}>{formatPct(data?.usd_24h_change)}</span>
            <span className="text-[#E8F0EC]/50 whitespace-nowrap hidden xs:inline">Vol {formatCompact(data?.usd_24h_vol)}</span>
            <span className="text-[#E8F0EC]/50 whitespace-nowrap hidden sm:inline">MCap {formatCompact(data?.usd_market_cap)}</span>
            <PriceSparkline className="hidden sm:block" />
          </div>
        )}
      </div>
    </div>
  );
}