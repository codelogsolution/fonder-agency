"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

const LeadAssistant = dynamic(() => import("./LeadAssistant"), {
  ssr: false,
  loading: () => (
    <div role="status" className="fixed bottom-5 right-5 z-50 rounded-2xl bg-background p-4 shadow-lg sm:bottom-6 sm:right-6">
      Loading quick guide…
    </div>
  ),
});

// Download the guide only after explicit interaction; retain its state afterward.
export default function AssistantLauncher() {
  const [activated, setActivated] = useState(false);

  if (activated) return <LeadAssistant initialOpen />;

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label="Open quick guide"
      aria-expanded={false}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_32px_-8px_rgba(2,132,199,0.6)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
