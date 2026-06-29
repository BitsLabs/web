import { cn } from "@/lib/utils";

/**
 * A tiny status line in the same dim, monospace style:
 *
 *   CURRENTLY — BUILDING FLITS
 *
 * `label` is the dim prefix, `value` is brought up to foreground so the
 * eye lands on it without any color.
 */
export function StatusLine({
  label = "CURRENTLY",
  value,
  className,
}: {
  label?: string;
  value: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-wide text-muted-foreground",
        className,
      )}
    >
      {label} <span className="px-1 opacity-50">—</span>{" "}
      <span className="text-foreground">{value}</span>
    </p>
  );
}
