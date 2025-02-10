import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BureauOrdreDashboard() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-6 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Tableau de Bord</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button>Ajouter un courrier</Button>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par état" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processed">Traité</SelectItem>
                <SelectItem value="closed">Clôturé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Expéditeur</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>État</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>12345</TableCell>
                <TableCell>Service A</TableCell>
                <TableCell>Département B</TableCell>
                <TableCell>En attente</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
