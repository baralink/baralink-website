import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL, localePath } from '@/lib/i18n/locales';
import { REVAMP_PHASE } from '@/lib/revamp';

const PAGES = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/delete-account', changeFrequency: 'yearly', priority: 0.3 },
  // The cash application page exists from the revamp's phase 3 (lib/revamp.ts).
  ...(REVAMP_PHASE >= 3 ? [{ path: '/cash', changeFrequency: 'yearly', priority: 0.2 } as const] : []),
] as const;

// Submitted in Google Search Console (analytics plan, AN-4). Each page in both languages,
// each naming the other (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((other) => [other, `${SITE_URL}${localePath(other, path)}`])),
      },
    })),
  );
}
