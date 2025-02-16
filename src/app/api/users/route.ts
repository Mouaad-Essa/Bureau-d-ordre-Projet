
import {fetchUsers , deleteUser , updateUser } from "@/src/services/usersService";

export async function GET() {
  try {
    return await fetchUsers();
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, currentUser } = await request.json();

    const result = await deleteUser(id, currentUser);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user" }),
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedUser = await request.json();
    const result = await updateUser(updatedUser);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 }
    );
  }
}
