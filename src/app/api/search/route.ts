import {NextRequest, NextResponse} from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const etablissement = searchParams.get("etablissement");
    const objet = searchParams.get("objet");

    try {
        let results;
        if (type === "Arrivées") {
            results = await prisma.arrivee.findMany({
                where: {
                    dateArv: {
                        gte: fromDate ? new Date(fromDate) : undefined,
                        lte: toDate ? new Date(toDate) : undefined,
                    },
                    expediteur: {
                        nom: {
                            contains: etablissement!,
                        },
                    },
                    objet: {
                        contains: objet!,
                    },
                },
                include: {
                    expediteur: true,
                    traitePar: true,
                },
            });
        } else if (type === "Départs") {
            results = await prisma.depart.findMany({
                where: {
                    dateDepart: {
                        gte: fromDate ? new Date(fromDate) : undefined,
                        lte: toDate ? new Date(toDate) : undefined,
                    },
                    destination: {
                        nom: {
                            contains: etablissement!,
                        },
                    },
                    objet: {
                        contains: objet!,
                    },
                },
                include: {
                    destination: true,
                    signePar: true,
                },
            });
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}