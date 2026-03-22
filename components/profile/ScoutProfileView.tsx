"use client";

import { MapPin, Phone, Mail, Briefcase } from "lucide-react";

interface ScoutProfileUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ScoutProfileLocation {
  name: string;
}

interface ScoutProfile {
  fullName?: string | null;
  primaryPhone?: string | null;
  secondaryPhone?: string | null;
  yearsExperience?: number | null;
  department?: ScoutProfileLocation | null;
  city?: ScoutProfileLocation | null;
  user?: ScoutProfileUser | null;
}

interface ScoutProfileViewProps {
  scoutProfile: ScoutProfile;
}

const getInitials = (name?: string | null): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const ScoutProfileView = ({ scoutProfile }: ScoutProfileViewProps) => {
  const user = scoutProfile.user;
  const displayName = scoutProfile.fullName || user?.name || "Scout";
  const email = user?.email;
  const avatarUrl = user?.image || null;

  const locationParts = [scoutProfile.city?.name, scoutProfile.department?.name]
    .filter(Boolean)
    .join(", ");

  const initials = getInitials(displayName);

  const experienceLabel =
    typeof scoutProfile.yearsExperience === "number"
      ? `${scoutProfile.yearsExperience} año${scoutProfile.yearsExperience === 1 ? "" : "s"} de experiencia`
      : "Experiencia no registrada";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-shrink-0 relative h-48 md:h-auto md:w-64 bg-primary-100 flex items-center justify-center">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl font-bold text-primary-500 select-none">
                {initials}
              </span>
            )}
          </div>
          <div className="p-8 flex-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-3">
                  <Briefcase className="w-4 h-4" />
                  Scout
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{displayName}</h1>
                {locationParts && (
                  <p className="mt-2 text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    {locationParts}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary-500" />
                  {experienceLabel}
                </p>
              </div>
              {email && (
                <div className="mt-2 md:mt-0 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-500" />
                  <span className="text-sm text-gray-700 break-all">{email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary-500" />
            Información de contacto
          </h2>
          <div className="space-y-3">
            {email && (
              <div>
                <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
                <p className="text-gray-900 break-all">{email}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono principal</p>
              <p className="text-gray-900">
                {scoutProfile.primaryPhone || "No registrado"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono secundario</p>
              <p className="text-gray-900">
                {scoutProfile.secondaryPhone || "No registrado"}
              </p>
            </div>
          </div>
        </div>

        {/* Location & Experience */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            Ubicación y experiencia
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Departamento</p>
              <p className="text-gray-900">
                {scoutProfile.department?.name || "No registrado"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ciudad</p>
              <p className="text-gray-900">
                {scoutProfile.city?.name || "No registrada"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Años de experiencia</p>
              <p className="text-gray-900">{experienceLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
