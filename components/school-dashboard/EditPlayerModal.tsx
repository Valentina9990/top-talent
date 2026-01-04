"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSchoolPlayerData } from "@/actions/school-players";
import { toast } from "sonner";

interface EditPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  player: any;
  categories: any[];
  positions: any[];
}

export function EditPlayerModal({ 
  open, 
  onOpenChange, 
  onSuccess,
  player,
  categories,
  positions
}: EditPlayerModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    positionIds: [] as string[],
    preferredFoot: "",
    goals: 0,
    assists: 0,
    matchesPlayed: 0,
  });

  useEffect(() => {
    if (player) {
      setFormData({
        categoryId: player.categoryId || "",
        positionIds: player.positions?.map((p: any) => p.id) || [],
        preferredFoot: player.preferredFoot || "",
        goals: player.goals || 0,
        assists: player.assists || 0,
        matchesPlayed: player.matchesPlayed || 0,
      });
    }
  }, [player]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const result = await updateSchoolPlayerData(player.id, formData);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Datos actualizados exitosamente");
        onOpenChange(false);
        onSuccess();
      }
    } catch (error) {
      toast.error("Error al actualizar datos");
    } finally {
      setLoading(false);
    }
  };

  const togglePosition = (positionId: string) => {
    setFormData(prev => ({
      ...prev,
      positionIds: prev.positionIds.includes(positionId)
        ? prev.positionIds.filter(id => id !== positionId)
        : [...prev.positionIds, positionId]
    }));
  };

  if (!player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Editar Datos de {player.user.name}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-900">
              Categoría
            </Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              Posiciones
            </Label>
            <div className="flex flex-wrap gap-2 border border-gray-200 rounded-md p-3 bg-gray-50 min-h-[42px]">
              {positions.map((position) => (
                <button
                  key={position.id}
                  type="button"
                  onClick={() => togglePosition(position.id)}
                  disabled={loading}
                  className={`
                    px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${formData.positionIds.includes(position.id)
                      ? "bg-primary-500 text-white hover:bg-primary-700"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {position.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredFoot" className="text-sm font-medium text-gray-900">
              Pie Preferido
            </Label>
            <Select
              value={formData.preferredFoot}
              onValueChange={(value) => setFormData({ ...formData, preferredFoot: value })}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar pie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RIGHT">Derecho</SelectItem>
                <SelectItem value="LEFT">Izquierdo</SelectItem>
                <SelectItem value="BOTH">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-sm font-medium text-gray-900">
                Goles
              </Label>
              <Input
                id="goals"
                type="number"
                min="0"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })}
                disabled={loading}
                className="border-0 bg-gray-50 focus-visible:ring-2 focus-visible:ring-primary-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assists" className="text-sm font-medium text-gray-900">
                Asistencias
              </Label>
              <Input
                id="assists"
                type="number"
                min="0"
                value={formData.assists}
                onChange={(e) => setFormData({ ...formData, assists: parseInt(e.target.value) || 0 })}
                disabled={loading}
                className="border-0 bg-gray-50 focus-visible:ring-2 focus-visible:ring-primary-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matches" className="text-sm font-medium text-gray-900">
                Partidos
              </Label>
              <Input
                id="matches"
                type="number"
                min="0"
                value={formData.matchesPlayed}
                onChange={(e) => setFormData({ ...formData, matchesPlayed: parseInt(e.target.value) || 0 })}
                disabled={loading}
                className="border-0 bg-gray-50 focus-visible:ring-2 focus-visible:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-700"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
