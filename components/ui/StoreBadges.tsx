import Image from 'next/image';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const BADGES = [
  {
    key: 'app_store' as const,
    href: APP_STORE_URL,
    src: '/assets/social/appleStore-badge.png',
  },
  {
    key: 'play' as const,
    href: PLAY_STORE_URL,
    src: '/assets/social/googlePlay-badge.png',
  },
];

/**
 * The Google Play and App Store badges, shown wherever the app is offered. A badge links to its
 * listing once one is configured (`?blc=` campaign values are attached to the links by
 * <Invitation />); until then it renders as a plain image and `soon`, when given, says so.
 */
export function StoreBadges({
  placement,
  playAlt,
  appStoreAlt,
  soon,
  tone = 'dark',
  className,
}: {
  placement: string;
  playAlt: string;
  appStoreAlt: string;
  soon?: string;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const live = BADGES.some((badge) => Boolean(badge.href));

  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center gap-3">
        {BADGES.map((badge) => {
          const image = (
            <Image
              src={badge.src}
              alt={badge.key === 'play' ? playAlt : appStoreAlt}
              width={800}
              height={238}
              className="h-12 w-auto"
            />
          );
          return (
            <li key={badge.key}>
              {badge.href ? (
                <a
                  href={badge.href}
                  data-analytics="download_click"
                  data-store={badge.key}
                  data-placement={placement}
                  className="block transition-opacity duration-200 hover:opacity-85"
                >
                  {image}
                </a>
              ) : (
                <span className="block">{image}</span>
              )}
            </li>
          );
        })}
      </ul>
      {!live && soon ? (
        <p className={cn('t-ui mt-4 max-w-[42ch]', tone === 'dark' ? 'text-white/75' : 'text-ink-soft')}>{soon}</p>
      ) : null}
    </div>
  );
}
