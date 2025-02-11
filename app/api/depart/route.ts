import {
    fetchDeparts,
    addDepart,
    fetchDepartById
  } from "../../actions/departActions";
  
  // Gérer la requête GET pour récupérer tous les départs
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Check if 'id' is provided in query params

    if (id) {
      const depart = await fetchDepartById(id);
      return new Response(JSON.stringify(depart), { status: 200 });
    } else {
      return await fetchDeparts(); // Récupération des données via l'action serveur
}
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch departs" }),
      { status: 500 }
    );
  }
}

  // Gérer la requête POST pour ajouter un nouveau départ
  export async function POST(request: Request) {
    try {
      // Lire les données du nouveau départ depuis le corps de la requête
      const newDepart = await request.json();
  
      console.log(newDepart);
      // Appeler la fonction addDepart depuis les actions
      const result = await addDepart(newDepart);
  
      // Retourner le résultat de l'ajout
      return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Failed to add depart" }), {
        status: 500,
      });
    }

  }

