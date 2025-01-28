import { NextResponse } from "next/server";

// server action fetching
export async function fetchEtablissements() {
  try {
    const response = await fetch(
      "https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/etablissements"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return NextResponse.json(data); // Return data to client
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}

// server action delete etab
export async function deleteEtablissement(id: string) {
  try {
    const response = await fetch(
      `https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/etablissements/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete etablissement");
    }
    return { message: "Etablissement deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete etablissement" };
  }
}

// server action update etab
export async function updateEtablissement(updatedEtablissement: {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
}) {
  try {
    const response = await fetch(
      `https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/etablissements/${updatedEtablissement.id}`,
      {
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEtablissement),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update etablissement");
    }

    const data = await response.json();
    return data; // Return updated etablissement data
  } catch (error) {
    console.error(error);
    return { error: "Failed to update etablissement" };
  }
}

// server action to add a new etablissement
export async function addEtablissement(newEtablissement: {
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
}) {
  try {
    const response = await fetch(
      "https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/etablissements",
      {
        method: "POST", // Use POST to add
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEtablissement),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add etablissement");
    }

    const data = await response.json();
    return { message: "Etablissement added successfully", data }; // Return the added etablissement data
  } catch (error) {
    console.error(error);
    return { error: "Failed to add etablissement" };
  }
}
