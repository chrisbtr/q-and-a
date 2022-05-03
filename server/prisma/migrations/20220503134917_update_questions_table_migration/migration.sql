/*
  Warnings:

  - Added the required column `createdAt` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" 
ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "editedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER;

UPDATE "questions"
SET "createdAt" = NOW();

UPDATE "questions"
SET "userId" = 1;

ALTER TABLE "questions"
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
