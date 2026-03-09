"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface Requirement {
  label: string;
  test: (value: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "Al menos 8 caracteres", test: (v) => v.length >= 8 },
  { label: "Un número (0-9)", test: (v) => /[0-9]/.test(v) },
  { label: "Un carácter especial (!@#$...)", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const results = useMemo(
    () => requirements.map((req) => ({ label: req.label, met: req.test(password) })),
    [password]
  );

  const metCount = results.filter((r) => r.met).length;

  const strengthLabel =
    metCount === 0 ? "Muy débil" :
    metCount === 1 ? "Débil" :
    metCount === 2 ? "Regular" :
    "Fuerte";

  const strengthColor =
    metCount === 0 ? "bg-red-500" :
    metCount === 1 ? "bg-orange-400" :
    metCount === 2 ? "bg-yellow-400" :
    "bg-green-500";

  const strengthTextColor =
    metCount === 0 ? "text-red-600" :
    metCount === 1 ? "text-orange-500" :
    metCount === 2 ? "text-yellow-600" :
    "text-green-600";

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Barra de progreso */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {requirements.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < metCount ? strengthColor : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${strengthTextColor}`}>{strengthLabel}</span>
      </div>

      {/* Lista de requisitos */}
      <ul className="space-y-1">
        {results.map(({ label, met }) => (
          <li key={label} className="flex items-center gap-2 text-xs">
            {met ? (
              <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            )}
            <span className={met ? "text-green-700" : "text-gray-500"}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
