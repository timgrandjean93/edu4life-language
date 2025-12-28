import { useEffect, useState } from 'react';
import { getDailyCacheKey } from '../utils/cacheBusting';

function msUntilNextUTCDay(now: Date): number {
  const next = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  return Math.max(0, next.getTime() - now.getTime());
}

/**
 * React hook that returns a cacheKey that changes once per day (UTC), and updates itself
 * around midnight so long-running sessions will pick up the new key automatically.
 */
export function useDailyCacheKey(): string {
  const [cacheKey, setCacheKey] = useState<string>(() => getDailyCacheKey());

  useEffect(() => {
    let timeoutId: number | undefined;

    const schedule = () => {
      const now = new Date();
      timeoutId = window.setTimeout(() => {
        setCacheKey(getDailyCacheKey());
        schedule();
      }, msUntilNextUTCDay(now) + 50);
    };

    schedule();
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return cacheKey;
}


