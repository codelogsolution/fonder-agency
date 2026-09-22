import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to Fonder's services and the use of this website.",
};

const sections = [
  {
    title: "Scope",
    body: "These terms cover the use of this website and the basis on which we provide marketing and development services. Each engagement is governed by the proposal or agreement you sign with us, which takes precedence over this page.",
  },
  {
    title: "Quotes & payment",
    body: "Every project starts from a written quote with a defined scope, timeline, and payment schedule. Work outside the agreed scope is quoted separately before it begins — no surprise invoices.",
  },
  {
    title: "Ownership",
    body: "On final payment, the deliverables we create for your project — code, design files, and content we produced — are yours. Pre-existing tools, libraries, and licences we use remain governed by their own terms.",
  },
  {
    title: "Results & content",
    body: "Case studies, metrics, and previews shown on this site are illustrative demonstrations of our way of working. Results vary with your market, budget, and starting point; examples are not guarantees of outcome.",
  },
  {
    title: "Liability & changes",
    body: "Our liability for any claim connected to the services is limited to the fees paid for the engagement in question. We may update these terms from time to time; the version in effect when you engage us applies to that engagement.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that apply to our services and the use of this website."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
