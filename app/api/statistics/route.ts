import { NextResponse } from "next/server";
import { fetchStatistics } from "../../actions/statisticsActions";

export async function GET() {
  try {
    const statistics = await fetchStatistics(); // Fetch statistics

    if (!statistics || !statistics.monthlyStats) {
      console.error("No valid statistics data returned:", statistics);
      return NextResponse.json(
        { error: "No valid statistics found" },
        { status: 500 }
      );
    }

    return NextResponse.json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
