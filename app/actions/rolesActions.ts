import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// server action fetching
export async function fetchRoles() {
  try {
    const response = await prisma.role.findMany();
    return NextResponse.json(response);
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
  role: string;
  nom: string;
  description: string;
  privileges: {
    canView: boolean;
    canEditEstablishment: boolean;
    canCreateDepart: boolean;
    canCreateArrive: boolean;
    isSuperAdmin: boolean;
  };
}) {
  try {
    // ✅ Create the new role in the role table
    const createdRole = await prisma.role.create({
      data: {
        nom: newRole.role,
        description: newRole.description,
      },
    });

    if (!createdRole) {
      return { error: "Role creation failed", status: 500 };
    }

    // ✅ Add missing privileges if they don't exist
    const privileges = [
      { nom: "canView", value: newRole.privileges.canView },
      { nom: "canEditEstablishment", value: newRole.privileges.canEditEstablishment },
      { nom: "canCreateDepart", value: newRole.privileges.canCreateDepart },
      { nom: "canCreateArrive", value: newRole.privileges.canCreateArrive },
      { nom: "isSuperAdmin", value: newRole.privileges.isSuperAdmin },
    ];

    // Check and create privileges if they don't exist
    for (const privilege of privileges) {
      const existingPrivilege = await prisma.privilege.findFirst({
        where: { nom: privilege.nom },
      });

      if (!existingPrivilege) {
        // If privilege does not exist, create it
        await prisma.privilege.create({
          data: {
            nom: privilege.nom,
          },
        });
      }
    }

    // ✅ Link privileges to the new role in the role_privilege table
    for (const privilege of privileges) {
      const privilegeRecord = await prisma.privilege.findFirst({
        where: { nom: privilege.nom },
      });

      if (privilegeRecord && privilege.value) {
        await prisma.role_Privilege.create({
          data: {
            idRole: createdRole.id,
            idPrv: privilegeRecord.id,
          },
        });
      }
    }

    // Return the newly created role
    return createdRole;
  } catch (error) {
    console.error("Create Role Error:", error);
    return { error: "Failed to create role", status: 500 };
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