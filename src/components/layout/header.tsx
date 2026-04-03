"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";

function HamburgerIcon() {
  return (
    <svg
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("Header");

  const routeLinks = [
    { href: "/looped" as const, label: "Looped" },
    { href: "/insights" as const, label: t("nav.insights") },
    { href: "/contact" as const, label: t("nav.contact") },
  ];

  const navLinkClass =
    "text-sm text-muted-foreground transition-colors hover:text-foreground";
  const mobileNavLinkClass =
    "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Flits
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="/#about" className={navLinkClass}>
            {t("nav.about")}
          </a>
          {routeLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="pb-2">
                <SheetTitle>
                  <Link href="/" className="text-xl font-bold tracking-tight">
                    Flits
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-6 pt-4">
                <a href="/#about" className={mobileNavLinkClass}>
                  {t("nav.about")}
                </a>
                {routeLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={mobileNavLinkClass}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
