'use client';

import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  PHONES,
  SUPPORT_EMAIL,
  WHATSAPP_PHONE,
  telHref,
  whatsappHref,
} from '@/lib/contact';
import { ContactForm } from './ContactForm';

export function Contact() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bl-contact"
    >
      <div className="bl-contact__shell">
        <div className="bl-contact__layout">
          <div className="bl-contact__details">
            <span className="bl-contact__accent" aria-hidden="true" />

            <h2 id="contact-title" className="bl-contact__heading">
              {t.contact.heading}
            </h2>

            <p className="bl-contact__intro">{t.contact.body}</p>

            <ul className="bl-contact__channels" role="list">
              <li className="bl-contact__channel">
                <p className="bl-contact__label">
                  {t.contact.phoneLabel}
                </p>

                <div className="bl-contact__values">
                  {PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      data-analytics="contact_click"
                      data-method="phone"
                      className="bl-contact__link bl-contact__number"
                    >
                      <span>{phone}</span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </li>

              <li className="bl-contact__channel">
                <p className="bl-contact__label">
                  {t.contact.whatsappLabel}
                </p>

                <div className="bl-contact__values">
                  <a
                    href={whatsappHref(WHATSAPP_PHONE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="contact_click"
                    data-method="whatsapp"
                    className="bl-contact__link bl-contact__number"
                  >
                    <span>{WHATSAPP_PHONE}</span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </li>

              <li className="bl-contact__channel">
                <p className="bl-contact__label">
                  {t.contact.emailLabel}
                </p>

                <div className="bl-contact__values">
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    data-analytics="contact_click"
                    data-method="email"
                    className="bl-contact__link"
                  >
                    <span>{SUPPORT_EMAIL}</span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </li>

              <li className="bl-contact__channel">
                <p className="bl-contact__label">
                  {t.contact.locationLabel}
                </p>

                <div className="bl-contact__values">
                  {t.contact.locations.map((location) => (
                    <p key={location} className="bl-contact__location">
                      {location}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="bl-contact__form-panel" data-ui>
            <ContactForm />
          </div>
        </div>
      </div>

      <style jsx>{`
        .bl-contact {
          scroll-margin-top: 96px;
          background: #f7f8fb;
          color: #0f172a;
          border-top: 1px solid #edf0f5;
        }

        .bl-contact__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 64px 24px;
        }

        .bl-contact__layout {
          display: grid;
          align-items: start;
          gap: 40px;
        }

        .bl-contact__details {
          min-width: 0;
        }

        .bl-contact__accent {
          display: block;
          width: 44px;
          height: 4px;
          margin-bottom: 24px;
          border-radius: 2px;
          background: var(--color-accent, #f5c518);
        }

        .bl-contact__heading {
          max-width: 14ch;
          margin: 0;
          color: #0f172a;
          font-size: clamp(2.375rem, 4.5vw, 3.75rem);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.05em;
          text-wrap: balance;
        }

        .bl-contact__intro {
          max-width: 40ch;
          margin: 24px 0 0;
          color: #526074;
          font-size: 17px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        .bl-contact__channels {
          display: grid;
          margin: 36px 0 0;
          padding: 0;
          list-style: none;
        }

        .bl-contact__channel {
          display: grid;
          gap: 8px;
          padding: 22px 0;
          border-top: 1px solid #dfe4ed;
        }

        .bl-contact__channel:last-child {
          padding-bottom: 0;
        }

        .bl-contact__label {
          margin: 0;
          color: #647084;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.6;
        }

        .bl-contact__values {
          display: grid;
          justify-items: start;
          gap: 2px;
          min-width: 0;
        }

        .bl-contact__link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-width: 0;
          max-width: 100%;
          min-height: 44px;
          padding-block: 7px;
          border-radius: 4px;
          color: var(--color-primary, #1a1ae6);
          font-size: 19px;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.025em;
          text-decoration: none;
          text-decoration-thickness: 1px;
          text-underline-offset: 5px;
          transition: color 180ms ease;
        }

        .bl-contact__link span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .bl-contact__link :global(svg) {
          flex-shrink: 0;
          opacity: 0.65;
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .bl-contact__number {
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.015em;
        }

        .bl-contact__number span {
          white-space: nowrap;
        }

        .bl-contact__link:focus-visible {
          outline: 3px solid var(--color-primary, #1a1ae6);
          outline-offset: 5px;
        }

        .bl-contact__location {
          margin: 0;
          padding-block: 7px;
          color: #172238;
          font-size: 19px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.025em;
          overflow-wrap: anywhere;
        }

        .bl-contact__form-panel {
          min-width: 0;
          padding: 26px 20px;
          border: 1px solid #e2e6ee;
          border-radius: 24px;
          background: #fff;
          box-shadow:
            0 2px 4px rgb(15 23 42 / 2%),
            0 24px 64px rgb(15 23 42 / 4%);
        }

        @media (hover: hover) {
          .bl-contact__link:hover {
            color: #10109c;
            text-decoration: underline;
          }

          .bl-contact__link:hover :global(svg) {
            opacity: 1;
            transform: translate(2px, -2px);
          }
        }

        @media (min-width: 640px) {
          .bl-contact__shell {
            padding: 80px 36px;
          }

          .bl-contact__layout {
            gap: 48px;
          }

          .bl-contact__intro {
            font-size: 18px;
          }

          .bl-contact__channels {
            margin-top: 40px;
          }

          .bl-contact__channel {
            grid-template-columns:
              minmax(0, 0.75fr)
              minmax(0, 1.25fr);
            align-items: start;
            gap: 24px;
            padding-block: 22px;
          }

          .bl-contact__label {
            padding-top: 12px;
          }

          .bl-contact__link,
          .bl-contact__location {
            font-size: 20px;
          }

          .bl-contact__form-panel {
            padding: 36px;
            border-radius: 28px;
          }
        }

        @media (min-width: 1024px) {
          .bl-contact__shell {
            padding-block: 96px;
          }

          .bl-contact__layout {
            grid-template-columns:
              minmax(0, 0.9fr)
              minmax(0, 1.1fr);
            gap: 64px;
          }

          .bl-contact__details {
            padding-top: 12px;
          }

          .bl-contact__channels {
            margin-top: 48px;
          }

          .bl-contact__channel {
            grid-template-columns:
              minmax(0, 0.7fr)
              minmax(0, 1.3fr);
            gap: 16px;
          }

          .bl-contact__link,
          .bl-contact__location {
            font-size: 18px;
          }

          .bl-contact__form-panel {
            padding: 40px;
          }
        }

        @media (min-width: 1280px) {
          .bl-contact__layout {
            gap: 88px;
          }

          .bl-contact__link,
          .bl-contact__location {
            font-size: 20px;
          }

          .bl-contact__form-panel {
            padding: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-contact__link,
          .bl-contact__link :global(svg) {
            transition: none;
          }

          .bl-contact__link:hover :global(svg) {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}