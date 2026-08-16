import type { Block } from "@/content/insights";

/**
 * Renders an article's structured blocks. Kept deliberately small — the
 * typography lives here rather than in a prose plugin so headings and measure
 * match the rest of the site.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-8 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-2 border-l-2 border-foreground/20 py-1 pl-6 text-lg font-medium leading-relaxed text-foreground"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="flex list-disc flex-col gap-2 pl-5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-lg leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return (
              <p
                key={i}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
