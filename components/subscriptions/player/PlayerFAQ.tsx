"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el costo proporcionalmente.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, y transferencias bancarias. Todos los pagos son procesados de forma segura.",
  },
  {
    question: "¿Puedo cancelar mi suscripción?",
    answer:
      "Sí, puedes cancelar tu suscripción en cualquier momento. Tu plan permanecerá activo hasta el final del período de facturación actual y no se renovará automáticamente.",
  },
  {
    question: "¿Qué pasa con mis videos si bajo de plan?",
    answer:
      "Tus videos permanecerán guardados, pero solo los permitidos por tu nuevo plan estarán visibles públicamente. Podrás reactivar los demás si subes nuevamente de plan.",
  },
  {
    question: "¿Ofrecen descuentos para pagos anuales?",
    answer:
      "Sí, al elegir el plan anual obtienes un 20% de descuento sobre el precio mensual. Contáctanos para más detalles sobre planes anuales.",
  },
  {
    question: "¿Cómo funciona la visibilidad destacada en el plan Premium?",
    answer:
      "Con el plan Premium, tu perfil aparece en los primeros resultados cuando los clubes buscan jugadores. También recibes una insignia especial que destaca tu perfil.",
  },
  {
    question: "¿Puedo probar el plan Premium antes de suscribirme?",
    answer:
      "Ofrecemos una prueba gratuita de 7 días del plan Premium para nuevos usuarios. No se requiere tarjeta de crédito para la prueba.",
  },
  {
    question: "¿Qué incluyen los reportes detallados del plan Premium?",
    answer:
      "Los reportes incluyen: número de visualizaciones de tu perfil, clubes que te han visto, interacciones con tus videos, y análisis de tu rendimiento comparado con otros jugadores en tu posición.",
  },
];

export function PlayerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Preguntas Frecuentes
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-primary-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
