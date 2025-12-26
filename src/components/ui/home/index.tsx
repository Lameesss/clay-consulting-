"use client";
import Awards from "../studio/awards";
import FAQSection from "./FaqSection";
import Features from "./features";
import Footer from "./footer";
import HeroSection from "./hero-section";
import Introduction from "./Introduction";
import Projects from "./projects";
import Services from "./services";
import TeamSection from "./TeamSection";
import { Testi } from "./Testi";

const HomeInject = () => {
  return (
    <main className="relative perspective-wrapper">
      <HeroSection />
      <Awards />
      <Projects />
      <Introduction />
      <Services />
      <Features />
      <FAQSection />
      <Testi />
      <TeamSection />
      <Footer />
      {/* <Testimonials /> 
      {/* <AboutSection/> */}
      {/* <CallToAction/> */}
    </main>
  );
};

export default HomeInject;
