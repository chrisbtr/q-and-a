/*
  Warnings:

  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "lastName" VARCHAR(255) NOT NULL;
