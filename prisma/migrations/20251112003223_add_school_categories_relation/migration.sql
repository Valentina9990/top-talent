/*
  Warnings:

  - You are about to drop the column `availableCategories` on the `school_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "school_profiles" DROP COLUMN "availableCategories";

-- CreateTable
CREATE TABLE "_SchoolCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SchoolCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SchoolCategories_B_index" ON "_SchoolCategories"("B");

-- AddForeignKey
ALTER TABLE "_SchoolCategories" ADD CONSTRAINT "_SchoolCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolCategories" ADD CONSTRAINT "_SchoolCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "school_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
