import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function CtaSection() {
  const t = await getTranslations("Home");

  return (
    <section className="border-t border-border bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("hero.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">{t("cta.contact")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
