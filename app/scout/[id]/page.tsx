import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getScoutProfile } from "@/actions/scout-profile";
import { ScoutProfileView } from "@/components/profile/ScoutProfileView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ScoutPublicProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const scoutIdOrEmail = resolvedParams.id;

  const session = await auth();

  // Buscamos primero por user id, y si no coincide asumimos que es un email
  const scoutProfile = await getScoutProfile(scoutIdOrEmail).catch(() => null);

  if (!scoutProfile) {
    notFound();
  }

  const isOwner = session?.user?.id === scoutProfile.user?.id;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/para-jugadores"
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
          Volver
        </Link>

        <ScoutProfileView scoutProfile={scoutProfile} />

        {isOwner && (
          <div className="mt-6 text-sm text-gray-500">
            Este es tu perfil público de scout. Puedes editar tu información desde la página de perfil.
          </div>
        )}
      </div>
    </div>
  );
}
