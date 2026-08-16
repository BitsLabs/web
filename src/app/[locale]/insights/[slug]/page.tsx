import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getArticle, getArticles, resolveContent } from "@/content/insights";
import { ArticleBody } from "@/components/sections/article-body";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticles().map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const { content } = resolveContent(article, locale as Locale);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale
            ? `/insights/${slug}`
            : `/${l}/insights/${slug}`,
        ]),
      ),
    },
    openGraph: {
      title: `${content.title} · Flits`,
      description: content.description,
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} · Flits`,
      description: content.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const article = getArticle(slug);
  if (!article) notFound();

  const { content, isFallback } = resolveContent(article, locale as Locale);
  const t = await getTranslations("Insights");

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Link
        href="/insights"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {t("back")}
      </Link>

      <header className="mt-10">
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
        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          {content.description}
        </p>
      </header>

      {isFallback && (
        <p
          role="note"
          className="mt-10 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
        >
          {t("englishOnly")}
        </p>
      )}

      <div className="mt-12">
        <ArticleBody blocks={content.body} />
      </div>
    </article>
  );
}
