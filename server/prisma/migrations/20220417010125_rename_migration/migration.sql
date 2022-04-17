/*
  Warnings:

  - You are about to drop the column `question_id` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `category_code` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `is_answered` on the `questions` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryCode` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAnswered` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- ALTER TABLE "answers" DROP CONSTRAINT "fk_question_id";

-- DropForeignKey
-- ALTER TABLE "questions" DROP CONSTRAINT "fk_category_code";

-- AlterTable
-- ALTER TABLE "answers" DROP COLUMN "question_id",
-- ADD COLUMN     "questionId" INTEGER NOT NULL;
ALTER TABLE "answers" 
RENAME COLUMN "question_id" TO "questionId";

-- AlterTable
-- ALTER TABLE "questions" DROP COLUMN "category_code",
-- DROP COLUMN "is_answered",
-- ADD COLUMN     "categoryCode" VARCHAR(100) NOT NULL,
-- ADD COLUMN     "isAnswered" BOOLEAN NOT NULL;
ALTER TABLE "questions" 
RENAME COLUMN "category_code" TO "categoryCode";

ALTER TABLE "questions" 
RENAME COLUMN "is_answered" TO "isAnswered";

-- AddForeignKey
-- ALTER TABLE "answers" ADD CONSTRAINT "fk_question_id" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
-- ALTER TABLE "questions" ADD CONSTRAINT "fk_category_code" FOREIGN KEY ("categoryCode") REFERENCES "categories"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
