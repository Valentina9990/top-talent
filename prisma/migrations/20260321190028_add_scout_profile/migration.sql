-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'SCOUT';

-- CreateTable
CREATE TABLE "scout_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "fullName" TEXT,
    "primaryPhone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "department_id" TEXT,
    "city_id" TEXT,
    "yearsExperience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scout_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scout_profiles_user_id_key" ON "scout_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "scout_profiles" ADD CONSTRAINT "scout_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_profiles" ADD CONSTRAINT "scout_profiles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_profiles" ADD CONSTRAINT "scout_profiles_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
