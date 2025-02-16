import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function fetchEtablissements() {
  try {
    const etablissements = await prisma.etablissement.findMany();

    return NextResponse.json(etablissements);
  } catch (error) {
    console.error("Error fetching etablissements:", error);
    return NextResponse.json({ error: "Failed to fetch data from database" });
  }
}

export async function deleteEtablissement(id: string) {
  try {
    await prisma.etablissement.delete({
      where: {
        id: id,
      },
    });

    return { message: "Etablissement deleted successfully" };
  } catch (error) {
    console.error("Error deleting etablissement:", error);
    return { error: "Failed to delete etablissement" };
  }
}

export async function updateEtablissement(updatedEtablissement: {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: string;
  adresse: string;
}) {
  try {
    const etablissement = await prisma.etablissement.update({
      where: { id: updatedEtablissement.id },
      data: {
        nom: updatedEtablissement.nom,
        ville: updatedEtablissement.ville,
        contact: updatedEtablissement.contact,
        fax: updatedEtablissement.fax,
        adresse: updatedEtablissement.adresse,
      },
    });

    return {
      message: "Etablissement updated successfully",
      data: etablissement,
    };
  } catch (error) {
    console.error("Error updating etablissement:", error);
    return { error: "Failed to update etablissement" };
  }
}

export async function addEtablissement(newEtablissement: {
  nom: string;
  ville: string;
  contact: string;
  fax: string;
  adresse: string;
}) {
  try {
    const etablissement = await prisma.etablissement.create({
      data: newEtablissement,
    });

    return { message: "Etablissement added successfully", data: etablissement };
  } catch (error) {
    console.error("Error adding etablissement:", error);
    return { error: "Failed to add etablissement" };
  }
}

export async function fetchEtablissementById(id: string) {
  try {
    const etablissement = await prisma.etablissement.findUnique({
      where: {
        id: id,
      },
    });

    if (!etablissement) {
      throw new Error("Etablissement not found");
    }

    return etablissement;
  } catch (error) {
    console.error("Error fetching etablissement by ID:", error);
    throw error;
  }
}