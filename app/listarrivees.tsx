import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListArrivees() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-6xl shadow-lg p-6 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Liste des Arrivées</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Expéditeur</th>
                <th className="border p-2">Objet</th>
                <th className="border p-2">Trier par</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">2024-10-{index + 1}</td>
                  <td className="border p-2">Expéditeur {index + 1}</td>
                  <td className="border p-2">Objet {index + 1}</td>
                  <td className="border p-2">Responsable {index + 1}</td>
                  <td className="border p-2 space-x-2">
                    <Button className="bg-blue-500 text-white">Voir</Button>
                    <Button className="bg-yellow-500 text-white">Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
