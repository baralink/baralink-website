'use client';

import Image from "next/image";
import { useI18n } from "@/lib/i18n/I18nProvider";

const phones = [
  "/assets/phones/phone2.png",
  "/assets/phones/phone2.png",
  "/assets/phones/phone2.png",
];

export function HowItWorks() {
  const { t } = useI18n();
  const steps = t.how.steps;
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-primary text-white"
    >
      {/* Tropical foliage pattern texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full fill-white/[0.025]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hiw-leaves"
            width="300"
            height="300"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(8)"
          >
            {/* palm fan */}
            <g transform="translate(60 70)">
              <path d="M0 0 C-10 -34 -4 -62 2 -78 C8 -62 14 -34 4 0 Z" />
              <path d="M0 0 C-30 -22 -46 -46 -56 -66 C-34 -58 -8 -40 2 -4 Z" />
              <path d="M0 0 C30 -22 46 -46 56 -66 C34 -58 8 -40 -2 -4 Z" />
              <path d="M0 0 C-40 -6 -70 -8 -92 -8 C-70 4 -34 12 2 2 Z" />
              <path d="M0 0 C40 -6 70 -8 92 -8 C70 4 34 12 -2 2 Z" />
            </g>
            {/* monstera-style leaf */}
            <g transform="translate(220 210) rotate(25)">
              <path d="M0 0 C40 -10 70 -44 78 -92 C40 -84 6 -58 -8 -16 C-6 -40 2 -66 20 -92 C-24 -78 -46 -40 -40 6 C-26 -6 -8 -8 0 0 Z" />
            </g>
            {/* fern frond (solid leaflets, no bright strokes) */}
            <g transform="translate(170 100) rotate(-20)">
              <path d="M0 0 C6 -40 4 -78 0 -110 C-4 -78 -6 -40 0 0 Z" />
              <path d="M-2 -18 C-16 -22 -26 -34 -34 -48 C-20 -40 -8 -32 0 -24 Z" />
              <path d="M2 -18 C16 -22 26 -34 34 -48 C20 -40 8 -32 0 -24 Z" />
              <path d="M-2 -42 C-14 -46 -22 -56 -28 -68 C-16 -60 -6 -54 0 -48 Z" />
              <path d="M2 -42 C14 -46 22 -56 28 -68 C16 -60 6 -54 0 -48 Z" />
            </g>
            {/* small leaf cluster */}
            <g transform="translate(40 240) rotate(10)">
              <path d="M0 0 C24 -8 42 -28 48 -58 C24 -52 4 -36 -6 -10 Z" />
              <path d="M0 0 C-24 -8 -42 -28 -48 -58 C-24 -52 -4 -36 6 -10 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hiw-leaves)" />
      </svg>
      {/* soft glow accents over the pattern */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading, intro, steps */}
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.how.heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              {t.how.intro}
            </p>

            {/* Vertical step list with connected dots */}
            <ol className="mt-12 space-y-0">
              {steps.map((step, i) => (
                <li key={step} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent" />
                    {i < steps.length - 1 && (
                      <span className="my-1 w-px flex-1 bg-white/20" />
                    )}
                  </div>
                  <p className="pb-8 text-base font-semibold text-white">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: three overlapping phones fanned out */}
          <div className="flex items-center justify-center lg:justify-end">
            {phones.map((src, i) => {
              // left tilts left, middle upright (on top), right tilts right
              const style =
                i === 0
                  ? "-rotate-[14deg] translate-y-6 -mr-20 z-10"
                  : i === 1
                    ? "rotate-0 z-20"
                    : "rotate-[14deg] translate-y-6 -ml-20 z-10";
              return (
                <Image
                  key={i}
                  src={src}
                  alt="BaraLink app screen"
                  width={1024}
                  height={1536}
                  className={`relative h-auto w-full max-w-[190px] object-contain drop-shadow-2xl transition-transform duration-500 hover:z-30 sm:max-w-[230px] ${style}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
