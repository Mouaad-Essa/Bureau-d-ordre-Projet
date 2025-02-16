import {fetchDepartById, fetchDeparts, addDepart} from "@/src/services/departService";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (id) {
            const depart = await fetchDepartById(id);
            return new Response(JSON.stringify(depart), {status: 200});
        } else {
            return await fetchDeparts();
        }
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({error: "Failed to fetch departs"}),
            {status: 500}
        );
    }
}


export async function POST(request: Request) {
    try {
        const newDepart = await request.json();

        console.log(newDepart);
        const result = await addDepart(newDepart);

        return new Response(JSON.stringify(result), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Failed to add depart"}), {
            status: 500,
        });
    }
}

