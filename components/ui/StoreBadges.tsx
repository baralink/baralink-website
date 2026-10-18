import Image from 'next/image';
import { storeHref } from '@/lib/analytics';

/** The two store badges; the analytics placement says where they were tapped. */
export function StoreBadges({ placement, className = '' }: { placement: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={storeHref('app_store', null)}
        data-analytics="download_click"
        data-store="app_store"
        data-placement={placement}
        aria-label="Download on the App Store"
        className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Image src="/assets/social/appleStore-badge.png" alt="Download on the App Store" width={800} height={238} className="h-11 w-auto" />
      </a>
      <a
        href={storeHref('play', null)}
        data-analytics="download_click"
        data-store="play"
        data-placement={placement}
        aria-label="Get it on Google Play"
        className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Image src="/assets/social/googlePlay-badge.png" alt="Get it on Google Play" width={800} height={238} className="h-11 w-auto" />
      </a>
    </div>
  );
}
