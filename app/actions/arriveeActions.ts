import { NextResponse } from "next/server";//-
import { prisma } from "@/lib/prisma"; // Import the correct Prisma client//+

// Récupérer toutes les arrivées//-
export async function fetchArrivees() {//-
  try {//-
    const arrivees = await prisma.arrivee.findMany({
      include:{
        expediteur:true,
        traitePar:true,
        fichiers:true
      }
    });//-
    return NextResponse.json(arrivees);
  } catch (error) {//-
    // console.error("Erreur lors de la récupération des arrivées:", error);//-
    return NextResponse.json({ error: "Échec de la récupération des arrivées" });//-
  }//-
}//-
//-
// Supprimer une arrivée par ID//-
export async function deleteArrivee(id: string) {//-
  try {//-
    await prisma.arrivee.delete({//-
      where: { id },//-
    });//-
//-
    return { message: "Arrivée supprimée avec succès" };//-
  } catch (error) {//-
    console.error("Erreur lors de la suppression de l'arrivée:", error);//-
    return { error: "Échec de la suppression de l'arrivée" };//-
  }//-
}//-
//-
// Mettre à jour une arrivée existante//-
export async function updateArrivee(updatedArrivee: {//-
  id: string;//-
  idOrdre?: string;//-
  dateArv: string;//-
  dateOrigin: string;//-
  expediteurId: string;//-
  objet: string;//-
  numero: string;//-
  nbrFichier: number;//-
  typeSupport?: string;//-
  typeCourrier?: string;//-
  traiteParId?:string
}) {//-
  try {//-
    const arrivee = await prisma.arrivee.update({//-
      where: { id: updatedArrivee.id },//-
      data: updatedArrivee,//-
    });//-
//-
    return { message: "Arrivée mise à jour avec succès", data: arrivee };//-
  } catch (error) {//-
    console.error("Erreur lors de la mise à jour de l'arrivée:", error);//-
    return { error: "Échec de la mise à jour de l'arrivée" };//-
  }//-
}//-
//-
// Ajouter une nouvelle arrivée//-
export async function addArrivee(newArrivee: {//-
  idOrdre?: string;//-
  dateArv: string;//-
  dateOrigin: string;//-
  expediteurId: string;//-
  objet: string;//-
  numero: string;//-
  nbrFichier: number;//-
  typeSupport?: string;//-
  typeCourrier?: string;//-
  traiteParId?:string
}) {//-

  try {//-
    const arrivee = await prisma.arrivee.create({//-
      data: newArrivee,//-
    });//-
//-
    return { message: "Arrivée ajoutée avec succès", data: arrivee };//-
  } catch (error) {//-
    console.error("Erreur lors de l'ajout de l'arrivée:", error);//-
    return { error: "Échec de l'ajout de l'arrivée" };//-
  }//-
}//-
//-
// Récupérer une arrivée par ID//-
export async function fetchArriveeById(id: string) {//-
  try {//-
    const arrivee = await prisma.arrivee.findUnique({//-
      where: { id },//-
    });//-
//-
    if (!arrivee) {//-
      throw new Error("Arrivée non trouvée");//-
    }//-
//-
    return arrivee;//-
  } catch (error) {//-
    console.error("Erreur lors de la récupération de l'arrivée par ID:", error);//-
    throw error;//-
  }//-
}//-
