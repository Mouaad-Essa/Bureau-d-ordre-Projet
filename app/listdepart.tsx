import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const CourriersDepart = () => {
  const courriers = [
    {
      id: "1202-25/2024",
      date: "2024-12-24 15:03:00",
      objet: "Réponse de Demande d'ouverture de Master en Génie Energétique",
      destineA: "ENSA - UCD",
      signePar: "SAHABI MOHAMED",
      traitePar: "secrétaire général",
    },
    {
      id: "3774-24/2024",
      date: "2024-11-26 15:24:16",
      objet: "التقنية النهائية الخاصة بنتائج الامتحانات الفصلية",
      destineA: "FLSH - UCD",
      signePar: "GM",
      traitePar: "admin",
    },
    {
      id: "2300-22/2024",
      date: "2024-11-10 12:00:00",
      objet: "Appel à candidature : Master Spécialisé 'Instrumentation'",
      destineA: "FS - UCD",
      signePar: "AZIM AZ EDDINE",
      traitePar: "président",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Courriers Départs</h1>
      <Card className="mb-6">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Rechercher un courrier..."
              className="w-1/3"
            
            />
            <Button variant="default">Créer Nouveau Départ</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>N° BO</TableCell>
                <TableCell>Date BO</TableCell>
                <TableCell>Objet</TableCell>
                <TableCell>Destiné à</TableCell>
                <TableCell>Signé par</TableCell>
                <TableCell>Traité par</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courriers.map((courrier, index) => (
                <TableRow key={index}>
                  <TableCell>{courrier.id}</TableCell>
                  <TableCell>{courrier.date}</TableCell>
                  <TableCell>{courrier.objet}</TableCell>
                  <TableCell>{courrier.destineA}</TableCell>
                  <TableCell>{courrier.signePar}</TableCell>
                  <TableCell>{courrier.traitePar}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourriersDepart;
