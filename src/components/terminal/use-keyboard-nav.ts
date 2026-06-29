"use client";

import { useEffect, useRef } from "react";

export type KeyMap = Record<string, () => void>;

/**
 * Press-a-key navigation, very on-brand for a terminal aesthetic.
 *
 * Pass a map of single lowercase keys to handlers, e.g.
 *   useKeyboardNav({ c: () => router.push("/contact") })
 *
 * Ignores keystrokes while the user is typing in a field, and ignores
 * any combo with a modifier (Cmd/Ctrl/Alt) so browser shortcuts keep
 * working.
 */
export function useKeyboardNav(map: KeyMap): void {
  // Keep the latest handlers without re-binding the listener every render.
  const mapRef = useRef(map);
  useEffect(() => {
    mapRef.current = map;
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      const handler = mapRef.current[event.key.toLowerCase()];
      if (handler) {
        event.preventDefault();
        handler();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
