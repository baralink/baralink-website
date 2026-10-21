'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="bl-how"
    >
      <div className="bl-how__shell">
        <div className="bl-how__header">
          <div>
            <span className="bl-how__accent" aria-hidden="true" />

            <h2 id="how-title" className="bl-how__heading">
              {t.how.heading}
            </h2>
          </div>

          <p className="bl-how__intro">{t.how.intro}</p>
        </div>

        <div className="bl-how__layout">
          <ol className="bl-how__steps" role="list">
            {t.how.steps.map((step, index) => (
              <li key={`${index}-${step.title}`} className="bl-how__step">
                <span className="bl-how__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="bl-how__step-content">
                  <h3 className="bl-how__step-title">
                    {step.title.replace(/^\s*\d+[.)]\s*/, '')}
                  </h3>

                  <p className="bl-how__step-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="bl-how__media">
            <Image
              src="/logos/bg.png"
              alt={t.how.photoAlt}
              fill
              sizes="(min-width: 1280px) 550px, (min-width: 1024px) 46vw, 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </figure>
        </div>
      </div>

      <style jsx>{`
        .bl-how {
          scroll-margin-top: 96px;
          background: #fff;
          color: #0f172a;
        }

        .bl-how__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 64px 24px 72px;
        }

        .bl-how__header {
          display: grid;
          gap: 24px;
          margin-bottom: 36px;
        }

        .bl-how__accent {
          display: block;
          width: 44px;
          height: 4px;
          margin-bottom: 22px;
          border-radius: 2px;
          background: var(--color-accent, #f5c518);
        }

        .bl-how__heading {
          max-width: 19ch;
          margin: 0;
          font-size: clamp(2.125rem, 4.2vw, 3.5rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .bl-how__intro {
          max-width: 46ch;
          margin: 0;
          color: #526074;
          font-size: 17px;
          line-height: 1.75;
          text-wrap: pretty;
        }

        .bl-how__layout {
          display: grid;
          grid-template-areas:
            'steps'
            'media';
          gap: 36px;
          align-items: stretch;
        }

        .bl-how__steps {
          grid-area: steps;
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .bl-how__step {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          align-content: center;
          gap: 18px;
          padding: 26px 0;
          border-top: 1px solid #e5e9f0;
        }

        .bl-how__step:last-child {
          border-bottom: 1px solid #e5e9f0;
        }

        .bl-how__number {
          display: block;
          padding-top: 1px;
          color: var(--color-primary, #1a1ae6);
          font-size: 34px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.06em;
          font-variant-numeric: tabular-nums;
        }

        .bl-how__step-content {
          min-width: 0;
        }

        .bl-how__step-title {
          margin: 0;
          color: #0f172a;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.025em;
          text-wrap: pretty;
        }

        .bl-how__step-body {
          max-width: 46ch;
          margin: 10px 0 0;
          color: #526074;
          font-size: 16px;
          line-height: 1.75;
          text-wrap: pretty;
        }

        .bl-how__media {
          grid-area: media;
          position: relative;
          min-width: 0;
          aspect-ratio: 5 / 4;
          margin: 0;
          overflow: hidden;
          border-radius: 24px;
          background: #eef1f6;
        }

        @media (min-width: 640px) {
          .bl-how__shell {
            padding: 80px 36px;
          }

          .bl-how__header {
            margin-bottom: 44px;
          }

          .bl-how__step {
            grid-template-columns: 62px minmax(0, 1fr);
            gap: 24px;
            padding-block: 30px;
          }

          .bl-how__number {
            font-size: 44px;
          }

          .bl-how__step-title {
            font-size: 23px;
          }

          .bl-how__media {
            aspect-ratio: 16 / 10;
            border-radius: 28px;
          }
        }

        @media (min-width: 1024px) {
          .bl-how__shell {
            padding-block: 96px;
          }

          .bl-how__header {
            grid-template-columns:
              minmax(0, 1.1fr)
              minmax(0, 0.9fr);
            align-items: end;
            gap: 64px;
            margin-bottom: 52px;
          }

          .bl-how__intro {
            padding-bottom: 4px;
            font-size: 18px;
          }

          .bl-how__layout {
            grid-template-columns:
              minmax(0, 0.95fr)
              minmax(0, 1.05fr);
            grid-template-areas: 'media steps';
            gap: 64px;
          }

          .bl-how__media {
            min-height: 470px;
            aspect-ratio: auto;
          }

          .bl-how__step {
            grid-template-columns: 66px minmax(0, 1fr);
            gap: 24px;
            padding-block: 32px;
          }

          .bl-how__number {
            font-size: 48px;
          }

          .bl-how__step-title {
            font-size: 25px;
          }

          .bl-how__step-body {
            margin-top: 12px;
            font-size: 17px;
          }
        }

        @media (min-width: 1280px) {
          .bl-how__layout {
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}