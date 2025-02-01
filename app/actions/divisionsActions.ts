import { NextResponse } from "next/server";

const API_URL = "https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/division";


// server action fetching
export async function fetchDivisions() {
  try {
    const response = await fetch(
      API_URL // Replace with your actual API URL
    );


    if (!response.ok) {
      throw new Error("Failed to fetch divisions");
    }
    const data = await response.json();

    return NextResponse.json(data); // Return data to client
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch divisions" });

  }
}

// Fetch a single division by ID
export async function fetchDivisionById(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch division");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching division by ID:", error);
    throw error;
  }
}

// Add a new division
export async function addDivision(newDivision: {
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
      body: JSON.stringify(newDivision),
    });

    if (!response.ok) {
      throw new Error("Failed to add division");
    }

    const data = await response.json();
    return { message: "Division added successfully", data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add division" };
  }
}

// Update a division
export async function updateDivision(updatedDivision: {
  id: string;
  nom: string;
  description: string;
  responsableId: string;
  bureauId: string;
  statut: string;
}) {
  try {
    const response = await fetch(`${API_URL}/${updatedDivision.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDivision),
    });

    if (!response.ok) {
      throw new Error("Failed to update division");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update division" };
  }
}

// Delete a division
export async function deleteDivision(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete division");
    }
    return { message: "Division deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete division" };
  }

}

