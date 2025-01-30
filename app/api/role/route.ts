import {
  fetchRoles,
  deleteRole,
  updateRole,
  addRole,
} from "../../actions/rolesActions";

// Handle GET request to fetch all Roles
export async function GET() {
  try {
    return await fetchRoles(); // Fetch data using the server action
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch roles" }),
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete an Role by ID
export async function DELETE(request: Request) {
  try {
    // Read the ID from the request body
    const { id } = await request.json();

    // Call the deleteRole function from the actions
    const result = await deleteRole(id);

    // Return the result of the deletion
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete role" }),
      { status: 500 }
    );
  }
}

// Handle PUT request to update an Role
export async function PUT(request: Request) {
  try {
    // Parse the updated Role data from the request body
    const updatedRole = await request.json();

    // Call the updateRole function from the actions
    const result = await updateRole(updatedRole);

    // Return the result of the update
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update role" }),
      { status: 500 }
    );
  }
}

// Handle POST request to add a new Role
export async function POST(request: Request) {
  try {
    // Parse the new Role data from the request body
    const newRole = await request.json();

    // Call the addRole function from the actions to add the new Role
    const result = await addRole(newRole);

    // Return the result of the addition
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to add role" }),
      { status: 500 }
    );
  }
}