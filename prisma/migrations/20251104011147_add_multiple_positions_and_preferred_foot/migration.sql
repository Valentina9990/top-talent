/*
  Warnings:

  - You are about to drop the column `position_id` on the `player_profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."player_profiles" DROP CONSTRAINT "player_profiles_position_id_fkey";

-- AlterTable
ALTER TABLE "player_profiles" DROP COLUMN "position_id",
ADD COLUMN     "preferredFoot" TEXT;

-- CreateTable
CREATE TABLE "_PlayerPositions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayerPositions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlayerPositions_B_index" ON "_PlayerPositions"("B");

-- AddForeignKey
ALTER TABLE "_PlayerPositions" ADD CONSTRAINT "_PlayerPositions_A_fkey" FOREIGN KEY ("A") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerPositions" ADD CONSTRAINT "_PlayerPositions_B_fkey" FOREIGN KEY ("B") REFERENCES "positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
