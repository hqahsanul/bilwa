import type { ReactNode } from "react";

import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";

/** Content column for metal collection bands — same width as navbar / footer. */
export function MetalCollectionPageShell({ children }: { children: ReactNode }) {
  return <div className={BILVA_SITE_SHELL_CLASS}>{children}</div>;
}