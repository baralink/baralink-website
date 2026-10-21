'use client';

import { useEffect } from 'react';

/**
 * Adds `is-in` to every [data-rise] element as it reaches the viewport. The hidden state lives in
 * CSS behind the `js` class, so without JavaScript (or with it delayed) nothing is ever hidden.
 */
export function Reveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-rise]'));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
