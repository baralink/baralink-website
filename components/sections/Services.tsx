'use client';

import { Car, Droplets, Hammer, PaintRoller, Snowflake, Sparkles, Truck, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Same order as the dictionary's services: some of the app's categories.
const ICONS = [Droplets, Zap, Sparkles, PaintRoller, Hammer, Snowflake, Car, Truck];

export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeader id="services-title" eyebrow={t.sections.servicesEyebrow} title={t.sections.servicesTitle} align="center" />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.services.map((name, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={name}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold text-slate-900">{name}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-base text-slate-600">{t.sections.servicesMore}</p>
      </div>
    </section>
  );
}
