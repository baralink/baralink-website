'use client';

import { createContext, useCallback, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { dictionaries, type Dictionary } from './dictionaries';
import { LOCALE_COOKIE, localePath, switchLocalePath, type Locale } from './locales';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** A path of this site in the current language (`/privacy` → `/en/privacy`). */
  href: (path: string) => string;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * The language comes from the address (`/` French, `/en` English), so the page is rendered
 * on the server in the right language. Changing it remembers the choice and opens the same
 * page at the other language's address, keeping the query (a campaign code).
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      if (next === locale) return;
      router.push(`${switchLocalePath(pathname, next)}${window.location.search}${window.location.hash}`);
    },
    [locale, pathname, router],
  );

  const href = useCallback((path: string) => localePath(locale, path), [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, href, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
