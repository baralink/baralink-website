import Image from "next/image";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: short, confident intro */}
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            About BaraLink
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-slate-950 sm:text-4xl lg:text-5xl">
            Trust shouldn&rsquo;t depend on who you know.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We help people in Guinea find verified local workers in minutes
            &mdash; and help skilled workers build a reputation they own.
          </p>

          {/* Minimal stat line */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: the one phone screenshot */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Soft shape behind the phone */}
          <div
            className="absolute -z-10 h-[380px] w-[380px] rounded-[42%] bg-accent/15 blur-0 sm:h-[460px] sm:w-[460px]"
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
      </div>
    </section>
  );
}

const stats = [
  { value: "96%", label: "of work is informal" },
  { value: "84.6%", label: "have a phone" },
  { value: "1 city", label: "to start" },
];
