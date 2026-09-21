import type { ReactNode } from "react";

// Keeps server-rendered content visible before JavaScript loads.
export default function Template({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

