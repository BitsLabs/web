import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function CtaSection() {
  const t = await getTranslations("Home.cta");

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center sm:px-16 sm:py-24">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,oklch(1_0_0/0.07),transparent)]" />

          <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
            {t("label")}
          </p>
          <h2 className="relative text-4xl font-bold tracking-tight text-background sm:text-5xl">
            {t("heading")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-background/60">
            {t("description")}
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-7"
            >
              <Link href="/contact">{t("contact")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full px-7 text-background/70 hover:bg-white/10 hover:text-background"
            >
              <a href="mailto:contact@flits.cc">{t("email")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
