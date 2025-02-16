import {NextResponse} from "next/server";
import {fetchLogs} from "@/src/services/logService";

export async function GET() {
    try {
        const response = await fetchLogs(); // Fetch data using the server action
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch logs" }),
            { status: 500 }
        );
    }
}