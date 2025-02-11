import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure your Prisma instance is correctly set up


export async function addEnvoi(newEnvoi: {
    expediteurId: string;
    destinataireId: string;
    note:string;
    courrierId:string,
    createdAt:string
  }) {
    try {
      const createdEnvoi = await prisma.envoi.create({
        data: newEnvoi
      });
  
      return { message: "Envoi added successfully", data: createdEnvoi };
    } catch (error) {
      console.error("Error adding Envoi:", error);
      return { error: "Failed to add Envoi" };
    }
  }
  