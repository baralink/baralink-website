'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { Accordion } from '@/components/ui/Accordion';

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 id="faq-title" className="t-h2 max-w-[14ch]" data-rise>
            {t.sections.faqTitle}
          </h2>
          <div data-rise>
            <Accordion items={t.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}
