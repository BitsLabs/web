"use client";

import { useRouter } from "@/i18n/navigation";
import { useKeyboardNav } from "./use-keyboard-nav";

/**
 * Mounts the global keyboard shortcuts. Renders nothing.
 *
 *   c → contact
 *   h → home
 *
 * Drop once near the root (e.g. in the locale layout). Keep the key set
 * small and obvious; the point is a quiet power-user affordance, not a
 * command palette.
 */
export function KeyboardNav() {
  const router = useRouter();

  useKeyboardNav({
    c: () => router.push("/contact"),
    h: () => router.push("/"),
  });

  return null;
}
