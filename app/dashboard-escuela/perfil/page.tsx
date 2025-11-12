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
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg p-8 text-white">
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
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-white/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Edit3 className="w-5 h-5" />
              Editar Perfil
            </a>
          ) : (
            <a
              href="/dashboard-escuela/perfil"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all font-semibold border border-white/30"
            >
              <Eye className="w-5 h-5" />
              Vista Previa
            </a>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8">
          {isEditMode ? (
            <div>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Edita tu Información</h2>
                <p className="text-gray-600">Completa todos los campos para que tu escuela destaque</p>
              </div>
              <SchoolProfileEdit
                initialData={schoolProfile}
                currentUserImage={session.user.image}
              />
            </div>
          ) : (
            <SchoolProfileView schoolProfile={schoolProfile} />
          )}
        </div>
      </div>

      {isEditMode && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Consejos para tu perfil</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Una descripción completa aumenta la confianza de los jugadores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Agrega fotos de alta calidad de tus instalaciones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Destaca tus logros más importantes y recientes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Mantén tu información de contacto actualizada</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
