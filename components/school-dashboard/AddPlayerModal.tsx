"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPlayerToSchool } from "@/actions/school-players";
import { toast } from "sonner";

interface AddPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddPlayerModal({ open, onOpenChange, onSuccess }: AddPlayerModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Por favor ingresa un email");
      return;
    }

    setLoading(true);
    try {
      const result = await addPlayerToSchool(email);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success || "Jugador agregado exitosamente");
        setEmail("");
        onOpenChange(false);
        onSuccess();
      }
    } catch (error) {
      toast.error("Error al agregar jugador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Agregar Jugador
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
              Email del Jugador
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jugador@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              disabled={loading}
            />
            <p className="text-sm text-gray-500">
              El jugador será verificado automáticamente al agregarlo
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700"
            >
              {loading ? "Agregando..." : "Agregar Jugador"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
