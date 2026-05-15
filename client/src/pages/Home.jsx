import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import WhyUsSection from '../components/sections/WhyUsSection';
import ContactSection from '../components/sections/ContactSection';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <FloatingWhatsApp />
    </>
  );
};

export default Home;
