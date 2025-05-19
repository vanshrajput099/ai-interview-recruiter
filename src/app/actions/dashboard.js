import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";

export const getInterviews = async () => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const dashBoardInterviews = await db.interview.findMany({
            where: {
                userEmail: user.email
            }
        });

        return dashBoardInterviews;
    } catch (error) {
        throw error;
    }
}