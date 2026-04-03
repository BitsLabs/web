import { getTranslations } from "next-intl/server";

export async function StatsSection() {
  const t = await getTranslations("Home.stats");

  const stats = [
    { value: t("reachValue"), label: t("reach") },
    { value: t("uptakeValue"), label: t("uptake") },
    { value: t("supportValue"), label: t("support") },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-sm"
            >
              <dt className="order-2 mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
