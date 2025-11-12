"use client";

import React from "react";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    register: any;
    error?: string;
    helpText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    type = "text",
    placeholder,
    disabled,
    register,
    error,
    helpText
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                {...register}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {helpText && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
};

