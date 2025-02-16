import {
    addArrivee,
    deleteArrivee,
    fetchArriveeById,
    fetchArrivees,
    updateArrivee
} from "@/src/services/arriveesService";


export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (id) {
            const arrivee = await fetchArriveeById(id);
            return new Response(JSON.stringify(arrivee), {status: 200});
        } else {
            return await fetchArrivees();
        }
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({error: "Failed to fetch arrivees"}),
            {status: 500}
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const {id} = await request.json();

        const result = await deleteArrivee(id);

        return new Response(JSON.stringify(result), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({error: "Failed to delete arrivee"}),
            {status: 500}
        );
    }
}

export async function PUT(request: Request) {
    try {
        const updatedArrivee = await request.json();

        const result = await updateArrivee(updatedArrivee);

        return new Response(JSON.stringify(result), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({error: "Failed to update arrivee"}),
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        const newArrivee = await request.json();

        const result = await addArrivee(newArrivee);
        return new Response(JSON.stringify(result), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Failed to add arrivee"}), {
            status: 500,
        });
    }
}
  