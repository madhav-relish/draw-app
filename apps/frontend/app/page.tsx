import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navigation Header */}
      <Header />
      
      {/* Main Content Layout */}
      <main className="flex-1">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      
      {/* Footer Block */}
      <Footer />
    </div>
  );
}
