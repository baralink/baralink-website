'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A panel that slides over the page on small screens: Escape closes it, Tab stays inside,
 * the page behind cannot scroll and focus returns to the control that opened it.
 */
export function Sheet({
  open,
  onClose,
  labelledBy,
  side = 'right',
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] xl:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/55"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'on-cobalt absolute inset-y-0 flex w-[min(92vw,400px)] flex-col overflow-y-auto bg-primary px-6 py-6 text-white',
          side === 'right' ? 'right-0' : 'left-0',
        )}
      >
        {children}
      </div>
    </div>
  );
}
