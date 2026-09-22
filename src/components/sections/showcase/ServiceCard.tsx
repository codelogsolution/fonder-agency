import ShowcaseCard from "@/components/sections/ShowcaseCard";
import DemoBar from "@/components/sections/DemoBar";
import DemoScreen from "@/components/sections/ServiceDemoScreen";
import { getServicePreviewItems } from "@/config/site";

export default function ServiceCard({ slug, height = 300 }: { slug: string; height?: number }) {
  const items = getServicePreviewItems(slug);
  const item = items[0];
  if (!item) return null;

  return (
    <ShowcaseCard
      eyebrow={item.subtitle}
      title={item.title}
      height={height}
      duration={52}
      frameClassName="border border-slate-700/60 bg-[#0b0d14] text-white"
      contentClassName="bg-[#10131d]"
      top={<DemoBar item={item} />}
    >
      <DemoScreen item={item} />
    </ShowcaseCard>
  );
}
