import { NextResponse } from "next/server";

// server action fetching
export async function fetchRoles() {
  try {
    const response = await fetch(
      "https://679b8f7333d3168463244f7f.mockapi.io/api/uni/roles"
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
export async function deleteRole(id: string) {
  try {
    const response = await fetch(
      `https://679b8f7333d3168463244f7f.mockapi.io/api/uni/roles/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete role");
    }
    return { message: "role deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete role" };
  }
}

// server action update etab
export async function updateRole(updatedRole: {
    id: string;
    role: string;
    nom: string;
    description: string;
}) {
  try {
    const response = await fetch(
      `https://679b8f7333d3168463244f7f.mockapi.io/api/uni/roles/${updatedRole.id}`,
      {
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRole),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update role");
    }

    const data = await response.json();
    return data; // Return updated Role data
  } catch (error) {
    console.error(error);
    return { error: "Failed to update role" };
  }
}

// server action to add a new etablissement
export async function addRole(newRole: {
    id: string;
    role: string;
    nom: string;
    description: string;
}) {
  try {
    const response = await fetch(
      "https://679b8f7333d3168463244f7f.mockapi.io/api/uni/roles",
      {
        method: "POST", // Use POST to add
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add Role");
    }

    const data = await response.json();
    return { message: "Role added successfully", data }; // Return the added Role data
  } catch (error) {
    console.error(error);
    return { error: "Failed to add role" };
  }
}

export async function fetchRoleById(id: string) {
  try {
    const response = await fetch(
      `https://679b8f7333d3168463244f7f.mockapi.io/api/uni/roles/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch role");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    throw error;
  }
}