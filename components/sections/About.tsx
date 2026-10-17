'use client';

import Image from "next/image";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: the phone screenshot */}
          <div className="relative flex justify-center lg:order-1 lg:justify-start">
            {/* Soft shape behind the phone */}
            <div
              className="absolute -z-10 h-[380px] w-[380px] rounded-[42%] bg-accent/15 sm:h-[460px] sm:w-[460px]"
              aria-hidden="true"
            />
            <Image
              src="/assets/phones/phone2.png"
              alt="BaraLink mobile app preview"
              width={1024}
              height={1536}
              className="h-auto w-full max-w-[300px] object-contain drop-shadow-2xl sm:max-w-[340px]"
            />
          </div>

          {/* Right: content */}
          <div className="max-w-xl lg:order-2">
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.headline} intro={t.about.body} />

            {/* Minimal stat line */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {t.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
