'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { Locale } from '@/lib/i18n/locales';
import { PHONES, telHref } from '@/lib/contact';

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

function StoreBadges({ mobile = false }: { mobile?: boolean }) {
  const size = mobile ? 'h-16' : 'h-20';
  return (
    <>
      <a
        href="#download"
        data-analytics="download_click"
        data-store="app_store"
        data-placement="header"
        aria-label="Download on the App Store"
        className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Image
          src="/assets/social/appleStore.png"
          alt="Download on the App Store"
          width={800}
          height={800}
          className={`${size} w-auto object-contain`}
        />
      </a>
      <a
        href="#download"
        data-analytics="download_click"
        data-store="play"
        data-placement="header"
        aria-label="Get it on Google Play"
        className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Image
          src="/assets/social/googlePlay.png"
          alt="Get it on Google Play"
          width={800}
          height={800}
          className={`${size} w-auto object-contain`}
        />
      </a>
    </>
  );
}

export default function Header() {
  const { t, href } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.nav.home, href: '#home', active: true },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.howItWorks, href: '#how-it-works' },
    { name: t.nav.forClients, href: '#for-clients' },
    { name: t.nav.forWorkers, href: '#for-workers' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[var(--color-primary)] text-white text-xs sm:text-sm py-1 px-3 sm:px-4 lg:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 truncate">
            <span className="hidden xs:inline-block shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              NEW
            </span>
            <span className="font-medium truncate">
              {t.announcement}
            </span>
          </div>
          <div className="shrink-0 flex items-center text-white/90">
            <a 
              href={telHref(PHONES[0])}
              data-analytics="contact_click"
              data-method="phone"
              className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-xs sm:text-sm"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="hidden sm:inline">{PHONES[0]}</span>
              <span className="sm:hidden">{t.callUs}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md text-[var(--foreground)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={href('/')} className="flex items-center group">
                <div className="relative">
                  <Image
                    src="/logos/BaraLink-Logo-white.png"
                    alt="BaraLink Logo"
                    width={300}
                    height={330}
                    className="h-16 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    link.active
                      ? 'text-[var(--color-primary)] font-bold'
                      : 'text-slate-700 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {link.name}
                  {link.active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Store Badges + Language */}
            <div className="hidden lg:flex items-center gap-4">
              <StoreBadges />
              <LanguageSwitcher />
            </div>

            {/* Mobile Store Badges (centered next to logo) */}
            <div className="flex lg:hidden items-center gap-2.5">
              <StoreBadges mobile />
            </div>

            {/* Mobile Menu Trigger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="relative z-50 p-2.5 rounded-xl text-slate-700 hover:bg-slate-100/80 active:bg-slate-200 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                    }`}
                  />
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Backdrop Overlay for Mobile Drawer */}
        <div
          className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

      
        <div
          className={`absolute top-full left-0 w-full bg-white border-b border-slate-200/80 shadow-2xl z-40 transition-all duration-300 ease-in-out transform lg:hidden ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100 visible'
              : '-translate-y-4 opacity-0 invisible'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  link.active
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${link.active ? 'text-[var(--color-primary)]' : 'text-slate-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 mt-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}