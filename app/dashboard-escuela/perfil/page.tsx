import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSchoolProfile } from "@/actions/school-profile";
import { SchoolProfileView } from "@/components/profile/SchoolProfileView";
import { SchoolProfileEdit } from "@/components/profile/SchoolProfileEdit";
import { School, Edit3, Eye } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function PerfilEscuelaPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "SCHOOL") {
    redirect("/");
  }

  const params = await searchParams;
  const isEditMode = params.edit === "true";

  const schoolProfile = await getSchoolProfile(session.user.id);

  if (!schoolProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No se pudo cargar el perfil</h2>
          <p className="text-gray-500">Por favor, intenta de nuevo más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-500 to-primary-500 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <School className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {isEditMode ? "Actualiza tu Información" : "Tu Perfil Institucional"}
              </h1>
              <p className="text-white/90 text-lg">
                {isEditMode 
                  ? "Mantén tu información actualizada para atraer el mejor talento" 
                  : "Gestiona la información visible para jugadores"
                }
              </p>
            </div>
          </div>
          
          {!isEditMode ? (
            <a
              href="/dashboard-escuela/perfil?edit=true"
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-white/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              <Edit3 className="w-5 h-5" />
              Editar Perfil
            </a>
          ) : (
            <a
              href="/dashboard-escuela/perfil"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all font-semibold border border-white/30 cursor-pointer"
            >
              <Eye className="w-5 h-5" />
              Vista Previa
            </a>
          )}
        </div>
      </div>

      {isEditMode ? (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Edita tu Información</h2>
            <p className="text-gray-600">Completa todos los campos para que tu escuela destaque</p>
          </div>
          <SchoolProfileEdit
            initialData={schoolProfile}
            currentUserImage={session.user.image}
            returnPath="/dashboard-escuela/perfil"
          />
        </div>
      ) : (
        <SchoolProfileView schoolProfile={schoolProfile} />
      )}
    </div>
  );
}
