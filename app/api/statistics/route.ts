import { NextResponse } from "next/server";

// Define the statistics data type
interface StatisticsData {
  lettresArrivees: number;
  lettresDeparts: number;
  monthlyStats: { month: string; arrivees: number; departs: number }[];
}

// Static statistics data
const statisticsData: StatisticsData = {
  lettresArrivees: 120,
  lettresDeparts: 80,
  monthlyStats: [
    { month: "Janv.", arrivees: 30, departs: 20 },
    { month: "Févr.", arrivees: 25, departs: 15 },
    { month: "Mars", arrivees: 20, departs: 18 },
    { month: "Avr.", arrivees: 22, departs: 17 },
    { month: "Mai", arrivees: 15, departs: 10 },
    { month: "Juin", arrivees: 8, departs: 5 },
    { month: "Juil.", arrivees: 12, departs: 8 },
    { month: "Août", arrivees: 18, departs: 14 },
    { month: "Sept.", arrivees: 14, departs: 11 },
    { month: "Oct.", arrivees: 10, departs: 15 },
    { month: "Nov.", arrivees: 20, departs: 18 },
    { month: "Déc.", arrivees: 30, departs: 25 },
  ],
};

// API route handler
export async function GET() {
  try {
    return NextResponse.json(statisticsData);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    // Return a consistent response with error included
    return NextResponse.json(
      {
        error: "Failed to fetch statistics",
        lettresArrivees: 0,
        lettresDeparts: 0,
        monthlyStats: [],
      },
      { status: 500 }
    );
  }
}
