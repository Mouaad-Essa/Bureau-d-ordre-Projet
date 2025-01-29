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
import ReusableAlertDialog from "../../_components/AlertDialog"; // Import the reusable dialog

type Division = {
  id: string;
  nom: string;
  description: string;
  responsableId: string;
  bureauId: string;
  statut: string;
};

interface EditDivisionSheetProps {
  division: Division;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedDivision: Division) => void;
}

export function EditDivisionSheet({
  division,
  isOpen,
  onOpenChange,
  onSave,
}: EditDivisionSheetProps) {
  const [formData, setFormData] = useState({
    nom: division.nom,
    description: division.description,
    responsableId: division.responsableId,
    bureauId: division.bureauId,
    statut: division.statut,
  });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Sync state with the selected division whenever it changes
  useEffect(() => {
    setFormData({
      nom: division.nom,
      description: division.description,
      responsableId: division.responsableId,
      bureauId: division.bureauId,
      statut: division.statut,
    });
  }, [division]);

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
    const updatedDivision = { id: division.id, ...formData };
    onSave(updatedDivision); // Save the changes
    setIsConfirmDialogOpen(false); // Close the confirmation dialog
    onOpenChange(false); // Close the sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier la division</SheetTitle>
          <SheetDescription>
            Veuillez mettre à jour les informations de la division.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <Input
            placeholder="Responsable ID"
            value={formData.responsableId}
            onChange={(e) => handleChange("responsableId", e.target.value)}
          />
          <Input
            placeholder="Bureau ID"
            value={formData.bureauId}
            onChange={(e) => handleChange("bureauId", e.target.value)}
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
        description="Êtes-vous sûr de vouloir enregistrer les modifications apportées à cette division ?"
        onConfirm={handleConfirmUpdate}
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </Sheet>
  );
}
