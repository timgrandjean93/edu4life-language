import { CANONICAL_HOST, isAllowedHost } from './canonicalHost.shared';

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
