export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Escuela no encontrada</h2>
        <p className="text-lg text-gray-600 mb-8">
          No pudimos encontrar el perfil de esta escuela.
        </p>
        <a
          href="/para-jugadores"
          className="inline-block bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
        >
          Volver al Directorio
        </a>
      </div>
    </div>
  );
}

