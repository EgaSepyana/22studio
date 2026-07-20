import Hero from "../components/sections/Hero";
import ClientMarquee from "../components/sections/ClientMarquee";
import About from "../components/sections/About";
import FoundersPromise from "../components/sections/FoundersPromise";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import HowToOrder from "../components/sections/HowToOrder";
import StatsBand from "../components/sections/StatsBand";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <About />
      <FoundersPromise />
      <Services />
      <Projects />
      <HowToOrder />
      <StatsBand />
      <FAQ />
      <Contact />
    </>
  );
}
