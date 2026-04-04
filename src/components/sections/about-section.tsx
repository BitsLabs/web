import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("Home.about");

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: label + big statement */}
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("label")}
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {t("heading")}
            </h2>
          </div>

          {/* Right: description + values */}
          <div className="flex flex-col justify-center gap-10">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {(["value1", "value2", "value3", "value4"] as const).map(
                (key) => (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {t(`${key}.title`)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t(`${key}.description`)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
