"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactPlayer } from "@/actions/contact-player";

interface ContactPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerId: string;
  playerName?: string | null;
  scoutName?: string | null;
  scoutEmail?: string | null;
  primaryPhone?: string | null;
  secondaryPhone?: string | null;
}

interface ContactOption {
  id: "EMAIL" | "PRIMARY_PHONE" | "SECONDARY_PHONE";
  label: string;
  value: string;
}

export function ContactPlayerModal({
  isOpen,
  onClose,
  playerId,
  playerName,
  scoutName,
  scoutEmail,
  primaryPhone,
  secondaryPhone,
}: ContactPlayerModalProps) {
  const [message, setMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const contactOptions: ContactOption[] = useMemo(() => {
    const options: ContactOption[] = [];

    if (scoutEmail) {
      options.push({
        id: "EMAIL",
        label: "Correo electrónico",
        value: scoutEmail,
      });
    }

    if (primaryPhone) {
      options.push({
        id: "PRIMARY_PHONE",
        label: "Teléfono principal",
        value: primaryPhone,
      });
    }

    if (secondaryPhone) {
      options.push({
        id: "SECONDARY_PHONE",
        label: "Teléfono secundario",
        value: secondaryPhone,
      });
    }

    return options;
  }, [scoutEmail, primaryPhone, secondaryPhone]);

  useEffect(() => {
    if (contactOptions.length > 0 && !selectedMethod) {
      setSelectedMethod(contactOptions[0].id);
    }
  }, [contactOptions, selectedMethod]);

  const handleClose = () => {
    if (isSending) return;
    setMessage("");
    setError(null);
    setSuccess(null);
    setSelectedMethod(contactOptions[0]?.id ?? null);
    onClose();
  };

  const handleSend = async () => {
    if (!selectedMethod) {
      setError("Selecciona un método de contacto");
      return;
    }

    if (!message.trim()) {
      setError("Escribe un mensaje para el jugador");
      return;
    }

    if (contactOptions.length === 0) {
      setError("No tienes métodos de contacto configurados. Actualiza tu perfil de scout.");
      return;
    }

    setIsSending(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await contactPlayer({
        playerId,
        message,
        contactMethod: selectedMethod as any,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success || "Mensaje enviado correctamente");
        handleClose();
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar el mensaje");
    } finally {
      setIsSending(false);
    }
  };

  const displayPlayerName = playerName || "el jugador";
  const displayScoutName = scoutName || "Scout";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contactar a {displayPlayerName}</DialogTitle>
          <DialogDescription>
            Envía un mensaje de interés al jugador y comparte tu mejor método de contacto.
          </DialogDescription>
        </DialogHeader>

        {contactOptions.length === 0 ? (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            No tienes métodos de contacto configurados. Ve a tu perfil de scout y agrega al menos un correo o número de teléfono.
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Método de contacto</p>
              <div className="space-y-2">
                {contactOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:border-primary-400 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={option.id}
                      checked={selectedMethod === option.id}
                      onChange={() => setSelectedMethod(option.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">{option.label}</span>
                      <span className="text-xs text-gray-500 break-all">{option.value}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje para el jugador
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder={`Preséntate como scout y explica tu interés en ${displayPlayerName}.`}
              />
              <p className="mt-1 text-xs text-gray-400">
                Este mensaje se enviará por correo al jugador junto con tus datos de contacto.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                {success}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSending}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-300 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={isSending || contactOptions.length === 0}
                className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Enviaremos este mensaje en tu nombre como scout {displayScoutName}.
        </p>
      </DialogContent>
    </Dialog>
  );
}
