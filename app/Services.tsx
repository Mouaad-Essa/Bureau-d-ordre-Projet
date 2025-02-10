import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

const ServicesList = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Service de la formation initiale", division: "Division de la formation" },
    { id: 2, name: "Service de la formation continue et à distance", division: "Division de la formation" },
    { id: 3, name: "Service des étudiants et de la scolarité", division: "Division des affaires étudiantes" },
  ]);

  const [newService, setNewService] = useState({ name: "", division: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (field: keyof typeof newService, value: string) => {
    setNewService((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    setServices((prev) => [
      ...prev,
      { id: prev.length + 1, name: newService.name, division: newService.division },
    ]);
    setNewService({ name: "", division: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Services</h1>
      <Card>
        <CardContent>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            + Ajouter un Service
          </Button>
        </CardContent>
      </Card>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom du Service</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.division}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Modifier</Button>
                <Button variant="destructive" onClick={() => handleDelete(service.id)}>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nom du service"
              value={newService.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Nom de la division"
              value={newService.division}
              onChange={(e) => handleChange("division", e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="default" onClick={handleCreate}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesList;
