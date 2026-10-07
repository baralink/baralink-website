'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function ForEveryone() {
  const { t } = useI18n();
  const slides = [
    {
      key: 'clients',
      tab: t.forEveryone.tabClients,
      title: t.forEveryone.clients.title,
      subtitle: t.forEveryone.clients.subtitle,
      body: t.forEveryone.clients.body,
      image: '/assets/social/clientbanner.png',
      imageAlt: 'A happy BaraLink client',
    },
    {
      key: 'workers',
      tab: t.forEveryone.tabWorkers,
      title: t.forEveryone.workers.title,
      subtitle: t.forEveryone.workers.subtitle,
      body: t.forEveryone.workers.body,
      image: '/assets/social/workerbanner.png',
      imageAlt: 'A BaraLink verified worker',
    },
  ];
  const [active, setActive] = useState(0);

  // Auto-advance between the two slides
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="for-clients" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <span id="for-workers" className="relative -top-24 block" aria-hidden="true" />

      {/* Title + switch tabs */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {t.forEveryone.sectionTitle}
        </h2>
        <div className="inline-flex rounded-full bg-slate-100 p-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-8 ${
                active === i
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {slide.tab}
            </button>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[20px] sm:rounded-[28px]">
        <div className="relative aspect-[1774/887]">
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active === i ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {/* Image full-bleed (gradient baked in) */}
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={i === 0}
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />

              {/* Text overlaid on the left */}
              <div className="relative z-10 flex h-full max-w-[55%] flex-col justify-center px-5 text-white sm:max-w-md sm:px-10 lg:px-14">
                <h3 className="text-base font-extrabold leading-[1.1] sm:text-3xl lg:text-5xl">
                  {slide.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-white/85 sm:mt-3 sm:text-lg lg:text-xl">
                  {slide.subtitle}
                </p>
                <p className="mt-2 hidden text-sm leading-6 text-white/75 sm:mt-4 sm:block sm:text-base sm:leading-7">
                  {slide.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators — centered, outside the image */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${slide.key}`}
            aria-current={active === i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === i
                ? 'w-8 bg-primary'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
