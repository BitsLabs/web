import { cn } from "@/lib/utils";

/**
 * A blinking block cursor — pure terminal vibe, costs nothing, adds life.
 * Drop it after a line of text or a name. Respects prefers-reduced-motion
 * (the blink is disabled there; the block stays solid).
 */
export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "terminal-blink ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.1em] bg-current align-baseline",
        className,
      )}
    />
  );
}
