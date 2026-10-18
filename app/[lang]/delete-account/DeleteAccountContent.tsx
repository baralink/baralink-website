'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldAlert, Smartphone, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PHONES, SUPPORT_EMAIL, telHref } from '@/lib/contact';

export function DeleteAccountContent() {
  const { t, href } = useI18n();
  const d = t.deleteAccount;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          BaraLink
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{d.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{d.updated}</p>
        <p className="mt-6 text-base leading-7 text-slate-700">{d.intro}</p>

        {/* Two ways to delete */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-semibold text-slate-950">{d.inAppTitle}</h2>
            </div>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {d.inAppSteps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">{d.webTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{d.webBody}</p>
              <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p>
                  {PHONES.map((p, idx) => (
                    <span key={p}>
                      {idx > 0 && ' · '}
                      <a
                        href={telHref(p)}
                        data-analytics="contact_click"
                        data-method="phone"
                        className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                      >
                        {p}
                      </a>
                    </span>
                  ))}
                </p>
                <p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    data-analytics="contact_click"
                    data-method="email"
                    className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
            <Link
              href={`${href('/')}#contact`}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              {d.webButton}
            </Link>
          </section>
        </div>

        {/* What is deleted vs kept */}
        <section className="mt-10 border-t border-slate-100 pt-8">
          <h2 className="text-xl font-semibold text-slate-950">{d.whatHappensTitle}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <h3 className="text-base font-semibold">{d.deletedTitle}</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
                {d.deletedItems.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6">
              <div className="flex items-center gap-2.5 text-amber-950">
                <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                <h3 className="text-base font-semibold">{d.keptTitle}</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
                {d.keptItems.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-12 border-t border-slate-100 pt-8">
          <Link
            href={href('/')}
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {d.back}
          </Link>
        </div>
      </div>
    </article>
  );
}
