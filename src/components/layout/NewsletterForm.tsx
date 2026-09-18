"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsletterFormProps = { className?: string };

/**
 * Newsletter signup with optimistic local success state.
 * Wire `handleSubmit` to your email/CRM API when ready.
 */
export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4",
          className,
        )}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm text-foreground">
          You&apos;re on the list — talk soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface-2/60 p-2 transition-colors duration-300 focus-within:border-primary/50",
        className,
      )}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
      />
      <button
        type="submit"
        className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_24px_rgba(2,132,199,0.4)]"
      >
        Subscribe <Send className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
