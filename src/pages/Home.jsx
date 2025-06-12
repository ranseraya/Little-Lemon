import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';

function Home() {
  return (
    <section className="home-page">
      <Hero />
      <Specials />
      <Testimonials />
      <AboutSection />
    </section>
  );
}

export default Home;