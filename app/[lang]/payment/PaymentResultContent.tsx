'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle2, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { buttonClass } from '@/components/ui/Button';

export function PaymentResultContent({ outcome }: { outcome: 'success' | 'failure' }) {
  const { t, href } = useI18n();
  const isSuccess = outcome === 'success';
  const copy = isSuccess ? t.paymentResult.success : t.paymentResult.failure;
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <section className="shell section">
      <div className="max-w-[60ch]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tile text-primary">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="t-h2 mt-7">{copy.title}</h1>
        <p className="t-body mt-5 text-ink-soft">{copy.body}</p>
        <p className="t-ui mt-6 max-w-[58ch] text-ink-soft">{copy.hint}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="baralink://" className={buttonClass({ size: 'lg' })}>
            <Smartphone className="h-5 w-5" aria-hidden="true" />
            {copy.openApp}
          </a>
          <Link href={href('/')} className={buttonClass({ variant: 'secondary', size: 'lg' })}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {copy.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
