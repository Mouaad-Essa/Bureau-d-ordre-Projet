import {
  fetchUsers,
  deleteUser,
  updateUser,
} from "../../actions/usersActions";

// Handle GET request to fetch all Users
export async function GET() {
  try {
    return await fetchUsers(); // Fetch data using the server action
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete an User by ID
export async function DELETE(request: Request) {
  try {
    // Read the ID from the request body
    const { id } = await request.json();

    // Call the deleteUser function from the actions
    const result = await deleteUser(id);

    // Return the result of the deletion
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user" }),
      { status: 500 }
    );
  }
}

// Handle PUT request to update an User
export async function PUT(request: Request) {
  try {
    // Parse the updated User data from the request body
    const updatedUser = await request.json();
    // Call the updateUser function from the actions
    const result = await updateUser(updatedUser);

    // Return the result of the update
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 }
    );
  }
}

// Handle POST request to add a new User
// export async function POST(request: Request) {
//   try {
//     // Parse the new User data from the request body
//     const newUser = await request.json();

//     // Call the addUser function from the actions to add the new User
//     const result = await addUser(newUser);

//     // Return the result of the addition
//     return new Response(JSON.stringify(result), { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ error: "Failed to add user" }),
//       { status: 500 }
//     );
//   }
// }