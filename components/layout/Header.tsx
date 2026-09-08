'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full shadow-sm">
      <div className="bg-[var(--color-primary)] text-white text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium">
              🎉 Welcome to BaraLink! The new mobile app is now available for download.
            </span>
          </div>
          <div className="flex items-center space-x-4 text-white/90">
            <a 
              href="tel:+18005550199" 
              className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              +1 (800) 555-0199
            </a>
          </div>
        </div>
      </div>

      <header className="w-full bg-white text-[var(--foreground)] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div>
                  <Image
                    src="/logos/BaraLink-Logo-white.png"
                    alt="BaraLink Logo"
                    width={220}
                    height={80}
                    className="h-30 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
              <Link href="#home" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-slate-700 hover:text-[var(--color-primary)] transition-colors">
                About Us
              </Link>
              <Link href="#how-it-works" className="text-slate-700 hover:text-[var(--color-primary)] transition-colors">
                How it works
              </Link>
              <Link href="#for-clients" className="text-slate-700 hover:text-[var(--color-primary)] transition-colors">
                For Clients
              </Link>
              <Link href="#for-workers" className="text-slate-700 hover:text-[var(--color-primary)] transition-colors">
                For Workers
              </Link>
              <Link href="#contact" className="text-slate-700 hover:text-[var(--color-primary)] transition-colors">
                Contact Us
              </Link>
            </nav>

            <div className="hidden md:flex items-center">
              <Link
                href="#download"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all shadow-sm hover:shadow"
              >
                Download the App
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <Link
              href="#home"
              className="block font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="block font-medium text-slate-700 hover:text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#how-it-works"
              className="block font-medium text-slate-700 hover:text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#for-clients"
              className="block font-medium text-slate-700 hover:text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Clients
            </Link>
            <Link
              href="#for-workers"
              className="block font-medium text-slate-700 hover:text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Workers
            </Link>
            <Link
              href="#contact"
              className="block font-medium text-slate-700 hover:text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-2">
              <Link
                href="#download"
                className="block w-full text-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download the App
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}