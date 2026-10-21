'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { StoreBadges } from '@/components/ui/StoreBadges';

export function Hero() {
  const { t, href } = useI18n();
  const onHome = (anchor: string) => `${href('/')}${anchor}`;

  return (
    <section
      id="home"
      className="bl-hero"
      aria-labelledby="hero-title"
    >
      <div className="bl-hero__background" aria-hidden="true">
        <Image
          src="/logos/hero2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      <div className="bl-hero__shell">
        <div className="bl-hero__layout">
          <div className="bl-hero__copy">
            <h1 id="hero-title">{t.hero.titleLine1}</h1>

            <p className="bl-hero__description">
              {t.hero.description}
            </p>

            <div className="bl-hero__actions">
              <a
                href={onHome('#download')}
                data-analytics="download_click"
                data-store="any"
                data-placement="hero"
                className="bl-hero__primary"
              >
                {t.hero.download}
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>

              <a
                href={onHome('#how-it-works')}
                className="bl-hero__secondary"
              >
                {t.hero.howItWorks}
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="bl-hero__stores">
              <StoreBadges
                placement="hero"
                playAlt={t.stores.play}
                appStoreAlt={t.stores.appStore}
              />
            </div>
          </div>

          <div className="bl-hero__visual">
            <div className="bl-hero__device">
              <Image
                src="/assets/phones/phone2.png"
                alt={t.hero.appAlt}
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 370px, (min-width: 640px) 320px, 62vw"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>

        <ul className="bl-hero__trust">
          {t.hero.trust.map((item, index) => (
            <li key={item}>
              <span
                className="bl-hero__number"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .bl-hero {
          position: relative;
          isolation: isolate;
          scroll-margin-top: 96px;
          background: #fff;
          color: #fff;
        }

        .bl-hero__background {
          position: absolute;
          z-index: -1;
          inset: 0;
          overflow: hidden;
        }

        .bl-hero__background::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              #ffffff 0%,
              rgba(255, 255, 255, 0) 24%
            ),
            linear-gradient(
              90deg,
              rgba(8, 15, 40, 0.95) 0%,
              rgba(8, 15, 40, 0.82) 45%,
              rgba(8, 15, 40, 0.35) 100%
            );
        }

        @media (max-width: 767px) {
          .bl-hero__background::after {
            background:
              linear-gradient(
                to top,
                #ffffff 0%,
                rgba(255, 255, 255, 0) 22%
              ),
              linear-gradient(
                180deg,
                rgba(8, 15, 40, 0.94) 0%,
                rgba(8, 15, 40, 0.85) 55%,
                rgba(8, 15, 40, 0.55) 100%
              );
          }
        }

        .bl-hero__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 48px 24px 32px;
        }

        .bl-hero__layout {
          display: grid;
          align-items: center;
          gap: 36px;
        }

        .bl-hero__copy {
          position: relative;
          z-index: 2;
          min-width: 0;
        }

        h1 {
          max-width: 12.5ch;
          margin: 0;
          color: #fff;
          font-size: clamp(2.625rem, 5.2vw, 4.75rem);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.055em;
          overflow-wrap: break-word;
          text-wrap: balance;
        }

        .bl-hero__description {
          max-width: 43ch;
          margin: 24px 0 0;
          color: #dbe1f5;
          font-size: 17px;
          line-height: 1.75;
          text-wrap: pretty;
        }

        .bl-hero__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px 24px;
          margin-top: 32px;
        }

        .bl-hero__primary,
        .bl-hero__secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 54px;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
          text-decoration: none;
          transition:
            background-color 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .bl-hero__primary {
          padding: 15px 24px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: var(--color-accent, #f5c518);
          color: #0f172a;
        }

        .bl-hero__secondary {
          padding: 12px 0;
          color: #fff;
          text-underline-offset: 5px;
        }

        .bl-hero__primary:focus-visible,
        .bl-hero__secondary:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 5px;
        }

        .bl-hero__primary:active {
          transform: translateY(1px);
        }

        .bl-hero__stores {
          margin-top: 26px;
          max-width: 100%;
        }

        .bl-hero__visual {
          position: relative;
          width: 100%;
          max-width: 520px;
          height: clamp(340px, 101vw, 460px);
          margin-inline: auto;
        }

        .bl-hero__device {
          position: absolute;
          z-index: 1;
          top: 0;
          right: 5%;
          width: 62%;
          max-width: 320px;
          transform: rotate(8deg);
          transform-origin: center;
          filter: drop-shadow(
            0 24px 24px rgb(5 12 41 / 20%)
          );
        }

        .bl-hero__trust {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 0;
          margin: 20px 0 0;
          padding: 8px 22px;
          list-style: none;
          border: 1px solid #e5e9f2;
          border-radius: 20px;
          background: #fff;
          color: #0f172a;
        }

        .bl-hero__trust li {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
          padding: 18px 0;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.55;
        }

        .bl-hero__trust li + li {
          border-top: 1px solid #edf0f6;
        }

        .bl-hero__number {
          flex-shrink: 0;
          color: var(--color-primary, #1a1ae6);
          font-size: 12px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        @media (hover: hover) {
          .bl-hero__primary:hover {
            background: #ffda45;
            transform: translateY(-1px);
          }

          .bl-hero__secondary:hover {
            color: #f5c518;
            text-decoration: underline;
          }
        }

        @media (min-width: 640px) {
          .bl-hero__shell {
            padding: 64px 36px 40px;
          }

          h1 {
            max-width: 15ch;
            font-size: clamp(3.25rem, 6.7vw, 4.5rem);
          }

          .bl-hero__description {
            font-size: 18px;
          }

          .bl-hero__trust {
            grid-template-columns: repeat(
              3,
              minmax(0, 1fr)
            );
            padding: 26px 12px;
          }

          .bl-hero__trust li {
            align-items: flex-start;
            gap: 12px;
            padding: 0 20px;
          }

          .bl-hero__trust li + li {
            border-top: 0;
            border-left: 1px solid #e5e9f2;
          }
        }

        @media (min-width: 1024px) {
          .bl-hero__shell {
            padding-top: 72px;
          }

          .bl-hero__layout {
            grid-template-columns:
              minmax(0, 1.05fr)
              minmax(0, 0.95fr);
            gap: 40px;
            min-height: 570px;
          }

          .bl-hero__copy {
            padding-bottom: 36px;
          }

          h1 {
            max-width: 13ch;
            font-size: clamp(3.5rem, 5.25vw, 4.75rem);
          }

          .bl-hero__visual {
            max-width: none;
            height: 570px;
          }

          .bl-hero__device {
            right: 4%;
            width: 76%;
            max-width: 370px;
          }

          .bl-hero__trust {
            margin-top: 40px;
            padding-block: 30px;
          }

          .bl-hero__trust li {
            align-items: center;
            padding-inline: 26px;
            font-size: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-hero__primary,
          .bl-hero__secondary {
            transition: none;
          }

          .bl-hero__primary:hover,
          .bl-hero__primary:active {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
