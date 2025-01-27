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

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface EditUserSheetProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User & { password: string }) => void;
}

export function EditUserSheet({ user, isOpen, onOpenChange, onSave }: EditUserSheetProps) {
  const [formData, setFormData] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    password: "",
  });

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      password: "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      ...formData,
    };
    onSave(updatedUser);
    onOpenChange(false); // Close the sheet after saving
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier l'utilisateur</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
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