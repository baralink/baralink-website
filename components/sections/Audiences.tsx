'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function Audiences() {
  const { t, href, locale } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = [
    { id: 'for-clients', label: t.forEveryone.tabClients, ...t.forEveryone.clients, image: 'clientbanner', position: '70% center', action: t.audiences.clientsButton },
    { id: 'for-workers', label: t.forEveryone.tabWorkers, ...t.forEveryone.workers, image: 'workerbanner', position: '72% top', action: t.audiences.workersButton },
  ];
  const goTo = (index: number) => {
    const container = track.current;
    const slide = container?.children[index] as HTMLElement | undefined;
    if (!container || !slide) return;
    container.scrollTo({
      left: slide.offsetLeft - (container.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section id="for-everyone" aria-labelledby="audiences-title" className="bl-audiences">
      <div className="bl-audiences__shell">
        <div className="bl-audiences__header">
          <h2 id="audiences-title" className="t-h2">{t.forEveryone.sectionTitle}</h2>
          <div className="bl-audiences__controls">
            <span aria-live="polite" aria-atomic="true">{slides[active].label} · {active + 1}/2</span>
            <button type="button" aria-label={locale === 'fr' ? 'Diapositive précédente' : 'Previous slide'} aria-controls="audiences-slides" onClick={() => goTo((active + 1) % 2)}><ArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" aria-label={locale === 'fr' ? 'Diapositive suivante' : 'Next slide'} aria-controls="audiences-slides" onClick={() => goTo((active + 1) % 2)}><ArrowRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
        <div
          id="audiences-slides"
          className="bl-audiences__track"
          ref={track}
          tabIndex={0}
          role="region"
          aria-label={t.forEveryone.sectionTitle}
          onScroll={(event) => {
            const container = event.currentTarget;
            setActive(container.scrollLeft > (container.scrollWidth - container.clientWidth) / 2 ? 1 : 0);
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              goTo((active + 1) % 2);
            }
          }}
        >
          {slides.map((slide) => (
            <article key={slide.id} id={slide.id} className="bl-audiences__banner" aria-labelledby={`${slide.id}-title`}>
              <Image src={`/assets/social/${slide.image}.png`} alt={slide.photoAlt} fill sizes="(min-width: 1280px) 1208px, 100vw" style={{ objectFit: 'cover', objectPosition: slide.position }} />
              <div className="bl-audiences__overlay" aria-hidden="true" />
              <div className="bl-audiences__content">
                <p className="bl-audiences__subtitle">{slide.subtitle}</p>
                <h3 id={`${slide.id}-title`}>{slide.title}</h3>
                <p className="bl-audiences__body">{slide.body}</p>
                <a href={`${href('/')}#download`} className="bl-audiences__action">
                  <span>{slide.action}</span><ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .bl-audiences {
          scroll-margin-top: 96px;
          background: #fff;
        }

        .bl-audiences__shell {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding: 48px 20px;
        }

        .bl-audiences__banner {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          min-height: 520px;
          overflow: hidden;
          border-radius: 24px;
          background: #101a32;
          color: #fff;
        }

        .bl-audiences__overlay {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(7, 15, 34, 0.96) 0%,
            rgba(7, 15, 34, 0.9) 32%,
            rgba(7, 15, 34, 0.7) 52%,
            rgba(7, 15, 34, 0.24) 76%,
            rgba(7, 15, 34, 0.08) 100%
          );
        }

        .bl-audiences__content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 620px;
          padding: 40px 24px;
        }

        .bl-audiences__subtitle {
          max-width: 38ch;
          margin: 0 0 18px;
          color: var(--color-accent, #f5c518);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.6;
          text-wrap: pretty;
        }

        h3 {
          max-width: 17ch;
          margin: 0;
          color: #fff;
          font-size: clamp(2.125rem, 4.3vw, 3.5rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .bl-audiences__body {
          max-width: 44ch;
          margin: 24px 0 0;
          color: #edf1fa;
          font-size: 16px;
          line-height: 1.8;
          text-wrap: pretty;
        }

        .bl-audiences__action {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          max-width: 100%;
          min-height: 52px;
          margin-top: 28px;
          padding: 14px 24px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: var(--color-accent, #f5c518);
          color: #0f172a;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.45;
          text-decoration: none;
          transition: background-color 180ms ease;
        }

        .bl-audiences__action span {
          min-width: 0;
        }

        .bl-audiences__action :global(svg) {
          flex-shrink: 0;
        }

        .bl-audiences__action:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 5px;
        }

        @media (hover: hover) {
          .bl-audiences__action:hover {
            background: #ffda45;
          }
        }

        @media (max-width: 767px) {
          .bl-audiences__overlay {
            background: linear-gradient(
              90deg,
              rgba(7, 15, 34, 0.95) 0%,
              rgba(7, 15, 34, 0.9) 60%,
              rgba(7, 15, 34, 0.75) 100%
            );
          }
        }

        @media (min-width: 640px) {
          .bl-audiences__shell {
            padding: 64px 36px;
          }

          .bl-audiences__banner {
            border-radius: 28px;
          }

          .bl-audiences__content {
            padding: 48px 40px;
          }

          .bl-audiences__subtitle {
            font-size: 15px;
          }

          .bl-audiences__body {
            font-size: 17px;
          }
        }

        @media (min-width: 1024px) {
          .bl-audiences__banner {
            min-height: 560px;
          }

          .bl-audiences__content {
            max-width: 640px;
            padding: 56px;
          }

          .bl-audiences__action {
            margin-top: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bl-audiences__action {
            transition: none;
          }
        }

        .bl-audiences__header { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
        .bl-audiences__controls { display: flex; align-items: center; gap: 12px; }
        .bl-audiences__controls button { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border: 1px solid #cbd5e1; border-radius: 50%; background: white; color: #0f172a; cursor: pointer; }
        .bl-audiences__controls button:hover { background: #eef1fd; }
        .bl-audiences__controls button:focus-visible { outline: 3px solid #1a1ae6; outline-offset: 3px; }
        .bl-audiences__track { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: #1a1ae6 #eef1fd; padding-bottom: 12px; }
        .bl-audiences__banner { flex: 0 0 100%; scroll-snap-align: start; scroll-margin-top: 96px; }
        .bl-audiences__track:focus-visible { outline: 3px solid #1a1ae6; outline-offset: 5px; }
      `}</style>
    </section>
  );
}
