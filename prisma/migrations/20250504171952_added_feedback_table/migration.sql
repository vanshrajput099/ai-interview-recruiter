/*
  Warnings:

  - Added the required column `feedback` to the `InterviewFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewFeedback" ADD COLUMN     "feedback" JSONB NOT NULL;
