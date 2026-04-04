import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial fade to edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_40%,var(--background)_100%)]" />

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge
            variant="secondary"
            className="gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
          >
            <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
            {t("hero.subtitle")}
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "text-center text-5xl font-bold leading-[1.05] tracking-tight text-foreground",
            "sm:text-6xl lg:text-[5.5rem]",
          )}
        >
          <span className="block">{t("hero.line1")}</span>
          <span className="block text-muted-foreground">{t("hero.line2")}</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-8 max-w-md text-center text-base text-muted-foreground sm:text-lg">
          {t("hero.description")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link href="/contact">{t("cta.contact")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full px-7 text-muted-foreground hover:text-foreground"
          >
            <a href="#work">{t("cta.whatWeDo")}</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <div className="h-2 w-0.5 animate-bounce rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
