'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nProvider';

const serviceIcons = [
  'plumber',
  'electrician',
  'cleaning',
  'painting',
  'carpenter',
  'air-conditioning',
  'mechanic',
  'moving',
] as const;

export function Services() {
  const { t } = useI18n();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="on-accent bl-services"
    >
      <div className="bl-services__inner">
        <div className="bl-services__header">
          <h2 id="services-title">
            {t.sections.servicesTitle}
          </h2>

          <p>{t.sections.servicesMore}</p>
        </div>

        <ul className="bl-services__list" role="list">
          {t.services.map((name, index) => {
            const icon = serviceIcons[index];

            return (
              <li key={name} className="bl-services__item">
                <div className="bl-services__art">
                  {icon && (
                    <Image
                      src={`/assets/baralink-category-icons/${icon}.png`}
                      alt=""
                      width={256}
                      height={256}
                      sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </div>

                <span className="bl-services__name">
                  {name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .bl-services {
          width: 100%;
          scroll-margin-top: 96px;
          background: var(--color-accent, #f5c518);
          color: #0f172a;
        }

        .bl-services__inner {
          padding: 36px clamp(20px, 4vw, 72px) 40px;
        }

        .bl-services__header {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 26px;
          border-bottom: 1px solid rgb(15 23 42 / 16%);
        }

        h2 {
          max-width: 24ch;
          margin: 0;
          font-size: clamp(1.75rem, 2.5vw, 2.5rem);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .bl-services__header p {
          max-width: 44ch;
          margin: 0;
          color: #35404d;
          font-size: 15px;
          line-height: 1.7;
          text-wrap: pretty;
        }

        .bl-services__list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 20px;
          row-gap: 28px;
          margin: 0;
          padding: 28px 0 0;
          list-style: none;
        }

        .bl-services__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          min-width: 0;
          text-align: center;
        }

        .bl-services__art {
          flex-shrink: 0;
          width: 96px;
          height: 96px;
        }

        .bl-services__name {
          max-width: 18ch;
          color: #0f172a;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.025em;
          overflow-wrap: break-word;
          text-wrap: balance;
        }

        @media (min-width: 640px) {
          .bl-services__inner {
            padding-block: 40px 44px;
          }

          .bl-services__art {
            width: 112px;
            height: 112px;
          }

          .bl-services__name {
            font-size: 18px;
          }

          .bl-services__list {
            row-gap: 32px;
          }
        }

        @media (min-width: 768px) {
          .bl-services__header {
            flex-direction: row;
            align-items: end;
            justify-content: space-between;
            gap: 48px;
          }

          .bl-services__header p {
            max-width: 40ch;
          }

          .bl-services__list {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            column-gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          .bl-services__inner {
            padding-block: 44px 48px;
          }

          .bl-services__list {
            padding-top: 32px;
            row-gap: 36px;
          }

          .bl-services__art {
            width: 128px;
            height: 128px;
          }

          .bl-services__name {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}