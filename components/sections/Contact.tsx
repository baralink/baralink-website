'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

const phones = ['+224 622 46 25 59', '+224 623 04 34 21'];

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + details */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-slate-950 sm:text-4xl lg:text-5xl">
              {t.contact.heading}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
              {t.contact.body}
            </p>

            <dl className="mt-12 grid gap-10 sm:grid-cols-3">
              {/* Phones */}
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.5 4.5a1 1 0 0 1-.5 1.2l-2.26 1.13a11 11 0 0 0 5.52 5.52l1.13-2.26a1 1 0 0 1 1.2-.5l4.5 1.5a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z" />
                </svg>
                <dt className="mt-4 text-sm font-medium text-slate-500">
                  {t.contact.phoneLabel}
                </dt>
                <dd className="mt-2 space-y-1">
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="block text-base font-semibold text-slate-900 transition hover:text-primary"
                    >
                      {p}
                    </a>
                  ))}
                </dd>
              </div>

              {/* Email */}
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6 text-primary">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
                </svg>
                <dt className="mt-4 text-sm font-medium text-slate-500">
                  {t.contact.emailLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="text-base font-semibold text-slate-900 transition hover:text-primary"
                  >
                    {t.contact.email}
                  </a>
                </dd>
              </div>

              {/* Locations / address */}
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <dt className="mt-4 text-sm font-medium text-slate-500">
                  {t.contact.locationLabel}
                </dt>
                <dd className="mt-2 space-y-1">
                  {t.contact.locations.map((loc) => (
                    <p key={loc} className="text-base font-semibold text-slate-900">
                      {loc}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: simple contact form */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {t.contact.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={t.contact.formName}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  {t.contact.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={t.contact.formEmail}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder={t.contact.formMessage}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
              >
                {t.contact.formSend}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
