/** One title style for every section: a small label, the title, an optional line under it. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  id?: string;
  tone?: 'light' | 'dark';
}) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? 'text-accent' : 'text-primary'}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : 'text-slate-950'}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-8 ${dark ? 'text-white/75' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  );
}
