import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jugador no encontrado</h2>
        <p className="text-gray-600 mb-8">
          El perfil que estás buscando no existe o ha sido eliminado.
        </p>
        <div className="space-y-3">
          <Link
            href="/para-escuelas"
            className="block w-full bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition duration-300"
          >
            Ver todos los jugadores
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

