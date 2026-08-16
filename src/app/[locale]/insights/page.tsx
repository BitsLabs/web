import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getArticles, resolveContent } from "@/content/insights";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Insights" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? "/insights" : `/${l}/insights`,
        ]),
      ),
    },
    openGraph: {
      title: `${t("title")} · Flits`,
      description: t("description"),
      type: "website",
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Insights");
  const articles = getArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="max-w-3xl">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("label")}
        </p>
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </header>

      <ul className="mt-16 flex flex-col border-t border-border">
        {articles.map((article) => {
          const { content } = resolveContent(article, locale as Locale);
          return (
            <li key={article.slug} className="border-b border-border">
              <Link
                href={{
                  pathname: "/insights/[slug]",
                  params: { slug: article.slug },
                }}
                className="group flex flex-col gap-3 py-10 transition-opacity hover:opacity-70"
              >
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  <time dateTime={article.date}>
                    {new Intl.DateTimeFormat(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(article.date))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{t("readingTime", { minutes: article.readingMinutes })}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                  {content.title}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {content.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
