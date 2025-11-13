import { getSchoolPlayers, getPositions } from "@/actions/school-players";
import { PlayersClient } from "@/components/school-dashboard/PlayersClient";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function JugadoresPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const result = await getSchoolPlayers();
  const categories = await getCategories();
  const positionsResult = await getPositions();

  if (result.error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Jugadores</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{result.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jugadores</h1>
        <p className="text-gray-600">
          Gestiona los jugadores de tu escuela, actualiza sus estadísticas y agrega nuevos miembros
        </p>
      </div>

      <PlayersClient 
        initialPlayers={result.players || []} 
        categories={categories}
        positions={positionsResult.positions || []}
      />
    </div>
  );
}
