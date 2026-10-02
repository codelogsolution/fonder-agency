// Kinetic keyword band — two oversized rows drifting in opposite directions.
// Pure CSS transforms (pausable, reduced-motion aware via the global override).
const rowA = ["Web Apps", "Mobile Apps", "SEO", "Branding", "UI/UX Design", "Growth"];
const rowB = ["Next.js", "React Native", "Technical SEO", "Design Systems", "Content", "Analytics"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max shrink-0 animate-marquee items-center group-hover/row:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-10 pr-10"
          >
            {items.map((item, index) => {
              const outlined = index % 2 === 1;
              return (
                <span key={`${item}-${index}`} className="flex items-center gap-10">
                  <span
                    className="whitespace-nowrap text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl"
                    style={
                      outlined
                        ? {
                            WebkitTextStroke: "1.5px rgba(11, 18, 32, 0.3)",
                            color: "transparent",
                          }
                        : undefined
                    }
                  >
                    {item}
                  </span>
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/50"
                  />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <section
      aria-hidden
      className="select-none overflow-hidden border-y border-border-subtle bg-surface/30 py-8 sm:py-12"
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}