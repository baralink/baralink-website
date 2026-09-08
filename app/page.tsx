const features = [
  {
    title: "Smart lead capture",
    description:
      "Turn inbound interest into structured pipelines with automated forms, qualification rules, and instant routing.",
  },
  {
    title: "Campaign performance",
    description:
      "Track every acquisition channel in one dashboard and see what is driving qualified revenue in real time.",
  },
  {
    title: "High-converting follow-up",
    description:
      "Use personalized nurture flows to keep momentum high without slowing down your sales team.",
  },
];

const stats = [
  { value: "3.2x", label: "faster lead response" },
  { value: "42%", label: "more qualified demos" },
  { value: "8 hrs", label: "saved per rep weekly" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-8">
        <header className="mb-16 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">
              B
            </div>
            <span className="text-lg font-semibold tracking-tight">BaraLink</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#results" className="transition hover:text-white">
              Results
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </nav>

          <a
            href="#pricing"
            className="inline-flex items-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Book a demo
          </a>
        </header>

        <section className="grid items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
              Built for growth-focused teams
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn more interest into revenue with less manual work.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              BaraLink helps marketing teams capture demand, qualify leads automatically,
              and keep every handoff flowing smoothly from campaign to close.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Start free trial
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore platform
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <span>No credit card required</span>
              <span>•</span>
              <span>Setup in under 2 weeks</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 p-6 shadow-2xl shadow-cyan-950/25">
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Pipeline overview</p>
                  <p className="mt-1 text-3xl font-bold text-white">$184k</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  +28.4%
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ["Qualified leads", "146"],
                  ["Booked demos", "28"],
                  ["Conversion rate", "32%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{label}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: label === "Qualified leads" ? "74%" : label === "Booked demos" ? "58%" : "82%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="grid gap-6 pb-20 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-black text-cyan-300">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </section>

        <section id="features" className="pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Why teams switch
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One platform for pipeline visibility and growth execution.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-xl text-cyan-300">
                  ✦
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-500/10 p-8 sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Start growing faster
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Turn your marketing engine into a predictable revenue channel.
              </h2>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="text-4xl font-black text-white">
                $49<span className="text-lg font-medium text-slate-300">/seat</span>
              </div>
              <a
                href="mailto:sales@baralink.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
