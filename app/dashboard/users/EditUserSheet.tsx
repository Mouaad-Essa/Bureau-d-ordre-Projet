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

interface EditUserSheetProps {
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string
  }) => void;
}

export function EditUserSheet({ user, isOpen, onOpenChange, onSave }: EditUserSheetProps) {
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);
  const [password, setPassword] = useState('');

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setTelephone(user.telephone);
    setPassword('');
  }, [user]); // Trigger the effect when `user` prop changes

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      nom,
      prenom,
      email,
      telephone,
      password,
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
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Input
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}