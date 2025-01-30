import { NextResponse } from "next/server";

const API_URL = "https://679a5ca9747b09cdccce9eda.mockapi.io/poles";

// Fetch all divisions
export async function fetchPoles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch poles");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch poles" });
  }
}

// Fetch a single division by ID
export async function fetchPoleById(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch pole");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pole by ID:", error);
    throw error;
  }
}

// Add a new division
export async function addPole(newPole: {
  nom: string;
  description: string;
  responsableId: string;
  bureauId: string;
  statut: string;
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPole),
    });

    if (!response.ok) {
      throw new Error("Failed to add pole");
    }

    const data = await response.json();
    return { message: "pole added successfully", data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add pole" };
  }
}

// Update a division
export async function updatePole(updatedPole: {
    id:string;
    nom:string;
    responsable:string;
    tachesPrincipales:string;
    contacts:string;
    statut:string
}) {
  try {
    const response = await fetch(`${API_URL}/${updatedPole.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPole),
      
    });

    if (!response.ok) {

      throw new Error("Failed to update pole ");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update pole" };
  }
}

// Delete a division
export async function deletePole(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete pole");
    }
    return { message: "pole deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete pole" };
  }
}
