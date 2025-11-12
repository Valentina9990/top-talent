"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolPricingCardProps {
  name: string;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  limitations: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaVariant?: "default" | "outline";
  badge?: string;
}

export function SchoolPricingCard({
  name,
  price,
  period,
  description,
  features,
  limitations,
  highlighted = false,
  ctaText,
  ctaVariant = "default",
  badge,
}: SchoolPricingCardProps) {
  const formatPrice = (amount: number | string) => {
    if (typeof amount === "string") return amount;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubscribe = () => {
    console.log(`Subscribing to ${name} plan`);
  };

  return (
    <Card
      className={`relative flex flex-col ${
        highlighted
          ? "border-primary-600 border-2 shadow-xl scale-105"
          : "border-gray-200"
      }`}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold text-white">
            {badge}
          </span>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-8">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-2">
          {description}
        </CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-extrabold text-gray-900">
              {formatPrice(price)}
            </span>
            {period && (
              <span className="ml-2 text-xl text-gray-600">/ {period}</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Incluye:
            </h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {limitations.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Límites:
              </h4>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          onClick={handleSubscribe}
          variant={ctaVariant}
          className={`w-full ${
            highlighted && ctaVariant === "default"
              ? "bg-primary-600 hover:bg-primary-700"
              : ""
          }`}
          size="lg"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
