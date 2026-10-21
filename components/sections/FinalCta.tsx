'use client';

import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { StoreBadges } from '@/components/ui/StoreBadges';
import {
  PHONES,
  WHATSAPP_PHONE,
  telHref,
  whatsappHref,
} from '@/lib/contact';

export function FinalCta() {
  const { t, href } = useI18n();

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="on-cobalt bl-final"
    >
      <div className="bl-final__shell">
        <div className="bl-final__panel">
          <div className="bl-final__copy">
            <span className="bl-final__accent" aria-hidden="true" />

            <h2 id="download-title" className="bl-final__heading">
              {t.final.title}
            </h2>

            <p className="bl-final__description">
              {t.final.body}
            </p>

            <div className="bl-final__actions">
              <a
                href={telHref(PHONES[0])}
                data-analytics="contact_click"
                data-method="phone"
                className="bl-final__call"
              >
                <Phone
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {t.callUs}
              </a>

              <a
                href={whatsappHref(WHATSAPP_PHONE)}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="contact_click"
                data-method="whatsapp"
                className="bl-final__whatsapp"
              >
                <MessageCircle
                  size={19}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span>{t.call.whatsapp}</span>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="bl-final__visual" aria-hidden="true">
            <Image
              src="/assets/social/workerbanner.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 43vw, 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: '72% top',
              }}
            />
          </div>

          <div className="bl-final__download">
            <div className="bl-final__stores">
              <h3 className="bl-final__store-label">
                {t.stores.badges}
              </h3>

              <div className="bl-final__badges">
                <StoreBadges
                  placement="final"
                  playAlt={t.stores.play}
                  appStoreAlt={t.stores.appStore}
                  soon={t.stores.soon}
                />
              </div>
            </div>

            <div className="bl-final__support">
              <p>{t.stores.help}</p>

              <a
                href={`${href('/')}#faq`}
                className="bl-final__faq"
              >
                <span>{t.nav.faq}</span>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bl-final {
          scroll-margin-top: 96px;
          background: #fff;
        }

        .bl-final__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 48px 20px 64px;
        }

        .bl-final__panel {
          display: grid;
          grid-template-areas:
            'copy'
            'download'
            'visual';
          min-width: 0;
          overflow: hidden;
          border-radius: 28px;
          background: var(--color-primary, #1a1ae6);
          color: #fff;
        }

        .bl-final__copy {
          grid-area: copy;
          min-width: 0;
          padding: 36px 24px 32px;
        }

        .bl-final__accent {
          display: block;
          width: 44px;
          height: 4px;
          margin-bottom: 24px;
          border-radius: 2px;
          background: var(--color-accent, #f5c518);
        }

        .bl-final__heading {
          max-width: 15ch;
          margin: 0;
          color: #fff;
          font-size: clamp(2.25rem, 4.4vw, 3.75rem);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.045em;
          overflow-wrap: break-word;
          text-wrap: balance;
        }

        .bl-final__description {
          max-width: 40ch;
          margin: 22px 0 0;
          color: #e9ecff;
          font-size: 17px;
          line-height: 1.75;
          text-wrap: pretty;
        }

        .bl-final__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 24px;
          margin-top: 30px;
        }

        .bl-final__call,
        .bl-final__whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 52px;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.4;
          text-decoration: none;
          transition:
            background-color 180ms ease,
            color 180ms ease;
        }

        .bl-final__call {
          padding: 14px 24px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: var(--color-accent, #f5c518);
          color: #0f172a;
        }

        .bl-final__whatsapp {
          padding: 12px 0;
          border-radius: 4px;
          color: #fff;
          text-underline-offset: 5px;
        }

        .bl-final__call:focus-visible,
        .bl-final__whatsapp:focus-visible,
        .bl-final__faq:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 5px;
        }

        .bl-final__visual {
          grid-area: visual;
          position: relative;
          min-width: 0;
          aspect-ratio: 16 / 11;
          margin: 8px 24px 24px;
          overflow: hidden;
          border-radius: 20px;
          background: #1111a6;
        }

        .bl-final__download {
          grid-area: download;
          display: grid;
          gap: 24px;
          min-width: 0;
          margin-inline: 24px;
          padding: 28px 0;
          border-top: 1px solid rgb(255 255 255 / 22%);
        }

        .bl-final__stores {
          min-width: 0;
        }

        .bl-final__store-label {
          margin: 0 0 16px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
        }

        .bl-final__badges {
          min-width: 0;
          max-width: 100%;
        }

        .bl-final__support {
          min-width: 0;
        }

        .bl-final__support p {
          max-width: 40ch;
          margin: 0;
          color: #e9ecff;
          font-size: 14px;
          line-height: 1.75;
          text-wrap: pretty;
        }

        .bl-final__faq {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 44px;
          margin-top: 8px;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          text-decoration: underline;
          text-decoration-color: rgb(255 255 255 / 55%);
          text-underline-offset: 5px;
          transition:
            color 180ms ease,
            text-decoration-color 180ms ease;
        }

        @media (hover: hover) {
          .bl-final__call:hover {
            background: #ffda45;
          }

          .bl-final__whatsapp:hover {
            color: #ffda45;
            text-decoration: underline;
          }

          .bl-final__faq:hover {
            text-decoration-color: #fff;
          }
        }

        @media (min-width: 640px) {
          .bl-final__shell {
            padding: 56px 36px 80px;
          }

          .bl-final__panel {
            border-radius: 32px;
          }

          .bl-final__copy {
            padding: 44px 36px 36px;
          }

          .bl-final__description {
            font-size: 18px;
          }

          .bl-final__actions {
            margin-top: 32px;
          }

          .bl-final__download {
            grid-template-columns:
              minmax(0, 1.1fr)
              minmax(0, 0.9fr);
            align-items: start;
            gap: 32px;
            margin-inline: 36px;
            padding-block: 30px;
          }

          .bl-final__visual {
            aspect-ratio: 16 / 9;
            margin: 8px 36px 36px;
            border-radius: 24px;
          }
        }

        @media (min-width: 1024px) {
          .bl-final__shell {
            padding-block: 64px 96px;
          }

          .bl-final__panel {
            grid-template-columns:
              minmax(0, 1.05fr)
              minmax(0, 0.95fr);
            grid-template-areas:
              'copy visual'
              'download download';
          }

          .bl-final__copy {
            align-self: center;
            padding: 52px 36px 52px 48px;
          }

          .bl-final__heading {
            font-size: clamp(3rem, 4.2vw, 3.75rem);
          }

          .bl-final__visual {
            min-height: 420px;
            aspect-ratio: auto;
            margin: 28px 28px 28px 0;
          }

          .bl-final__download {
            grid-template-columns:
              minmax(0, 1.05fr)
              minmax(0, 0.95fr);
            gap: 48px;
            margin-inline: 48px;
            padding-block: 32px;
          }

          .bl-final__support {
            align-self: center;
          }
        }

        @media (min-width: 1280px) {
          .bl-final__copy {
            padding: 60px 48px 60px 56px;
          }

          .bl-final__visual {
            min-height: 440px;
          }

          .bl-final__download {
            margin-inline: 56px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-final__call,
          .bl-final__whatsapp,
          .bl-final__faq {
            transition: none;
          }
        }
        .bl-final__shell {
          padding: 24px 20px 40px;
        }

        .bl-final__panel {
          position: relative;
          isolation: isolate;
          grid-template-columns: minmax(0, 1fr);
          grid-template-areas:
            'copy'
            'download';
          border-radius: 22px;
        }

        .bl-final__copy {
          padding: 24px;
        }

        .bl-final__accent {
          display: none;
        }

        .bl-final__heading {
          max-width: 24ch;
          font-size: clamp(1.625rem, 2.8vw, 2.25rem);
          line-height: 1.12;
        }

        .bl-final__description {
          max-width: 55ch;
          margin-top: 12px;
          font-size: 15px;
          line-height: 1.6;
        }

        .bl-final__actions {
          gap: 10px 20px;
          margin-top: 18px;
        }

        .bl-final__call,
        .bl-final__whatsapp {
          min-height: 44px;
          font-size: 14px;
        }

        .bl-final__call {
          padding: 10px 20px;
        }

        .bl-final__whatsapp {
          padding-block: 10px;
        }

        .bl-final__visual {
          position: absolute;
          z-index: -1;
          grid-area: auto;
          inset: 0;
          min-height: 0;
          aspect-ratio: auto;
          margin: 0;
          border-radius: inherit;
          opacity: 0.12;
          pointer-events: none;
        }

        .bl-final__download {
          grid-template-columns: minmax(0, 1fr);
          gap: 14px;
          margin-inline: 24px;
          padding-block: 20px;
        }

        .bl-final__store-label {
          margin-bottom: 10px;
          font-size: 13px;
        }

        .bl-final__support p {
          max-width: 48ch;
          font-size: 13px;
          line-height: 1.6;
        }

        .bl-final__faq {
          min-height: 36px;
          margin-top: 2px;
          font-size: 13px;
        }

        @media (min-width: 640px) {
          .bl-final__shell {
            padding-inline: 36px;
          }

          .bl-final__download {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: center;
            gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          .bl-final__panel {
            grid-template-columns:
              minmax(0, 1.15fr)
              minmax(0, 0.85fr);
            grid-template-areas: 'copy download';
            align-items: center;
          }

          .bl-final__copy {
            padding: 28px 36px;
          }

          .bl-final__download {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
            margin: 24px 0;
            padding: 0 36px;
            border-top: 0;
            border-left: 1px solid rgb(255 255 255 / 22%);
          }
        }
      `}</style>
    </section>
  );
}
