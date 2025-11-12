"use client";

import React from "react";

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    return (
        <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

