'use client';

export function BannerCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      {/* Main Content Card with Background Pattern & Reduced Height */}
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-tl-[40px] rounded-br-[40px] sm:rounded-tl-[70px] sm:rounded-br-[70px] bg-primary px-8 py-8 text-center shadow-xl sm:px-12 sm:py-10 lg:px-16 lg:py-12">
        {/* Background Subtle Outline Pattern inside child card */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full stroke-white opacity-15"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="banner-pattern-child"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 20 C45 20 35 32 35 47 C35 65 60 90 60 90 C60 90 85 65 85 47 C85 32 75 20 60 20 Z"
                fill="none"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-pattern-child)" />
        </svg>

        {/* Title */}
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Your One-Stop Home Solutions Provider
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
          From the app to the comforts of your home.
        </p>

        {/* Paragraph Description */}
        <p className="mx-auto mt-4 max-w-3xl text-sm font-normal leading-relaxed text-white/85 sm:text-base sm:leading-7">
          BaraLink introduces an integrated home services mobile application with a
          large selection of technical experts covering all aspects of household
          care. Our platform bridges the gap in the market to offer users
          convenient access to a network of trusted and quality service
          providers. We are committed to enhancing consumer accessibility and
          convenience, playing a key role in revolutionising home services.
        </p>
      </div>
    </section>
  );
}