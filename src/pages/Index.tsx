import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import WhySection from '@/components/WhySection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MissionSection from '@/components/MissionSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <WhySection />
        <TestimonialsSection />
        <MissionSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
