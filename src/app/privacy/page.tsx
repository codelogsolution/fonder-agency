import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Fonder collects, uses, and protects the information you share through this website.",
};

const sections = [
  {
    title: "What we collect",
    body: "When you contact us through this website, we receive the details you choose to submit: your name, email address, company or website, and the message itself. This site does not run advertising trackers or sell data to third parties.",
  },
  {
    title: "How we use it",
    body: "Your details are used only to reply to your enquiry, prepare proposals you ask for, and continue the conversation you started. We may keep a record of the exchange so future conversations have context.",
  },
  {
    title: "Sharing",
    body: "We never sell your information. It is shared only with the team members who need it to answer you, and with service providers that help us operate email — under their own confidentiality obligations.",
  },
  {
    title: "Retention & your rights",
    body: "We keep enquiry records only as long as they are useful, and you can ask us to correct or delete them at any time by emailing us. We will action reasonable requests promptly.",
  },
  {
    title: "Questions",
    body: "For any privacy question or request, write to us and we will get back to you within one business day.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect the information you share with us."
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
