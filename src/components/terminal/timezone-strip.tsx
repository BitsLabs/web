"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TimeZoneEntry = {
  /** Short city code shown in the strip, e.g. "BERLIN", "NYC", "SF". */
  code: string;
  /** IANA timezone identifier, e.g. "Europe/Berlin". */
  tz: string;
};

const DEFAULT_ZONES: TimeZoneEntry[] = [
  { code: "BERLIN", tz: "Europe/Berlin" },
  { code: "NYC", tz: "America/New_York" },
  { code: "SF", tz: "America/Los_Angeles" },
];

function formatTime(tz: string, date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(date);
}

/**
 * A thin, low-contrast line of live clocks across time zones:
 *
 *   BERLIN 16:23 — NYC 10:23 — SF 07:23
 *
 * Monospace, dim gray, no labels beyond city codes. Renders a stable
 * placeholder on the server to avoid hydration mismatch, then ticks once
 * the component mounts on the client.
 */
export function TimezoneStrip({
  zones = DEFAULT_ZONES,
  className,
}: {
  zones?: TimeZoneEntry[];
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    // First client-side tick after mount (kept out of the effect body so we
    // don't trigger a synchronous cascading render), then every 15s — honest
    // without re-rendering more than necessary.
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 15_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <p
      suppressHydrationWarning
      className={cn(
        "font-mono text-xs tracking-wide text-muted-foreground tabular-nums",
        className,
      )}
    >
      {zones.map((zone, i) => (
        <span key={zone.code} className="whitespace-nowrap">
          {i > 0 && <span className="px-2 opacity-50">—</span>}
          {zone.code} {now ? formatTime(zone.tz, now) : "--:--"}
        </span>
      ))}
    </p>
  );
}
