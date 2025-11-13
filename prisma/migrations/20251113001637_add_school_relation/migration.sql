-- AlterTable
ALTER TABLE "player_profiles" ADD COLUMN     "schoolVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "school_id" TEXT;

-- AddForeignKey
ALTER TABLE "player_profiles" ADD CONSTRAINT "player_profiles_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "school_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
