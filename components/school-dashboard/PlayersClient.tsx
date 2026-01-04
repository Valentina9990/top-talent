"use client";

import { useState, useEffect } from "react";
import { PlayersTable } from "@/components/school-dashboard/PlayersTable";
import { Loader2 } from "lucide-react";

interface PlayersClientProps {
  initialPlayers: any[];
  categories: any[];
  positions: any[];
}

export function PlayersClient({ initialPlayers, categories, positions }: PlayersClientProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      window.location.reload();
    } catch (error) {
      console.error("Error refreshing:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <PlayersTable 
      players={players} 
      categories={categories}
      positions={positions}
      onRefresh={handleRefresh}
    />
  );
}
