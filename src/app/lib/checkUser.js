import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async () => {

    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        try {
            const checkUserInDB = await db.user.findUnique({
                where: {
                    clerkUserId: user.id
                }
            });


            if (checkUserInDB) {
                return checkUserInDB;
            }

            const name = `${user.firstName} ${user.lastName}`

            const newUser = await db.user.create({
                data: {
                    clerkUserId: user.id,
                    imageUrl: user.imageUrl,
                    email: user.emailAddresses[0].emailAddress,
                    name
                }
            });

            await db.subscription.create({
                data: {
                    email: user.emailAddresses[0].emailAddress,
                    userId: newUser.id
                }
            })

            return newUser;

        } catch (error) {
            throw error;
        }

    } catch (error) {
        throw error;
    }

}