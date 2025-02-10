import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer tous les départs
export async function fetchDeparts() {
  try {
    const departs = await prisma.depart.findMany({
      include:{
        fichiers:true,
        signePar:true,
        traitePar:true,
        destination:true
      }
    });
    return NextResponse.json(departs);
  } catch (error) {
    console.error("Erreur lors de la récupération des départs:", error);
    return NextResponse.json({ error: "Échec de la récupération des départs" });
  }
}

// Supprimer un départ par ID
export async function deleteDepart(id: string) {
  try {
    await prisma.depart.delete({
      where: { id },
    });

    return { message: "Départ supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression du départ:", error);
    return { error: "Échec de la suppression du départ" };
  }
}



// Ajouter un nouveau départ
export async function addDepart(newDepart: {
  signeParId: string;
  traiteParId: string;
  numOrdre: string;
  dateDepart: string;
  objet: string;
  destinationId: string;
  nbrFichier: number;

}) {
  try {
    const depart = await prisma.depart.create({
      data: {
        signeParId: newDepart.signeParId,
        traiteParId: newDepart.traiteParId,
        numOrdre: newDepart.numOrdre,
        dateDepart: newDepart.dateDepart,
        objet: newDepart.objet,
        destinationId: newDepart.destinationId,
        nbrFichier: newDepart.nbrFichier,
      }
        
    });

    return { message: "Départ ajouté avec succès", data: depart };
  } catch (error) {
    console.error("Erreur lors de l'ajout du départ:", error);
    return { error: "Échec de l'ajout du départ" };
  }
}

// Récupérer un départ par ID
export async function fetchDepartById(id: string) {
  try {
    const depart = await prisma.depart.findUnique({
      where: { id },
    });

    if (!depart) {
      throw new Error("Départ non trouvé");
    }

    return depart;
  } catch (error) {
    console.error("Erreur lors de la récupération du départ par ID:", error);
    throw error;
  }
}
