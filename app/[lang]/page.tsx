import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Contact } from "@/components/sections/Contact";
import { Audiences } from "@/components/sections/Audiences";
import { Services } from "@/components/sections/Services";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuickActions } from "@/components/sections/QuickActions";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL, alternatesFor, hasLocale } from "@/lib/i18n/locales";
import { PHONES, SOCIAL_LINKS } from "@/lib/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: { absolute: dictionaries[lang].meta.title } };
}

/**
 * Who BaraLink is, where it works and how to reach it, for search engines and AI assistants
 * (schema.org). Only facts shown on the page; the email is added once its mailbox exists.
 */
function structuredData(lang: "fr" | "en") {
  const meta = dictionaries[lang].meta;
  const organization = `${SITE_URL}/#organization`;
  const website = `${SITE_URL}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organization,
        name: "BaraLink",
        url: SITE_URL,
        logo: `${SITE_URL}/logos/BaraLink-Logo-white.png`,
        description: meta.description,
        sameAs: Object.values(SOCIAL_LINKS),
        areaServed: { "@type": "Country", name: "Guinea", identifier: "GN" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Conakry",
          addressRegion: "Matoto",
          addressCountry: "GN",
        },
        contactPoint: PHONES.map((phone) => ({
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: phone.replace(/\s/g, ""),
          areaServed: "GN",
          availableLanguage: ["French", "English"],
        })),
      },
      {
        "@type": "WebSite",
        "@id": website,
        url: SITE_URL,
        name: "BaraLink",
        inLanguage: ["fr", "en"],
        publisher: { "@id": organization },
      },
      {
        "@type": "WebPage",
        url: alternatesFor(lang).canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: lang,
        isPartOf: { "@id": website },
        about: { "@id": organization },
      },
    ],
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <Hero />
        <QuickActions />
        <HowItWorks />
        <Audiences />
        <Services />
        <About />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
