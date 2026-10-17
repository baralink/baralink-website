import type { MetadataRoute } from 'next';

// Submitted in Google Search Console (analytics plan, AN-4).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://baralink.org', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://baralink.org/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
