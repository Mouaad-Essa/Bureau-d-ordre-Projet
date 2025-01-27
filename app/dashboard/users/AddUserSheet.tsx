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
  onSave: (updatedUser: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string
  }) => void;
}

export function AddUserSheet({ isOpen, onOpenChange, onSave }: AddUserSheetProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState('');

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setPassword('');
  }, []); // Trigger the effect when `user` prop changes

  const handleSave = () => {
    const addedUser = {
      nom,
      prenom,
      email,
      telephone,
      password,
    };
    onSave(addedUser);
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
            placeholder="Nom"
            onChange={(e) => setNom(e.target.value)}
          />
          <Input
            placeholder="Prénom"
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Téléphone"
            onChange={(e) => setTelephone(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Ajouter</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}