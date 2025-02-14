import { prisma } from "@/lib/prisma"; // Make sure Prisma is properly set up

// Fetch the total count of received and sent mails
export async function fetchTotalMails() {
  try {
    const lettresArrivees = await prisma.arrivee.count();
    const lettresDeparts = await prisma.depart.count();

    return { lettresArrivees, lettresDeparts };
  } catch (error) {
    console.error("Failed to fetch total mails:", error);
    throw new Error("Failed to fetch total mails");
  }
}

// Fetch monthly statistics (grouped by month)
export async function fetchMonthlyStats() {
  try {
    const monthlyStats = await prisma.$queryRaw<
      { month: string; arrivees: number; departs: number }[]
    >`
      SELECT 
        DATE_FORMAT(dateArv, '%Y-%m') AS month, 
        COUNT(*) AS arrivees, 
        (SELECT COUNT(*) FROM Depart WHERE DATE_FORMAT(dateDepart, '%Y-%m') = DATE_FORMAT(A.dateArv, '%Y-%m')) AS departs
      FROM Arrivee A
      GROUP BY month, A.dateArv
      ORDER BY month ASC;
    `;

    // Convert BigInt values to strings
    return monthlyStats.map((stat) => ({
      month: stat.month,
      arrivees: stat.arrivees.toString(),
      departs: stat.departs.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch monthly statistics:", error);
    throw new Error("Failed to fetch monthly statistics");
  }
}

// Main function to fetch both total counts and monthly stats
export async function fetchStatistics() {
  try {
    const totalMails = await fetchTotalMails();
    const monthlyStats = await fetchMonthlyStats();

    return {
      ...totalMails,
      monthlyStats,
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
}
