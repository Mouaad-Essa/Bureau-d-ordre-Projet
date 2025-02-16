import {NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";


export async function fetchArrivees() {
    try {
        const arrivees = await prisma.arrivee.findMany({
            include: {
                expediteur: true,
                traitePar: true,
                fichiers: true
            }
        });
        return NextResponse.json(arrivees);
    } catch {
        return NextResponse.json({error: "Échec de la récupération des arrivées"});
    }
}

export async function deleteArrivee(id: string) {
    try {
        await prisma.arrivee.delete({
            where: {id},
        });

        return {message: "Arrivée supprimée avec succès"};
    } catch (error) {
        console.error("Erreur lors de la suppression de l'arrivée:", error);
        return {error: "Échec de la suppression de l'arrivée"};
    }
}

export async function updateArrivee(updatedArrivee: {
    id: string;
    idOrdre?: string;
    dateArv: string;
    dateOrigin: string;
    expediteurId: string;
    objet: string;
    numero: string;
    nbrFichier: number;
    typeSupport?: string;
    typeCourrier?: string;
    traiteParId?: string
}) {
    try {
        const arrivee = await prisma.arrivee.update({
            where: {id: updatedArrivee.id},
            data: updatedArrivee,
        });

        return {message: "Arrivée mise à jour avec succès", data: arrivee};
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'arrivée:", error);
        return {error: "Échec de la mise à jour de l'arrivée"};
    }
}

export async function addArrivee(newArrivee: {
    idOrdre?: string;
    dateArv: string;
    dateOrigin: string;
    expediteurId: string;
    objet: string;
    numero: string;
    nbrFichier: number;
    typeSupport?: string;
    typeCourrier?: string;
    traiteParId?: string
}) {

    const courrier = {
        id: newArrivee.idOrdre + newArrivee.dateArv.toString()
    }
    await prisma.courrier.create({
        data: courrier
    })

    try {

        const arrivee = await prisma.arrivee.create({
            data: {
                ...
                    newArrivee,
                courrierId: courrier.id
            }
        });

        return {message: "Arrivée ajoutée avec succès", data: arrivee};
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'arrivée:", error);
        return {error: "Échec de l'ajout de l'arrivée"};
    }
}

export async function fetchArriveeById(id: string) {
    try {
        const arrivee = await prisma.arrivee.findUnique({
            where: {id},
            include: {
                expediteur: true,
                traitePar: true,
                fichiers: true,
                courrier: true
            }

        });

        if (!arrivee) {
            throw new Error("Arrivée non trouvée");
        }

        return arrivee;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arrivée par ID:", error);
        throw error;
    }
}