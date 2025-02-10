import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function CreateCourrier() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-4xl shadow-lg p-6 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Créer un Courrier Arrivé</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-arrivee">Date d'Arrivée</Label>
                <Input id="date-arrivee" type="datetime-local" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="id-annee">ID et Année</Label>
                <Input id="id-annee" type="text" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Calendar id="date" />
              </div>
              <div>
                <Label htmlFor="numero">Numéro</Label>
                <Input id="numero" type="text" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="expediteur">Expéditeur</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un Expéditeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exp1">Expéditeur 1</SelectItem>
                  <SelectItem value="exp2">Expéditeur 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="objet">Objet</Label>
              <Input id="objet" type="text" className="mt-1" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pieces-jointes">Nombre de pièces jointes</Label>
                <Input id="pieces-jointes" type="number" className="mt-1" required />
              </div>
              <div>
                <Label>Type du support</Label>
                <div className="flex space-x-2">
                  <Checkbox id="papier" /> <Label htmlFor="papier">Papier</Label>
                  <Checkbox id="numerique" /> <Label htmlFor="numerique">Numérique</Label>
                </div>
              </div>
              <div>
                <Label>Type de courrier</Label>
                <div className="flex space-x-2">
                  <Checkbox id="confidentiel" /> <Label htmlFor="confidentiel">Confidentiel</Label>
                  <Checkbox id="urgent" /> <Label htmlFor="urgent">Urgent</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="file">Fiche</Label>
              <input id="file" />
            </div>
            <Button className="w-full">Créer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
