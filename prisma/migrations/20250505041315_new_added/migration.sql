/*
  Warnings:

  - Added the required column `interviewFeedbackId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "interviewFeedbackId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewFeedbackId_fkey" FOREIGN KEY ("interviewFeedbackId") REFERENCES "InterviewFeedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
