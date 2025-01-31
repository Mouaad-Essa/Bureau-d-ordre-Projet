"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import ReusableAlertDialog from "@/app/_components/AlertDialog";


type Pole = {
  id: string;
  nom: string;
  responsable: string;
  tachesPrincipales: string;
  contacts: string;
  statut: string;
};
interface EditPoleSheetProps {
  pole: Pole;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPole: Pole) => void;
}

export default function EditPole({ pole, isOpen, onOpenChange, onSave}:EditPoleSheetProps){

  const [formData, setFormData] = useState({
    nom: pole.nom,
    responsable: pole.responsable,
    tachesPrincipales: pole.tachesPrincipales,
    contacts: pole.contacts,
    statut: pole.statut,
  });

  
  
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
    // Sync state with the selected pole whenever it changes
    useEffect(() => {
      setFormData({
        nom: pole.nom,
        responsable: pole.responsable,
        tachesPrincipales: pole.tachesPrincipales,
        contacts: pole.contacts,
        statut: pole.statut,
      });
    }, [pole]);
  
    const handleChange = (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const handleSave = () => {
      setIsConfirmDialogOpen(true); // Open confirmation dialog when the user clicks save
    };
  
    const handleConfirmUpdate = () => {
      const updatedPole = { id: pole.id, ...formData };
      onSave(updatedPole); // Save the changes
      setIsConfirmDialogOpen(false); // Close the confirmation dialog
      onOpenChange(false); // Close the sheet
    };
  
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Modifier le pôle</SheetTitle>
            <SheetDescription>
              Veuillez mettre à jour les informations du pôle.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
            />
            <Input
              placeholder="Responsable"
              value={formData.responsable}
              onChange={(e) => handleChange("responsable", e.target.value)}
            />
            <Input
              placeholder="Tâches principales"
              value={formData.tachesPrincipales}
              onChange={(e) => handleChange("tachesPrincipales", e.target.value)}
            />
            <Input
              placeholder="Contacts"
              value={formData.contacts}
              onChange={(e) => handleChange("contacts", e.target.value)}
            />
            <Input
              placeholder="Statut"
              value={formData.statut}
              onChange={(e) => handleChange("statut", e.target.value)}
            />
          </div>
          <SheetFooter>
            <Button onClick={handleSave}>Modifier</Button>
          </SheetFooter>
        </SheetContent>
  
        {/* Reusable AlertDialog for confirmation */}
        <ReusableAlertDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          title="Confirmer la modification"
          description="Êtes-vous sûr de vouloir enregistrer les modifications apportées à ce pôle ?"
          onConfirm={handleConfirmUpdate}
          confirmText="Confirmer"
          cancelText="Annuler"
        />
      </Sheet>
    );
  }
