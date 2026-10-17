'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Clients and workers side by side, each with its own way in. */
export function Audiences() {
  const { t } = useI18n();
  const cards = [
    { id: 'for-clients', image: '/assets/social/clientbanner.png', text: t.forEveryone.clients, button: t.audiences.clientsButton, placement: 'clients' },
    { id: 'for-workers', image: '/assets/social/workerbanner.png', text: t.forEveryone.workers, button: t.audiences.workersButton, placement: 'workers' },
  ];
  return (
    <section aria-labelledby="audience-title" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeader id="audience-title" eyebrow={t.sections.audienceEyebrow} title={t.forEveryone.sectionTitle} align="center" />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <article id={card.id} key={card.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              {/* The pictures carry their own blue background on the left: show the people, on the right */}
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image src={card.image} alt="" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover object-right" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="text-sm font-semibold text-primary">{card.text.subtitle}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">{card.text.title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{card.text.body}</p>
                <a
                  href="#download"
                  data-analytics="download_click"
                  data-store="any"
                  data-placement={card.placement}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-primary px-6 text-base font-semibold text-white transition hover:bg-primary-dark"
                >
                  {card.button}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
