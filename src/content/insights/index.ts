import type { Locale } from "@/i18n/routing";
import type { Article, ArticleContent } from "./types";
import { whatAgentsDontChange } from "./what-agents-dont-change";

export type { Article, ArticleContent, Block } from "./types";

const articles: Article[] = [whatAgentsDontChange];

/** Newest first. */
export function getArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Resolves content for a locale, falling back to English. `isFallback` lets the
 * page tell the reader the piece has not been translated yet, rather than
 * silently serving English under a German URL.
 */
export function resolveContent(
  article: Article,
  locale: Locale,
): { content: ArticleContent; isFallback: boolean } {
  const localized = article.content[locale];
  if (localized) return { content: localized, isFallback: false };
  return { content: article.content.en!, isFallback: locale !== "en" };
}
