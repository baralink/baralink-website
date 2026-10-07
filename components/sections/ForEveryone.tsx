'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type TabKey = 'clients' | 'workers';

const content: Record<
  TabKey,
  {
    anchor: string;
    eyebrow: string;
    heading: string;
    body: string;
    points: string[];
    cta: string;
    image: string;
    imageAlt: string;
  }
> = {
  clients: {
    anchor: 'for-clients',
    eyebrow: 'For clients',
    heading: 'Get it fixed, without the guesswork.',
    body: 'Find someone reliable in minutes instead of asking around for days. Every worker is verified, rated, and easy to reach.',
    points: [
      'Verified profiles you can actually trust',
      'Real ratings and reviews from neighbors',
      'A fast way to raise an issue if a job goes wrong',
    ],
    cta: 'Find a worker',
    image: '/assets/social/client.png',
    imageAlt: 'A client booking a service on BaraLink',
  },
  workers: {
    anchor: 'for-workers',
    eyebrow: 'For workers',
    heading: 'More jobs, beyond who you already know.',
    body: 'Build a reputation that follows you. Get discovered by new clients in your area and turn good work into steady demand.',
    points: [
      'Reach clients outside your personal network',
      'Keep a rating and history that are yours',
      'Steadier work from repeat customers',
    ],
    cta: 'Join as a worker',
    image: '/assets/social/worker.png',
    imageAlt: 'A verified worker on the job',
  },
};

export function ForEveryone() {
  const [tab, setTab] = useState<TabKey>('clients');
  const active = content[tab];

  // Switch to the right tab when arriving via #for-workers / #for-clients
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#for-workers') setTab('workers');
      else if (window.location.hash === '#for-clients') setTab('clients');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section
      id="for-clients"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      {/* anchor target for the workers nav link */}
      <span id="for-workers" className="relative -top-24 block" aria-hidden="true" />

      {/* Row tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-slate-100 p-1.5">
          {(Object.keys(content) as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-8 ${
                tab === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {content[key].eyebrow}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div
        key={tab}
        className="mt-14 grid animate-rise items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* Text — order flips per tab so it feels less templated */}
        <div className={tab === 'workers' ? 'lg:order-2' : ''}>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {active.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-slate-950 sm:text-4xl lg:text-[2.75rem]">
            {active.heading}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
            {active.body}
          </p>

          <ul className="mt-8 space-y-4">
            {active.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-base text-slate-700">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
            >
              {active.cta}
            </a>
          </div>
        </div>

        {/* Image */}
        <div
          className={`flex justify-center ${
            tab === 'workers' ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'
          }`}
        >
          <div className="relative w-full max-w-[320px] overflow-hidden rounded-3xl shadow-xl sm:max-w-[360px]">
            <Image
              src={active.image}
              alt={active.imageAlt}
              width={2160}
              height={2700}
              className="aspect-[4/5] h-full w-full object-cover"
            />
            {/* soft tint for cohesion */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
