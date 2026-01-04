"use client";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { MapPin, Users, Award } from "lucide-react";
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
interface SchoolCardProps {
  school: User & {
    schoolProfile: SchoolProfile | null;
  };
}
export default function SchoolCard({ school }: SchoolCardProps) {
  const profile = school.schoolProfile;
  if (!profile) return null;
  const logoUrl = school.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.officialName || school.name)}`;
  const schoolName = profile.officialName || school.name;
  const location = [profile.city, profile.department].filter(Boolean).join(", ");
  const categories = profile.categories.map((c) => c.name).join(", ");
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-500 flex items-center justify-center">
        {school.image ? (
          <Image
            src={logoUrl}
            alt={schoolName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/10">
            <span className="text-6xl font-bold text-white">
              {schoolName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {schoolName}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          {categories && (
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
              <span className="line-clamp-1">{categories}</span>
            </div>
          )}
          {profile.description && (
            <p className="text-gray-600 mt-3 line-clamp-2">
              {profile.description}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center text-sm mb-4 py-3 border-t border-gray-200">
          <div className="text-center flex-1">
            <div className="font-bold text-gray-900">{profile._count.players}</div>
            <div className="text-gray-600">Jugadores</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-bold text-gray-900">{profile.categories.length}</div>
            <div className="text-gray-600">Categorías</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-bold text-gray-900">{profile._count.posts}</div>
            <div className="text-gray-600">Publicaciones</div>
          </div>
        </div>
        <Link
          href={`/escuela/${school.id}`}
          className="block w-full text-center bg-primary-500 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition duration-300"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}
