import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Background video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,oklch(0.3_0_0_/_0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,oklch(0.8_0_0_/_0.05),transparent)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {t("hero.subtitle")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">{t("cta.contact")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#about">{t("cta.whatWeDo")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
