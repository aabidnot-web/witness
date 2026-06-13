import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStatement from "@/components/TrustStatement";
import Problem from "@/components/Problem";
import ZoomParallax from "@/components/ZoomParallax";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import ProductShowcase from "@/components/ProductShowcase";
import Manifesto from "@/components/Manifesto";
import SocialProof from "@/components/SocialProof";
import Quote from "@/components/Quote";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <TrustStatement />
        <div className="section-divider" />
        <Problem />
        <ZoomParallax />
        <Comparison />
        <div className="section-divider" />
        <HowItWorks />
        <ProductShowcase />
        <div className="section-divider" />
        <Manifesto />
        <SocialProof />
        <Quote />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
