import {Alert , AlertTitle , AlertDescription} from "@/src/components/ui/alert";
import {LayoutGridIcon} from "lucide-react";

export default async function DashboardHome(){
    return (
        <div className="container mx-auto flex my-20 w-screen items-center justify-center">
            <Alert>
                <LayoutGridIcon className="h-4 w-4" />
                <AlertTitle>
                    Bienvenue sur votre tableau de bord
                </AlertTitle>
                <AlertDescription>
                    Vous pouvez naviguer entre les différentes sections de l'application en utilisant le menu de navigation au dessus.
                </AlertDescription>
            </Alert>
        </div>
    )
}