'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-primary text-white flex items-center"
    >
      <div
        className="absolute inset-y-0 left-0 -z-20 hidden w-[78%] bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/logos/bg.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 -z-10 hidden w-[78%] bg-[linear-gradient(90deg,rgba(26,26,230,0.85),rgba(26,26,230,0.72),rgba(26,26,230,0.45))] lg:block"
        aria-hidden="true"
      />

      {/* Right Side Vertical Color Block (Matches the yellow block from screenshot) */}
      <div
        className="absolute top-0 right-0 bottom-0 -z-10 h-full w-full lg:w-[36%] bg-accent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column - Typography & App Store Links */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            
            {/* Headline (Split styling matching screenshot typography) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              <span className="block text-accent">
                Find trusted workers
              </span>
              <span className="block text-white mt-1">
                near you.
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-base sm:text-lg text-white/85 font-normal leading-relaxed">
              Book verified local workers for repairs, cleaning, delivery and
              everyday services.
            </p>

            {/* App Store Links (Clean direct PNGs, side-by-side) */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
              <a
                href="#download"
                aria-label="Download on the App Store"
                className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Image
                  src="/assets/social/appleStore.png"
                  alt="Download on the App Store"
                  width={164}
                  height={49}
                  className="h-32 w-auto object-contain"
                />
              </a>

              <a
                href="#download"
                aria-label="Get it on Google Play"
                className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Image
                  src="/assets/social/googlePlay.png"
                  alt="Get it on Google Play"
                  width={164}
                  height={49}
                  className="h-32 w-auto object-contain"
                />
              </a>
            </div>

          </div>

          {/* Right Column - Teardrop Pin Shape + Phone PNG */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            {/* Teardrop / Location Badge Shape (Matches the orange shape from screenshot) */}
            <div className="absolute h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:h-[450px] lg:w-[450px] bg-[#FFF] rounded-[50%] rounded-bl-none rotate-45 shadow-2xl" />

            {/* Transparent Phone PNG Overlay */}
            <div className="relative z-10 flex items-center justify-center">
              <Image
                src="/assets/phones/phone2.png"
                alt="BaraLink mobile app preview"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[330px] object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}