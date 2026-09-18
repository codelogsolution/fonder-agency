import type { ReactNode } from "react";

/** Keep server-rendered page content visible before JavaScript loads.
 * Individual sections retain their existing scroll-reveal animations.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

