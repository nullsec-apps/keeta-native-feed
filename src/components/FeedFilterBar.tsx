import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search } from 'lucide-react';

interface Props {
  sort: string;
  onSortChange: (v: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  onRefresh: () => void;
  sortOptions: { value: string; label: string }[];
}

export default function FeedFilterBar({ sort, onSortChange, search, onSearchChange, onRefresh, sortOptions }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
      <Tabs value={sort} onValueChange={onSortChange}>
        <TabsList className="bg-white/5">
          {sortOptions.map((o) => (
            <TabsTrigger key={o.value} value={o.value} className="data-[state=active]:bg-[#00E599]/15 data-[state=active]:text-[#00E599] transition-all duration-200">{o.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative flex-1 sm:max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8F0EC]/40" />
        <Input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search within feed..." className="pl-9 bg-white/5 border-white/10 text-[#E8F0EC] placeholder:text-[#E8F0EC]/30 focus-visible:ring-[#00E599]/40" />
      </div>
      <Button variant="outline" onClick={onRefresh} className="border-[#00E599]/30 text-[#00E599] hover:bg-[#00E599]/10 transition-all duration-200">
        <RefreshCw size={16} className="mr-1.5" /> Refresh
      </Button>
    </div>
  );
}