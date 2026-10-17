import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { Invitation } from "@/components/analytics/Invitation";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BaraLink | Trusted local workers, a tap away",
  description:
    "Book verified local workers in Guinea for repairs, cleaning, delivery and everyday home services.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900">
        <I18nProvider>
          <Invitation />
          {children}
          {/* Consent banner, then Google Tag Manager only after "Accept" (analytics plan AN-5). */}
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
