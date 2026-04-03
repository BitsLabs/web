import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

export async function Footer() {
  const tFooter = await getTranslations("Footer");

  const pageLinks = [
    { href: "/" as const, label: tFooter("home") },
    { href: "/insights" as const, label: tFooter("insights") },
    { href: "/looped" as const, label: tFooter("looped") },
    { href: "/imprint" as const, label: tFooter("imprint") },
    { href: "/privacy" as const, label: tFooter("privacy") },
  ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Flits
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Building Software People Love. Design first, AI native.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tFooter("pages")}
            </p>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@flits.cc"
                  className="transition-colors hover:text-foreground"
                >
                  contact@flits.cc
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915153616465"
                  className="transition-colors hover:text-foreground"
                >
                  +49 1515 3616465
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Legal entities */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">
              Trout UG (haftungsbeschränkt)
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Forellenweg 8a, 94428 Eichendorf, Germany
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">
              Flits Ltd
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              71-75 Shelton St, London, WC2H 9JQ, United Kingdom
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Flits. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
