'use client';

import { Briefcase, Building2, Handshake, Search } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { CONTACT_TOPIC_EVENT, type ContactTopic } from '@/lib/contact';

/**
 * "What would you like to do?" — the four reasons people come, one tap each. The last two
 * open the contact form with its topic already chosen.
 */
export function QuickActions() {
  const { t } = useI18n();
  const q = t.quick;
  const items: { icon: typeof Search; href: string; topic?: ContactTopic }[] = [
    { icon: Search, href: '#for-clients' },
    { icon: Briefcase, href: '#for-workers' },
    { icon: Building2, href: '#contact', topic: 'business' },
    { icon: Handshake, href: '#contact', topic: 'partnership' },
  ];

  return (
    <section aria-labelledby="quick-title" className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.10)] sm:p-6">
        <h2 id="quick-title" className="px-2 pb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          {q.title}
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, href, topic }, i) => (
            <a
              key={q.items[i].title}
              href={href}
              onClick={() => {
                if (topic) window.dispatchEvent(new CustomEvent(CONTACT_TOPIC_EVENT, { detail: topic }));
              }}
              className="group flex flex-col items-start gap-3 rounded-2xl p-3 transition hover:bg-primary-light sm:flex-row sm:gap-4 sm:p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 sm:text-base">{q.items[i].title}</span>
                <span className="mt-0.5 hidden text-sm leading-5 text-slate-600 sm:block">{q.items[i].body}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
