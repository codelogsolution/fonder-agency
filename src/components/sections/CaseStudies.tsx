import { caseStudies } from "@/config/site";
import Reveal from "@/components/motion/Reveal";


/** Work-page case studies with static results and optional explanations. */
export default function CaseStudies() {
  return (
    <section className="relative pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Reveal
              key={study.client}
              delay={(index % 2) * 0.1}
              className="h-full"
            >
              <article className="flex h-full min-w-0 flex-col rounded-3xl border border-border-subtle bg-surface p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                    {study.client}
                  </span>
                  <span className="text-xs font-medium text-muted">
                    {study.period}
                  </span>
                </div>

                <p className="mt-5 text-xs font-medium text-muted">{study.industry}</p>
                <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {study.summary}
                </p>

                <div className="mt-auto pt-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Project results</h3>
                  <dl className="mt-4 grid auto-rows-fr gap-3 sm:grid-cols-3">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex min-w-0 flex-col rounded-2xl border border-border-subtle bg-surface-2/60 p-4">
                        <dt className="text-xs leading-relaxed text-muted">{metric.label}</dt>
                        <dd className="order-first mb-2 text-2xl font-extrabold tabular-nums text-primary sm:text-3xl">
                          {metric.displayValue ?? `${metric.prefix ?? ""}${metric.value.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ""}`}
                        </dd>
                        {metric.explanation && (
                          <dd className="mt-2 text-xs leading-relaxed text-muted">{metric.explanation}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
                <h3 className="mt-6 text-xs font-semibold text-muted">Services provided</h3>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-border-subtle bg-surface-2/60 px-3 py-1 text-xs font-semibold text-foreground/80"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
