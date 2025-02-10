import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const CreateRole = () => {
  const [newRole, setNewRole] = useState({
    role: "",
    nomAffichage: "",
    description: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (field: keyof typeof newRole, value: string) => {
    setNewRole((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    console.log("Role créé :", newRole);
    setNewRole({ role: "", nomAffichage: "", description: "" });
    setDialogOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un Rôle</h1>
      <Card>
        <CardContent>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            + Créer un Rôle
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau rôle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nom du rôle"
              value={newRole.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Nom d'affichage"
              value={newRole.nomAffichage}
              onChange={(e) => handleChange("nomAffichage", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={newRole.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="default" onClick={handleCreate}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateRole;
