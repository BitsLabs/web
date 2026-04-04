import Image from "next/image";
import { cn } from "@/lib/utils";

interface FlitsLogoProps {
  className?: string;
  /** Render only the bolt icon, no wordmark */
  iconOnly?: boolean;
  height?: number;
}

export function FlitsLogo({ className, iconOnly = false, height = 28 }: FlitsLogoProps) {
  const src = iconOnly
    ? { light: "/images/bolt-black.png", dark: "/images/bolt-white.png" }
    : { light: "/images/logo-black.png", dark: "/images/logo-white.png" };

  // Maintain the original aspect ratios: full logo ≈ 490×100, bolt ≈ square-ish
  const width = iconOnly ? height : Math.round(height * 4.9);

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {/* Light mode logo */}
      <Image
        src={src.light}
        alt="Flits"
        width={width}
        height={height}
        className="block dark:hidden"
        priority
      />
      {/* Dark mode logo */}
      <Image
        src={src.dark}
        alt="Flits"
        width={width}
        height={height}
        className="hidden dark:block"
        priority
      />
    </div>
  );
}
