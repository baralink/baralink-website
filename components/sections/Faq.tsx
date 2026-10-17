'use client';

import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Questions people ask before they download; also given to search engines (FAQPage). */
export function Faq() {
  const { t } = useI18n();
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[2fr_3fr] lg:px-8 lg:py-24">
        <SectionHeader id="faq-title" eyebrow={t.sections.faqEyebrow} title={t.sections.faqTitle} />
        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 sm:px-8">
          {t.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-slate-950 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
