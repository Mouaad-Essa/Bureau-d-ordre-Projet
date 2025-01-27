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

interface EditPoleProps {
    pole:{

        id: number;
        nom: string;
        responsable: string;
        tachesPrincipales: string;
        contacts: string;
        statutCommentaires: string;
    }
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPole: {
    id: number;
  nom: string;
  responsable: string;
  tachesPrincipales: string;
  contacts: string;
  statutCommentaires: string;
  }) => void;
}


export default function EditPole({ pole, isOpen, onOpenChange, onSave}:EditPoleProps){


    const [nom, setNom] = useState(pole.nom);
    const [responsable, setResponsable] = useState(pole.responsable);
    const [tachesPrincipales, setTachesPrincipales] = useState(pole.tachesPrincipales);
    const [contacts, setContacts] = useState(pole.contacts);
    const [statutCommentaires, setStatutCommentaires] = useState(pole.statutCommentaires);


    const [updatedPole,setPole]=useState(
        {
            id:pole.id,
            nom:pole.nom,
            responsable:pole.responsable,
            tachesPrincipales:pole.tachesPrincipales,
            contacts:pole.contacts,
            statutCommentaires:pole.statutCommentaires
        }
    );
  
  
    const handleSave = () => {
      onSave(updatedPole);
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
                value={updatedPole.nom}
                onChange={(e) => setPole({...pole,nom:e.target.value})}
              />
              <Input
                placeholder="responsable"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
              <Input
                placeholder="tachesPrincipales"
                value={tachesPrincipales}
                onChange={(e) => setTachesPrincipales(e.target.value)}
              />
              <Input
                placeholder="contacts"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
              />
              <Input
                placeholder="statut Commentaires"
                value={statutCommentaires}
                onChange={(e) => setStatutCommentaires(e.target.value)}
              />
             
            </div>
            <SheetFooter>
              <Button onClick={handleSave}>Modifier</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    }