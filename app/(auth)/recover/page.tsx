"use client"
import React, { useEffect } from "react";
import { RecoverPasswordForm } from "@/components/recover-form"
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/dashboard");
        }
    }, [router]);
    
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RecoverPasswordForm />
      </div>
    </div>
  )
}