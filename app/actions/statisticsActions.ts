// Define the structure of the statistics data
interface StatisticsData {
  lettresArrivees: number;
  lettresDeparts: number;
  monthlyStats: { month: string; arrivees: number; departs: number }[];
}

const API_URL = "/api/statistics";

// Fetch statistics for a given user
export async function fetchStatistics(
  userId: string
): Promise<StatisticsData | { error: string }> {
  try {
    // Fetch statistics from the API
    const response = await fetch(`${API_URL}?userId=${userId}`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    // Parse and return the JSON response
    const data: StatisticsData = await response.json();
    return data; // Just return the data
  } catch (error) {
    console.error("Error fetching statistics:", error);
    // Return a consistent error structure
    return { error: "Failed to fetch statistics" };
  }
}
