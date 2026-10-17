import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from '@/lib/i18n/locales';

/** English when the visitor chose it, or when their browser's first language is English. */
function preferredLocale(request: NextRequest): Locale {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen === 'en' || chosen === 'fr') return chosen;
  const first = (request.headers.get('accept-language') ?? '').split(',')[0].trim().toLowerCase();
  return first.startsWith('en') ? 'en' : DEFAULT_LOCALE;
}

/**
 * `/en/…` is served as it is. `/fr/…` is the address of no page: it goes to `/…`. Anything
 * else is French, served from the `fr` pages — unless the visitor prefers English, who is
 * sent to `/en/…` (the query, e.g. a campaign link's `?blc=`, is kept).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next();

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  if (preferredLocale(request) === 'en') {
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set('Vary', 'Accept-Language, Cookie');
    return response;
  }
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not Next's files, the metadata files or anything with an extension.
  matcher: ['/((?!_next/|api/|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*opengraph-image|.*\\..*).*)'],
};
