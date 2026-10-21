'use client';

import Link from 'next/link';
import { ArrowLeft, BadgeCheck, ChevronRight, ShieldCheck, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { buttonClass } from '@/components/ui/Button';

export function SharedJobContent({ jobId }: { jobId: string }) {
  const { t, href } = useI18n();
  const s = t.sharedJob;

  return (
    <section className="shell section">
      <nav aria-label="Breadcrumb" className="t-ui flex items-center gap-2 text-ink-soft">
        <Link href={href('/')} className="transition-colors duration-200 hover:text-primary">
          {t.nav.home}
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-ink" aria-current="page">
          {s.titlePrefix}
          {jobId}
        </span>
      </nav>

      <div className="mt-10 max-w-[62ch]">
        <h1 className="t-h2">
          {s.titlePrefix}
          {jobId}
        </h1>
        <p className="t-lead mt-5">{s.headline}</p>
        <p className="t-body mt-4 text-ink-soft">{s.body}</p>
      </div>

      <ol className="mt-12 max-w-[62ch] space-y-5">
        {s.steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tile text-[15px] font-semibold text-primary"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="t-body text-ink-soft">{step}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href={`baralink://job/${encodeURIComponent(jobId)}`} className={buttonClass({ size: 'lg' })}>
          <Smartphone className="h-5 w-5" aria-hidden="true" />
          {s.openInApp}
        </a>
        <Link href={href('/')} className={buttonClass({ variant: 'secondary', size: 'lg' })}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {s.backHome}
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="t-lead font-semibold">{s.downloadPrompt}</h2>
        <div className="mt-5">
          <StoreBadges
            placement="shared_job"
            tone="light"
            playAlt={t.stores.play}
            appStoreAlt={t.stores.appStore}
            soon={t.stores.soon}
          />
        </div>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
        {[BadgeCheck, ShieldCheck].map((Icon, index) => (
          <li key={t.hero.trust[index]} className="t-ui flex items-center gap-2 text-ink-soft">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            {t.hero.trust[index]}
          </li>
        ))}
      </ul>
    </section>
  );
}
