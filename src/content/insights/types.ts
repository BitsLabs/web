import type { Locale } from "@/i18n/routing";

/**
 * Article bodies are structured blocks rather than MDX so the blog needs no
 * extra build dependency. If insights grows past a handful of pieces, swap
 * this for @next/mdx — the page components read from these types only.
 */
export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type ArticleContent = {
  title: string;
  description: string;
  body: Block[];
};

export type Article = {
  slug: string;
  /** ISO date, used for sorting and <time dateTime>. */
  date: string;
  readingMinutes: number;
  /** English is the source of truth; other locales fall back to it. */
  content: Partial<Record<Locale, ArticleContent>>;
};
