import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Links from "@/components/Links";
import Footer from "@/components/Footer";
import GsapInit from "@/components/GsapInit";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Team from "@/components/team";
import CV from "@/components/CV";

export default function HomePage() {
  return (
    <main className="relative">
      <GsapInit />
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Team />
      <CV />
      <Links />
      <Footer />
    </main>
  );
}
