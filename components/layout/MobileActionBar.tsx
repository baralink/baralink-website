'use client';

import { Download, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PHONES, telHref } from '@/lib/contact';

/** Phones only: Call and Download, always under the thumb. */
export function MobileActionBar() {
  const { t, href } = useI18n();
  return (
    <>
      <div className="h-[72px] sm:hidden" aria-hidden="true" />
      <nav
        aria-label={t.mobileBar.call}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-slate-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden"
      >
        <a
          href={telHref(PHONES[0])}
          data-analytics="contact_click"
          data-method="phone"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-call text-base font-semibold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {t.mobileBar.call}
        </a>
        <a
          href={`${href('/')}#download`}
          data-analytics="download_click"
          data-store="any"
          data-placement="mobile_bar"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold text-slate-950"
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          {t.mobileBar.download}
        </a>
      </nav>
    </>
  );
}
