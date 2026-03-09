import { UnifiedHero, ForPlayersSection, ForSchoolsSection, HowItWorksSection } from "@/components/landing";

export default function Home() {
  return (
    <div>
      <UnifiedHero />
      <ForPlayersSection />
      <ForSchoolsSection />
      <HowItWorksSection />
    </div>
  );
}
