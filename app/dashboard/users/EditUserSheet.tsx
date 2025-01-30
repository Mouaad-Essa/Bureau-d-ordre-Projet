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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  service: string;
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
    service: user.service,
    password: "",
  });

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      service: user.service,
      password: "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Select changes
  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
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
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <Input
            name="nom"
            placeholder="Nom..."
            value={formData.nom}
            onChange={handleInputChange}
          />
          <label htmlFor="prenom" className="block text-sm font-medium mb-1">
            Prénom
          </label>
          <Input
            name="prenom"
            placeholder="Prénom..."
            value={formData.prenom}
            onChange={handleInputChange}
          />
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="telephone" className="block text-sm font-medium mb-1">
            Téléphone
          </label>
          <Input
            name="telephone"
            placeholder="Téléphone..."
            value={formData.telephone}
            onChange={handleInputChange}
          />
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service
          </label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="-- Séléctionner le service --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Informatique">Informatique</SelectItem>
              <SelectItem value="Recherche">Recherche</SelectItem>
              <SelectItem value="Ressource humaine">Ressource humaine</SelectItem>
            </SelectContent>
          </Select>
          <label htmlFor="pass" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe..."
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