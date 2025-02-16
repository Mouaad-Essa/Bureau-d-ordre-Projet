import {Field} from "@/src/components/auth-form";

export const signInFields: Field[] = [
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
        required: true,
        description: "Enter your email address."
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        description: "Le mot de passe doit contenir au moins 8 caractères."
    }
]

export const signUpFields: Field[] = [
    {
        name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Full Name",
        required: true,
        description: "Entrez votre nom complet."
    },
    ...signInFields
]