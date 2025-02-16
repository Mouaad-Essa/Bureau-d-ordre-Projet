import React from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import Navbar from "@/src/components/navbar";

export default async function AuthLayout({children}: { children: React.ReactNode }) {
    const session = await auth()
    if (!session?.user) {
        redirect('/sign-in')
    }
    return (
        <div className="w-screen my-14">
            <Navbar/>
            <div className="p-5">
                {
                    children
                }
            </div>
        </div>
    )
}