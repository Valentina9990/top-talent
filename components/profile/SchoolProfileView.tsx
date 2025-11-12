"use client";

import {MapPin, Phone, Mail, Facebook, Instagram, Globe, Award} from "lucide-react";
import {SchoolHeader} from "./school/SchoolHeader";
import {SectionCard} from "./school/SectionCard";
import {ContactItem} from "./school/ContactItem";
import {StatsCard} from "./school/StatsCard";

interface SchoolProfileViewProps {
  schoolProfile: any;
}

export const SchoolProfileView = ({schoolProfile}: SchoolProfileViewProps) => {
  const categories = schoolProfile?.categories || [];
  const logoUrl = schoolProfile?.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(schoolProfile?.officialName || schoolProfile?.user?.name || "Escuela")}`;

  // Prepare stats cards
  const statsCards = (
    <>
      {schoolProfile?.approximatePlayers && (
        <StatsCard
          value={schoolProfile.approximatePlayers}
          label="Jugadores"
        />
      )}
      {categories.length > 0 && (
        <StatsCard
          value={categories.length}
          label="Categorías"
        />
      )}
      {schoolProfile?.headCoachName && (
        <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
          <p className="text-lg font-semibold text-primary-600">{schoolProfile.headCoachName}</p>
          <p className="text-sm text-gray-500">Director Técnico</p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Profile Header */}
      <SchoolHeader
        logoUrl={logoUrl}
        officialName={schoolProfile?.officialName || schoolProfile?.user?.name || "Escuela"}
        nit={schoolProfile?.nit}
        city={schoolProfile?.city}
        department={schoolProfile?.department}
        description={schoolProfile?.description}
        statsCards={statsCards}
      />

      {/* Main Content */}
      <div className="space-y-8">
        {/* Mission and Vision */}
        {(schoolProfile?.mission || schoolProfile?.vision) && (
          <SectionCard title="Nuestra Filosofía">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schoolProfile?.mission && (
                <div>
                  <h3 className="text-lg font-semibold text-primary-600 mb-2">Misión</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{schoolProfile.mission}</p>
                </div>
              )}
              {schoolProfile?.vision && (
                <div>
                  <h3 className="text-lg font-semibold text-primary-600 mb-2">Visión</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{schoolProfile.vision}</p>
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* Contact and Location - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <SectionCard title="Información de Contacto">
            <div className="space-y-4">
              {schoolProfile?.phone && (
                <ContactItem
                  icon={<Phone className="w-5 h-5"/>}
                  label="Teléfono"
                  value={schoolProfile.phone}
                  href={`tel:${schoolProfile.phone}`}
                />
              )}
              {schoolProfile?.contactEmail && (
                <ContactItem
                  icon={<Mail className="w-5 h-5"/>}
                  label="Email"
                  value={schoolProfile.contactEmail}
                  href={`mailto:${schoolProfile.contactEmail}`}
                />
              )}
              {schoolProfile?.facebookUrl && (
                <ContactItem
                  icon={<Facebook className="w-5 h-5"/>}
                  label="Facebook"
                  value="Ver Perfil"
                  href={schoolProfile.facebookUrl}
                  isExternal
                />
              )}
              {schoolProfile?.instagramUrl && (
                <ContactItem
                  icon={<Instagram className="w-5 h-5"/>}
                  label="Instagram"
                  value="Ver Perfil"
                  href={schoolProfile.instagramUrl}
                  isExternal
                />
              )}
              {schoolProfile?.websiteUrl && (
                <ContactItem
                  icon={<Globe className="w-5 h-5"/>}
                  label="Sitio Web"
                  value="Visitar Sitio"
                  href={schoolProfile.websiteUrl}
                  isExternal
                />
              )}
            </div>
          </SectionCard>

          {/* Location */}
          {(schoolProfile?.department || schoolProfile?.city || schoolProfile?.address) && (
            <SectionCard title="Ubicación" icon={<MapPin className="w-5 h-5"/>}>
              <div className="space-y-4">
                {schoolProfile?.department && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Departamento</p>
                    <p className="text-gray-900">{schoolProfile.department}</p>
                  </div>
                )}
                {schoolProfile?.city && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ciudad</p>
                    <p className="text-gray-900">{schoolProfile.city}</p>
                  </div>
                )}
                {schoolProfile?.address && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dirección</p>
                    <p className="text-gray-900">{schoolProfile.address}</p>
                  </div>
                )}
              </div>
            </SectionCard>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <SectionCard title="Categorías Disponibles">
            <div className="flex flex-wrap gap-3">
              {categories.map((category: { id: string; name: string }) => (
                <span
                  key={category.id}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-semibold"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Achievements */}
        {schoolProfile?.achievements && (
          <SectionCard
            title="Logros Destacados"
            icon={<Award className="w-6 h-6 text-yellow-600" />}
          >
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{schoolProfile.achievements}</p>
            </div>
          </SectionCard>
        )}
      </div>
    </>
  );
};




