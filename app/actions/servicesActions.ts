import { NextResponse } from "next/server";

// server action fetching
export async function fetchServices() {
  try {
    const response = await fetch(
      "https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/services"
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
export async function deleteService(id: string) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/services/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
    return { message: "Service deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete Service" };
  }
}

// server action update etab
export async function updateService(updatedService: {
  id: string;
  nom: string;
  division: string;
  description: string;
}) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/services/${updatedService.id}`,
      {
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    const data = await response.json();
    return data; // Return updated service data
  } catch (error) {
    console.error(error);
    return { error: "Failed to update service" };
  }
}

// server action to add a new etablissement
export async function addService(newService: {
    nom: string;
    division: string;
    description: string;
}) {
  try {
    const response = await fetch(
      "https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/services",
      {
        method: "POST", // Use POST to add
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add service");
    }

    const data = await response.json();
    return { message: "Service added successfully", data }; // Return the added service data
  } catch (error) {
    console.error(error);
    return { error: "Failed to add service" };
  }
}

export async function fetchServiceById(id: string) {
  try {
    const response = await fetch(
      `https://679aa202747b09cdcccf5f08.mockapi.io/api/uni/services/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
}