
import { fetchPoleById } from "../../../actions/polesActions";


// Handle GET request to fetch a single division by ID
export async function GET(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    console.log(id);
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }
    // Fetch the division details using the server action
    const pole = await fetchPoleById(id);

    return new Response(JSON.stringify(pole), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch pole" }), {
      status: 500,
    });
  }
}
