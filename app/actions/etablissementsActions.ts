import { NextResponse } from "next/server";

// server action fetching
import { prisma } from "@/lib/prisma"; // Import the Prisma instance

// Server action fetching data from MySQL
export async function fetchEtablissements() {
  try {
    const etablissements = await prisma.etablissement.findMany(); // Fetch data

    return NextResponse.json(etablissements); // Return JSON response
  } catch (error) {
    console.error("Error fetching etablissements:", error);
    return NextResponse.json({ error: "Failed to fetch data from database" });
  }
}

// Server action to delete an etablissement by id
export async function deleteEtablissement(id: string) {
  try {
    // Use Prisma to delete the Etablissement by its `id`
    await prisma.etablissement.delete({
      where: {
        id: id, // The `id` is used to identify which etablissement to delete
      },
    });

    return { message: "Etablissement deleted successfully" };
  } catch (error) {
    console.error("Error deleting etablissement:", error);
    return { error: "Failed to delete etablissement" };
  }
}

// Server action to update an existing etablissement
export async function updateEtablissement(updatedEtablissement: {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: string; // Prisma expects a string, so we'll convert it
  adresse: string;
}) {
  try {
    const etablissement = await prisma.etablissement.update({
      where: { id: updatedEtablissement.id },
      data: {
        nom: updatedEtablissement.nom,
        ville: updatedEtablissement.ville,
        contact: updatedEtablissement.contact,
        fax: updatedEtablissement.fax, // Convert `fax` to string
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

// Server action to add a new etablissement
export async function addEtablissement(newEtablissement: {
  nom: string;
  ville: string;
  contact: string;
  fax: string;
  adresse: string;
}) {
  try {
    const etablissement = await prisma.etablissement.create({
      data: newEtablissement, // Insert into MySQL
    });

    return { message: "Etablissement added successfully", data: etablissement };
  } catch (error) {
    console.error("Error adding etablissement:", error);
    return { error: "Failed to add etablissement" };
  }
}

// Server action to fetch an etablissement by id
export async function fetchEtablissementById(id: string) {
  try {
    // Use Prisma to fetch the Etablissement by its `id`
    const etablissement = await prisma.etablissement.findUnique({
      where: {
        id: id, // The `id` is used to identify the etablissement
      },
    });

    if (!etablissement) {
      throw new Error("Etablissement not found");
    }

    return etablissement; // Return the fetched etablissement
  } catch (error) {
    console.error("Error fetching etablissement by ID:", error);
    throw error; // Throw error for further handling
  }
}