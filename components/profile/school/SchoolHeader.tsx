"use client";

import React from "react";

interface SchoolHeaderProps {
    logoUrl: string;
    officialName: string;
    nit?: string | null;
    city?: string | null;
    department?: string | null;
    description?: string | null;
    statsCards: React.ReactNode;
}

export const SchoolHeader: React.FC<SchoolHeaderProps> = ({
    logoUrl,
    officialName,
    nit,
    city,
    department,
    description,
    statsCards
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-64"
                        src={logoUrl}
                        alt={officialName}
                    />
                </div>
                <div className="p-8 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">
                                Escuela Deportiva
                            </div>
                            <h1 className="mt-1 text-4xl font-bold text-gray-900">
                                {officialName}
                            </h1>
                            {(city || department) && (
                                <p className="mt-1 text-gray-600">
                                    {city}{department && `, ${department}`}
                                </p>
                            )}
                            {description && (
                                <p className="mt-4 text-gray-700">{description}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        {statsCards}
                    </div>
                </div>
            </div>
        </div>
    );
};

