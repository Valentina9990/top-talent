import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPlayerProfile } from "@/actions/player-profile";
import ProfileView from "@/components/profile/ProfileView";
import ProfileEdit from "@/components/profile/ProfileEdit";

interface PageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "PLAYER") {
    redirect("/dashboard");
  }

  const result = await getPlayerProfile(session.user.id);

  if (!result.profile) {
    return <div>Error: No se pudo cargar el perfil</div>;
  }

  const params = await searchParams;
  const isEditMode = params.edit === "true";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isEditMode ? (
          <ProfileEdit profile={result.profile} />
        ) : (
          <ProfileView
            profile={result.profile}
            user={session.user}
            isOwner={true}
          />
        )}
      </div>
    </div>
  );
}

