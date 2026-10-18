import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { PaymentResultContent } from '../PaymentResultContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/payment/failure'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const copy = dictionaries[lang].paymentResult.failure;
  return {
    title: copy.title,
    description: copy.body,
    alternates: alternatesFor(lang, '/payment/failure'),
    robots: { index: false, follow: false },
  };
}

export default function PaymentFailurePage() {
  return (
    <>
      <Header />
      <main>
        <PaymentResultContent outcome="failure" />
      </main>
      <Footer />
    </>
  );
}
