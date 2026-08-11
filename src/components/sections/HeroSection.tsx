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
      `radial-gradient(circle at ${50 + Number(x) * 18}% ${34 + Number(y) * 14}%, rgb(16 185 129 / 0.18), transparent 30rem), radial-gradient(circle at 82% 18%, rgb(14 116 144 / 0.12), transparent 34rem), linear-gradient(135deg,#f7f8f5 0%,#eef6f0 48%,#edf4f8 100%)`
  );
  const portraitGlowX = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value * 18));
  const portraitGlowY = useTransform(springY, (value) => (prefersReducedMotion ? 0 : value * 18));
  const verticalLineY = useTransform(springY, (value) => (prefersReducedMotion ? 0 : value * -22));
  const horizontalLineX = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value * -24));
  const webCardX = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value * -8));
  const mobileCardX = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value * 8));
  const techCardY = useTransform(springY, (value) => (prefersReducedMotion ? 0 : value * 8));

  return (
    <section
      ref={sectionRef}
      id="home"
      className="ambient-section relative overflow-hidden pt-28 sm:pt-32"
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
          background: prefersReducedMotion ? undefined : heroBackground
        }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(90deg,transparent_0_12%,rgb(15_23_42_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(15_23_42_/_0.045)_87.9%,transparent_88%)] dark:bg-[linear-gradient(90deg,transparent_0_12%,rgb(226_232_240_/_0.045)_12.1%,transparent_12.2%_87.8%,rgb(226_232_240_/_0.045)_87.9%,transparent_88%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 pb-16 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:gap-14 lg:px-8 lg:pb-28">
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
          <h1 className="mt-6 max-w-4xl text-[clamp(2.35rem,13vw,4rem)] font-semibold leading-[0.96] text-slate-950 dark:text-white md:mt-7 md:text-[clamp(4rem,7.3vw,5.9rem)]">
            Christian Paul Quema
          </h1>
          <div className="mt-6 max-w-3xl">
            <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 sm:text-xl">{profile.primaryRole}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {profile.supportingRoles.map((role) => (
                <span key={role} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/70">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <HeroDetails />
          </div>
        </motion.div>

        <motion.div className="relative order-2 mx-auto w-full max-w-[252px] min-[390px]:max-w-[300px] sm:max-w-[360px] md:max-w-[470px]" style={{ y: portraitY }}>
          <motion.div
            className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgb(16_185_129_/_0.18),transparent_58%)]"
            style={{
              x: portraitGlowX,
              y: portraitGlowY
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -left-5 top-10 h-24 w-px bg-gradient-to-b from-transparent via-emerald-600 to-transparent dark:via-emerald-300"
            style={{ y: verticalLineY }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-3 bottom-24 h-px w-28 bg-gradient-to-r from-transparent via-cyan-700 to-transparent dark:via-cyan-300"
            style={{ x: horizontalLineX }}
            aria-hidden="true"
          />

          <div className="relative rounded-[1.8rem] border border-slate-200 bg-white/40 p-4 shadow-2xl shadow-slate-200/80 backdrop-blur dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-black/30">
            <div className="absolute -right-4 top-5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              profile
            </div>
            <div className="relative overflow-hidden rounded-[1.35rem] bg-slate-100">
              <Image
                src="/assets/profile/christian.jpg"
                alt="Portrait of Christian Paul Quema"
                width={940}
                height={1128}
                priority
                sizes="(min-width: 768px) 470px, 90vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(2_6_23_/_0.1))]" />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Building practical web and mobile applications</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{profile.location}</p>
            </div>
          </div>

          <div className="mt-12 hidden grid-cols-2 gap-3 md:grid">
            {Object.entries(profile.heroTech).map(([category, items], index) => (
              <motion.div
                key={category}
                className="premium-surface interactive-card rounded-2xl p-4"
                style={{
                  x: index === 0 ? webCardX : mobileCardX,
                  y: techCardY
                }}
              >
                <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{category}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="order-3 md:hidden">
          <HeroDetails compact />
        </div>
      </div>
    </section>
  );
}

function HeroDetails({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <p className={`${compact ? "mt-1" : "mt-7"} max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg`}>
        {profile.intro}
      </p>

      <div className={`${compact ? "mt-6" : "mt-7"} grid gap-3 sm:grid-cols-2 md:hidden`}>
        {Object.entries(profile.heroTech).map(([category, items]) => (
          <div key={category} className="premium-surface interactive-card rounded-2xl p-4">
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{category}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.slice(0, 4).map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`${compact ? "mt-6" : "mt-7"} flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300`}>
        {profile.secondaryStack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-800 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-950/60 dark:hover:text-emerald-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className={`${compact ? "mt-7" : "mt-9"} flex flex-col gap-3 min-[420px]:flex-row`}>
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

      <div className={`${compact ? "mt-5" : "mt-6"} flex flex-wrap gap-2 sm:gap-3`}>
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
    </>
  );
}
