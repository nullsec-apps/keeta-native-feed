import { useState, useCallback, useEffect } from 'react';
import { fetchSocial } from '../lib/api';
import type { Tweet } from '../lib/sampleData';
import { usePolling } from './usePolling';

export function useSocialFeed() {
  const [items, setItems] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchSocial();
      setItems((prev) => {
        if (prev.length === 0) return data;
        const ids = new Set(prev.map((p) => p.id));
        const fresh = data.filter((d) => !ids.has(d.id));
        return [...fresh, ...prev];
      });
      setError(null);
    } catch {
      setError('Failed to load social feed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  usePolling(load, 30000);

  return { items, loading, error, refresh: load };
}