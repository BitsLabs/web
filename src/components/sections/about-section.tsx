import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("Home.about");

  return (
    <section id="about" className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
