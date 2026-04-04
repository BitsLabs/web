import { cn } from "@/lib/utils";

interface FlitsLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function FlitsLogo({ className, iconOnly = false }: FlitsLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Mark: two parallel angled slabs — speed / flash motif */}
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M0 0H2.8L7.2 18H4.4L0 0Z" />
        <path d="M6.2 0H9L13.4 18H10.6L6.2 0Z" />
      </svg>
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight">flits</span>
      )}
    </div>
  );
}
