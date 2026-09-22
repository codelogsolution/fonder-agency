import ShowcaseCard from "@/components/sections/ShowcaseCard";
import {
  LocalTableScreen,
  PocketStudioScreen,
  PulseFitScreen,
  StatusBar,
  TabBar,
} from "@/components/sections/AppShowcase";
import { Activity, Dumbbell, Home, Plus, Search, ShoppingBag, User } from "lucide-react";

const SCREENS = [
  { screen: <PulseFitScreen />, eyebrow: "Fitness app", title: "PulseFit" },
  { screen: <LocalTableScreen />, eyebrow: "Food ordering app", title: "LocalTable" },
  { screen: <PocketStudioScreen />, eyebrow: "Creator app", title: "PocketStudio" },
];

const TABS = [
  {
    active: 0,
    items: [
      { icon: Home, label: "Home" },
      { icon: Activity, label: "Stats" },
      { icon: Dumbbell, label: "Train" },
      { icon: User, label: "Profile" },
    ],
  },
  {
    active: 1,
    items: [
      { icon: Home, label: "Home" },
      { icon: Search, label: "Browse" },
      { icon: ShoppingBag, label: "Cart" },
      { icon: User, label: "Profile" },
    ],
  },
  {
    active: 2,
    items: [
      { icon: Home, label: "Home" },
      { icon: Search, label: "Explore" },
      { icon: Plus, label: "Create" },
      { icon: User, label: "Profile" },
    ],
  },
];

export default function AppPhone({ index = 0, height = 300 }: { index?: number; height?: number }) {
  const slot = SCREENS[index % SCREENS.length];
  const tab = TABS[index % TABS.length];

  return (
    <ShowcaseCard
      eyebrow={slot.eyebrow}
      title={slot.title}
      height={height}
      duration={52}
      frameClassName="border border-slate-700/60 bg-[#0f1220] text-white"
      contentClassName="bg-[#0f1220]"
      top={<StatusBar />}
      bottom={<TabBar active={tab.active} items={tab.items} />}
    >
      {slot.screen}
    </ShowcaseCard>
  );
}
