import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer tous les services
export async function fetchServices() {
  try {
    const services = await prisma.service.findMany(
      {
      include:{
        division:true,
      },
    }
  );
  console.log(services);
    return NextResponse.json(services);
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return NextResponse.json({ error: "Échec de la récupération des services" });
  }
}

// Supprimer un service par ID
export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });

    return { message: "Service supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression du service:", error);
    return { error: "Échec de la suppression du service" };
  }
}

// Mettre à jour un service existant
export async function updateService(updatedService: {
  id: string;
  nom?: string;
  description?: string;
  divisionId?: string;
}) 

{
  try {
    const service = await prisma.service.update({
      where: { id: updatedService.id },
      data: updatedService,
    });

    return { message: "Service mis à jour avec succès", data: service };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service:", error);
    return { error: "Échec de la mise à jour du service" };
  }
}

// Ajouter un nouveau service
export async function addService(newService: {
  nom: string;
  description?: string;
  divisionId?: string;
}) {
  try {
    const service = await prisma.service.create({
      data: newService,
    });

    return { message: "Service ajouté avec succès", data: service };
  } catch (error) {
    console.error("Erreur lors de l'ajout du service:", error);
    return { error: "Échec de l'ajout du service" };
  }
}

// Récupérer un service par ID
export async function fetchServiceById(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error("Service non trouvé");
    }

    return service;
  } catch (error) {
    console.error("Erreur lors de la récupération du service par ID:", error);
    throw error;
  }
}
