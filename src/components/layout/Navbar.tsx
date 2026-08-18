"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const themeTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      setHasScrolled(window.scrollY > 12);
      const marker = window.innerHeight * 0.38;
      const current = navItems.reduce((active, item) => {
        const section = document.querySelector(item.href);

        if (!section) {
          return active;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= marker ? item.href : active;
      }, navItems[0].href);

      setActiveSection(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (themeTimeoutRef.current !== null) {
        window.clearTimeout(themeTimeoutRef.current);
      }
    };
  }, []);

  function toggleDarkMode() {
    const nextMode = !isDarkMode;
    const root = document.documentElement;

    root.classList.add("theme-switching");
    root.classList.toggle("dark", nextMode);
    localStorage.setItem("theme", nextMode ? "dark" : "light");
    setIsDarkMode(nextMode);
    if (themeTimeoutRef.current !== null) {
      window.clearTimeout(themeTimeoutRef.current);
    }
    themeTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
      themeTimeoutRef.current = null;
    }, 80);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-150 ${
        hasScrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/92"
          : "bg-white/78 backdrop-blur-md dark:bg-slate-950/72"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <a href="#home" className="flex min-w-0 max-w-[calc(100vw-8.5rem)] items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:max-w-none">
          <Image
            src="/assets/profile/christian.jpg"
            alt="Christian Paul Quema"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full border border-slate-200 object-cover object-top shadow-sm dark:border-slate-700"
          />
          <span className="truncate text-sm font-semibold text-slate-950 dark:text-white sm:text-base">Christian Paul Quema</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                activeSection === item.href
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              }`}
            >
              {activeSection === item.href ? (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 -z-10 rounded-full border border-emerald-200 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/50"
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-150 hover:bg-slate-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
          >
            <motion.span
              key={isDarkMode ? "sun" : "moon"}
              initial={false}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
            >
              {isDarkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </motion.span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-150 hover:bg-slate-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 top-16 z-0 bg-slate-950/10 dark:bg-slate-950/45 lg:hidden"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.14 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10, clipPath: "inset(0 0 14% 0 round 24px)" }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 24px)" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, clipPath: "inset(0 0 10% 0 round 24px)" }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-20 z-10 rounded-[1.35rem] border border-slate-200 bg-white/96 p-2 shadow-2xl shadow-slate-950/12 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/96 lg:hidden"
            >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.16, delay: navItems.indexOf(item) * 0.022 }}
                  className={`flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                    activeSection === item.href
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      activeSection === item.href ? "bg-emerald-600 dark:bg-emerald-300" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
