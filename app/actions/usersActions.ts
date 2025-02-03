import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function fetchUsers() {
  try {
    // Fetch users directly from Mysql using Prisma
    const users = await prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        tel: true,
        serviceId: true,
        service: {
          select: {
            nom: true
          }
        },
        roleId: true,
        role: {
          select: {
            nom: true,
          }
        }
      }
    });

    const transformedUsers = users.map(user => ({
      ...user,
      service: user.service?.nom || '',
      role: user.role?.nom || '',
      telephone: user.tel,
    }));

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users from database" },
      { status: 500 }
    );
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

// server action update user
export async function updateUser(updatedUserObj: {
  id: string;  // Changed to number
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  serviceId: string | null;
  service: string | null  // Allow null
  role: string | null;
  roleId: string | null;
}) {
  try {
  const updated = await prisma.utilisateur.update({
    where: { id: updatedUserObj.id },
    data: {
      nom: updatedUserObj.nom,
      prenom: updatedUserObj.prenom,
      email: updatedUserObj.email,
      tel: updatedUserObj.telephone,
      serviceId: updatedUserObj.serviceId ? updatedUserObj.serviceId : null,
      roleId: updatedUserObj.roleId ? updatedUserObj.roleId : null,
    },
    include: {
      service: {
        select: {
          nom: true
        }
      },
      role: {
        select: {
          nom: true
        }
      }
    }
  });

  if (!updated) {
    return { error: "User update failed", status: 500 };
  }

  // Transform the response to include service name
  const responseData = {
    ...updated,
    service: updated.service?.nom || '',
    role: updated.role?.nom || ''
  };

  return responseData;
  
} catch (error) {
  console.error("Update error:", error);
  return { error: "Failed to update user", status: 500 };
}
}

// server action to add a new etablissement
export async function addUser(newUserObj: {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
  serviceId: string | null;
  roleId: string | null;
}) {
  try {
    // ✅ Hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(newUserObj.password, 10);
    // Create a new user in the database
    const createdUser = await prisma.utilisateur.create({
      data: {
        nom: newUserObj.nom,
        prenom: newUserObj.prenom,
        email: newUserObj.email, 
        tel: newUserObj.telephone,
        password: hashedPassword,
        serviceId: newUserObj.serviceId ? newUserObj.serviceId : null,
        roleId: newUserObj.roleId ? newUserObj.roleId : null,
      },
    });

    if (!createdUser) {
      return { error: "User creation failed", status: 500 };
    }

    // Transform the response to include service and role names
    const responseData = {
      ...createdUser,
      password: undefined,
    };

    return responseData;
  } catch (error) {
    console.error("Create User Error:", error);
    return { error: "Failed to create user", status: 500 };
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