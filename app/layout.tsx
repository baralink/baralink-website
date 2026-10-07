import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
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
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
