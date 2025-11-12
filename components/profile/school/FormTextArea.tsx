"use client";

import React from "react";

interface FormTextAreaProps {
    id: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    register: any;
    error?: string;
    rows?: number;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
    id,
    label,
    placeholder,
    disabled,
    register,
    error,
    rows = 3
}) => {
    const minHeight = rows === 3 ? "min-h-[80px]" : rows === 4 ? "min-h-[100px]" : "min-h-[120px]";
    
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <textarea
                id={id}
                {...register}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full ${minHeight} px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
};

