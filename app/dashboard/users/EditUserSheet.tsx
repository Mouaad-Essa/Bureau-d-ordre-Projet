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


  // Sync state with the selected user whenever it changes
  const [updatedUser,setUser]=useState({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email:user.email,
      telephone:user.telephone,
      password:''
  });

  const handleSave = () => {
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
            value={updatedUser.nom}
            onChange={(e) => setUser({...updatedUser,nom:e.target.value}) }
          />
          <Input
            placeholder="Prénom"
            value={updatedUser.prenom}
            onChange={(e) => setUser({...updatedUser,prenom:e.target.value}) }
          />
          <Input
            placeholder="Email"
            value={updatedUser.email}
            onChange={(e) => setUser({...updatedUser,email:e.target.value}) }
          />
          <Input
            placeholder="Téléphone"
            value={updatedUser.telephone}
            onChange={(e) => setUser({...updatedUser,telephone:e.target.value}) }
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setUser({...updatedUser,password:e.target.value}) }
          />
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}