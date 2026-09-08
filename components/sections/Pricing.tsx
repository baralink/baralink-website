export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div className="rounded-[32px] border border-[#1A1AE6]/15 bg-gradient-to-r from-[#EEF1FD] via-white to-[#FFF7CF] p-8 sm:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1A1AE6]">
              Start growing faster
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Turn your marketing engine into a predictable revenue channel.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="text-4xl font-black text-slate-950">
              $49<span className="text-lg font-medium text-slate-500">/seat</span>
            </div>
            <a
              href="mailto:sales@baralink.com"
              className="inline-flex items-center justify-center rounded-full bg-[#1A1AE6] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#1A1AE6]/20 transition hover:bg-[#1717d6]"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
