import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPlayerProfile } from "@/actions/player-profile";
import { getSchoolProfile } from "@/actions/school-profile";
import { getScoutProfile } from "@/actions/scout-profile";
import ProfileView from "@/components/profile/ProfileView";
import ProfileEdit from "@/components/profile/ProfileEdit";
import { SchoolProfileView } from "@/components/profile/SchoolProfileView";
import { SchoolProfileEdit } from "@/components/profile/SchoolProfileEdit";
import { ScoutProfileView } from "@/components/profile/ScoutProfileView";
import { ScoutProfileEdit } from "@/components/profile/ScoutProfileEdit";

interface PageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userId = session.user.id!;

  const params = await searchParams;
  const isEditMode = params.edit === "true";

  // Handle SCHOOL profile
  if (session.user.role === "SCHOOL") {
    const schoolProfile = await getSchoolProfile(userId);

    if (!schoolProfile) {
      return <div>Error: No se pudo cargar el perfil de la escuela</div>;
    }

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Editar Perfil de Escuela" : "Perfil de Escuela"}
              </h1>
              {!isEditMode && (
                <a
                  href="/perfil?edit=true"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700"
                >
                  Editar Perfil
                </a>
              )}
            </div>
            {isEditMode ? (
              <SchoolProfileEdit
                initialData={schoolProfile}
                currentUserImage={session.user.image}
              />
            ) : (
              <SchoolProfileView schoolProfile={schoolProfile} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle PLAYER profile
  if (session.user.role === "PLAYER") {
    const result = await getPlayerProfile(userId);

    if (!result.profile) {
      return <div>Error: No se pudo cargar el perfil</div>;
    }

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
              playerId={userId}
              viewerRole={session.user.role}
            />
          )}
        </div>
      </div>
    );
  }

  // Handle SCOUT profile (read-only for now)
  if (session.user.role === "SCOUT") {
    const scoutProfile = await getScoutProfile(userId);

    if (!scoutProfile) {
      return <div>Error: No se pudo cargar el perfil de scout</div>;
    }

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isEditMode ? (
            <ScoutProfileEdit
              initialData={{
                primaryPhone: scoutProfile.primaryPhone,
                secondaryPhone: scoutProfile.secondaryPhone,
                yearsExperience: scoutProfile.yearsExperience,
                departmentId: scoutProfile.departmentId,
                cityId: scoutProfile.cityId,
              }}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Perfil de Scout</h1>
                <a
                  href="/perfil?edit=true"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700"
                >
                  Editar Perfil
                </a>
              </div>
              <ScoutProfileView scoutProfile={scoutProfile} />
            </>
          )}
        </div>
      </div>
    );
  }

  // Default redirect for other roles
  redirect("/");
}


