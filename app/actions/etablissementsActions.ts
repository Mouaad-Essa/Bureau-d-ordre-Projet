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