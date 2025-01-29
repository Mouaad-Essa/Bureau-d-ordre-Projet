import {
    fetchDivisions,
    deleteDivision,
    updateDivision,
    addDivision,
  } from "../../actions/divisionsActions";
  
  // Handle GET request to fetch all divisions
  export async function GET() {
    try {
      return await fetchDivisions(); // Fetch data using the server action
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch divisions" }),
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
      const result = await deleteDivision(id);
  
      // Return the result of the deletion
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to delete division" }),
        { status: 500 }
      );
    }
  }
  
  // Handle PUT request to update a division
  export async function PUT(request: Request) {
    try {
      // Parse the updated division data from the request body
      const updatedDivision = await request.json();
  
      // Call the updateDivision function from the actions
      const result = await updateDivision(updatedDivision);
  
      // Return the result of the update
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to update division" }),
        { status: 500 }
      );
    }
  }
  
  // Handle POST request to add a new division
  export async function POST(request: Request) {
    try {
      // Parse the new division data from the request body
      const newDivision = await request.json();
  
      // Call the addDivision function from the actions to add the new division
      const result = await addDivision(newDivision);
  
      // Return the result of the addition
      return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Failed to add division" }), {
        status: 500,
      });
    }
  }