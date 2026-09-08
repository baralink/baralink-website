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

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1A1AE6]">
          Why teams switch
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          One platform for pipeline visibility and growth execution.
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FD] text-xl text-[#1A1AE6]">
              ✦
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-4 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
