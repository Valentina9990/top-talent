import { getPlayers, getPositions } from "@/data/player";
import FeedClient from "./FeedClient";

export default async function ParaEscuelasPage() {
  const [players, positions] = await Promise.all([
    getPlayers(),
    getPositions(),
  ]);

  return <FeedClient initialPlayers={players} positions={positions} />;
}