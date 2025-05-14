-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "jobDesc" TEXT NOT NULL,
    "interviewDuration" TEXT NOT NULL,
    "interviewType" TEXT[],
    "questions" TEXT[],
    "userEmail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interview_userEmail_key" ON "Interview"("userEmail");
