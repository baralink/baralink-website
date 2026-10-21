'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

/** The shared frame of the legal and payment pages: one flat reading column, no boxes. */
export function LegalArticle({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="shell section">
      <div className="max-w-[74ch]">
        <LegalBreadcrumb current={title} />
        <h1 className="t-h2 mt-10">{title}</h1>
        {updated && <p className="t-ui mt-4 text-ink-soft">{updated}</p>}
        {intro && <p className="t-body mt-6 text-ink-soft">{intro}</p>}
      </div>
      <div className="mt-12 max-w-[74ch]">{children}</div>
    </article>
  );
}

export function LegalBreadcrumb({ current }: { current: string }) {
  const { t, href } = useI18n();
  return (
    <nav aria-label="Breadcrumb" className="t-ui flex items-center gap-2 text-ink-soft">
      <Link href={href('/')} className="transition-colors duration-200 hover:text-primary">
        {t.nav.home}
      </Link>
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
      <span className="text-ink" aria-current="page">
        {current}
      </span>
    </nav>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-32">
      <h2 className="t-lead font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return <p className="t-body mt-3 text-ink-soft">{children}</p>;
}

export function LegalBack({ label }: { label: string }) {
  const { href } = useI18n();
  return (
    <Link
      href={href('/')}
      className="t-ui mt-16 inline-flex items-center gap-2 font-semibold text-primary transition-colors duration-200 hover:text-primary-dark"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
