/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `player_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `school_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "player_profiles" DROP COLUMN "avatarUrl";

-- AlterTable
ALTER TABLE "school_profiles" DROP COLUMN "logoUrl";
