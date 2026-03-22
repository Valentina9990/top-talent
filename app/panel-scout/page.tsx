import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { getScoutDashboardData } from "@/actions/scout-players";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      {helper && <span className="text-sm text-gray-500">{helper}</span>}
    </div>
  );
}

interface BarDatum {
  name: string;
  value: number;
}


export default async function ScoutDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "SCOUT") {
    redirect("/");
  }

  const data = await getScoutDashboardData();

  if (!("success" in data) || !data.success) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Panel de Scout
            </h1>
            <p className="text-red-600 text-sm mb-2 font-semibold">
              No se pudieron cargar los datos del panel.
            </p>
            <p className="text-sm text-gray-600">
              Intenta de nuevo más tarde. Si el problema persiste, por favor
              revisa que tu perfil de scout esté correctamente configurado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { contactedPlayers, favoritePlayers, stats } = data;

  const contactedByCategory: BarDatum[] = stats.contactedByCategory.map(
    (item: { name: string; count: number }) => ({
      name: item.name,
      value: item.count,
    })
  );

  const favoritesByPosition: BarDatum[] = stats.favoritesByPosition.map(
    (item: { name: string; count: number }) => ({
      name: item.name,
      value: item.count,
    })
  );

  const topFavoritesByGoals: BarDatum[] = stats.topFavoritesByGoals.map(
    (item: { name: string; goals: number }) => ({
      name: item.name,
      value: item.goals,
    })
  );

  const contactedByDepartment: BarDatum[] = stats.contactedByDepartment.map(
    (item: { name: string; count: number }) => ({
      name: item.name,
      value: item.count,
    })
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Scout
            </h1>
            <p className="text-gray-600">
              Visualiza los jugadores que has contactado, tus favoritos y las
              principales estadísticas de tu actividad como scout.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {session.user.image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Scout"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Jugadores contactados"
            value={stats.totalContacted}
            helper="Jugadores a los que has enviado un mensaje desde TOPTALENT"
          />
          <StatCard
            label="Jugadores favoritos"
            value={stats.totalFavorites}
            helper="Jugadores que has marcado como favoritos"
          />
          <StatCard
            label="Contactos recientes"
            value={Math.min(contactedPlayers.length, 10)}
            helper="Últimos jugadores con los que has interactuado"
          />
          <StatCard
            label="Top favoritos (goles)"
            value={topFavoritesByGoals.length}
            helper="Jugadores favoritos con más goles registrados"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <PieChartCard
            title="Jugadores contactados por categoría"
            data={contactedByCategory}
            emptyLabel="Aún no has contactado jugadores desde TOPTALENT. Usa el botón 'Contactar Jugador' en los perfiles para empezar."
          />
          <BarChartCard
            title="Jugadores favoritos por posición principal"
            data={favoritesByPosition}
            emptyLabel="Todavía no has añadido jugadores a tu lista de favoritos. Marca jugadores como favoritos desde su perfil."
            yAxisLabel="Cantidad de jugadores"
          />
          <BarChartCard
            title="Top jugadores favoritos por goles"
            data={topFavoritesByGoals}
            emptyLabel="No hay suficientes datos de goles en tus jugadores favoritos todavía."
            yAxisLabel="Cantidad de goles"
          />
          <BarChartCard
            title="Jugadores contactados por departamento"
            data={contactedByDepartment}
            emptyLabel="Cuando empieces a contactar jugadores de diferentes zonas verás aquí la distribución geográfica."
            yAxisLabel="Cantidad de jugadores"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Jugadores contactados
              </h2>
              <span className="text-sm text-gray-500">
                {contactedPlayers.length} en total
              </span>
            </div>
            {contactedPlayers.length === 0 ? (
              <p className="text-sm text-gray-500">
                Aún no has contactado ningún jugador desde TOPTALENT.
              </p>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {contactedPlayers.map((player: any) => (
                  <Link
                    key={`${player.id}-${player.contactedAt}`}
                    href={`/jugador/${player.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.name || "Jugador"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          {player.name?.charAt(0).toUpperCase() ?? "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate group-hover:text-primary-600">
                        {player.name || "Jugador sin nombre"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {player.primaryPosition} 
                        {player.category && `• ${player.category}`}
                      </p>
                      {(player.department || player.city) && (
                        <p className="text-xs text-gray-400 mt-1">
                          {[player.city, player.department]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500 flex flex-col gap-1">
                      <span>
                        Goles: <span className="font-semibold">{player.goals ?? 0}</span>
                      </span>
                      <span>
                        Asistencias: <span className="font-semibold">{player.assists ?? 0}</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Jugadores favoritos
              </h2>
              <span className="text-sm text-gray-500">
                {favoritePlayers.length} en total
              </span>
            </div>
            {favoritePlayers.length === 0 ? (
              <p className="text-sm text-gray-500">
                Todavía no tienes jugadores en tu lista de favoritos.
              </p>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {favoritePlayers.map((player: any) => (
                  <Link
                    key={`${player.id}-${player.favoritedAt}`}
                    href={`/jugador/${player.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.name || "Jugador"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          {player.name?.charAt(0).toUpperCase() ?? "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate group-hover:text-primary-600">
                        {player.name || "Jugador sin nombre"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {player.primaryPosition} 
                        {player.category && `• ${player.category}`}
                      </p>
                      {(player.department || player.city) && (
                        <p className="text-xs text-gray-400 mt-1">
                          {[player.city, player.department]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500 flex flex-col gap-1">
                      <span>
                        Goles: <span className="font-semibold">{player.goals ?? 0}</span>
                      </span>
                      <span>
                        Asistencias: <span className="font-semibold">{player.assists ?? 0}</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
