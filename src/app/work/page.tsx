import { impactStats } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import CaseStudies from "@/components/sections/CaseStudies";
import Reveal from "@/components/motion/Reveal";
import CallToAction from "@/components/sections/CallToAction";
import WorkFaq from "@/components/sections/WorkFaq";

export const metadata = {
  title: "Our Work & Impact",
  description: "Explore our website and marketing projects, the services behind them, and their results explained in plain language.",
};

export default function WorkPage() {
  // Omit the ambiguous ROI multiplier until its calculation is confirmed.
  const overviewStats = impactStats.filter((stat) => stat.label !== "Avg. ROI uplift");

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Better websites. Clearer results."
        description="Explore what we built, how we helped, and what changed for each business—without the marketing jargon."
      />
      <CaseStudies />
      <section aria-labelledby="work-overview" className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="border-t border-border-subtle pt-12">
              <h2 id="work-overview" className="text-2xl font-extrabold tracking-tight">Fonder at a glance</h2>
              <dl className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-3">
                {overviewStats.map(({ value, label }) => (
                  <div key={label} className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-6">
                    <dt className="mt-2 text-sm text-muted">{label}</dt>
                    <dd className="order-first text-2xl font-extrabold text-primary sm:text-3xl">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
      <section aria-labelledby="work-questions" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:px-8">
          <div className="self-start rounded-3xl border border-border-subtle bg-gradient-to-b from-surface to-surface-2 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Before we begin</p>
            <h2 id="work-questions" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Your questions, answered.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">A little clarity on choosing a service, reading results, and planning your project.</p>
            <div className="mt-6 border-t border-border-subtle pt-6">
              <h3 className="text-sm font-semibold">Not sure where to start?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">You don’t need a technical brief. Start with these three things:</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                {[
                  "What your business does",
                  "Who you want to reach",
                  "What you want to improve",
                ].map((item, index) => (
                  <li key={item} className="flex items-center gap-3">
                    <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <WorkFaq items={[
              {
                question: "Do I need a new website or better marketing?",
                answer: "Start with where customers get stuck. If people cannot find your business, search visibility or advertising may help. If they visit but struggle to understand your offer or contact you, the website and its content may need attention first.",
              },
              {
                question: "What do conversion rate, ROAS, and cost per lead mean?",
                answer: "Conversion rate is the percentage of visitors who take an action, such as buying or sending an enquiry. Return on ad spend (ROAS) compares attributed revenue with advertising spend—it is not profit. Cost per lead is the average advertising cost of getting one enquiry.",
              },
              {
                question: "Will my business get the same results?",
                answer: "Results vary with your starting point, audience, offer, budget, and timeframe. A case study is an example, not a guarantee. Compare results over a clearly defined period and choose goals that matter to your business.",
              },
              {
                question: "What should I share when asking for a proposal?",
                answer: "Share your website or app, the customers you want to reach, your main business goal, and any budget or launch date you have in mind. If you have analytics or previous campaign results, those can help explain what is working and what is not.",
              },
          ]} />
        </div>
      </section>
      <CallToAction />
    </>
  );
}

