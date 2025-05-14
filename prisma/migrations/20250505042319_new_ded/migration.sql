/*
  Warnings:

  - You are about to drop the column `interviewFeedbackId` on the `Interview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_interviewFeedbackId_fkey";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "interviewFeedbackId";
