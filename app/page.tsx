import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UnifiedHero, ForPlayersSection, ForSchoolsSection, ForScoutsSection, HowItWorksSection } from "@/components/landing";

export default async function Home() {
  const session = await auth();

  if (session?.user?.role === "PLAYER") {
    redirect("/para-jugadores");
  }

  if (session?.user?.role === "SCOUT") {
    redirect("/jugadores");
  }

  return (
    <div>
      <UnifiedHero />
      <ForPlayersSection />
      <ForSchoolsSection />
      <ForScoutsSection />
      <HowItWorksSection />
    </div>
  );
}
