import { CANONICAL_HOST, isAllowedHost } from '../../canonicalHost.shared';

export { CANONICAL_HOST, isAllowedHost };

export function enforceCanonicalHost(): void {
  if (!import.meta.env.PROD) return;

  const { hostname, pathname, search, hash } = window.location;
  if (isAllowedHost(hostname)) return;

  window.location.replace(`https://${CANONICAL_HOST}${pathname}${search}${hash}`);
}
