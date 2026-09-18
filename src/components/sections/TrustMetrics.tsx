import { Medal, Target, Users } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const metrics = [
  { icon: Target, value: "125+", label: "Projects & campaigns delivered" },
  { icon: Users, value: "96%", label: "Clients who return for more work" },
  { icon: Medal, value: "12+", label: "Years of combined team experience" },
];

export default function TrustMetrics() {
  return (
    <section className="relative border-y border-border-subtle bg-surface/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {metrics.map(({ icon: Icon, value, label }, index) => (
            <Reveal key={label} delay={index * 0.12}>
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
