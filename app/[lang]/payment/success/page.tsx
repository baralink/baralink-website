import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dictionaries } from '@/lib/i18n/dictionaries';
import { alternatesFor, hasLocale } from '@/lib/i18n/locales';
import { PaymentResultContent } from '../PaymentResultContent';

export async function generateMetadata({ params }: PageProps<'/[lang]/payment/success'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const copy = dictionaries[lang].paymentResult.success;
  return {
    title: copy.title,
    description: copy.body,
    alternates: alternatesFor(lang, '/payment/success'),
    robots: { index: false, follow: false },
  };
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main>
        <PaymentResultContent outcome="success" />
      </main>
      <Footer />
    </>
  );
}
