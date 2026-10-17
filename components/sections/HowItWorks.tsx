'use client';

import { CheckCircle2, Search, Wallet } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ICONS = [Search, Wallet, CheckCircle2];

/** Three numbered steps, each a card. */
export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeader id="how-title" eyebrow={t.sections.howEyebrow} title={t.how.heading} intro={t.how.intro} align="center" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {t.how.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.title} className="relative rounded-3xl border border-slate-200 bg-slate-50/60 p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-5xl font-semibold text-slate-200" aria-hidden="true">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
