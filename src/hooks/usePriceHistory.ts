import { useState, useEffect } from 'react';
import { fetchPriceHistory } from '../lib/api';
import type { PricePoint } from '../lib/sampleData';

export function usePriceHistory() {
  const [points, setPoints] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    fetchPriceHistory().then((p) => { if (mounted) { setPoints(p); setLoading(false); } });
    return () => { mounted = false; };
  }, []);
  return { points, loading };
}