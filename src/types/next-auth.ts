import { Utilisateur } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: Utilisateur;
    }

    interface User extends Utilisateur {}
}
