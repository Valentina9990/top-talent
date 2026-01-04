"use client";

import React, { useState, useTransition } from "react";
import { User } from "@prisma/client";
import SchoolCard from "@/components/SchoolCard";
import { searchSchools } from "@/actions/search-schools";

interface SchoolProfile {
  id: string;
  officialName: string | null;
  department: string | null;
  city: string | null;
  description: string | null;
  categories: { id: string; name: string }[];
  _count: {
    players: number;
    posts: number;
  };
}

interface FeedClientProps {
  initialSchools: (User & { schoolProfile: SchoolProfile | null })[];
  departments: string[];
  categories: { id: string; name: string }[];
}

const FeedClient: React.FC<FeedClientProps> = ({
  initialSchools,
  departments,
  categories,
}) => {
  const [schools, setSchools] = useState(initialSchools);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    startTransition(async () => {
      const result = await searchSchools({
        name: name || undefined,
        department: department || undefined,
        city: city || undefined,
        category: category || undefined,
      });

      if (result.success && result.schools) {
        setSchools(result.schools);
      }
    });
  };

  const handleReset = () => {
    setName("");
    setDepartment("");
    setCity("");
    setCategory("");
    startTransition(async () => {
      const result = await searchSchools({});
      if (result.success && result.schools) {
        setSchools(result.schools);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Directorio de Escuelas
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Explora las escuelas deportivas de la región. Encuentra la academia perfecta para tu desarrollo deportivo.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8 sticky top-20 z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          >
            <option value="">Todos los Departamentos</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          >
            <option value="">Todas las Categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleFilter}
            disabled={isPending}
            className="flex-1 bg-primary-500 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Filtrando..." : "Filtrar"}
          </button>
          <button
            onClick={handleReset}
            disabled={isPending}
            className="px-6 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpiar
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Cargando escuelas...</p>
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No se encontraron escuelas con los filtros aplicados.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 text-primary-500 hover:text-primary-700 font-semibold"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedClient;

