'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    title: 'Search what you need',
    description:
      'Pick a service and your neighborhood. See verified workers nearby with ratings and real reviews.',
  },
  {
    title: 'Book someone you trust',
    description:
      'Send a request, agree on the job, and get a fast response. No more waiting on referrals.',
  },
  {
    title: 'Rate and build trust',
    description:
      "Pay, leave a review, and help good workers grow. If something's off, raise it in a tap.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Reveal animations once the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-primary text-white"
    >
      {/* Ambient floating blobs */}
      <div
        className="animate-float pointer-events-none absolute -left-20 top-10 -z-0 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-float pointer-events-none absolute -right-16 bottom-0 -z-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Heading */}
        <div
          className={`max-w-2xl reveal ${visible ? 'animate-rise' : ''}`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            How it works
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
            Three steps. No phone tag.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/75">
            From &ldquo;who do I call?&rdquo; to a verified worker at your door
            &mdash; without the group chats.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-10 sm:gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`group relative reveal ${visible ? 'animate-rise' : ''}`}
              style={visible ? { animationDelay: `${0.15 + i * 0.15}s` } : undefined}
            >
              {/* growing connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <span
                  className={`absolute left-14 top-7 hidden h-px w-full bg-white/20 md:block ${
                    visible ? 'animate-line' : ''
                  }`}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-lg font-semibold text-slate-950 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
