import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {compare} from "bcryptjs";
import {signInSchema} from "@/src/lib/zod/schemas";
import {userService} from "@/src/services/userService";
import {Utilisateur} from "@prisma/client";
import {AdapterUser} from "@auth/core/adapters";

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const { email, password } = await signInSchema.parseAsync(credentials);

                const user = await userService.findByEmail(email);

                if (!user) {
                    return null;
                }

                const passwordValid = await compare(password, user.password!);

                if (!passwordValid) {
                    return null;
                }

                if (user.role?.nom !== "Admin") {
                    return null;
                }

                return {
                    ...user,
                    id: user.id.toString(),
                };
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user as Utilisateur;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as AdapterUser & Utilisateur;
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
});