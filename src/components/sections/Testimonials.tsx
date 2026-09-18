import { Quote, Star } from "lucide-react";
import { testimonials } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

const marqueeBrands = [
  "AURELIA",
  "VERTEX",
  "FINFLOW",
  "PULSEFIT",
  "ORBITLY",
  "MAISON",
  "CLOUDCART",
  "NORTHWIND",
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-surface/40 py-24 sm:py-32">
      {/* Soft seams so the band melts in and out instead of starting hard */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent"
      />
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Clients who bet on us — twice
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            96% of our clients come back for a second engagement. Here&apos;s
            why.
          </p>
        </Reveal>
      </div>

      {/* Client marquee — pauses on hover */}
      <div className="group relative z-20 mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
          {[...marqueeBrands, ...marqueeBrands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="flex items-center gap-12 text-lg font-extrabold tracking-[0.25em] text-foreground/25"
            >
              {brand}
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary/40"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Testimonial cards */}
      <div className="relative z-20 mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={(index % 3) * 0.1}
              className="h-full"
            >
              <figure className="flex h-full flex-col rounded-3xl border border-border-subtle bg-background p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_48px_rgba(2,6,23,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>

                <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-border-subtle pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-sm font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
