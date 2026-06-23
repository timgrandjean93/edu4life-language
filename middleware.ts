const CANONICAL_HOST = 'education.wetlandrestorationhub.eu';

function isAllowedHost(hostname: string): boolean {
  if (hostname === CANONICAL_HOST) return true;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  return false;
}

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  if (!isAllowedHost(hostname)) {
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }
}

export const config = {
  matcher: '/:path*',
};
