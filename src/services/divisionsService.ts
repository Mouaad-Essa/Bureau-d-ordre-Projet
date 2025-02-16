import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";


// Fetch all divisions
export async function fetchDivisions() {
  try {
    const divisions = await prisma.division.findMany({
      select: {
        id: true,
        nom: true,
        description: true,
        poleId: true,
        pole: {
          select: {
            nom: true,
          },
        },
      },
    });

    return NextResponse.json(divisions);
  } catch (error) {
    console.error("Failed to fetch divisions:", error);
    return NextResponse.json({ error: "Failed to fetch divisions" });
  }
}

// Fetch a single division by ID
export async function fetchDivisionById(id: string) {
  try {
    const division = await prisma.division.findUnique({
      where: { id },
      include: { pole: true, services: true }, // Include related data if needed
    });

    if (!division) {
      return NextResponse.json(
        { error: "Division not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(division);
  } catch (error) {
    console.error("Error fetching division by ID:", error);
    return NextResponse.json({ error: "Failed to fetch division" });
  }
}

// Add a new division
export async function addDivision(newDivision: {
  nom: string;
  description?: string;
  poleId?: string;
}) {
  try {
    const createdDivision = await prisma.division.create({
      data: newDivision,
    });

    return { message: "Division added successfully", data: createdDivision };
  } catch (error) {
    console.error("Error adding division:", error);
    return { error: "Failed to add division" };
  }
}

// Update a division
export async function updateDivision(updatedDivision: {
  id: string;
  nom: string;
  description?: string;
  poleId?: string;
}) {
  try {
    const updated = await prisma.division.update({
      where: { id: updatedDivision.id },
      data: {
        nom: updatedDivision.nom,
        description: updatedDivision.description,
        poleId: updatedDivision.poleId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating division:", error);
    return NextResponse.json({ error: "Failed to update division" });
  }
}

// Delete a division
export async function deleteDivision(id: string) {
  try {
    await prisma.division.delete({
      where: { id },
    });

    return { message: "Division deleted successfully" };
  } catch (error) {
    console.error("Error deleting division:", error);
    return { error: "Failed to delete division" };
  }
}
