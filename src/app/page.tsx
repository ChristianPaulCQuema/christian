import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PointerSurface } from "@/components/motion/PointerSurface";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <MotionProvider>
      <div className="noise-layer" aria-hidden="true" />
      <ScrollProgress />
      <CursorFollower />
      <PointerSurface />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionProvider>
  );
}
