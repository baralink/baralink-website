'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PHONES, telHref } from '@/lib/contact';

/**
 * The red "Call" button of the sticky header: one tap opens BaraLink's numbers, each a
 * tel: link (contact_click {method: phone}).
 */
export function CallButton({ compact = false, up = false }: { compact?: boolean; up?: boolean }) {
  const { t, href } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === 'Escape' : !ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex min-h-10 items-center gap-2 rounded-full bg-call font-semibold text-white shadow-sm transition hover:bg-call-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-call ${
          compact ? 'px-4 text-sm' : 'px-5 text-sm'
        }`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {t.call.button}
      </button>
      {open && (
        <div
          className={`absolute z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl ${
            up ? 'bottom-full left-1/2 mb-2 -translate-x-1/2' : 'right-0 top-full mt-2'
          }`}
        >
          <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-slate-500">{t.call.title}</p>
          {PHONES.map((phone) => (
            <a
              key={phone}
              href={telHref(phone)}
              data-analytics="contact_click"
              data-method="phone"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-call/10 text-call">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              {phone}
            </a>
          ))}
          <a
            href={`${href('/')}#contact`}
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-primary transition hover:bg-slate-50"
          >
            {t.call.write}
          </a>
        </div>
      )}
    </div>
  );
}
