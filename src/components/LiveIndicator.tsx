import { cn } from '../lib/utils';

interface Props { label?: string; className?: string; }

export default function LiveIndicator({ label = 'LIVE', className }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide', className)}>
      <span className="live-dot inline-block w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_rgba(0,229,153,0.8)]" />
      <span className="text-[#00E599]">{label}</span>
    </span>
  );
}