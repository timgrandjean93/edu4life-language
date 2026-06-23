export const CANONICAL_HOST = 'education.wetlandrestorationhub.eu';

export function isAllowedHost(hostname: string): boolean {
  if (hostname === CANONICAL_HOST) return true;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}
