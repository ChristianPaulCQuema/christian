"use client";

import { ArrowUpRight, CheckCircle2, GitFork, Loader2, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { transitions } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || profile.formspreeEndpoint;

  const formspreeReady = useMemo(() => Boolean(endpoint && endpoint.startsWith("https://formspree.io/")), [endpoint]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    if (!formspreeReady || !endpoint) {
      setStatus("error");
      setMessage("The contact form endpoint is unavailable right now.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks for reaching out. Your message has been sent successfully.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong while sending your message. Please try again.");
    }
  }

  return (
    <section id="contact" className="section ambient-section overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_76%_12%,rgba(6,182,212,0.16),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <Reveal variant="mask">
          <aside className="lg:sticky lg:top-28">
            <p className="eyebrow-chip border-white/10 bg-white/5 text-emerald-200">Contact</p>
            <h2 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Let&apos;s talk about your next project
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              Use the form for project inquiries, freelance work, job opportunities, collaboration, or technical support requests.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {[
                { href: `mailto:${profile.email}`, icon: Mail, label: profile.email, external: false },
                { href: profile.github, icon: GitFork, label: "GitHub", external: true },
                { href: profile.facebook, icon: MessageCircle, label: "Facebook", external: true }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                    transition={transitions.quick}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-200 transition hover:border-emerald-300/40 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 flex-none text-slate-500 transition group-hover:text-emerald-300" aria-hidden="true" />
                  </motion.a>
                );
              })}
              <p className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                <span>{profile.location}</span>
              </p>
            </div>
          </aside>
        </Reveal>

        <Reveal variant="blur" delay={0.08}>
          <div className="relative rounded-[1.55rem] border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-black/30 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-5 border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Message panel</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">Send an inquiry</h3>
              </div>
              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500 sm:block">
                Formspree
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-shell grid gap-2 text-sm font-semibold text-slate-800">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </label>
                <label className="field-shell grid gap-2 text-sm font-semibold text-slate-800">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </label>
              </div>

              <label className="field-shell grid gap-2 text-sm font-semibold text-slate-800">
                Inquiry Type
                <input
                  name="inquiryType"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Project inquiry, job opportunity, collaboration, technical support..."
                />
              </label>

              <label className="field-shell grid gap-2 text-sm font-semibold text-slate-800">
                Subject
                <input name="subject" type="text" required className="form-input" placeholder="What would you like to discuss?" />
              </label>

              <label className="field-shell grid gap-2 text-sm font-semibold text-slate-800">
                Message
                <textarea
                  name="message"
                  required
                  minLength={12}
                  rows={6}
                  className="form-input resize-y"
                  placeholder="Tell me a little about the work, opportunity, or issue."
                />
              </label>

              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

              <div className="min-h-[3.25rem]" aria-live="polite">
                {message ? (
                  <p
                    className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${
                      status === "success"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border border-red-200 bg-red-50 text-red-700"
                    }`}
                    role="status"
                  >
                    {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" /> : null}
                    <span>{message}</span>
                  </p>
                ) : null}
              </div>

              <Magnetic className="inline-flex w-full sm:w-auto" strength={0.12}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-dark inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      Sending
                      <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
