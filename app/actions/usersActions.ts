import { NextResponse } from "next/server";

// server action fetching
export async function fetchUsers() {
  try {
    const response = await fetch(
      "https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/users"
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
export async function deleteUser(id: string) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete user" };
  }
}

// server action update etab
export async function updateUser(updatedUser: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    service: string;
}) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/users/${updatedUser.id}`,
      {
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data; // Return updated User data
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user" };
  }
}

// server action to add a new etablissement
export async function addUser(newUser: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    service: string;
}) {
  try {
    const response = await fetch(
      "https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/users",
      {
        method: "POST", // Use POST to add
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add User");
    }

    const data = await response.json();
    return { message: "User added successfully", data }; // Return the added User data
  } catch (error) {
    console.error(error);
    return { error: "Failed to add User" };
  }
}

export async function fetchUserById(id: string) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/users/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching User by ID:", error);
    throw error;
  }
}