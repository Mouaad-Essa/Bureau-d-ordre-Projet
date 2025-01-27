import {
    fetchEtablissements,
    deleteEtablissement,
  } from "../../actions/etablissementsActions";
  
  // Handle GET request to fetch all etablissements
  export async function GET() {
    try {
      return await fetchEtablissements(); // Fetch data using the server action
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch etablissements" }),
        { status: 500 }
      );
    }
  }
  
  // Handle DELETE request to delete an etablissement by ID
  export async function DELETE(request: Request) {
    try {
      // Read the ID from the request body
      const { id } = await request.json();
  
      // Call the deleteEtablissement function from the actions
      const result = await deleteEtablissement(id);
  
      // Return the result of the deletion
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to delete etablissement" }),
        { status: 500 }
      );
    }
  }