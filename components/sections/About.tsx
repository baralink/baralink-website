'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { riseDelay } from '@/lib/utils';

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" aria-labelledby="about-title" className="bg-white">
      <div className="shell section">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <h2 id="about-title" className="t-h2 max-w-[16ch]" data-rise>
              {t.about.headline}
            </h2>
            <p className="t-lead mt-6 max-w-[44ch]" data-rise style={riseDelay(70)}>
              {t.about.body}
            </p>

            <p className="t-body mt-12 max-w-[46ch] text-ink-soft" data-rise>
              {t.about.context}
            </p>

            <dl className="mt-6 grid gap-8 sm:grid-cols-3">
              {t.about.stats.map((stat, index) => (
                <div key={stat.label} className="flex flex-col-reverse" data-rise style={riseDelay(index * 70)}>
                  <dt className="t-ui mt-2 max-w-[22ch] text-ink-soft">{stat.label}</dt>
                  <dd className="t-h2">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="media aspect-[4/5] w-full max-w-[440px] justify-self-center lg:justify-self-end" data-rise>
            <Image
              src="/assets/social/client.png"
              alt={t.about.photoAlt}
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
