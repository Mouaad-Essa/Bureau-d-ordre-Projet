import {prisma} from "@/src/lib/prisma";

export const userService = {
    findByEmail: async (email: string) =>
        prisma.utilisateur.findUnique({
            where: {
                email
            },
            include: {
                role: true
            }
        })
}