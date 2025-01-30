import {
  fetchPoleById,
  fetchPoles,
  updatePole,
  deletePole,
  addPole
} from "../../actions/polesActions";

// Handle GET request to fetch all divisions
export async function GET() {
  try {
    return await fetchPoles(); // Fetch data using the server action
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch poles" }),
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a division by ID
export async function DELETE(request: Request) {
  try {
    // Read the ID from the request body
    const { id } = await request.json();

    // Call the deleteDivision function from the actions
    const result = await deletePole(id);

    // Return the result of the deletion
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete pole" }),
      { status: 500 }
    );
  }
}

// Handle PUT request to update a division
export async function PUT(request: Request) {
  try {
    // Parse the updated division data from the request body
    const updatedPole = await request.json();

    // Call the updateDivision function from the actions
    const result = await updatePole(updatedPole);

    // Return the result of the update
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update pole 2" }),
      { status: 500 }
    );
  }
}

// Handle POST request to add a new division
export async function POST(request: Request) {
  try {
    // Parse the new division data from the request body
    const newPole = await request.json();

    // Call the addDivision function from the actions to add the new division
    const result = await addPole(newPole);

    // Return the result of the addition
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add pole" }), {
      status: 500,
    });
  }
}
