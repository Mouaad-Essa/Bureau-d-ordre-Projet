import { Result } from "postcss";
import {
    
    addEnvoi,
  } from "../../actions/envoiActions";
  

  

 
  
  // Gérer la requête POST pour ajouter une nouvelle arrivée
  export async function POST(request: Request) {
    try {
      // Lire les données de la nouvelle arrivée depuis le corps de la requête
      // console.log(request.body);
      const newEnvoi = await request.json();
      
    //   console.log(newEnvoi);
      // Appeler la fonction addArrivee depuis les actions
      const result = await addEnvoi(newEnvoi);
      console.log(result.message);
      // Retourner le résultat de l'ajout
      return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
      console.error("ERROR: " + error);
      return new Response(JSON.stringify({ error: "Failed to add Envoi" }), {
        status: 500,
      });
    }
  }
  