'use client';

import type { CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function Payment() {
  const { t } = useI18n();

  const columns = {
    '--payment-columns': Math.max(t.payment.steps.length, 1),
  } as CSSProperties;

  return (
    <section
      id="payment"
      aria-labelledby="payment-title"
      className="bl-payment"
    >
      <div className="bl-payment__shell">
        <div className="on-cobalt bl-payment__panel">
          <div className="bl-payment__header">
            <h2 id="payment-title">
              {t.payment.heading}
            </h2>

            <p className="bl-payment__intro">
              {t.payment.intro}
            </p>
          </div>

          <ol
            className="bl-payment__steps"
            style={columns}
            role="list"
          >
            {t.payment.steps.map((step, index) => (
              <li
                key={`${index}-${step.title}`}
                className="bl-payment__step"
              >
                <span
                  className="bl-payment__number"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="bl-payment__step-content">
                  <h3>
                    {step.title.replace(/^\s*\d+[.)]\s*/, '')}
                  </h3>

                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="bl-payment__note">
            {t.payment.dispute}
          </p>
        </div>
      </div>

      <style jsx>{`
        .bl-payment {
          scroll-margin-top: 96px;
          background: #fff;
        }

        .bl-payment__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 48px 20px;
        }

        .bl-payment__panel {
          min-width: 0;
          padding: 32px 24px;
          border-radius: 24px;
          background: var(--color-primary, #1a1ae6);
          color: #fff;
        }

        .bl-payment__header {
          display: grid;
          gap: 22px;
        }

        h2 {
          max-width: 18ch;
          margin: 0;
          color: #fff;
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .bl-payment__intro {
          max-width: 46ch;
          margin: 0;
          color: #e9ecff;
          font-size: 16px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        .bl-payment__steps {
          display: grid;
          margin: 32px 0 0;
          padding: 0;
          list-style: none;
        }

        .bl-payment__step {
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr);
          gap: 16px;
          min-width: 0;
          padding: 24px 0;
          border-top: 1px solid rgb(255 255 255 / 24%);
        }

        .bl-payment__number {
          display: block;
          padding-top: 2px;
          color: var(--color-accent, #f5c518);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }

        .bl-payment__step-content {
          min-width: 0;
        }

        h3 {
          margin: 0;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.025em;
          text-wrap: pretty;
        }

        .bl-payment__step-content p {
          max-width: 48ch;
          margin: 12px 0 0;
          color: #e9ecff;
          font-size: 15px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        .bl-payment__note {
          margin: 0;
          padding-top: 22px;
          border-top: 1px solid rgb(255 255 255 / 24%);
          color: #e0e5ff;
          font-size: 13px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        @media (min-width: 640px) {
          .bl-payment__shell {
            padding: 64px 36px;
          }

          .bl-payment__panel {
            padding: 40px 36px;
            border-radius: 28px;
          }

          .bl-payment__intro {
            font-size: 17px;
          }

          .bl-payment__step {
            grid-template-columns: 48px minmax(0, 1fr);
            gap: 20px;
            padding-block: 28px;
          }

          .bl-payment__number {
            font-size: 28px;
          }

          h3 {
            font-size: 22px;
          }

          .bl-payment__step-content p {
            font-size: 16px;
          }
        }

        @media (min-width: 1024px) {
          .bl-payment__panel {
            padding: 48px;
          }

          .bl-payment__header {
            grid-template-columns:
              minmax(0, 1.05fr)
              minmax(0, 0.95fr);
            align-items: end;
            gap: 64px;
          }

          .bl-payment__intro {
            padding-bottom: 3px;
          }

          .bl-payment__steps {
            grid-template-columns:
              repeat(
                var(--payment-columns),
                minmax(0, 1fr)
              );
            gap: 0;
            margin-top: 40px;
            padding-block: 32px;
            border-top: 1px solid rgb(255 255 255 / 24%);
          }

          .bl-payment__step {
            display: block;
            padding: 0 28px;
            border-top: 0;
          }

          .bl-payment__step:first-child {
            padding-left: 0;
          }

          .bl-payment__step:last-child {
            padding-right: 0;
          }

          .bl-payment__step + .bl-payment__step {
            border-left: 1px solid rgb(255 255 255 / 24%);
          }

          .bl-payment__number {
            padding: 0;
            font-size: 32px;
            line-height: 1;
          }

          .bl-payment__step-content {
            margin-top: 22px;
          }

          .bl-payment__step-content p {
            max-width: 34ch;
          }

          .bl-payment__note {
            padding-top: 24px;
            font-size: 14px;
          }
        }

        @media (min-width: 1280px) {
          .bl-payment__panel {
            padding: 52px 56px 40px;
          }

          .bl-payment__step {
            padding-inline: 36px;
          }
        }
        .bl-payment__panel {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .bl-payment__panel::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: 0.14;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96' fill='none'%3E%3Cpath d='M0 24H24A24 24 0 0 1 48 48V96M48 0A24 24 0 0 0 72 24H96' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E");
          background-size: 96px 96px;
          background-repeat: repeat;
          -webkit-mask-image: linear-gradient(
            110deg,
            transparent 5%,
            rgba(0, 0, 0, 0.35) 40%,
            #000 100%
          );
          mask-image: linear-gradient(
            110deg,
            transparent 5%,
            rgba(0, 0, 0, 0.35) 40%,
            #000 100%
          );
        }
      `}</style>
    </section>
  );
}
