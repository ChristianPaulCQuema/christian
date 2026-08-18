"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, GitFork, Mail, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { profile } from "@/data/profile";
import { transitions } from "@/lib/motion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.7 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 52]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -24]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.78]);
  const heroBackground = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(circle at ${50 + Number(x) * 18}% ${34 + Number(y) * 14}%, rgb(16 185 129 / 0.16), transparent 30rem), radial-gradient(circle at 82% 18%, rgb(14 116 144 / 0.1), transparent 34rem), linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 8%, var(--background)) 48%, color-mix(in srgb, var(--accent-2) 8%, var(--background)) 100%)`
  );
  const portraitGlowX = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value * 18));
  const portraitGlowY = useTransform(springY, (value) => (prefersReducedMotion ? 0 : value * 18));
  const heroIntro =
    "I build practical web and mobile applications with clean interfaces, reliable backend workflows, and real-world support experience behind every solution.";
  const heroStackPreview = ["Laravel", "PHP", "Flutter", "MySQL", "Supabase"];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="ambient-section relative overflow-hidden pt-32 sm:pt-36"
      onPointerMove={(event) => {
        if (prefersReducedMotion || event.pointerType !== "mouse") {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: heroBackground
        }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(90deg,transparent_0_12%,rgb(15_23_42_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(15_23_42_/_0.045)_87.9%,transparent_88%)] dark:bg-[linear-gradient(90deg,transparent_0_12%,rgb(226_232_240_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(226_232_240_/_0.045)_87.9%,transparent_88%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-12 lg:px-8 lg:pb-24 xl:gap-16">
        <motion.div
          className="order-1"
          style={{ y: textY, opacity: heroOpacity }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={transitions.smooth}
        >
          <p className="eyebrow-chip">
            <Sparkles size={14} aria-hidden="true" />
            Developer portfolio / Metro Manila
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.65rem,13vw,4.45rem)] font-semibold leading-[0.96] text-slate-950 dark:text-white md:mt-7 md:text-[clamp(4.2rem,6.2vw,5.4rem)]">
            Christian{" "}
            <span className="block">Paul Quema</span>
          </h1>
          <div className="mt-6 max-w-2xl">
            <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 sm:text-xl">{profile.primaryRole}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {profile.supportingRoles.map((role) => (
                <span key={role} className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 backdrop-blur dark:border-slate-700 dark:bg-slate-950/50">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <HeroDetails intro={heroIntro} stackPreview={heroStackPreview} showSocial />
        </motion.div>

        <motion.div
          className="relative order-2 mx-auto w-full max-w-[280px] min-[390px]:max-w-[320px] sm:max-w-[380px] md:max-w-[420px]"
          style={{ y: portraitY }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ ...transitions.smooth, delay: 0.08 }}
        >
          <motion.div
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgb(16_185_129_/_0.16),transparent_60%)]"
            style={{
              x: portraitGlowX,
              y: portraitGlowY
            }}
            aria-hidden="true"
          />

          <div className="relative rounded-[1.55rem] border border-slate-200 bg-white/48 p-3 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-slate-700 dark:bg-slate-950/42 dark:shadow-black/30">
            <div className="relative overflow-hidden rounded-[1.2rem] bg-slate-100">
              <Image
                src="/assets/profile/christian.jpg"
                alt="Portrait of Christian Paul Quema"
                width={940}
                height={1128}
                priority
                sizes="(min-width: 768px) 420px, 90vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/78 via-slate-950/48 to-transparent px-4 pb-4 pt-14 text-white">
                <p className="text-sm font-semibold">Building practical web and mobile applications</p>
                <p className="mt-1 text-xs text-slate-200">{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 md:hidden">
            <SocialLinks />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroDetails({
  intro,
  stackPreview,
  showSocial = false
}: {
  intro: string;
  stackPreview: string[];
  showSocial?: boolean;
}) {
  return (
    <>
      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
        {intro}
      </p>

      <div className="mt-6 flex max-w-xl flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
        {stackPreview.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-800 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-950/60 dark:hover:text-emerald-300"
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

      {showSocial ? <SocialLinks className="mt-5 hidden md:flex" /> : null}
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
            <Icon className="transition-transform duration-150 group-hover:-translate-y-0.5" size={17} aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
