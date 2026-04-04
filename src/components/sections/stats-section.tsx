import { getTranslations } from "next-intl/server";

export async function StatsSection() {
  const t = await getTranslations("Home.stats");

  const stats = [
    { value: t("reachValue"), label: t("reach") },
    { value: t("uptakeValue"), label: t("uptake") },
    { value: t("supportValue"), label: t("support") },
  ];

  return (
    <section className="border-y border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 px-0 py-8 sm:px-10 sm:py-0 first:sm:pl-0 last:sm:pr-0"
            >
              <dd className="text-5xl font-bold tracking-tight text-foreground">
                {stat.value}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
