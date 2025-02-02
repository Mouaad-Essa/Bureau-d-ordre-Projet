import {
    fetchArrivees,
    deleteArrivee,
    updateArrivee,
    addArrivee,
  } from "../../actions/arriveeActions";
  
  // Gérer la requête GET pour récupérer toutes les arrivées
  export async function GET() {
    try {
      return await fetchArrivees(); // Récupération des données via l'action serveur
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch arrivees" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête DELETE pour supprimer une arrivée par ID
  export async function DELETE(request: Request) {
    try {
      // Lire l'ID depuis le corps de la requête
      const { id } = await request.json();
  
      // Appeler la fonction deleteArrivee depuis les actions
      const result = await deleteArrivee(id);
  
      // Retourner le résultat de la suppression
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to delete arrivee" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête PUT pour mettre à jour une arrivée
  export async function PUT(request: Request) {
    try {
      // Lire les données mises à jour depuis le corps de la requête
      const updatedArrivee = await request.json();
  
      // Appeler la fonction updateArrivee depuis les actions
      const result = await updateArrivee(updatedArrivee);
  
      // Retourner le résultat de la mise à jour
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Failed to update arrivee" }),
        { status: 500 }
      );
    }
  }
  
  // Gérer la requête POST pour ajouter une nouvelle arrivée
  export async function POST(request: Request) {
    try {
      // Lire les données de la nouvelle arrivée depuis le corps de la requête
      const newArrivee = await request.json();
  
      // Appeler la fonction addArrivee depuis les actions
      const result = await addArrivee(newArrivee);
  
      // Retourner le résultat de l'ajout
      return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Failed to add arrivee" }), {
        status: 500,
      });
    }
  }
  