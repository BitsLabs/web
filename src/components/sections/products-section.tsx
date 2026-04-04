import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function ProductsSection() {
  const t = await getTranslations("Home.work");
  const tLooped = await getTranslations("Looped");

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="mb-12 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("label")}
        </p>

        {/* Looped card */}
        <Link href="/looped" className="group block">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/20 p-8 transition-colors hover:bg-muted/40 sm:p-12 lg:p-16">
            {/* Background gradient for visual interest */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,oklch(0.7_0.15_280/0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,oklch(0.6_0.15_280/0.08),transparent)]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {tLooped("category")}
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {tLooped("title")}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {tLooped("subtitle")}
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {t("viewProduct")}
                  <svg
                    className="size-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* App icon placeholder */}
              <div className="flex shrink-0 items-center justify-center lg:justify-end">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl ring-1 ring-white/10 lg:h-36 lg:w-36">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="size-16 text-white/90 lg:size-20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
