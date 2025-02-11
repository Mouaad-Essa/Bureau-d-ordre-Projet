import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: { id?: string } }) {
  try {
    const { id: roleId } = await context.params; // ✅ Await params properly

    if (!roleId) {
      return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
    }

    // Fetch the role and its privileges
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        privileges: {
          include: {
            privilege: true,
          },
        },
      },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Extract privilege names
    const privileges = role.privileges.map((rp) => rp.privilege.nom);

    return NextResponse.json({
      id: role.id,
      nom: role.nom,
      description: role.description,
      privileges,
    });
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json({ error: "Failed to fetch role" }, { status: 500 });
  }
}