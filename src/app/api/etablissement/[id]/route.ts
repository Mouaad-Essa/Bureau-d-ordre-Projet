
// Handle GET request to fetch a single etablissement by ID
import {fetchEtablissementById} from "@/src/services/etablissementService";

export async function GET(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes `/api/etablissements/:id` route

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    // Fetch the etablissement details using the server action
    const etablissement = await fetchEtablissementById(id);

    // Return the etablissement details
    return new Response(JSON.stringify(etablissement), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch etablissement" }),
      { status: 500 }
    );
  }
}
