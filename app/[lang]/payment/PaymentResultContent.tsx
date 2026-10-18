'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle2, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function PaymentResultContent({ outcome }: { outcome: 'success' | 'failure' }) {
  const { t, href } = useI18n();
  const isSuccess = outcome === 'success';
  const copy = isSuccess ? t.paymentResult.success : t.paymentResult.failure;
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:p-12">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
            isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}
        >
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>

        <p
          className={`mt-5 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
            isSuccess ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
          }`}
        >
          {copy.badge}
        </p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{copy.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{copy.body}</p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left text-sm leading-6 text-slate-600">
          {copy.hint}
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="baralink://"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
          >
            <Smartphone className="h-5 w-5" aria-hidden="true" />
            {copy.openApp}
          </a>
          <Link
            href={href('/')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
