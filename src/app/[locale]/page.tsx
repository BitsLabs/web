import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CtaSection } from "@/components/sections/cta-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
