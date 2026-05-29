import { Link, useLocation } from 'react-router-dom';
import { usePrice } from '../hooks/usePrice';
import { formatUSD, formatPct } from '../lib/format';
import { cn } from '../lib/utils';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/social', label: 'Social' },
  { to: '/news', label: 'News' },
];

export default function TopNav() {
  const { pathname } = useLocation();
  const { data } = usePrice();
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0E0D]/90 backdrop-blur">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <Activity className="text-[#00E599] group-hover:scale-110 transition-transform duration-200" size={22} strokeWidth={2} />
          <span className="font-display font-extrabold text-base sm:text-lg text-[#E8F0EC]">Keeta<span className="text-[#00E599]">Pulse</span></span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={cn('relative px-2.5 sm:px-3 py-1.5 text-sm rounded-md transition-colors duration-200', active ? 'text-[#E8F0EC]' : 'text-[#E8F0EC]/50 hover:text-[#E8F0EC]/80')}>
                {l.label}
                {active && <motion.span layoutId="nav-underline" className="absolute left-2.5 right-2.5 sm:left-3 sm:right-3 -bottom-[1px] h-0.5 bg-[#00E599] rounded-full" />}
              </Link>
            );
          })}
        </nav>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-sm font-display text-[#E8F0EC]">{formatUSD(data?.usd)}</span>
          <Badge className={cn('text-xs', (data?.usd_24h_change ?? 0) >= 0 ? 'bg-[#00E599]/15 text-[#00E599]' : 'bg-[#FF4D4F]/15 text-[#FF4D4F]')}>{formatPct(data?.usd_24h_change)}</Badge>
        </div>
      </div>
    </header>
  );
}