import type { Tweet } from '../lib/sampleData';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { highlightText } from '../lib/text';
import { relativeTime } from '../lib/format';
import { Heart, Repeat2, MessageCircle, BadgeCheck } from 'lucide-react';

export default function PostCard({ tweet }: { tweet: Tweet }) {
  return (
    <Card className="bg-white/[0.03] border-white/5 hover:border-[#00E599]/30 hover:shadow-[0_0_24px_-12px_rgba(0,229,153,0.4)] transition-all duration-200 p-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src={tweet.avatar} alt={tweet.author} />
          <AvatarFallback>{tweet.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold text-[#E8F0EC] truncate">{tweet.author}</span>
            {tweet.verified && <BadgeCheck className="text-[#00E599] shrink-0" size={14} />}
            <span className="text-[#E8F0EC]/40 truncate">@{tweet.handle}</span>
            <span className="text-[#E8F0EC]/30">·</span>
            <span className="text-[#E8F0EC]/40 whitespace-nowrap">{relativeTime(tweet.createdAt)}</span>
          </div>
          <p className="text-sm text-[#E8F0EC]/90 mt-1 leading-relaxed">{highlightText(tweet.text)}</p>
          <div className="flex items-center gap-5 mt-3 text-xs text-[#E8F0EC]/40">
            <span className="flex items-center gap-1 hover:text-[#00E599] transition-colors duration-200 cursor-pointer"><MessageCircle size={14} /> {tweet.replies}</span>
            <span className="flex items-center gap-1 hover:text-[#00E599] transition-colors duration-200 cursor-pointer"><Repeat2 size={14} /> {tweet.reposts}</span>
            <span className="flex items-center gap-1 hover:text-[#FF4D4F] transition-colors duration-200 cursor-pointer"><Heart size={14} /> {tweet.likes}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}