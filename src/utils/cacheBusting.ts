/**
 * Cache-busting helpers.
 *
 * Browser caching is URL-based. By appending a stable per-day query param (e.g. ?v=2025-12-28),
 * we force the browser to re-fetch once per day, while still caching within the day.
 */

export function getDailyCacheKey(date: Date = new Date()): string {
  // Use UTC date for stability across timezones and DST.
  // Format: YYYY-MM-DD
  return date.toISOString().slice(0, 10);
}

export function addCacheBuster(src: string, cacheKey: string, param: string = 'v'): string {
  // Don't touch data/blob URLs
  if (/^(data:|blob:)/i.test(src)) return src;

  const [beforeHash, hash] = src.split('#', 2);
  const [path, query] = beforeHash.split('?', 2);

  const params = new URLSearchParams(query ?? '');
  params.set(param, cacheKey);

  const rebuilt = `${path}?${params.toString()}`;
  return hash ? `${rebuilt}#${hash}` : rebuilt;
}


