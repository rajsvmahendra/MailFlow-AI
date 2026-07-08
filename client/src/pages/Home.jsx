import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FeaturesGrid from "../components/FeaturesGrid";
import MinimalCTA from "../components/MinimalCTA";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "MailFlow AI - Write Professional Emails 10x Faster";
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 italic-selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <MinimalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
