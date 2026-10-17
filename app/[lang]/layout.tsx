import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Instrument_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { LOCALES, SITE_URL, alternatesFor, hasLocale } from "@/lib/i18n/locales";
import { Analytics } from "@/components/analytics/Analytics";
import { Invitation } from "@/components/analytics/Invitation";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import "../globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// Both languages are built ahead; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const meta = dictionaries[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s | BaraLink` },
    description: meta.description,
    applicationName: "BaraLink",
    keywords: meta.keywords,
    alternates: alternatesFor(lang),
    openGraph: {
      type: "website",
      siteName: "BaraLink",
      title: meta.title,
      description: meta.description,
      url: alternatesFor(lang).canonical,
      locale: lang === "fr" ? "fr_GN" : "en_US",
      alternateLocale: lang === "fr" ? ["en_US"] : ["fr_GN"],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${instrumentSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900">
        <I18nProvider locale={lang}>
          <Invitation />
          {children}
          <MobileActionBar />
          {/* Consent banner, then Google Tag Manager only after "Accept" (analytics plan AN-5). */}
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
