import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function CallToAction() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-b from-surface to-surface-2 px-6 py-16 text-center sm:px-16 sm:py-24">
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]"
            />
            <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Let&apos;s build together
            </span>
            <h2 className="relative mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to <span className="text-gradient">scale your business</span>?
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Tell us where you want to go. We&apos;ll engineer the fastest
              route — and build the vehicle to get you there.
            </p>
            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg">
                Start a Project <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/work" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
