-- CreateTable
CREATE TABLE "school_posts" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "mediaType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "school_posts_school_id_idx" ON "school_posts"("school_id");

-- CreateIndex
CREATE INDEX "school_posts_createdAt_idx" ON "school_posts"("createdAt");

-- AddForeignKey
ALTER TABLE "school_posts" ADD CONSTRAINT "school_posts_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "school_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
