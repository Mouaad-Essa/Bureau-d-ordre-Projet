import {
  fetchEtablissements,
  deleteEtablissement,
  updateEtablissement,
  addEtablissement,
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

// Handle PUT request to update an etablissement
export async function PUT(request: Request) {
  try {
    // Parse the updated etablissement data from the request body
    const updatedEtablissement = await request.json();

    // Call the updateEtablissement function from the actions
    const result = await updateEtablissement(updatedEtablissement);

    // Return the result of the update
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update etablissement" }),
      { status: 500 }
    );
  }
}

// Handle POST request to add a new etablissement
export async function POST(request: Request) {
  try {
    // Parse the new etablissement data from the request body
    const newEtablissement = await request.json();

    // Call the addEtablissement function from the actions to add the new etablissement
    const result = await addEtablissement(newEtablissement);

    // Return the result of the addition
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to add etablissement" }),
      { status: 500 }
    );
  }
}
