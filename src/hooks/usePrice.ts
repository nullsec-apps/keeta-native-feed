import { useState, useCallback, useEffect } from 'react';
import { fetchPrice, type PriceData } from '../lib/api';
import { usePolling } from './usePolling';

export function usePrice() {
  const [data, setData] = useState<PriceData | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const d = await fetchPrice();
      setData((old) => { setPrev(old?.usd ?? null); return d; });
      setError(null);
    } catch {
      setError('Failed to load price');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  usePolling(load, 15000);

  return { data, prev, loading, error, refresh: load };
}