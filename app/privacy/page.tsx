import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy policy | BaraLink',
  description: 'What BaraLink collects, why, who it is shared with, and your choices — usage statistics included.',
  alternates: { canonical: 'https://baralink.org/privacy' },
};

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
