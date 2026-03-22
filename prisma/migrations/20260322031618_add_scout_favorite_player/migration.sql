-- CreateTable
CREATE TABLE "scout_contacted_players" (
    "id" TEXT NOT NULL,
    "scout_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scout_contacted_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scout_favorite_players" (
    "id" TEXT NOT NULL,
    "scout_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scout_favorite_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scout_contacted_players_scout_id_player_id_key" ON "scout_contacted_players"("scout_id", "player_id");

-- CreateIndex
CREATE UNIQUE INDEX "scout_favorite_players_scout_id_player_id_key" ON "scout_favorite_players"("scout_id", "player_id");

-- AddForeignKey
ALTER TABLE "scout_contacted_players" ADD CONSTRAINT "scout_contacted_players_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "scout_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_contacted_players" ADD CONSTRAINT "scout_contacted_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_favorite_players" ADD CONSTRAINT "scout_favorite_players_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "scout_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_favorite_players" ADD CONSTRAINT "scout_favorite_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
