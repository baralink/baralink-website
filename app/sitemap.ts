import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL, localePath } from '@/lib/i18n/locales';

const PAGES = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/delete-account', changeFrequency: 'yearly', priority: 0.3 },
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
