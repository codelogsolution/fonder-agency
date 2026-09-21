"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

// A single-open accordion with intrinsic-height transitions and keyboard controls.
export default function WorkFaq({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="space-y-4">
      {items.map(({ question, answer }, index) => {
        const open = openIndex === index;
        const triggerId = `${id}-question-${index}`;
        const panelId = `${id}-answer-${index}`;

        return (
          <div key={question} className={`overflow-hidden rounded-2xl border bg-surface transition-colors duration-300 motion-reduce:transition-none ${open ? "border-primary/40" : "border-border-subtle"}`}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary sm:p-6"
              >
                {question}
                <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
