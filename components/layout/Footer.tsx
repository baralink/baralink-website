'use client';

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { openConsentSettings } from "@/lib/analytics";
import { SOCIAL_LINKS, whatsappHref } from "@/lib/contact";

const socials = [
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    analytics: "social_click",
    network: "linkedin",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9V9Z",
  },
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    analytics: "social_click",
    network: "facebook",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    analytics: "social_click",
    network: "tiktok",
    path: "M16.5 2c.3 2.03 1.47 3.4 3.5 3.57v2.5c-1.18.11-2.2-.27-3.4-1v6.57c0 4.17-4.55 5.47-6.78 2.48-1.43-1.93-.86-5.3 2.9-5.44v2.57c-.57.09-1.18.23-1.5.5-.95.8-.68 2.57.86 2.68 1 .07 1.92-.6 1.92-1.9V2h2.5Z",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    analytics: "social_click",
    network: "instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.63.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.55.55-1.1.9-1.76 1.15-.63.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.21 1.15-1.76.55-.55 1.1-.9 1.76-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.4-8.84a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0Z",
  },
  {
    label: "WhatsApp",
    href: whatsappHref(),
    analytics: "contact_click",
    method: "whatsapp",
    path: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.82 14.01c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.38Z",
  },
];

export function Footer() {
  const { t, href } = useI18n();
  const footerLinks = {
    [t.footer.columns.company]: t.footer.company,
    [t.footer.columns.forWorkers]: t.footer.workers,
  };

  return (
    <footer className="relative">
      {/* Curved wave divider into blue */}
      <div className="relative -mb-px bg-white">
        <svg
          className="block h-16 w-full sm:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C360,120 1080,0 1440,70 L1440,120 L0,120 Z"
            fill="var(--color-primary)"
          />
          <path
            d="M0,40 C360,120 1080,0 1440,70"
            fill="none"
            stroke="#7CA8FF"
            strokeWidth="3"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Blue footer body */}
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 lg:px-8">
          {/* Link columns + socials */}
          <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr] lg:gap-16">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white/60">{title}</h3>
                <ul className="mt-5 space-y-3 text-sm font-semibold">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href.startsWith('#') ? `${href('/')}${link.href}` : link.href}
                        className="transition hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:text-right">
              <h3 className="text-sm font-medium text-white/60">
                {t.footer.columns.stayConnected}
              </h3>
              <div className="mt-5 flex gap-4 md:justify-end">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-analytics={s.analytics}
                    data-network={s.network}
                    data-method={s.method}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-primary"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <Image
                src="/logos/BaraLink-Logo-white.png"
                alt="BaraLink"
                width={300}
                height={330}
                className="h-20 w-auto object-contain brightness-0 invert sm:h-24"
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href={href('/terms')} className="transition hover:text-accent">
                {t.footer.legal}
              </Link>
              <Link href={href('/privacy')} className="transition hover:text-accent">
                {t.footer.privacy}
              </Link>
              <Link href={href('/delete-account')} className="transition hover:text-accent">
                {t.footer.deleteAccount}
              </Link>
              {/* Reopens the usage-statistics choice (analytics plan AN-5). */}
              <button type="button" onClick={openConsentSettings} className="transition hover:text-accent">
                {t.footer.cookies}
              </button>
              <span className="text-white/60">
                © {new Date().getFullYear()} BaraLink. {t.footer.rights}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
