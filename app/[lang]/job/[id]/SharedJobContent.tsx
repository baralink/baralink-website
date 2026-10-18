'use client';

import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Briefcase, ShieldCheck, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { StoreBadges } from '@/components/ui/StoreBadges';

export function SharedJobContent({ jobId }: { jobId: string }) {
  const { t, href } = useI18n();
  const s = t.sharedJob;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        {/* Top banner */}
        <div className="bg-primary px-8 py-8 text-white sm:px-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            {s.eyebrow}
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {s.titlePrefix}
            {jobId} — {s.headline}
          </h1>
          <p className="mt-3 text-base leading-7 text-white/85">{s.body}</p>
        </div>

        {/* Body */}
        <div className="p-8 sm:p-12">
          <ol className="space-y-4">
            {s.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`baralink://job/${encodeURIComponent(jobId)}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
            >
              <Smartphone className="h-5 w-5" aria-hidden="true" />
              {s.openInApp}
            </a>
            <Link
              href={href('/')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {s.backHome}
            </Link>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{s.downloadPrompt}</p>
            <StoreBadges placement="shared_job" />
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-xs font-medium text-slate-500">
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              {t.hero.trust[0]}
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              {t.hero.trust[1]}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
