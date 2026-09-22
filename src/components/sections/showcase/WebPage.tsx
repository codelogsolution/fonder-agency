import ShowcaseCard from "@/components/sections/ShowcaseCard";
import { AureliaPage, BrowserBar, OrbitPage } from "@/components/sections/WebShowcase";

const SITES = [
  { page: <AureliaPage />, eyebrow: "E-commerce storefront", title: "Aurelia", url: "aurelia-store.com" },
  { page: <OrbitPage />, eyebrow: "SaaS landing page", title: "Orbit", url: "orbit-app.io" },
];

export default function WebPage({ index = 0, height = 300 }: { index?: number; height?: number }) {
  const slot = SITES[index % SITES.length];

  return (
    <ShowcaseCard
      eyebrow={slot.eyebrow}
      title={slot.title}
      height={height}
      duration={80}
      frameClassName="rounded-2xl border border-slate-200 bg-white"
      top={<BrowserBar url={slot.url} />}
    >
      {slot.page}
    </ShowcaseCard>
  );
}
