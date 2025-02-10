import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function ListEtablissements() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-6xl shadow-lg p-6 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Liste des Établissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button className="bg-green-500 text-white">Ajouter un Établissement</Button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Ville</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Fax</th>
                <th className="border p-2">Adresse</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">Nom {index + 1}</td>
                  <td className="border p-2">Ville {index + 1}</td>
                  <td className="border p-2">Contact {index + 1}</td>
                  <td className="border p-2">Fax {index + 1}</td>
                  <td className="border p-2">Adresse {index + 1}</td>
                  <td className="border p-2 space-x-2">
                    <Button className="bg-blue-500 text-white">Voir</Button>
                    <Button className="bg-yellow-500 text-white">Modifier</Button>
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
