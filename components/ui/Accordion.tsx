'use client';

import { ChevronDown } from 'lucide-react';

/**
 * Answers that open in place, built on <details>: keyboard and screen-reader support come
 * from the browser, and every answer stays in the page for search engines.
 */
export function Accordion({
  items,
  className = '',
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
  className?: string;
}) {
  return (
    <ul className={`accordion ${className}`}>
      {items.map((item) => (
        <li key={item.q}>
          <details className="group">
            <summary className="flex cursor-pointer items-start justify-between gap-6 px-1 py-5 transition-colors duration-200 hover:text-primary">
              <h3 className="t-lead max-w-[46ch] font-medium">{item.q}</h3>
              <ChevronDown
                className="mt-1 h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-[62ch] px-1 pb-6 t-body text-ink-soft">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
