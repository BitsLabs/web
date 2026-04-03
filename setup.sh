#!/bin/bash
# ============================================================
# Flits Website — Project Setup Commands
# Run these from inside the flits-web directory
# ============================================================

# 1. Scaffold Next.js + shadcn with your preset
#    This creates the project, installs shadcn, applies your preset
npx shadcn@latest init -t next -n flits-web --preset b5dwkkWGm

# 2. cd into the project (shadcn create puts it in a subfolder)
cd flits-web

# 3. Install next-intl for i18n
pnpm add next-intl

# 4. Install additional dependencies
pnpm add framer-motion
pnpm add @vercel/analytics

# 5. Add commonly needed shadcn components upfront
pnpm dlx shadcn@latest add button card navigation-menu sheet separator badge input textarea label dropdown-menu dialog scroll-area

# 6. Create the i18n directory structure
mkdir -p src/i18n
mkdir -p messages
mkdir -p src/app/\[locale\]
mkdir -p src/app/\[locale\]/looped
mkdir -p src/app/\[locale\]/contact
mkdir -p src/app/\[locale\]/imprint
mkdir -p src/app/\[locale\]/privacy
mkdir -p src/app/\[locale\]/insights
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/shared
mkdir -p public/images/products

# 7. Create the next-intl routing config
cat > src/i18n/routing.ts << 'EOF'
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
EOF

# 8. Create the next-intl navigation helpers
cat > src/i18n/navigation.ts << 'EOF'
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
EOF

# 9. Create the next-intl request config
cat > src/i18n/request.ts << 'EOF'
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
EOF

# 10. Create the middleware
cat > src/middleware.ts << 'EOF'
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
EOF

# 11. Create stub translation files
cat > messages/en.json << 'EOF'
{
  "Header": {
    "nav": {
      "about": "About us",
      "solutions": "Solutions",
      "contact": "Contact",
      "insights": "Insights"
    }
  },
  "Home": {
    "hero": {
      "title": "Building Software People Love",
      "subtitle": "Design first, AI native."
    },
    "about": {
      "heading": "About Flits",
      "description": "At Flits we connect data and design — to create incredible tools. Directly at the intersection of technology and ambition, we build the systems that empower tomorrow."
    },
    "stats": {
      "reach": "Market Reach",
      "reachValue": "200K+",
      "uptake": "Consumer Uptake",
      "uptakeValue": "1K+",
      "support": "Support",
      "supportValue": "24/7"
    },
    "cta": {
      "contact": "Contact",
      "whatWeDo": "What we do"
    }
  },
  "Contact": {
    "title": "Contact us",
    "email": "E-Mail",
    "phone": "Phone"
  },
  "Footer": {
    "pages": "Pages",
    "home": "Home",
    "insights": "Insights",
    "looped": "Looped",
    "imprint": "Imprint",
    "privacy": "Privacy"
  },
  "Looped": {
    "category": "Habit Tracker",
    "title": "Looped",
    "subtitle": "The best minimalist habit tracker.",
    "download": "Download",
    "features": {
      "heading": "Featured features.",
      "momentum": {
        "title": "Build Real Momentum",
        "description": "Looped helps you stick with your habits day after day, turning small steps into lasting change."
      },
      "calm": {
        "title": "A Calm Space to Grow",
        "description": "No noisy feeds or gamification. Just a clean, focused environment to stay on track."
      },
      "progress": {
        "title": "Your Progress, at a Glance",
        "description": "Elegant visuals and simple stats show you exactly how far you've come — and where to go next."
      },
      "widgets": "Your habits on your home screen.",
      "liveActivities": "Time your habits.",
      "minimalMode": "For the even more minimalist."
    }
  },
  "Common": {
    "language": "Language"
  }
}
EOF

cat > messages/de.json << 'EOF'
{
  "Header": {
    "nav": {
      "about": "Über uns",
      "solutions": "Lösungen",
      "contact": "Kontakt",
      "insights": "Insights"
    }
  },
  "Home": {
    "hero": {
      "title": "Software, die begeistert",
      "subtitle": "Design first, AI native."
    },
    "about": {
      "heading": "Über Flits",
      "description": "Bei Flits verbinden wir Daten und Design — um außergewöhnliche Tools zu schaffen. An der Schnittstelle von Technologie und Ambition bauen wir die Systeme, die morgen antreiben."
    },
    "stats": {
      "reach": "Marktreichweite",
      "reachValue": "200K+",
      "uptake": "Nutzerakzeptanz",
      "uptakeValue": "1K+",
      "support": "Support",
      "supportValue": "24/7"
    },
    "cta": {
      "contact": "Kontakt",
      "whatWeDo": "Was wir machen"
    }
  },
  "Contact": {
    "title": "Kontaktiere uns",
    "email": "E-Mail",
    "phone": "Telefon"
  },
  "Footer": {
    "pages": "Seiten",
    "home": "Startseite",
    "insights": "Insights",
    "looped": "Looped",
    "imprint": "Impressum",
    "privacy": "Datenschutz"
  },
  "Looped": {
    "category": "Gewohnheitstracker",
    "title": "Looped",
    "subtitle": "Der beste minimalistische Gewohnheitstracker.",
    "download": "Herunterladen",
    "features": {
      "heading": "Ausgewählte Features.",
      "momentum": {
        "title": "Echte Dynamik aufbauen",
        "description": "Looped hilft dir, Tag für Tag an deinen Gewohnheiten dranzubleiben und kleine Schritte in dauerhafte Veränderung zu verwandeln."
      },
      "calm": {
        "title": "Ein ruhiger Raum zum Wachsen",
        "description": "Keine lauten Feeds oder Gamification. Einfach eine klare, fokussierte Umgebung, um auf Kurs zu bleiben."
      },
      "progress": {
        "title": "Dein Fortschritt auf einen Blick",
        "description": "Elegante Visualisierungen und einfache Statistiken zeigen dir genau, wie weit du gekommen bist — und wohin es als nächstes geht."
      },
      "widgets": "Deine Gewohnheiten auf dem Homescreen.",
      "liveActivities": "Deine Gewohnheiten timen.",
      "minimalMode": "Für den noch Minimalistischeren."
    }
  },
  "Common": {
    "language": "Sprache"
  }
}
EOF

cat > messages/fr.json << 'EOF'
{
  "Header": {
    "nav": {
      "about": "À propos",
      "solutions": "Solutions",
      "contact": "Contact",
      "insights": "Insights"
    }
  },
  "Home": {
    "hero": {
      "title": "Créer des logiciels que les gens adorent",
      "subtitle": "Design first, AI native."
    },
    "about": {
      "heading": "À propos de Flits",
      "description": "Chez Flits, nous connectons données et design — pour créer des outils incroyables. À l'intersection de la technologie et de l'ambition, nous construisons les systèmes qui propulsent demain."
    },
    "stats": {
      "reach": "Portée du marché",
      "reachValue": "200K+",
      "uptake": "Adoption",
      "uptakeValue": "1K+",
      "support": "Support",
      "supportValue": "24/7"
    },
    "cta": {
      "contact": "Contact",
      "whatWeDo": "Ce que nous faisons"
    }
  },
  "Contact": {
    "title": "Contactez-nous",
    "email": "E-Mail",
    "phone": "Téléphone"
  },
  "Footer": {
    "pages": "Pages",
    "home": "Accueil",
    "insights": "Insights",
    "looped": "Looped",
    "imprint": "Mentions légales",
    "privacy": "Confidentialité"
  },
  "Looped": {
    "category": "Suivi d'habitudes",
    "title": "Looped",
    "subtitle": "Le meilleur suivi d'habitudes minimaliste.",
    "download": "Télécharger",
    "features": {
      "heading": "Fonctionnalités phares.",
      "momentum": {
        "title": "Créez un vrai élan",
        "description": "Looped vous aide à maintenir vos habitudes jour après jour, transformant de petits pas en changements durables."
      },
      "calm": {
        "title": "Un espace calme pour grandir",
        "description": "Pas de flux bruyants ni de gamification. Juste un environnement propre et concentré pour rester sur la bonne voie."
      },
      "progress": {
        "title": "Votre progression en un coup d'œil",
        "description": "Des visuels élégants et des statistiques simples vous montrent exactement le chemin parcouru — et la suite."
      },
      "widgets": "Vos habitudes sur l'écran d'accueil.",
      "liveActivities": "Chronométrez vos habitudes.",
      "minimalMode": "Pour les encore plus minimalistes."
    }
  },
  "Common": {
    "language": "Langue"
  }
}
EOF

cat > messages/es.json << 'EOF'
{
  "Header": {
    "nav": {
      "about": "Sobre nosotros",
      "solutions": "Soluciones",
      "contact": "Contacto",
      "insights": "Insights"
    }
  },
  "Home": {
    "hero": {
      "title": "Creando software que la gente ama",
      "subtitle": "Design first, AI native."
    },
    "about": {
      "heading": "Sobre Flits",
      "description": "En Flits conectamos datos y diseño — para crear herramientas increíbles. En la intersección de tecnología y ambición, construimos los sistemas que impulsan el mañana."
    },
    "stats": {
      "reach": "Alcance de mercado",
      "reachValue": "200K+",
      "uptake": "Adopción",
      "uptakeValue": "1K+",
      "support": "Soporte",
      "supportValue": "24/7"
    },
    "cta": {
      "contact": "Contacto",
      "whatWeDo": "Lo que hacemos"
    }
  },
  "Contact": {
    "title": "Contáctanos",
    "email": "E-Mail",
    "phone": "Teléfono"
  },
  "Footer": {
    "pages": "Páginas",
    "home": "Inicio",
    "insights": "Insights",
    "looped": "Looped",
    "imprint": "Aviso legal",
    "privacy": "Privacidad"
  },
  "Looped": {
    "category": "Rastreador de hábitos",
    "title": "Looped",
    "subtitle": "El mejor rastreador de hábitos minimalista.",
    "download": "Descargar",
    "features": {
      "heading": "Funciones destacadas.",
      "momentum": {
        "title": "Construye impulso real",
        "description": "Looped te ayuda a mantener tus hábitos día a día, convirtiendo pequeños pasos en cambios duraderos."
      },
      "calm": {
        "title": "Un espacio tranquilo para crecer",
        "description": "Sin feeds ruidosos ni gamificación. Solo un entorno limpio y enfocado para mantenerte en el camino."
      },
      "progress": {
        "title": "Tu progreso de un vistazo",
        "description": "Visualizaciones elegantes y estadísticas simples te muestran exactamente lo lejos que has llegado — y hacia dónde ir."
      },
      "widgets": "Tus hábitos en la pantalla de inicio.",
      "liveActivities": "Cronometra tus hábitos.",
      "minimalMode": "Para los aún más minimalistas."
    }
  },
  "Common": {
    "language": "Idioma"
  }
}
EOF

# 12. Update next.config.ts to include next-intl plugin
cat > next.config.ts << 'EOF'
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
EOF

# 13. Create root page.tsx (redirect to default locale)
cat > src/app/page.tsx << 'EOF'
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
EOF

# 14. Create .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=https://flits.cc
EOF

echo ""
echo "✅ Flits website project scaffolded!"
echo ""
echo "Next steps:"
echo "  1. Copy CLAUDE.md into the project root"
echo "  2. Run 'pnpm dev' to start developing"
echo "  3. Build the [locale]/layout.tsx and [locale]/page.tsx"
echo "  4. Extract the Flits logo SVG from the current site"
echo ""