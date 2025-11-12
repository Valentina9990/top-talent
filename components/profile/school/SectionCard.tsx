"use client";

import React from "react";

interface SectionCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
    title, 
    icon, 
    children, 
    className = "" 
}) => {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-xl ${className}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h2>
            {children}
        </div>
    );
};

