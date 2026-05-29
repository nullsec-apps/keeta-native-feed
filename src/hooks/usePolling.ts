import { useEffect, useRef } from 'react';

export function usePolling(cb: () => void, interval: number, enabled = true) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; });
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => { if (!document.hidden) saved.current(); }, interval);
    const onVis = () => { if (!document.hidden) saved.current(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
  }, [interval, enabled]);
}