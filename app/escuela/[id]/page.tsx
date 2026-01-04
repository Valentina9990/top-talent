import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getSchoolProfile } from "@/actions/school-profile";
import { SchoolProfileView } from "@/components/profile/SchoolProfileView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SchoolProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const schoolId = resolvedParams.id;

  const session = await auth();
  const schoolProfile = await getSchoolProfile(schoolId);

  if (!schoolProfile) {
    notFound();
  }

  const isOwner = session?.user?.id === schoolId;

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
          Volver al Directorio de Escuelas
        </Link>

        <SchoolProfileView schoolProfile={schoolProfile} />

        {isOwner && (
          <div className="mt-8 text-center">
            <Link
              href="/dashboard-escuela/perfil"
              className="inline-block bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
            >
              Editar Perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

