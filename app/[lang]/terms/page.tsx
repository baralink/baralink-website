import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { TermsContent } from './TermsContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/terms'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const terms = dictionaries[lang].terms;
  return {
    title: terms.title,
    description: terms.metaDescription,
    alternates: alternatesFor(lang, '/terms'),
  };
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
