"use server";

import {signIn} from "@/auth";
import {SignInResponse} from "next-auth/react";


export async function credentialsAuth<T>(values: T): Promise<SignInResponse> {
    return signIn("credentials", {
        redirect: false,
        ...values,
    });
}