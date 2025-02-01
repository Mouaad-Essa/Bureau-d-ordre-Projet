import { NextResponse } from "next/server";

const API_URL = "https://679d162b87618946e65452c7.mockapi.io/arrivee"; // Modifier l'URL pour les arrivées

// Récupérer toutes les arrivées
export async function fetchArrivees() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch arrivees");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch arrivees" });
  }
}

// Récupérer une arrivée par ID
export async function fetchArriveeById(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch arrivee");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching arrivee by ID:", error);
    throw error;
  }
}

// Ajouter une nouvelle arrivée
export async function addArrivee(newArrivee: {
  objet: string;
  expediteur: string;
  dateReception: string;
  statut: string;
  trierPar:string
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArrivee),
    });

    if (!response.ok) {
      throw new Error("Failed to add arrivee");
    }

    const data = await response.json();
    return { message: "Arrivee added successfully", data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add arrivee" };
  }
}

// Mettre à jour une arrivée
export async function updateArrivee(updatedArrivee: {
  id: string;
  objet: string;
  expediteur: string;
  dateReception: string;
  statut: string;
  trierPar:string;
}) {
  try {
    const response = await fetch(`${API_URL}/${updatedArrivee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArrivee),
    });

    if (!response.ok) {
      throw new Error("Failed to update arrivee");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update arrivee" };
  }
}

// Supprimer une arrivée
export async function deleteArrivee(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete arrivee");
    }
    return { message: "Arrivee deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete arrivee" };
  }
}
