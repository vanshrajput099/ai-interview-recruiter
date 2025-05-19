"use server";
import OpenAI from "openai"
import { feedbackPROMPT, PROMPT } from "../data/data";
import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const generateInterviewQuestions = async (data) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPEN_AI_API,
        });

        const newPrompt = PROMPT.replace("{{jobTitle}}", data.jobPosition)
            .replace("{{jobDescription}}", data.jobDesc)
            .replace("{{duration}}", data.interviewDuration)
            .replace("{{type}}", data.interviewType);

        const completion = await openai.chat.completions.create({
            model: "google/gemma-3-27b-it:free",
            messages: [
                { role: "user", content: newPrompt }
            ],
        });

        const res = completion.choices[0].message;
        return res;
    } catch (error) {
        throw error;
    }
};

export const addInterview = async (data, formData) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const subscription = await db.subscription.findUnique({
            where: {
                email: user.email
            }
        })

        if (!subscription) {
            throw new Error("Subscription Not Found");
        }

        if (subscription.credits <= 0) {
            throw new Error("You Cant Add More Interviews, Buy New Subscription");
        }

        const questionsData = data.map(question => ({
            question: question.question,
            type: question.type || null
        }));

        let returnData;

        await db.$transaction(async (tx) => {
            const newInterview = await tx.interview.create({
                data: {
                    userEmail: user.email,
                    jobPosition: formData.jobPosition,
                    jobDesc: formData.jobDesc,
                    interviewDuration: formData.interviewDuration,
                    interviewType: formData.interviewType,
                    validTill: formData.validTill,
                    questions: {
                        create: questionsData
                    }
                }
            });

            const subscriptionUpdate = await tx.subscription.update({
                where: { email: user.email },
                data: {
                    credits: subscription.credits - 1
                }
            })

            returnData = newInterview;
        })

        return returnData;

    } catch (error) {
        throw error;
    }
}

export const getInterviewDetails = async (id) => {
    try {
        const interviewData = await db.interview.findUnique({
            where: {
                id: id
            }
        });

        return interviewData;
    } catch (error) {
        throw error;
    }
}

export const getQuestions = async (interviewId) => {
    try {
        const res = await db.question.findMany({
            where: {
                interviewId
            }
        });

        return res;
    } catch (error) {
        throw error;
    }
}

export const setFeedback = async (conversation, username, userEmail, interviewId) => {
    try {
        const final = feedbackPROMPT.replace("{{conversation}}", JSON.stringify(conversation));

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPEN_AI_API,
        });

        const completion = await openai.chat.completions.create({
            model: "google/gemma-3-27b-it:free",
            messages: [
                { role: "user", content: final }
            ],
        });

        const res = completion.choices[0].message;

        const finalContent = res.content.replace('```json', '').replace('```', '');

        const newInterviewFeedback = await db.interviewFeedback.create({
            data: {
                username,
                userEmail,
                feedback: finalContent,
                interviewId
            }
        })

        return newInterviewFeedback;
    } catch (error) {
        throw error;
    }
}

export const getCandidates = async (interviewId) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const feedback = await db.interviewFeedback.findMany({
            where: {
                interviewId
            }
        });

        return feedback;
    } catch (error) {
        throw error;
    }
}

export const getUserFeedback = async (interviewId, userEmail) => {
    try {
        const feedbacks = await db.interviewFeedback.findUnique({
            where: {
                interviewId,
                userEmail
            }
        });

        return feedbacks;
    } catch (error) {
        throw error;
    }
}

export const checkUserFeedBackExist = async (interviewId, userEmail) => {
    try {
        const feedback = await db.interviewFeedback.findUnique({
            where: {
                interviewId,
                userEmail
            }
        });

        if (feedback) {
            return true;
        }

        return false;
    } catch (error) {
        throw error;
    }
}

export const getFeedback = async (interviewId) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const feedbacks = await db.interviewFeedback.findMany({
            where: {
                interviewId
            }
        });

        return feedbacks;
    } catch (error) {
        throw error;
    }
}
