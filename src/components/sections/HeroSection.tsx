import { ArrowDownRight, GitFork, Layers, Mail, MessageCircle, Rocket } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { RotatingRole } from "@/components/hero/RotatingRole";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { HeroScene } from "@/components/three/HeroScene";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function HeroSection() {
  const heroIntro =
    "I build practical web and mobile applications with clean interfaces, reliable backend workflows, and real-world support experience behind every solution.";
  const heroStackPreview = ["Laravel", "PHP", "Flutter", "MySQL", "Supabase"];
  const roles = [profile.primaryRole, ...profile.supportingRoles];

  return (
    <section id="home" className="ambient-section relative overflow-hidden pt-28 sm:pt-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 58% 34%, rgb(16 185 129 / 0.16), transparent 30rem), radial-gradient(circle at 82% 18%, rgb(14 116 144 / 0.1), transparent 34rem), linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 8%, var(--background)) 48%, color-mix(in srgb, var(--accent-2) 8%, var(--background)) 100%)"
        }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(90deg,transparent_0_12%,rgb(15_23_42_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(15_23_42_/_0.045)_87.9%,transparent_88%)] dark:bg-[linear-gradient(90deg,transparent_0_12%,rgb(226_232_240_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(226_232_240_/_0.045)_87.9%,transparent_88%)]" />
      <HeroScene />

      <div className="hero-layout mx-auto px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="hero-copy-enter order-1">
          <p className="eyebrow-chip">
            <span className="live-dot" aria-hidden="true" />
            Developer portfolio / Metro Manila
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.65rem,13vw,4.45rem)] font-semibold leading-[0.96] text-slate-950 dark:text-white md:mt-7 md:text-[clamp(4.2rem,6.2vw,5.4rem)]">
            <HeroWord delay={60}>Christian</HeroWord>{" "}
            <span className="block">
              <HeroWord delay={180}>Paul</HeroWord>{" "}
              <HeroWord delay={300} gradient>
                Quema
              </HeroWord>
            </span>
          </h1>
          <div className="mt-6 max-w-2xl">
            <RotatingRole roles={roles} />
          </div>

          <HeroDetails intro={heroIntro} stackPreview={heroStackPreview} />
        </div>

        <div data-hero-anchor className="hero-portrait-enter hero-portrait-shell relative order-2 mx-auto">
          <div
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgb(16_185_129_/_0.16),transparent_60%)]"
            aria-hidden="true"
          />

          <div className="hero-portrait-float relative">
            <TiltCard className="rounded-[1.55rem]" max={9}>
              <div className="relative rounded-[1.55rem] border border-slate-200 bg-white/48 p-3 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-slate-700 dark:bg-slate-950/42 dark:shadow-black/30">
                <div className="relative overflow-hidden rounded-[1.2rem] bg-slate-100">
                  <Image
                    src="/assets/profile/christian.jpg"
                    alt="Professional portrait of Christian Paul Quema"
                    width={1251}
                    height={1536}
                    priority
                    sizes="(min-width: 1200px) 440px, (min-width: 900px) 40vw, (min-width: 640px) 400px, 90vw"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/78 via-slate-950/48 to-transparent px-4 pb-4 pt-14 text-white">
                    <p className="text-sm font-semibold">Building practical web and mobile applications</p>
                    <p className="mt-1 text-xs text-slate-200">{profile.location}</p>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="hero-badge left-3 top-6 sm:-left-10 sm:top-12">
              <span className="hero-badge-icon">
                <Rocket size={16} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-950 dark:text-white">{projects.length} projects</span>
                <span className="block text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">Web and mobile builds</span>
              </span>
            </div>

            <div className="hero-badge hero-badge--late bottom-24 right-3 sm:-right-10">
              <span className="hero-badge-icon is-cyan">
                <Layers size={16} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-950 dark:text-white">Full-stack</span>
                <span className="block text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">Laravel, Flutter, APIs</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About Me">
        <span className="scroll-cue-mouse" aria-hidden="true">
          <span className="scroll-cue-wheel" />
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em]" aria-hidden="true">
          Scroll
        </span>
      </a>
    </section>
  );
}

function HeroWord({ children, delay, gradient = false }: { children: ReactNode; delay: number; gradient?: boolean }) {
  return (
    <span className={`hero-word${gradient ? " hero-gradient-text" : ""}`}>
      <span style={{ "--d": `${delay}ms` } as CSSProperties}>{children}</span>
    </span>
  );
}

function HeroDetails({ intro, stackPreview }: { intro: string; stackPreview: string[] }) {
  return (
    <>
      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">{intro}</p>

      <div className="mt-6 flex max-w-xl flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
        {stackPreview.map((item, index) => (
          <span
            key={item}
            className="hero-chip rounded-full border border-slate-200 bg-white/70 px-3 py-1 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-800 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-950/60 dark:hover:text-emerald-300"
            style={{ "--d": `${640 + index * 70}ms` } as CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
        <Magnetic>
          <a
            href="#projects"
            className="btn-dark group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
          >
            View My Projects
            <ArrowDownRight className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" size={18} aria-hidden="true" />
          </a>
        </Magnetic>
        <Magnetic strength={0.12}>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition-colors duration-150 hover:border-emerald-300 hover:bg-emerald-50 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:hover:bg-emerald-950/50"
          >
            Contact Me
            <Mail size={18} aria-hidden="true" />
          </a>
        </Magnetic>
      </div>

      <SocialLinks className="mt-5" />
    </>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start ${className}`}>
      {[
        { href: profile.github, label: "GitHub", icon: GitFork },
        { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
        { href: profile.facebook, label: "Facebook", icon: MessageCircle }
      ].map((link) => {
        const Icon = link.icon;
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="group inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-white hover:text-slate-950 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            <Icon className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" size={17} aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
