import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { FlitsLogo } from "@/components/shared/flits-logo";

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
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" aria-label="Flits">
              <FlitsLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building Software People Love.
              <br />
              Design first, AI native.
            </p>
            <div className="mt-6 flex gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:contact@flits.cc"
                className="transition-colors hover:text-foreground"
              >
                contact@flits.cc
              </a>
              <span>·</span>
              <a
                href="tel:+4915153616465"
                className="transition-colors hover:text-foreground"
              >
                +49 1515 3616465
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tFooter("pages")}
            </p>
            <ul className="space-y-3">
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

          {/* Legal entities */}
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-foreground">
                Trout UG (haftungsbeschränkt)
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Forellenweg 8a
                <br />
                94428 Eichendorf, Germany
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Flits Ltd</p>
              <p className="mt-1 text-sm text-muted-foreground">
                71-75 Shelton St
                <br />
                London, WC2H 9JQ, UK
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Flits. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
