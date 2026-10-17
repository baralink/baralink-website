import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { PrivacyContent } from './PrivacyContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/privacy'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const privacy = dictionaries[lang].privacy;
  return {
    title: privacy.title,
    description: privacy.metaDescription,
    alternates: alternatesFor(lang, '/privacy'),
  };
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
