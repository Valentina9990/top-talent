"use client";

import React from "react";

interface ContactItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    isExternal?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({ 
    icon, 
    label, 
    value, 
    href, 
    isExternal = false 
}) => {
    const content = (
        <div className="flex items-start gap-3">
            <div className="text-primary-500 mt-1 flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                {href ? (
                    <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-gray-900 hover:text-primary-500 break-words"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-gray-900 break-words">{value}</p>
                )}
            </div>
        </div>
    );

    return content;
};

