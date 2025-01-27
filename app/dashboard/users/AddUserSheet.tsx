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

interface AddUserSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newUser: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string;
  }) => void;
}

export function AddUserSheet({ isOpen, onOpenChange, onSave }: AddUserSheetProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
  });

  // Reset form when the sheet is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        password: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false); // Close the sheet after saving
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un utilisateur</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Input
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleInputChange}
          />
          <Input
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            name="telephone"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Ajouter</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}