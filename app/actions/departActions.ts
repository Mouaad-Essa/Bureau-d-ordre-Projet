import { NextResponse } from "next/server";

const API_URL = "https://679a5ca9747b09cdccce9eda.mockapi.io/service";

// Récupérer tous les départs
export async function fetchDeparts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch departs");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch departs" });
  }
}

// Récupérer un départ par ID
export async function fetchDepartById(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch depart");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching depart by ID:", error);
    throw error;
  }
}

// Ajouter un nouveau départ
export async function addDepart(newDepart: {
  objet: string;
  destinataire: string;
  dateEnvoi: string;
  statut: string;
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDepart),
    });

    if (!response.ok) {
      throw new Error("Failed to add depart");
    }

    const data = await response.json();
    return { message: "Depart added successfully", data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add depart" };
  }
}

// Mettre à jour un départ
export async function updateDepart(updatedDepart: {
  id: string;
  objet: string;
  destinataire: string;
  dateEnvoi: string;
  statut: string;
}) {
  try {
    const response = await fetch(`${API_URL}/${updatedDepart.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDepart),
    });

    if (!response.ok) {
      throw new Error("Failed to update depart");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update depart" };
  }
}

// Supprimer un départ
export async function deleteDepart(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete depart");
    }
    return { message: "Depart deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete depart" };
  }
}