"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { AddPlayerModal } from "./AddPlayerModal";
import { EditPlayerModal } from "./EditPlayerModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { removePlayerFromSchool } from "@/actions/school-players";
import { toast } from "sonner";

interface PlayersTableProps {
  players: any[];
  categories: any[];
  positions: any[];
  onRefresh: () => void;
}

export function PlayersTable({ players, categories, positions, onRefresh }: PlayersTableProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [playerToDelete, setPlayerToDelete] = useState<{ id: string; name: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (player: any) => {
    setSelectedPlayer(player);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (playerId: string, playerName: string) => {
    setPlayerToDelete({ id: playerId, name: playerName });
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!playerToDelete) return;

    setDeletingId(playerToDelete.id);
    setConfirmModalOpen(false);
    
    try {
      const result = await removePlayerFromSchool(playerToDelete.id);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success || "Jugador eliminado exitosamente");
        onRefresh();
      }
    } catch (error) {
      toast.error("Error al eliminar jugador");
    } finally {
      setDeletingId(null);
      setPlayerToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Número de Jugadores ({players.length})
            </h2>
          </div>
          <Button
            onClick={() => setAddModalOpen(true)}
            className="bg-primary-500 hover:bg-primary-700 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Jugador
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          {players.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <UserPlus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay jugadores registrados
              </h3>
              <p className="text-gray-500 mb-6">
                Comienza agregando jugadores a tu escuela
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Categoría</TableHead>
                  <TableHead className="font-semibold">Posiciones</TableHead>
                  <TableHead className="font-semibold">Pie Pref.</TableHead>
                  <TableHead className="font-semibold text-center">Goles</TableHead>
                  <TableHead className="font-semibold text-center">Asistencias</TableHead>
                  <TableHead className="font-semibold text-center">Partidos</TableHead>
                  <TableHead className="font-semibold text-center">Verificado</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{player.user.name}</TableCell>
                    <TableCell className="text-gray-600">{player.user.email}</TableCell>
                    <TableCell>
                      {player.category ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                          {player.category.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {player.positions && player.positions.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {player.positions.map((pos: any) => (
                            <span
                              key={pos.id}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {pos.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {player.preferredFoot ? (
                        <span className="text-sm text-gray-900">
                          {player.preferredFoot === 'RIGHT' ? 'Derecho' : 
                           player.preferredFoot === 'LEFT' ? 'Izquierdo' : 
                           player.preferredFoot === 'BOTH' ? 'Ambos' : '-'}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-gray-900">{player.goals}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-gray-900">{player.assists}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold text-gray-900">{player.matchesPlayed}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {player.schoolVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verificado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pendiente
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(player)}
                          className="hover:bg-primary-50 hover:text-primary-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(player.id, player.user.name)}
                          disabled={deletingId === player.id}
                          className="hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <AddPlayerModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={onRefresh}
      />

      {selectedPlayer && (
        <EditPlayerModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSuccess={onRefresh}
          player={selectedPlayer}
          categories={categories}
          positions={positions}
        />
      )}

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setPlayerToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Eliminar Jugador"
        description={`¿Estás seguro de que deseas eliminar a ${playerToDelete?.name || 'este jugador'} de tu escuela? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        confirmVariant="danger"
        isLoading={deletingId !== null}
      />
    </>
  );
}
