import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { title?: string; message?: string; onRetry?: () => void; }

export default function EmptyState({ title = 'Nothing here yet', message = 'No items to display right now.', onRetry }: Props) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Inbox className="text-[#00E599]" size={24} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg text-[#E8F0EC]">{title}</h3>
      <p className="text-sm text-[#E8F0EC]/50 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4 border-[#00E599]/30 text-[#00E599] hover:bg-[#00E599]/10 transition-all duration-200" onClick={onRetry}>Retry</Button>
      )}
    </motion.div>
  );
}