'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PHONES, SUPPORT_EMAIL, WHATSAPP_PHONE, telHref, whatsappHref } from '@/lib/contact';
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
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">{t.contact.phoneLabel}</p>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {PHONES.map((p) => (
                      <a
                        key={p}
                        href={telHref(p)}
                        data-analytics="contact_click"
                        data-method="phone"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-base font-semibold text-slate-900 transition hover:border-primary hover:bg-primary-light hover:text-primary"
                      >
                        <Phone className="h-4 w-4 text-call" aria-hidden="true" />
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{t.contact.whatsappLabel}</p>
                  <a
                    href={whatsappHref(WHATSAPP_PHONE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="contact_click"
                    data-method="whatsapp"
                    className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:text-emerald-700"
                  >
                    {WHATSAPP_PHONE}
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {t.call.whatsapp}
                    </span>
                  </a>
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
