import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { DeleteAccountContent } from './DeleteAccountContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/delete-account'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const del = dictionaries[lang].deleteAccount;
  return {
    title: del.title,
    description: del.metaDescription,
    alternates: alternatesFor(lang, '/delete-account'),
  };
}

export default function DeleteAccountPage() {
  return (
    <>
      <Header />
      <main>
        <DeleteAccountContent />
      </main>
      <Footer />
    </>
  );
}
