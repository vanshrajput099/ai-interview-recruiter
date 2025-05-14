/*
  Warnings:

  - Added the required column `validTill` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "validTill" TIMESTAMP(3) NOT NULL;
