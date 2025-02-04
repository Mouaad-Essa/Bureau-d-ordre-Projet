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
export async function deleteRole(roleId: string) {
  try {
    if (!roleId) {
      return { error: "Role ID is required", status: 400 };
    }

    // ✅ Step 1: Delete all relations in `role_Privilege`
    await prisma.role_Privilege.deleteMany({
      where: { idRole: roleId },
    });

    // ✅ Step 2: Delete the role itself
    const deletedRole = await prisma.role.delete({
      where: { id: roleId },
    });

    return { success: true, deletedRole };
  } catch (error) {
    console.error("❌ Delete Role Error:", error);
    return { error: "Failed to delete role", status: 500 };
  }
}

// server action update etab
export async function updateRole(updatedRole: {
  id: string;
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

  // ✅ Validate required fields
  if (!updatedRole.nom) {
    return { error: "Le champ 'nom' est obligatoire.", status: 400 };
  }

  try {
    // ✅ Step 1: Update the role details
    const updated = await prisma.role.update({
      where: { id: updatedRole.id },
      data: {
        nom: updatedRole.nom,
        description: updatedRole.description,
      },
    });

    if (!updated) {
      return { error: "Role update failed", status: 500 };
    }

    // ✅ Step 2: Define privileges
    const privileges = [
      { nom: "canView", value: updatedRole.privileges.canView },
      { nom: "canEditEstablishment", value: updatedRole.privileges.canEditEstablishment },
      { nom: "canCreateDepart", value: updatedRole.privileges.canCreateDepart },
      { nom: "canCreateArrive", value: updatedRole.privileges.canCreateArrive },
      { nom: "isSuperAdmin", value: updatedRole.privileges.isSuperAdmin },
    ];

    // ✅ Step 3: Ensure privileges exist in the privilege table
    const privilegeIds = await Promise.all(
      privileges.map(async (privilege) => {
        let privilegeRecord = await prisma.privilege.findUnique({
          where: { nom: privilege.nom },
        });

        if (!privilegeRecord) {
          privilegeRecord = await prisma.privilege.create({
            data: { nom: privilege.nom },
          });
        }

        return privilege.value ? privilegeRecord.id : null; // Only return IDs for true values
      })
    );

    // ✅ Step 4: Remove existing privileges for the role
    await prisma.role_Privilege.deleteMany({
      where: { idRole: updatedRole.id },
    });

    // ✅ Step 5: Link only the selected privileges to the role
    const rolePrivilegesToCreate = privilegeIds
      .filter((id) => id !== null) // Remove null values (unchecked privileges)
      .map((idPrv) => ({
        idRole: updatedRole.id,
        idPrv: idPrv!,
      }));

    if (rolePrivilegesToCreate.length > 0) {
      await prisma.role_Privilege.createMany({
        data: rolePrivilegesToCreate,
      });
    }

    return { success: true, role: updated };
  } catch (error) {
    console.error("❌ Update Role Error:", error);
    return { error: "Failed to update role", status: 500 };
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
    // ✅ Step 1: Create the new role
    const createdRole = await prisma.role.create({
      data: {
        nom: newRole.nom, // Use newRole.nom instead of newRole.role
        description: newRole.description,
      },
    });

    if (!createdRole) {
      return { error: "Role creation failed", status: 500 };
    }

    // ✅ Step 2: Define privileges
    const privileges = [
      { nom: "canView", value: newRole.privileges.canView },
      { nom: "canEditEstablishment", value: newRole.privileges.canEditEstablishment },
      { nom: "canCreateDepart", value: newRole.privileges.canCreateDepart },
      { nom: "canCreateArrive", value: newRole.privileges.canCreateArrive },
      { nom: "isSuperAdmin", value: newRole.privileges.isSuperAdmin },
    ];

    // ✅ Step 3: Ensure privileges exist in the privilege table
    const privilegeIds = await Promise.all(
      privileges.map(async (privilege) => {
        let privilegeRecord = await prisma.privilege.findUnique({
          where: { nom: privilege.nom },
        });

        if (!privilegeRecord) {
          privilegeRecord = await prisma.privilege.create({
            data: { nom: privilege.nom },
          });
        }

        return privilege.value ? privilegeRecord.id : null; // Only return IDs for true values
      })
    );

    // ✅ Step 4: Link only the selected privileges to the new role
    const rolePrivilegesToCreate = privilegeIds
      .filter((id) => id !== null) // Remove null values (unchecked privileges)
      .map((idPrv) => ({
        idRole: createdRole.id,
        idPrv: idPrv!,
      }));

    if (rolePrivilegesToCreate.length > 0) {
      await prisma.role_Privilege.createMany({
        data: rolePrivilegesToCreate,
      });
    }

    return { success: true, role: createdRole };
  } catch (error) {
    console.error("❌ Create Role Error:", error);
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