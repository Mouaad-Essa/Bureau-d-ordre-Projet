"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // Ensure your Prisma instance is correctly set up

// Fetch all poles
export async function fetchPoles() {
  try {
    const poles = await prisma.pole.findMany({
      select: {
        id: true,
        nom: true,
        description: true,
        divisions: {
          select: {
            nom: true,
          },
        },
      },
    });

    return NextResponse.json(poles);
  } catch (error) {
    console.error("Failed to fetch poles:", error);
    return NextResponse.json({ error: "Failed to fetch poles" });
  }
}

// Fetch a single pole by ID
export async function fetchPoleById(id: string) {
  try {
    const pole = await prisma.pole.findUnique({
      where: { id },
      include: { divisions: true }, // Include related divisions if needed
    });

    if (!pole) {
      return NextResponse.json({ error: "Pole not found" }, { status: 404 });
    }

    return NextResponse.json(pole);
  } catch (error) {
    console.error("Error fetching pole by ID:", error);
    return NextResponse.json({ error: "Failed to fetch pole" });
  }
}

// Add a new pole
export async function addPole(newPole: {
  nom: string;
  description?: string;
}) {

  try {
    const createdPole = await prisma.pole.create({
      data: newPole,
    });

    return { message: "Pole added successfully", data: createdPole };
  } catch (error) {
    console.error("Error adding pole:", error);
    return { error: "Failed to add pole" };
  }
}

// Update a pole
export async function updatePole(updatedPole: {
  id: string;
  nom: string;
  description?: string;
}) {
  try {
    const updated = await prisma.pole.update({
      where: { id: updatedPole.id },
      data: {
        nom: updatedPole.nom,
        description: updatedPole.description,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating pole:", error);
    return NextResponse.json({ error: "Failed to update pole" });
  }
}

// Delete a pole
export async function deletePole(id: string) {
  try {
    await prisma.pole.delete({
      where: { id },
    });

    return { message: "Pole deleted successfully" };
  } catch (error) {
    console.error("Error deleting pole:", error);
    return { error: "Failed to delete pole" };
  }
}
