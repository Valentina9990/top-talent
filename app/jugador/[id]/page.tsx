import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getPlayerProfile } from "@/actions/player-profile";
import { getScoutProfile } from "@/actions/scout-profile";
import { isFavoritePlayer } from "@/actions/scout-players";
import ProfileView from "@/components/profile/ProfileView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const playerId = resolvedParams.id;

  const session = await auth();

  const result = await getPlayerProfile(playerId);

  if (!result.profile) {
    notFound();
  }

  const isOwner = session?.user?.id === playerId;

  let scoutContact: {
    name?: string | null;
    email?: string | null;
    primaryPhone?: string | null;
    secondaryPhone?: string | null;
  } | null = null;

  if (session?.user?.role === "SCOUT") {
    const scoutProfile = await getScoutProfile(session.user.id);

    if (scoutProfile) {
      scoutContact = {
        name: scoutProfile.fullName || scoutProfile.user?.name,
        email: scoutProfile.user?.email,
        primaryPhone: scoutProfile.primaryPhone,
        secondaryPhone: scoutProfile.secondaryPhone,
      };
    }
  }

  let initialIsFavorite = false;

  if (session?.user?.role === "SCOUT") {
    const favoriteResult = await isFavoritePlayer(playerId);
    if (favoriteResult.success) {
      initialIsFavorite = !!favoriteResult.isFavorite;
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/jugadores"
          className="inline-flex items-center text-primary-500 hover:text-primary-700 font-semibold mb-6 transition duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Muro de Talentos
        </Link>

        <ProfileView
          profile={result.profile}
          user={result.profile.user}
          isOwner={isOwner}
          playerId={playerId}
          viewerRole={session?.user?.role ?? null}
          scoutContact={scoutContact ?? undefined}
          initialIsFavorite={initialIsFavorite}
        />
      </div>
    </div>
  );
}

