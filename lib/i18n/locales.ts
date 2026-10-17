/**
 * One address per language, so search engines index both (SEO): French — what most visitors
 * read — at `/`, English at `/en`. `proxy.ts` serves `/` from the `fr` pages and sends a
 * visitor who chose English (or whose browser asks for it first) to `/en`.
 */

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

/** The visitor's choice of language: a preference, not a tracking cookie. */
export const LOCALE_COOKIE = 'baralink-locale';

export const SITE_URL = 'https://baralink.org';

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** `/privacy` in a language: `/privacy` in French, `/en/privacy` in English. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** The same page in another language, from the current address. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const withoutLocale = pathname.replace(/^\/(en|fr)(?=\/|$)/, '') || '/';
  return localePath(to, withoutLocale);
}

/** hreflang links for one page (Next's metadata `alternates`). */
export function alternatesFor(locale: Locale, path = '/') {
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages: {
      fr: `${SITE_URL}${localePath('fr', path)}`,
      en: `${SITE_URL}${localePath('en', path)}`,
      'x-default': `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`,
    },
  };
}
