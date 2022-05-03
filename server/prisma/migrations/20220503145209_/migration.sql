-- AlterTable
ALTER TABLE "Answers" RENAME CONSTRAINT "answers_pkey" TO "Answers_pkey";

-- AlterTable
ALTER TABLE "Categories" RENAME CONSTRAINT "categories_pkey" TO "Categories_pkey";

-- AlterTable
ALTER TABLE "Questions" RENAME CONSTRAINT "questions_pkey" TO "Questions_pkey";

-- AlterTable
ALTER TABLE "User" RENAME CONSTRAINT "user_pkey" TO "User_pkey";

-- RenameForeignKey
ALTER TABLE "Questions" RENAME CONSTRAINT "questions_userId_fkey" TO "Questions_userId_fkey";

-- RenameIndex
ALTER INDEX "user_email_key" RENAME TO "User_email_key";
