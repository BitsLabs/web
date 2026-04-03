# Flits Website — CLAUDE.md

## Project Overview

This is the corporate website for **Flits** (flits.cc), a software studio and logistics company. Built with Next.js (App Router), shadcn/ui, Tailwind CSS v4, and next-intl for i18n. Deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15+ (App Router, `src/` directory)
- **UI**: shadcn/ui (preset `b5dwkkWGm`), Tailwind CSS v4
- **i18n**: next-intl with locale-based routing (`/en/`, `/de/`, `/fr/`, `/es/`)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Project Structure

```
flits-web/
├── messages/                    # Translation JSON files
│   ├── en.json
│   ├── de.json
│   ├── fr.json
│   └── es.json
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── [locale]/            # All localized pages live here
│   │   │   ├── layout.tsx       # Locale layout with NextIntlClientProvider
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── looped/
│   │   │   │   └── page.tsx     # Looped product page
│   │   │   ├── insights/
│   │   │   │   └── page.tsx     # Blog/insights (future)
│   │   │   ├── imprint/
│   │   │   │   └── page.tsx     # Legal imprint
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx     # Privacy policy
│   │   │   └── contact/
│   │   │       └── page.tsx     # Contact page
│   │   ├── layout.tsx           # Root layout (minimal, no locale logic)
│   │   ├── page.tsx             # Root redirect → /en
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                  # shadcn components (DO NOT edit directly unless customizing)
│   │   ├── layout/
│   │   │   ├── header.tsx       # Site header with nav + language switcher
│   │   │   ├── footer.tsx       # Site footer with legal entities, links
│   │   │   └── language-switcher.tsx
│   │   ├── sections/            # Page sections (hero, about, contact, features, etc.)
│   │   └── shared/              # Reusable non-UI components
│   ├── i18n/
│   │   ├── routing.ts           # next-intl routing config (locales, defaultLocale, pathnames)
│   │   ├── request.ts           # next-intl request config
│   │   └── navigation.ts        # Typed Link, useRouter, usePathname exports
│   ├── lib/
│   │   └── utils.ts             # cn() and other utilities
│   └── styles/
│       └── globals.css
├── middleware.ts                 # next-intl middleware (at src root level)
├── next.config.ts
├── components.json
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## i18n Rules

### Routing

- Default locale: `en` (no prefix, i.e. flits.cc/ serves English)
- Other locales: `/de/`, `/fr/`, `/es/`
- Use `next-intl` routing with `localePrefix: 'as-needed'`
- All internal links MUST use `Link` from `@/i18n/navigation`, never from `next/link` directly

### Translation Files

- Located in `/messages/{locale}.json`
- Namespace by page/section: `Home`, `About`, `Contact`, `Looped`, `Footer`, `Header`, `Common`
- Use ICU message format for plurals and interpolation
- English is the source of truth — always write `en.json` first, then replicate keys to other locales
- Keep keys descriptive: `Home.hero.title`, `Home.hero.subtitle`, `Home.about.description`

### Components

- Use `useTranslations('Namespace')` in client components
- Use `getTranslations('Namespace')` in server components
- Every user-visible string MUST come from translation files — no hardcoded text
- `alt` attributes, `aria-label`s, meta titles/descriptions — all translated

### Localized Pathnames (optional, configure as needed)

```ts
pathnames: {
  '/': '/',
  '/looped': '/looped',
  '/contact': {
    en: '/contact',
    de: '/kontakt',
    fr: '/contact',
    es: '/contacto',
  },
  '/imprint': {
    en: '/imprint',
    de: '/impressum',
    fr: '/mentions-legales',
    es: '/aviso-legal',
  },
  '/privacy': {
    en: '/privacy',
    de: '/datenschutz',
    fr: '/confidentialite',
    es: '/privacidad',
  },
}
```

## Design & Content Guidelines

### Brand Identity

- **Company**: Flits (formerly Trout UG, converting to Flits GmbH)
- **Tagline**: "Building Software People Love"
- **Positioning**: "Design first, AI native."
- **Entities**:
  - Trout UG (haftungsbeschränkt), Forellenweg 8a, 94428 Eichendorf (DE)
  - Flits Ltd, 71-75 Shelton St, London, WC2H 9JQ (UK)
- **Contact**: contact@flits.cc, +49 1515 3616465

### Visual Direction

- Modern, clean, slightly editorial feel
- Dark mode support required (use shadcn's theme toggle)
- Generous whitespace, strong typography hierarchy
- Subtle animations on scroll (use Framer Motion or CSS transitions)
- Hero section with background video or dynamic visual (current site uses a video loop)
- Stats section: "200K+ Market Reach", "1K+ Consumer Uptake", "24/7 Support"

### Pages

1. **Homepage** (`/`): Hero → About section → Stats → Contact CTA → Footer
2. **Looped** (`/looped`): Product page for Looped habit tracker app. App icon, features (Widgets, Live Activities, Minimal Mode), App Store download link, screenshots
3. **Contact** (`/contact`): Contact form or contact info display
4. **Imprint** (`/imprint`): Legal information (DE + UK entities)
5. **Privacy** (`/privacy`): Privacy policy
6. **Insights** (`/insights`): Blog/articles (can be placeholder initially)

### Footer

Must include:
- Flits logo
- Both legal entities (DE + UK) with addresses
- Page links: Home, Insights, Looped, Imprint, Privacy
- Contact info: email, phone, address
- Language switcher (also in header)

## Code Conventions

### General

- Use `pnpm` for all package operations
- Prefer server components; mark `'use client'` only when needed (hooks, interactivity)
- Use `cn()` from `@/lib/utils` for conditional classNames
- Keep components small and composable
- Co-locate types with their component files or in a `types.ts` nearby

### Naming

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Translation keys: `Namespace.section.key` (dot notation in JSON nesting)

### SEO

- Every page must have localized `<title>` and `<meta description>` via `generateMetadata`
- Use `generateStaticParams` to return all locales for static generation
- Add `<link rel="alternate" hreflang>` tags for all locale variants
- OpenGraph and Twitter card metadata on all pages

### Images & Assets

- Use `next/image` for all images
- Store static assets in `/public/images/`
- App icons and product screenshots in `/public/images/products/`
- Prefer WebP/AVIF formats, provide fallbacks

## Environment Variables

```env
# .env.local (not committed)
NEXT_PUBLIC_SITE_URL=https://flits.cc
```

## Deployment

- Vercel (auto-deploy from main branch)
- Domain: flits.cc
- Preview deployments on PRs
- `next.config.ts` should not use `output: 'export'` — we need middleware for i18n

## Key Dependencies

- `next` — Framework
- `next-intl` — Internationalization
- `framer-motion` — Animations (optional, use if needed)
- `lucide-react` — Icons (via shadcn)
- `@vercel/analytics` — Analytics (add later)

## Common Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm lint          # ESLint
pnpm add <pkg>     # Add dependency
pnpx shadcn@latest add <component>  # Add shadcn component
```

## Notes

- The site replaces a Framer-hosted site. Ensure feature parity with flits.cc before switching DNS.
- Looped App Store link: https://apps.apple.com/de/app/looped-habit-tracker/id6473401972?l=en-GB
- The Flits logo is available at the current site (extract from Framer or recreate as SVG).
- When in doubt about copy, check flits.cc for the current English version and translate from there.