import {
  fetchServices,
  deleteService,
  updateService,
  addService,
} from "../../actions/servicesActions";

// Handle GET request to fetch all Services
export async function GET() {
  try {
    return await fetchServices(); // Fetch data using the server action
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch services" }),
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete an Service by ID
export async function DELETE(request: Request) {
  try {
    // Read the ID from the request body
    const { id } = await request.json();

    // Call the deleteService function from the actions
    const result = await deleteService(id);

    // Return the result of the deletion
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to delete service" }),
      { status: 500 }
    );
  }
}

// Handle PUT request to update an Service
export async function PUT(request: Request) {
  try {
    // Parse the updated Service data from the request body
    const updatedService = await request.json();

    // Call the updateService function from the actions
    console.log(updatedService);
    const result = await updateService(updatedService);

    // Return the result of the update
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update service" }),
      { status: 500 }
    );
  }
}

// Handle POST request to add a new Service
export async function POST(request: Request) {
  try {
    // Parse the new Service data from the request body
    const newService = await request.json();

    // Call the addService function from the actions to add the new Service
    const result = await addService(newService);

    // Return the result of the addition
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to add service" }),
      { status: 500 }
    );
  }
}