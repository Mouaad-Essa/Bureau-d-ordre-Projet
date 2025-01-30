"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

interface Role {
  id: number;
  role: string;
  nom: string;
  description: string;
}

interface EditRoleSheetProps {
  role: Role;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedRole: Role) => void;
}

export function EditRoleSheet({ role, isOpen, onOpenChange, onSave }: EditRoleSheetProps) {
  const [formData, setFormData] = useState({
    role: role.role,
    nom: role.nom,
    description: role.description,
  });

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setFormData({
      role: role.role,
      nom: role.nom,
      description: role.description,
    });
  }, [role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedRole = {
      id: role.id,
      ...formData,
    };
    onSave(updatedRole);
    onOpenChange(false); // Close the sheet after saving
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier un role</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Rôle
          </label>
          <Input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <Input
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleInputChange}
          />
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}