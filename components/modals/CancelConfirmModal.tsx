"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelConfirmModal({ isOpen, onClose, onConfirm }: CancelConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Descartar cambios?</DialogTitle>
          <DialogDescription>
            Tienes cambios sin guardar. Si cancelas ahora, perderás todos los cambios realizados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-300"
          >
            Continuar editando
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Descartar cambios
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
