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
import ReusableAlertDialog from "../_components/AlertDialog"; // Import the reusable dialog

type Etablissement = {
  id: number;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
};

interface EditEtablissementSheetProps {
  etablissement: Etablissement;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedEtablissement: Etablissement) => void;
}

export function EditEtablissementSheet({
  etablissement,
  isOpen,
  onOpenChange,
  onSave,
}: EditEtablissementSheetProps) {
  const [formData, setFormData] = useState({
    nom: etablissement.nom,
    ville: etablissement.ville,
    contact: etablissement.contact,
    fax: etablissement.fax,
    adresse: etablissement.adresse,
  });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Sync state with the selected etablissement whenever it changes
  useEffect(() => {
    setFormData({
      nom: etablissement.nom,
      ville: etablissement.ville,
      contact: etablissement.contact,
      fax: etablissement.fax,
      adresse: etablissement.adresse,
    });
  }, [etablissement]);

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsConfirmDialogOpen(true); // Open confirmation dialog when the user clicks save
  };

  const handleConfirmUpdate = () => {
    const updatedEtablissement = { id: etablissement.id, ...formData };
    onSave(updatedEtablissement); // Save the changes
    setIsConfirmDialogOpen(false); // Close the confirmation dialog
    onOpenChange(false); // Close the sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier l'établissement</SheetTitle>
          <SheetDescription>desc</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <Input
            placeholder="Ville"
            value={formData.ville}
            onChange={(e) => handleChange("ville", e.target.value)}
          />
          <Input
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Fax"
            value={formData.fax.toString()}
            onChange={(e) => handleChange("fax", Number(e.target.value))}
          />
          <Input
            placeholder="Adresse"
            value={formData.adresse}
            onChange={(e) => handleChange("adresse", e.target.value)}
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
        description="Êtes-vous sûr de vouloir enregistrer les modifications apportées à cet établissement ?"
        onConfirm={handleConfirmUpdate}
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </Sheet>
  );
}
