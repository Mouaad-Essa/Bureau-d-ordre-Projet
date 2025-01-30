import { fetchServiceById } from "../../../actions/servicesActions";

// Handle GET request to fetch a single service by ID
export async function GET(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes `/api/services/:id` route

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    // Fetch the service details using the server action
    const service = await fetchServiceById(id);

    // Return the service details
    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch service" }),
      { status: 500 }
    );
  }
}