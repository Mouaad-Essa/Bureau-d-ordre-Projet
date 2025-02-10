import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search } from "lucide-react";

// Définition du type pour un rôle
interface Role {
  role: string;
  nomAffichage: string;
  description: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([
    { role: "admin", nomAffichage: "Admin", description: "Role of the head of service" },
    { role: "chef service", nomAffichage: "Chef service", description: "Role of the head of service" },
    { role: "le président", nomAffichage: "Le président", description: "Le président" },
    { role: "secrétaire général", nomAffichage: "secrétaire général", description: "secrétaire général" },
    { role: "superadmin", nomAffichage: "Super Admin", description: "Super Admin" },
    { role: "test2", nomAffichage: "test3", description: "TRST" },
    { role: "user", nomAffichage: "User", description: "TRST" },
    { role: "vice-président", nomAffichage: "vice-président", description: "vice-président1" },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (role: Role) => {
    setSelectedRole({ ...role }); // Clone le rôle pour éviter les mutations
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedRole) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.role === selectedRole.role ? selectedRole : r))
      );
      setDialogOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Rôles</h1>
      <Card className="mb-6">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Rechercher un rôle..."
              className="w-1/3"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Nom d'affichage</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role, index) => (
                <TableRow key={index}>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>{role.nomAffichage}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Button variant="secondary" onClick={() => handleEdit(role)}>
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRole && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le rôle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Nom du rôle"
                value={selectedRole.nomAffichage || ""}
                onChange={(e) =>
                  setSelectedRole({ ...selectedRole, nomAffichage: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Description"
                value={selectedRole.description || ""}
                onChange={(e) =>
                  setSelectedRole({ ...selectedRole, description: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="default" onClick={handleSave}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Roles;
