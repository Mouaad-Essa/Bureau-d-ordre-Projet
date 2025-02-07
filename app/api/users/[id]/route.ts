import {
  updatePersonalInfo,
  updatePassword,
  fetchUserById,
} from "@/app/actions/usersActions";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Extract data from the request body
    const {
      userId,
      updateType,
      nom,
      prenom,
      email,
      telephone,
      newPassword,
      confirmPassword,
    } = await request.json();

    // Check for userId
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "ID utilisateur manquant" }),
        { status: 400 }
      );
    }

    // Ensure the user is updating their own information
    if (userId !== params.id) {
      return new Response(
        JSON.stringify({
          error:
            "Vous ne pouvez pas mettre à jour les informations d'un autre utilisateur",
        }),
        { status: 403 }
      );
    }

    // If updating personal info
    if (updateType === "personalInfo") {
      if (!nom || !prenom || !email || !telephone) {
        return new Response(
          JSON.stringify({ error: "Veuillez fournir toutes les informations" }),
          { status: 400 }
        );
      }

      // Call the updatePersonalInfo function
      const result = await updatePersonalInfo(userId, {
        nom,
        prenom,
        email,
        telephone,
      });
      return new Response(JSON.stringify(result), { status: result.status });
    }

    // If updating password
    if (updateType === "password") {
      if (!newPassword || !confirmPassword) {
        return new Response(
          JSON.stringify({
            error: "Veuillez fournir les nouveaux mots de passe",
          }),
          { status: 400 }
        );
      }

      // Call the updatePassword function
      const result = await updatePassword(userId, newPassword, confirmPassword);
      return new Response(JSON.stringify(result), { status: result.status });
    }

    // If no valid updateType is provided
    return new Response(
      JSON.stringify({ error: "Type de mise à jour non valide" }),
      { status: 400 }
    );
  } catch (error) {
    console.error("PUT request error:", error);
    return new Response(JSON.stringify({ error: "Échec de la mise à jour" }), {
      status: 500,
    });
  }
}

// get user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch the user by ID using the fetchUserById function
    const result = await fetchUserById(params.id);

    // Check if the user is found
    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: result.status,
      });
    }

    // Return the user data
    return new Response(JSON.stringify(result.data), { status: result.status });
  } catch (error) {
    console.error("GET request error:", error);
    return new Response(JSON.stringify({ error: "Échec de la récupération" }), {
      status: 500,
    });
  }
}
