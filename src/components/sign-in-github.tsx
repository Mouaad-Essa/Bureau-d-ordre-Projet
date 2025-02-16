
import { signIn } from "@/auth"

export default function SignInGithub() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button type="submit">Signin with Github</button>
        </form>
    )
}