'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { openConsentSettings } from '@/lib/analytics';
import {
  PHONES,
  SUPPORT_EMAIL,
  WHATSAPP_PHONE,
  SOCIAL_LINKS,
  telHref,
  whatsappHref,
} from '@/lib/contact';

type SocialItem = {
  label: string;
  href: string;
  analytics: 'social_click' | 'contact_click';
  network?: string;
  method?: 'whatsapp';
  path: string;
};

const socials: SocialItem[] = [
  {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.linkedin,
    analytics: 'social_click',
    network: 'linkedin',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9V9Z',
  },
  {
    label: 'Facebook',
    href: SOCIAL_LINKS.facebook,
    analytics: 'social_click',
    network: 'facebook',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  },
  {
    label: 'TikTok',
    href: SOCIAL_LINKS.tiktok,
    analytics: 'social_click',
    network: 'tiktok',
    path: 'M16.5 2c.3 2.03 1.47 3.4 3.5 3.57v2.5c-1.18.11-2.2-.27-3.4-1v6.57c0 4.17-4.55 5.47-6.78 2.48-1.43-1.93-.86-5.3 2.9-5.44v2.57c-.57.09-1.18.23-1.5.5-.95.8-.68 2.57.86 2.68 1 .07 1.92-.6 1.92-1.9V2h2.5Z',
  },
  {
    label: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    analytics: 'social_click',
    network: 'instagram',
    path: 'M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.63.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.55.55-1.1.9-1.76 1.15-.63.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.21 1.15-1.76.55-.55 1.1-.9 1.76-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.4-8.84a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0Z',
  },
  {
    label: 'WhatsApp',
    href: whatsappHref(WHATSAPP_PHONE),
    analytics: 'contact_click',
    method: 'whatsapp',
    path: 'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.82 14.01c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.38Z',
  },
];

export function Footer() {
  const { t, href } = useI18n();

  const onHome = (anchor: string) => `${href('/')}${anchor}`;

  const columns = [
    {
      title: t.footer.columns.company,
      links: t.footer.company,
    },
    {
      title: t.footer.columns.forWorkers,
      links: t.footer.workers,
    },
  ];

  return (
    <footer className="bl-footer">
      <div className="bl-footer__shell">
        <div className="bl-footer__main">
          <div className="bl-footer__brand">
            <div className="bl-footer__logo">
              <Link href={href('/')}>
                <Image
                  src="/logos/baralink-wordmark.png"
                  alt="BaraLink"
                  width={1200}
                  height={331}
                  sizes="180px"
                  style={{
                    display: 'block',
                    width: '180px',
                    maxWidth: '100%',
                    height: 'auto',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </Link>
            </div>

            <p className="bl-footer__description">
              {t.about.body}
            </p>

            <ul className="bl-footer__socials" role="list">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-analytics={social.analytics}
                    data-network={social.network}
                    data-method={social.method}
                    className="bl-footer__social"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="bl-footer__column"
            >
              <h2>{column.title}</h2>

              <ul className="bl-footer__links" role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={
                        link.href.startsWith('#')
                          ? onHome(link.href)
                          : link.href
                      }
                      className="bl-footer__link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="bl-footer__contact">
            <h2>{t.contact.eyebrow}</h2>

            <ul className="bl-footer__links" role="list">
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    data-analytics="contact_click"
                    data-method="phone"
                    className="bl-footer__link bl-footer__phone"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={whatsappHref(WHATSAPP_PHONE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="contact_click"
                  data-method="whatsapp"
                  className="bl-footer__link"
                >
                  {t.contact.whatsappLabel}
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  data-analytics="contact_click"
                  data-method="email"
                  className="bl-footer__link"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>

              {t.contact.locations.map((location) => (
                <li
                  key={location}
                  className="bl-footer__location"
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bl-footer__bottom">
          <p className="bl-footer__copyright">
            © {new Date().getFullYear()} BaraLink.{' '}
            {t.footer.rights}
          </p>

          <div className="bl-footer__legal">
            <Link href={href('/terms')}>
              {t.footer.legal}
            </Link>

            <Link href={href('/privacy')}>
              {t.footer.privacy}
            </Link>

            <Link href={href('/delete-account')}>
              {t.footer.deleteAccount}
            </Link>

            <button
              type="button"
              onClick={openConsentSettings}
            >
              {t.footer.cookies}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bl-footer {
          background: #0b1232;
          color: #fff;
        }

        .bl-footer__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 48px 24px 24px;
        }

        .bl-footer__main {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 24px;
          row-gap: 36px;
        }

        .bl-footer__brand {
          grid-column: 1 / -1;
          min-width: 0;
        }

        .bl-footer__logo {
          display: inline-block;
          max-width: 100%;
        }

        .bl-footer__description {
          max-width: 44ch;
          margin: 22px 0 0;
          color: #b9c3d7;
          font-size: 15px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        .bl-footer__socials {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 24px 0 0;
          padding: 0;
          list-style: none;
        }

        .bl-footer__social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgb(255 255 255 / 18%);
          border-radius: 50%;
          color: #e2e7f1;
          text-decoration: none;
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .bl-footer__column,
        .bl-footer__contact {
          min-width: 0;
        }

        .bl-footer__contact {
          grid-column: 1 / -1;
        }

        h2 {
          margin: 0 0 14px;
          color: #96a5c0;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: 0.015em;
        }

        .bl-footer__links {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .bl-footer__link {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          max-width: 100%;
          padding-block: 8px;
          border-radius: 3px;
          color: #e2e7f1;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
          text-decoration: none;
          text-underline-offset: 5px;
          overflow-wrap: anywhere;
          transition: color 180ms ease;
        }

        .bl-footer__phone {
          font-variant-numeric: tabular-nums;
        }

        .bl-footer__location {
          padding-block: 10px;
          color: #b9c3d7;
          font-size: 14px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .bl-footer__bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgb(255 255 255 / 14%);
        }

        .bl-footer__copyright {
          margin: 0;
          color: #a8b5ce;
          font-size: 13px;
          line-height: 1.7;
        }

        .bl-footer__legal {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0 20px;
        }

        .bl-footer__legal :global(a),
        .bl-footer__legal button {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 8px 0;
          border: 0;
          border-radius: 3px;
          background: transparent;
          color: #b9c3d7;
          font: inherit;
          font-size: 13px;
          line-height: 1.6;
          text-align: left;
          text-decoration: none;
          text-underline-offset: 5px;
          cursor: pointer;
          transition: color 180ms ease;
        }

        .bl-footer :global(a:focus-visible),
        .bl-footer button:focus-visible {
          outline: 2px solid var(--color-accent, #f5c518);
          outline-offset: 5px;
        }

        @media (hover: hover) {
          .bl-footer__social:hover {
            border-color: #fff;
            background: #fff;
            color: #0b1232;
          }

          .bl-footer__link:hover {
            color: var(--color-accent, #f5c518);
            text-decoration: underline;
          }

          .bl-footer__legal :global(a:hover),
          .bl-footer__legal button:hover {
            color: #fff;
            text-decoration: underline;
          }
        }

        @media (min-width: 640px) {
          .bl-footer__shell {
            padding: 56px 36px 28px;
          }

          .bl-footer__main {
            column-gap: 48px;
            row-gap: 40px;
          }
        }

        @media (min-width: 768px) {
          .bl-footer__brand,
          .bl-footer__contact {
            grid-column: auto;
          }

          .bl-footer__description {
            max-width: 34ch;
          }
        }

        @media (min-width: 1024px) {
          .bl-footer__shell {
            padding-top: 64px;
          }

          .bl-footer__main {
            grid-template-columns:
              minmax(0, 1.35fr)
              minmax(0, 0.9fr)
              minmax(0, 0.9fr)
              minmax(0, 1.1fr);
            gap: 40px;
          }

          .bl-footer__description {
            max-width: 32ch;
          }

          h2 {
            margin-bottom: 20px;
          }

          .bl-footer__link {
            min-height: 38px;
            padding-block: 6px;
          }

          .bl-footer__bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            margin-top: 48px;
          }

          .bl-footer__legal {
            justify-content: flex-end;
          }

          .bl-footer__legal :global(a),
          .bl-footer__legal button {
            min-height: 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-footer__social,
          .bl-footer__link,
          .bl-footer__legal :global(a),
          .bl-footer__legal button {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}