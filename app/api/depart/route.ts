import {
    fetchDeparts,
    deleteDepart,
    updateDepart,
    addDepart,
  } from "../../actions/departActions";
  
  // Gérer la requête GET pour récupérer tous les départs
  export async function GET() {
    try {
      return await fetchDeparts(); // Récupération des données via l'action serveur
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch departs" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête DELETE pour supprimer un départ par ID
  export async function DELETE(request: Request) {
    try {
      // Lire l'ID depuis le corps de la requête
      const { id } = await request.json();
  
      // Appeler la fonction deleteDepart depuis les actions
      const result = await deleteDepart(id);
  
      // Retourner le résultat de la suppression
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to delete depart" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête PUT pour mettre à jour un départ
  export async function PUT(request: Request) {
    try {
      // Lire les données mises à jour depuis le corps de la requête
      const updatedDepart = await request.json();
  
      // Appeler la fonction updateDepart depuis les actions
      const result = await updateDepart(updatedDepart);
  
      // Retourner le résultat de la mise à jour
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to update depart" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête POST pour ajouter un nouveau départ
  export async function POST(request: Request) {
    try {
      // Lire les données du nouveau départ depuis le corps de la requête
      const newDepart = await request.json();
  
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
  