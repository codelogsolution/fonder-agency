"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── styling atoms ────────────────────────────────────────────── */

const inputBaseClasses =
  "h-11 w-full rounded-xl bg-surface-2/60 px-4 text-sm text-foreground placeholder:text-muted/60 transition-all duration-300 focus:outline-none";

const inputIdleClasses =
  "border border-border-subtle focus:border-primary/60 focus:shadow-[0_0_20px_rgba(2,132,199,0.18)]";

const inputErrorClasses =
  "border-2 border-rose-500 focus:border-rose-500 focus:shadow-[0_0_20px_rgba(225,29,72,0.18)]";

const labelClasses = "mb-2 block text-sm font-semibold";

const errorTextClasses =
  "mt-1.5 flex items-start gap-1.5 text-xs font-medium text-rose-400";

const serviceOptions = [
  { value: "web-dev", label: "Web Dev" },
  { value: "seo", label: "SEO" },
  { value: "marketing", label: "Marketing" },
  { value: "content", label: "Copywriting" },
];

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ── types & validation ───────────────────────────────────────── */

type FormField = "name" | "email" | "service" | "website" | "message";

interface FormData {
  name: string;
  email: string;
  service: string;
  website: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  service?: string;
  website?: string;
  message?: string;
}

const validateField = (field: FormField, value: string): string | undefined => {
  switch (field) {
    case "name":
      if (value.trim().length < 2) return "Please enter your full name";
      return undefined;
    case "email":
      if (!value.trim()) return "Email address is required";
      if (!/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value.trim()))
        return "Enter a valid email address";
      return undefined;
    case "service":
      if (!value) return "Please select a service";
      return undefined;
    case "website":
      if (!value.trim()) return undefined; /* optional */
      if (!/^https?:\/\/.+/.test(value.trim()))
        return "Include https:// in the URL";
      return undefined;
    case "message":
      if (value.trim().length < 10) return "Tell us more — at least 10 characters";
      return undefined;
    default:
      return undefined;
  }
};

/** High-ticket onboarding form — wire `handleSubmit` to an API route / CRM when ready. */
export default function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false,
    email: false,
    service: false,
    website: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields: FormField[] = ["name", "email", "service", "website", "message"];
    const newErrors: FieldErrors = {};
    fields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setTouched({ name: true, email: true, service: true, website: true, message: true });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      /* TODO: wire handleSubmit to your email/CRM API */
      console.log("Contact form submitted:", formData);
    }
  };

  const fieldClassName = (field: FormField, extra = "") =>
    cn(
      inputBaseClasses,
      errors[field] && touched[field] ? inputErrorClasses : inputIdleClasses,
      extra,
    );

  const errorId = (field: FormField) => `${field}-error`;

  const renderError = (field: FormField): ReactNode =>
    errors[field] && touched[field] ? (
      <motion.p
        id={errorId(field)}
        key={`${field}-error`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={errorTextClasses}
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>{errors[field]}</span>
      </motion.p>
    ) : null;

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease }}
            role="status"
            className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary/5 px-8 py-20 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 14 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_32px_rgba(2,132,199,0.25)]"
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <h2 className="mt-8 text-2xl font-extrabold tracking-tight">
              Thank you!
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Our growth strategist will audit your brand and reach out within
              24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jane Cooper"
                  className={fieldClassName("name")}
                  aria-invalid={!!(errors.name && touched.name)}
                  aria-describedby={
                    errors.name && touched.name ? errorId("name") : undefined
                  }
                />
                {renderError("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="jane@company.com"
                  className={fieldClassName("email")}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={
                    errors.email && touched.email ? errorId("email") : undefined
                  }
                />
                {renderError("email")}
              </div>
            </div>

            <div>
              <label htmlFor="contact-service" className={labelClasses}>
                What service do you need?
              </label>
              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClassName("service")}
                aria-invalid={!!(errors.service && touched.service)}
                aria-describedby={
                  errors.service && touched.service
                    ? errorId("service")
                    : undefined
                }
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {renderError("service")}
            </div>

            <div>
              <label htmlFor="contact-website" className={labelClasses}>
                Your current website URL{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="contact-website"
                name="website"
                type="url"
                autoComplete="url"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://yourbrand.com"
                className={fieldClassName("website")}
                aria-invalid={!!(errors.website && touched.website)}
                aria-describedby={
                  errors.website && touched.website
                    ? errorId("website")
                    : undefined
                }
              />
              {renderError("website")}
            </div>


            <div>
              <label htmlFor="contact-message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                placeholder="Tell us about your project, goals, and timeline..."
                className={cn(
                  inputBaseClasses,
                  "h-auto py-3 resize-y",
                  errors.message && touched.message
                    ? inputErrorClasses
                    : inputIdleClasses,
                )}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={
                  errors.message && touched.message
                    ? errorId("message")
                    : undefined
                }
              />
              {renderError("message")}
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_32px_rgba(2,132,199,0.45)]"
            >
              Send Message <Send className="h-4 w-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

