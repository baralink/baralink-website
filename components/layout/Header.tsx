'use client';

import { useState, useEffect } from 'react';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { Locale } from '@/lib/i18n/locales';
import { PHONES, telHref } from '@/lib/contact';
import { CallButton } from '@/components/ui/CallButton';

function Flag({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    // France tricolor
    return (
      <svg className="h-3.5 w-5 shrink-0 rounded-[2px]" viewBox="0 0 9 6" aria-hidden="true">
        <rect width="3" height="6" x="0" fill="#0055A4" />
        <rect width="3" height="6" x="3" fill="#fff" />
        <rect width="3" height="6" x="6" fill="#EF4135" />
      </svg>
    );
  }
  // United Kingdom (English)
  return (
    <svg className="h-3.5 w-5 shrink-0 rounded-[2px]" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="uk-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const options: Locale[] = ['fr', 'en'];
  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLocale(opt)}
          aria-pressed={locale === opt}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === opt
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flag locale={opt} />
          {opt}
        </button>
      ))}
    </div>
  );
}

const SECTIONS = ['home', 'how-it-works', 'for-clients', 'for-workers', 'about', 'faq', 'contact'];

/** The section in view, so the menu shows where the visitor is. */
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

export default function Header() {
  const { t, href } = useI18n();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const isHomeRoute = pathname === '/' || pathname === '/fr' || pathname === '/en';

  // Lock body scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Anchors of the home page: from another page (/privacy) they lead back to it.
  const onHome = (anchor: string) => `${href('/')}${anchor}`;
  const navLinks = [
    { name: t.nav.howItWorks, id: 'how-it-works' },
    { name: t.nav.forClients, id: 'for-clients' },
    { name: t.nav.forWorkers, id: 'for-workers' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.faq, id: 'faq' },
    { name: t.nav.contact, id: 'contact' },
  ];
  const isActive = (id: string) => isHomeRoute && active === id;

  return (
    <div className={`sticky top-0 z-50 w-full transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Clean utility bar */}
      <div className="border-b border-white/10 bg-primary px-3 py-1.5 text-xs text-white/95 sm:px-4 lg:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 sm:justify-between">
          <p className="flex items-center gap-1.5 truncate font-medium">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span>{t.announcement}</span>
          </p>
          <div className="hidden items-center gap-4 font-semibold md:flex">
            {PHONES.map((phone) => (
              <a
                key={phone}
                href={telHref(phone)}
                data-analytics="contact_click"
                data-method="phone"
                className="inline-flex items-center gap-1.5 text-white/90 transition hover:text-accent"
              >
                <Phone className="h-3 w-3 text-accent" aria-hidden="true" />
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="w-full border-b border-slate-100 bg-white/95 text-[var(--foreground)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <Link href={onHome('#home')} className="group flex shrink-0 items-center" aria-label="BaraLink">
              <Image
                src="/logos/BaraLink-Logo-white.png"
                alt="BaraLink"
                width={300}
                height={330}
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-20"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-semibold xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={onHome(`#${link.id}`)}
                  aria-current={isActive(link.id) ? 'true' : undefined}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive(link.id) ? 'text-primary' : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {link.name}
                  {isActive(link.id) && (
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <CallButton />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="relative z-50 rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 xl:hidden"
                aria-label={t.nav.menu}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
            mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute left-0 top-full z-40 w-full transform border-b border-slate-200/80 bg-white shadow-2xl transition-all duration-300 ease-in-out xl:hidden ${
            mobileMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0'
          }`}
        >
          <div className="mx-auto max-w-7xl space-y-1 px-6 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={onHome(`#${link.id}`)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 ${
                  isActive(link.id)
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-4 sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
