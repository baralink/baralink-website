'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PHONES, telHref } from '@/lib/contact';

/**
 * Phones only: two thumb-sized actions that appear when the visitor scrolls back up the page,
 * and stay away while they read downwards, near the contact form, or at the end of the page.
 */
export function MobileActionBar() {
  const { t, href } = useI18n();
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const measure = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current - 6;
      const goingDown = y > lastY.current + 6;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 320;
      const contact = document.getElementById('contact');
      const inContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight
        : false;

      if (goingDown) setVisible(false);
      else if (goingUp && y > 600 && !nearEnd && !inContact) setVisible(true);
      lastY.current = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <nav
      aria-label={t.mobileBar.download}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 xl:hidden"
    >
      <a
        href={`${href('/')}#download`}
        data-analytics="download_click"
        data-store="any"
        data-placement="mobile_bar"
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary text-[16px] font-semibold text-white"
      >
        <Download className="h-5 w-5" aria-hidden="true" />
        {t.mobileBar.download}
      </a>
      <a
        href={telHref(PHONES[0])}
        data-analytics="contact_click"
        data-method="phone"
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-tile text-[16px] font-semibold text-ink"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        {t.mobileBar.call}
      </a>
    </nav>
  );
}
