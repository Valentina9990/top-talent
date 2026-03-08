import { UnifiedHero, ForPlayersSection, ForSchoolsSection, HowItWorksSection, CTASection } from "@/components/landing";

export default function Home() {
  return (
    <div>
      <UnifiedHero />
      <ForPlayersSection />
      <ForSchoolsSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
