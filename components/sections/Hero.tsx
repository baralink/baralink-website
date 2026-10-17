'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';

const slides = ['/logos/bg.png', '/logos/hero2.png'];

export function Hero() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  // Auto-advance every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative isolate">
      <div className="relative min-h-[560px] overflow-hidden lg:min-h-[640px]">
        {/* Background carousel slides */}
        {slides.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="BaraLink local service in action"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`absolute inset-0 -z-20 object-cover transition-opacity duration-1000 ${
              active === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/20"
          aria-hidden="true"
        />

        {/* Hero content, left-aligned */}
        <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-6 lg:min-h-[640px] lg:px-8">
          <div className="max-w-2xl py-20 text-white">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.titleLine1}
              <br className="hidden sm:block" /> {t.hero.titleLine2}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              {t.hero.description}
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <a
                href="#download"
                data-analytics="download_click"
                data-store="any"
                data-placement="hero"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-base font-semibold text-slate-950 transition hover:bg-accent-dark"
              >
                {t.hero.download}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-slate-950 transition hover:bg-white/90"
              >
                {t.hero.howItWorks}
              </a>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
