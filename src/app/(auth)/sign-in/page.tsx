import AuthForm from "@/src/components/auth-form";
import {signInFields} from "@/src/constants";
import {signInDefaultValues} from "@/src/lib/zod/schemas";
import Link from "next/link";

export default function SignIn() {
    return (
        <>
            <div className="relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-sky-900" />
                    <div className="relative z-20 m-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Bienvenue sur la plateforme de Gestion de bureau pour l'université Chouaib Doukkali
                                pour la gestion des courriers.
                            </p>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <AuthForm
                            type="signin"
                            defaultValues={signInDefaultValues}
                            fields={signInFields}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
