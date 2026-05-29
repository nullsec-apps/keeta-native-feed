import type { NewsArticle } from '../lib/sampleData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { relativeTime } from '../lib/format';
import { ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const sentimentColor: Record<string, string> = {
  positive: 'bg-[#00E599]/15 text-[#00E599]',
  neutral: 'bg-white/10 text-[#E8F0EC]/70',
  negative: 'bg-[#FF4D4F]/15 text-[#FF4D4F]',
};

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="bg-white/[0.03] border-white/5 hover:border-[#00E599]/30 hover:shadow-[0_0_24px_-12px_rgba(0,229,153,0.4)] transition-all duration-200 p-4">
      <div className="flex items-center gap-2 text-xs text-[#E8F0EC]/40 mb-2">
        <img src={`https://www.google.com/s2/favicons?domain=${article.source}&sz=32`} alt="" className="w-4 h-4 rounded" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
        <span className="font-medium text-[#E8F0EC]/70 truncate">{article.source}</span>
        <span>·</span>
        <span className="whitespace-nowrap">{relativeTime(article.publishedAt)}</span>
        <Badge className={cn('ml-auto text-[10px] capitalize', sentimentColor[article.sentiment])}>{article.sentiment}</Badge>
      </div>
      <h3 className="font-display text-base text-[#E8F0EC] leading-snug">{article.title}</h3>
      <p className="text-sm text-[#E8F0EC]/50 mt-1.5 line-clamp-2">{article.snippet}</p>
      <Button asChild variant="link" className="px-0 h-auto mt-2 text-[#00E599] hover:text-[#00E599]/80 transition-colors duration-200">
        <a href={article.url} target="_blank" rel="noreferrer">Read article <ExternalLink size={14} className="ml-1" /></a>
      </Button>
    </Card>
  );
}