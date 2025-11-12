"use client";

import React from "react";

interface Category {
    id: string;
    name: string;
}

interface CategoryMultiSelectProps {
    id: string;
    label: string;
    categories: Category[];
    selectedIds: string[];
    onChange: (selectedIds: string[]) => void;
    disabled?: boolean;
    error?: string;
}

export const CategoryMultiSelect: React.FC<CategoryMultiSelectProps> = ({
    id,
    label,
    categories,
    selectedIds,
    onChange,
    disabled,
    error
}) => {
    const handleToggle = (categoryId: string) => {
        if (selectedIds.includes(categoryId)) {
            onChange(selectedIds.filter(id => id !== categoryId));
        } else {
            onChange([...selectedIds, categoryId]);
        }
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-white max-h-60 overflow-y-auto">
                {categories.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay categorías disponibles</p>
                ) : (
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className={`flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors ${
                                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(category.id)}
                                    onChange={() => handleToggle(category.id)}
                                    disabled={disabled}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="ml-3 text-sm text-gray-700">{category.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            {selectedIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedIds.map((id) => {
                        const category = categories.find(c => c.id === id);
                        return category ? (
                            <span
                                key={id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                            >
                                {category.name}
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(id)}
                                        className="ml-1 hover:text-primary-900"
                                    >
                                        ×
                                    </button>
                                )}
                            </span>
                        ) : null;
                    })}
                </div>
            )}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
};

