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
import ContactForm from "@/components/ContactForm";

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

      {/* Contact */}
      <section id="contact" className="px-6 py-28 md:px-12 lg:px-20">
        <div className="border-b hairline pb-10">
          <span className="inline-block text-xs uppercase tracking-widest2 text-fg-faint">
            05 &#8212; Contact
          </span>
          <div className="overflow-hidden mt-6">
            <h2 className="font-display text-4xl leading-tight tracking-tightest md:text-5xl">
              Have a project in mind?<br />I&apos;d like to hear about it.
            </h2>
          </div>
        </div>
        <ContactForm />
      </section>

      <Links />
      <Footer />
    </main>
  );
}
