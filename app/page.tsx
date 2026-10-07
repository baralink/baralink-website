import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForEveryone } from "@/components/sections/ForEveryone";
import { Contact } from "@/components/sections/Contact";
import { BannerCTA } from "@/components/sections/BannerCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <ForEveryone />
        <Contact />
        <BannerCTA />
      </main>
      <Footer />
    </>
  );
}
