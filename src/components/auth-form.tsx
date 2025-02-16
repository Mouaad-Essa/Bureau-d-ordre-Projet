"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {
    DefaultValues,
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form";
import {Button} from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {GithubIcon} from "lucide-react";
import Link from "next/link";
import {signInSchema} from "@/src/lib/zod/schemas";
import {toast} from "sonner";
import {credentialsAuth} from "@/src/services/authService";
import {useRouter} from "next/navigation";

export type Field = {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    description?: string;
};

type AuthOptions = {
    enabled: boolean;
    handler: () => void;
};

interface Props<T extends FieldValues> {
    defaultValues: T;
    fields: Field[];
    type: "signin" | "signup";
    auth?: {
        credentials?: AuthOptions;
        oauth?: {
            github?: AuthOptions;
            google?: AuthOptions;
        };
    };
}

export default function AuthForm<T extends FieldValues>({
                                                            type,
                                                            defaultValues,
                                                            fields,
                                                            auth,
                                                        }: Props<T>) {

    const router = useRouter()

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: defaultValues as DefaultValues<T>,
    });

    const handleSubmit: SubmitHandler<T> = async (values: T) => {
        try {
            const response = await credentialsAuth<T>(values);

            if (response?.error) {
                toast.error(response.error);
            } else {
                router.push("/dashboard");
                toast.success(type === "signin" ? "L'authentification a réussi" : "Votre compte a été créé");
            }
        } catch {
            toast.error("Un problème est survenu lors de la connexion");
        }
    };


    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                    {type === "signup" ? "Créer un compte" : "Se connecter"}
                </CardTitle>
                <CardDescription>
                    connectez-vous pour une meilleure expérience
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div
                    className={`grid gap-6 ${
                        auth?.oauth?.google?.enabled && auth?.oauth?.github?.enabled
                            ? "grid-cols-2"
                            : "grid-cols-1"
                    }`}
                >
                    {auth?.oauth?.google?.enabled && (
                        <Button
                            onClick={auth?.oauth?.google.handler}
                            className="flex items-center justify-center space-x-2"
                        >
                            <GithubIcon className="w-6 h-6"/>
                            Google
                        </Button>
                    )}
                    {auth?.oauth?.github?.enabled && (
                        <Button
                            className="flex items-center justify-center space-x-2"
                            onClick={auth?.oauth?.github.handler}
                        >
                            <GithubIcon className="w-6 h-6"/>
                            GitHub
                        </Button>
                    )}
                </div>
                {auth?.oauth && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                  Et pour continuer avec
              </span>
                        </div>
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                name={field.name}
                                render={({field: formField}) => (
                                    <FormItem>
                                        <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                {...formField}
                                            />
                                        </FormControl>
                                        {field.description && (
                                            <FormDescription>{field.description}</FormDescription>
                                        )}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full">
                            {type === "signup" ? "Creez un compte" : "Se connecter"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}