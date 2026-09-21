"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type ServiceChoice = { label: string; href: string };
type BudgetChoice = { label: string };
type Step = "service" | "budget" | "done";

const SERVICE_CHOICES: ServiceChoice[] = [
  { label: "Web Development", href: "/services/web-dev" },
  { label: "Mobile App Development", href: "/services/app-dev" },
  { label: "SEO & Organic Growth", href: "/services/seo" },
  { label: "Digital Marketing", href: "/services/marketing" },
  { label: "Brand Identity", href: "/services/branding" },
  { label: "Content & Copywriting", href: "/services/content" },
];

const BUDGET_CHOICES: BudgetChoice[] = [
  { label: "Under \u20B950,000" },
  { label: "\u20B950,000 \u2013 \u20B91,50,000" },
  { label: "Above \u20B91,50,000" },
  { label: "Not sure yet \u2014 need guidance" },
];

// Lead qualifier: pick service -> pick budget -> WhatsApp or contact form.
export default function LeadAssistant({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<ServiceChoice | null>(null);
  const [budget, setBudget] = useState<BudgetChoice | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open ]);

  const reset = () => {
    setStep("service");
    setService(null);
    setBudget(null);
  };

  const goBack = () => {
    if (step === "done") {
      setBudget(null);
      setStep("budget");
    } else if (step === "budget") {
      setService(null);
      setStep("service");
    }
  };

  const digits = siteConfig.phone.replace(/\D/g, "");
  const waText = encodeURIComponent(
    "Hi " + siteConfig.name + "! I'm interested in " +
      (service ? service.label : "your services") +
      " (" + (budget ? budget.label : "budget TBD") + " budget).",
  );
  const waHref = "https://wa.me/" + digits + "?text=" + waText;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label={siteConfig.name + " quick guide"}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-border-subtle bg-background shadow-[0_24px_64px_-16px_rgba(11,18,32,0.35)] outline-none"
          >
            <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg font-extrabold">
                F
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">
                  {siteConfig.name} Quick Guide
                </p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto px-4 py-4">
              <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-surface px-3.5 py-2.5 text-sm leading-relaxed">
                Hello! I can guide you to the right service in about 30
                seconds. What are you looking for?
              </div>

              {step === "service" && (
                <div className="flex flex-wrap gap-2">
                  {SERVICE_CHOICES.map((choice) => (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => { setService(choice); setStep("budget"); }}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              )}

              {step === "budget" && service && (
                <>
                  <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground">
                    {service.label}
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-surface px-3.5 py-2.5 text-sm leading-relaxed">
                    Great choice. What is your approximate budget? This helps us share an accurate estimate.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_CHOICES.map((choice) => (
                      <button
                        key={choice.label}
                        type="button"
                        onClick={() => { setBudget(choice); setStep("done"); }}
                        className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                  <a
                    href={service.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-primary"
                  >
                    Explore the {service.label} page first
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </>
              )}



              {step === "done" && service && budget && (
                <>
                  <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground">
                    {budget.label}
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-surface px-3.5 py-2.5 text-sm leading-relaxed">
                    Perfect. How would you like to proceed?
                  </div>
                  <div className="space-y-2">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-all hover:brightness-95"
                    >
                      <Phone className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
                    >
                      <Send className="h-4 w-4" />
                      Fill the contact form
                    </a>
                    <a
                      href={service.href}
                      className="flex items-center justify-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-primary"
                    >
                      Or explore the {service.label} page
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2.5">
              {step !== "service" ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              ) : (
                <span className="text-xs text-muted">{siteConfig.location}</span>
              )}
              {(service || budget) && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-primary"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start over
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close quick guide" : "Open quick guide"}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-[0_12px_32px_-8px_rgba(2,132,199,0.6)] transition-all duration-300 hover:scale-105 active:scale-95",
          open ? "bg-foreground" : "bg-primary",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
