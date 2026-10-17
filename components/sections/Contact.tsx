'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PHONES, SUPPORT_EMAIL, telHref } from '@/lib/contact';
import { ContactForm } from './ContactForm';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" aria-label={t.contact.eyebrow} className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + details */}
          <div>
            <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.heading} intro={t.contact.body} />

            <ul className="mt-10 space-y-4">
              <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-call/10 text-call">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{t.contact.phoneLabel}</p>
                  <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    {PHONES.map((p) => (
                      <a
                        key={p}
                        href={telHref(p)}
                        data-analytics="contact_click"
                        data-method="phone"
                        className="text-lg font-semibold text-slate-900 transition hover:text-primary"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{t.contact.emailLabel}</p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    data-analytics="contact_click"
                    data-method="email"
                    className="mt-1 block text-lg font-semibold text-slate-900 transition hover:text-primary"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{t.contact.locationLabel}</p>
                  {t.contact.locations.map((loc) => (
                    <p key={loc} className="mt-1 text-lg font-semibold text-slate-900">
                      {loc}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Right: the contact form (sent to the backend, read by staff in the Admin) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
