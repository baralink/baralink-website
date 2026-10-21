'use client';

import Link from 'next/link';
import { CheckCircle2, ShieldAlert, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PHONES, SUPPORT_EMAIL, telHref } from '@/lib/contact';
import { buttonClass } from '@/components/ui/Button';
import { LegalArticle, LegalBack, LegalSection } from '@/components/legal/LegalArticle';

export function DeleteAccountContent() {
  const { t, href } = useI18n();
  const d = t.deleteAccount;

  return (
    <LegalArticle title={d.title} updated={d.updated} intro={d.intro}>
      <div className="mt-2 grid gap-10 md:grid-cols-2">
        <section>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tile text-primary">
              <Smartphone className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="t-lead font-semibold">{d.inAppTitle}</h2>
          </div>
          <ol className="mt-6 space-y-4">
            {d.inAppSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tile text-[15px] font-semibold text-primary"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="t-body text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="t-lead font-semibold">{d.webTitle}</h2>
          <p className="t-body mt-4 text-ink-soft">{d.webBody}</p>
          <ul className="mt-5 space-y-2">
            {PHONES.map((phone) => (
              <li key={phone}>
                <a
                  href={telHref(phone)}
                  data-analytics="contact_click"
                  data-method="phone"
                  className="t-ui font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-analytics="contact_click"
                data-method="email"
                className="t-ui font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
              >
                {SUPPORT_EMAIL}
              </a>
            </li>
          </ul>
          <Link href={`${href('/')}#contact`} className={buttonClass({ className: 'mt-6' })}>
            {d.webButton}
          </Link>
        </section>
      </div>

      <LegalSection id="what-happens" title={d.whatHappensTitle}>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-[28px] bg-tile p-7">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <h3 className="t-lead font-semibold">{d.deletedTitle}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {d.deletedItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span className="t-body text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-tile p-7">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <h3 className="t-lead font-semibold">{d.keptTitle}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {d.keptItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span className="t-body text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LegalSection>

      <LegalBack label={d.back} />
    </LegalArticle>
  );
}
