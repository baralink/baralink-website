import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { SharedJobContent } from './SharedJobContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/job/[id]'>): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const copy = dictionaries[lang].sharedJob;
  const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
  return {
    title: `${copy.titlePrefix}${cleanId} — ${copy.eyebrow}`,
    description: copy.body,
    alternates: alternatesFor(lang, `/job/${cleanId}`),
    robots: { index: false, follow: true },
  };
}

export default async function SharedJobPage({ params }: PageProps<'/[lang]/job/[id]'>) {
  const { id } = await params;
  const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
  return (
    <>
      <Header />
      <main>
        <SharedJobContent jobId={cleanId} />
      </main>
      <Footer />
    </>
  );
}
