import { fetchDivisionById } from "../../../actions/divisionsActions";

// Handle GET request to fetch a single division by ID
export async function GET(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes `/api/divisions/:id` route

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    // Fetch the division details using the server action
    const division = await fetchDivisionById(id);

    // Return the division details
    return new Response(JSON.stringify(division), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch division" }), {
      status: 500,
    });
  }

}

