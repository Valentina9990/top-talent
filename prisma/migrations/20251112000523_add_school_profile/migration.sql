-- CreateTable
CREATE TABLE "school_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "officialName" TEXT,
    "nit" TEXT,
    "description" TEXT,
    "mission" TEXT,
    "vision" TEXT,
    "logoUrl" TEXT,
    "department" TEXT,
    "city" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "contactEmail" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "websiteUrl" TEXT,
    "availableCategories" TEXT,
    "approximatePlayers" INTEGER,
    "headCoachName" TEXT,
    "achievements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_profiles_user_id_key" ON "school_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "school_profiles" ADD CONSTRAINT "school_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
