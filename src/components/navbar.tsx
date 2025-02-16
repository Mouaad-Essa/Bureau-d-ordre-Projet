import Link from "next/link";
import {auth, signOut} from "@/auth";
import {Button} from "@/src/components/ui/button";
import React from "react";
import logo from "@/src/assets/logo.png";
import Image from "next/image";
import {LogOutIcon} from "lucide-react";

export default async function Navbar() {
    const session = await auth();
    const redirectTo = session?.user ? "/dashboard" : "/sign-in";
    return (
        <header className="fixed inset-0 h-20 bg-sky-500 text-white">
            <nav className="flex justify-between items-center h-full px-4">
                <Link href={redirectTo}>
                    <Image src={logo} alt="App Logo" width={80} height={80}/>
                </Link>
                <Link href="/dashboard">
                    Accueil
                </Link>
                <Link href="/dashboard/arrivees">
                    Arrivées
                </Link>
                <Link href="/dashboard/departs">
                    Départs
                </Link>
                <Link href="/dashboard/recherche">
                    Recherche
                </Link>
                <Link href="/dashboard/logs">
                    Logs
                </Link>

                <form action={
                    async () => {
                        "use server"
                        await signOut();
                    }
                }>
                    <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                        <LogOutIcon/>
                    </Button>
                </form>
            </nav>
        </header>
    )
}