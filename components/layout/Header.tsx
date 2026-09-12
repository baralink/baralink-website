'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
    { name: 'Home', href: '#home', active: true },
    { name: 'About Us', href: '#about' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'For Clients', href: '#for-clients' },
    { name: 'For Workers', href: '#for-workers' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[var(--color-primary)] text-white text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 truncate">
            <span className="hidden xs:inline-block shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              NEW
            </span>
            <span className="font-medium truncate">
              🎉 Welcome to BaraLink! The new mobile app is now available for download.
            </span>
          </div>
          <div className="shrink-0 flex items-center text-white/90">
            <a 
              href="tel:+18005550199" 
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
              <span className="hidden sm:inline">+1 (800) 555-0199</span>
              <span className="sm:hidden">Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md text-[var(--foreground)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image
                    src="/logos/BaraLink-Logo-white.png"
                    alt="BaraLink Logo"
                    width={220}
                    height={80}
                    className="h-32 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="#download"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Download the App
              </Link>
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

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                href="#download"
                className="flex items-center justify-center w-full px-6 py-3.5 rounded-xl text-base font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.98] transition-all shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download the App
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}