import { usePriceHistory } from '../hooks/usePriceHistory';

interface Props { width?: number; height?: number; className?: string; }

export default function PriceSparkline({ width = 120, height = 36, className }: Props) {
  const { points, loading } = usePriceHistory();
  if (loading || points.length === 0) {
    return <div style={{ width, height }} className="bg-white/5 rounded animate-pulse" />;
  }
  const prices = points.map((p) => p.p);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const step = width / (prices.length - 1);
  const d = prices
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(height - ((p - min) / range) * height).toFixed(1)}`)
    .join(' ');
  const up = prices[prices.length - 1] >= prices[0];
  const color = up ? '#00E599' : '#FF4D4F';
  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`;
  const gradId = `grad-${up ? 'up' : 'down'}`;
  return (
    <svg width={width} height={height} className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} stroke="none" />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}