import {z} from "zod";

export const signInSchema = z.object({
    email: z
        .string({required_error: "Veuillez entrer votre adresse email",})
        .email({message: "Veuillez entrer une valide adresse email",}),
    password: z
        .string({required_error: "Veuillez entrer votre mot de passe",})
        .min(8, {message: "Le mot de passe doit contenir au moins 8 caractères",}),
});

export const signInDefaultValues = {
    email: "",
    password: "",
}
