'use client';

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { openConsentSettings } from "@/lib/analytics";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9V9Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.9 2H22l-7.5 8.57L23 22h-6.9l-5.4-7.06L4.5 22H1.4l8.03-9.17L1 2h7.07l4.88 6.45L18.9 2Zm-1.21 18h1.72L7.4 3.78H5.56L17.69 20Z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M16.5 2c.3 2.03 1.47 3.4 3.5 3.57v2.5c-1.18.11-2.2-.27-3.4-1v6.57c0 4.17-4.55 5.47-6.78 2.48-1.43-1.93-.86-5.3 2.9-5.44v2.57c-.57.09-1.18.23-1.5.5-.95.8-.68 2.57.86 2.68 1 .07 1.92-.6 1.92-1.9V2h2.5Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.63.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.55.55-1.1.9-1.76 1.15-.63.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.21 1.15-1.76.55-.55 1.1-.9 1.76-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.4-8.84a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0Z",
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
      {/* White "Get started" CTA band */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 py-16 sm:flex-row sm:gap-8 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            {t.footer.getStarted}
          </h2>
          <a
            href="#download"
            data-analytics="download_click"
            data-store="any"
            data-placement="footer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
          >
            {t.footer.contact}
          </a>
        </div>
      </div>

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
                        href={link.href}
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
                    aria-label={s.label}
                    data-analytics="social_click"
                    data-network={s.label.toLowerCase()}
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
              <a href="#" className="transition hover:text-accent">
                {t.footer.legal}
              </a>
              <Link href={href('/privacy')} className="transition hover:text-accent">
                {t.footer.privacy}
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
