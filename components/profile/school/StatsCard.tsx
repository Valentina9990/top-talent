"use client";

import React from "react";

interface StatsCardProps {
    value: string | number;
    label: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => {
    return (
        <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
            <p className="text-3xl font-bold text-primary-600">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
};

