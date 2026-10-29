import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { REVAMP_PHASE } from '@/lib/revamp';
import { CashApplicationContent } from './CashApplicationContent';

// Applying for cash by exception (baralink-backend docs/REVAMP.md, phase 3). Not found
// until cash is offered, so no one applies for something the app does not do yet.
export async function generateMetadata({ params }: PageProps<'/[lang]/cash'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang) || REVAMP_PHASE < 3) return {};
  const page = dictionaries[lang].cashApplication;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: alternatesFor(lang, '/cash'),
  };
}

export default async function CashApplicationPage({ params }: PageProps<'/[lang]/cash'>) {
  const { lang } = await params;
  if (!hasLocale(lang) || REVAMP_PHASE < 3) notFound();
  return (
    <>
      <Header />
      <main>
        <CashApplicationContent />
      </main>
      <Footer />
    </>
  );
}
