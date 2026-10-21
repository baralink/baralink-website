'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { Locale } from '@/lib/i18n/locales';
import { PHONES, telHref } from '@/lib/contact';
import { Sheet } from '@/components/ui/Sheet';
import { cn } from '@/lib/utils';

const SECTIONS = ['home', 'services', 'how-it-works', 'for-clients', 'for-workers', 'about', 'faq', 'contact'];

/** The section in view, so the top navigation shows where the visitor is. */
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return active;
}

function LanguageSwitcher({ label, className }: { label: string; className?: string }) {
  const { locale, setLocale } = useI18n();
  const options: Locale[] = ['fr', 'en'];
  return (
    <div className={cn('inline-flex items-center', className)} role="group" aria-label={label}>
      {options.map((option, index) => (
        <span key={option} className="inline-flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="t-small text-white/20">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={locale === option}
            className={cn(
              't-small inline-flex min-h-10 items-center px-2 font-semibold uppercase transition-colors duration-200',
              locale === option ? 'text-white' : 'text-white/70 hover:text-white',
            )}
          >
            {option}
          </button>
        </span>
      ))}
    </div>
  );
}

function HeaderAction({
  href,
  label,
  placement,
  full = false,
  onClick,
}: {
  href: string;
  label: string;
  placement: 'header' | 'menu';
  full?: boolean;
  onClick?: () => void;
}) {
  return (
    <span className={cn('on-accent inline-flex', full && 'w-full')}>
      <a
        href={href}
        onClick={onClick}
        data-analytics="download_click"
        data-store="any"
        data-placement={placement}
        className={cn(
          'inline-flex min-h-12 items-center gap-3 rounded-full bg-accent pl-6 pr-1.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-accent-dark',
          full ? 'w-full justify-between' : '',
        )}
      >
        <span>{label}</span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </a>
    </span>
  );
}

export default function Header() {
  const { t, href } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const isHomeRoute = pathname === '/' || pathname === '/fr' || pathname === '/en';

  // Anchors live on the home page: from another page (/privacy) they lead back to it.
  const onHome = (anchor: string) => `${href('/')}${anchor}`;
  const navigation = [
    { name: t.nav.howItWorks, id: 'how-it-works' },
    { name: t.nav.forClients, id: 'for-clients' },
    { name: t.nav.forWorkers, id: 'for-workers' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.faq, id: 'faq' },
    { name: t.nav.contact, id: 'contact' },
  ];
  const sheetNavigation = [{ name: t.nav.services, id: 'services' }, ...navigation];
  const isActive = (id: string) => isHomeRoute && active === id;

  return (
    <div className="sticky top-0 z-50">
      <header className="on-cobalt bg-primary text-white">
        <div className="shell">
          <div className="relative flex h-[72px] items-center justify-between gap-6 xl:h-[84px]">
            <Link href={onHome('#home')} className="flex shrink-0 items-center" aria-label="BaraLink">
              <Image
                src="/logos/baralink-wordmark.png"
                alt=""
                width={1200}
                height={331}
                priority
                className="h-7 w-auto brightness-0 invert md:h-8 lg:h-9"
              />
            </Link>

            <nav
              aria-label={t.nav.menu}
              className="absolute top-1/2 left-1/2 hidden w-max -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white/10 p-1 whitespace-nowrap ring-1 ring-white/15 xl:flex"
            >
              {navigation.map((link) => (
                <Link
                  key={link.id}
                  href={onHome(`#${link.id}`)}
                  aria-current={isActive(link.id) ? 'true' : undefined}
                  className={cn(
                    't-small rounded-full px-2.5 py-2.5 leading-5 font-medium transition-colors duration-200',
                    isActive(link.id) ? 'text-white' : 'text-white/70 hover:text-white',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:block">
                <LanguageSwitcher label={t.nav.language} />
              </div>
              <div className="hidden sm:block">
                <HeaderAction href={onHome('#download')} label={t.nav.download} placement="header" />
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t.nav.menu}
                aria-haspopup="dialog"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 xl:hidden"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy="site-menu-title">
        <div className="flex items-center justify-between">
          <h2 id="site-menu-title" className="t-lead font-semibold">
            {t.nav.menu}
          </h2>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              ×
            </span>
            <span className="visually-hidden">{t.invitation.close}</span>
          </button>
        </div>

        <nav aria-label={t.nav.menu} className="mt-8 flex flex-col">
          {sheetNavigation.map((link) => (
            <Link
              key={link.id}
              href={onHome(`#${link.id}`)}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(link.id) ? 'true' : undefined}
              className={cn(
                'py-3 text-[19px] leading-6 font-medium transition-colors duration-200',
                isActive(link.id) ? 'text-white' : 'text-white/75 hover:text-white',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <LanguageSwitcher label={t.nav.language} />
        </div>

        <div className="mt-6">
          <HeaderAction
            href={onHome('#download')}
            label={t.hero.download}
            placement="menu"
            full
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {PHONES.map((phone) => (
            <a
              key={phone}
              href={telHref(phone)}
              data-analytics="contact_click"
              data-method="phone"
              className="t-ui text-white/70 transition-colors duration-200 hover:text-white"
            >
              {phone}
            </a>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
