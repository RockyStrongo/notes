/*
  Warnings:

  - Added the required column `title` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "title" TEXT NOT NULL;
