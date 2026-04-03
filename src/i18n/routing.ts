import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/looped": "/looped",
    "/insights": "/insights",
    "/contact": {
      en: "/contact",
      de: "/kontakt",
      fr: "/contact",
      es: "/contacto",
    },
    "/imprint": {
      en: "/imprint",
      de: "/impressum",
      fr: "/mentions-legales",
      es: "/aviso-legal",
    },
    "/privacy": {
      en: "/privacy",
      de: "/datenschutz",
      fr: "/confidentialite",
      es: "/privacidad",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
