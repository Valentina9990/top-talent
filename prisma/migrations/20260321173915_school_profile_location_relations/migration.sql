/*
  Warnings:

  - You are about to drop the column `city` on the `school_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `school_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "school_profiles" DROP COLUMN "city",
DROP COLUMN "department",
ADD COLUMN     "city_id" TEXT,
ADD COLUMN     "department_id" TEXT;

-- AddForeignKey
ALTER TABLE "school_profiles" ADD CONSTRAINT "school_profiles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_profiles" ADD CONSTRAINT "school_profiles_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
