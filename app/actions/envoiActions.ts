import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure your Prisma instance is correctly set up




export async function fetchEnvois() {
  try {
    const poles = await prisma.envoi.findMany({
      select: {
        id: true,
        
        courrierId: true,
        createdAt:true,
        destinataire:true,
        destinataireId:true,
        expediteur:true,
        expediteurId:true,
        note:true,
        courrier:{
          include:{
            arrivee: {
              include:{
                expediteur:true
              }
            }
            
          },
        },
        
      },
    });

    return NextResponse.json(poles);
  } catch (error) {
    console.error("Failed to fetch Envois:", error);
    return NextResponse.json({ error: "Failed to fetch Envoi" });
  }
}
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
  