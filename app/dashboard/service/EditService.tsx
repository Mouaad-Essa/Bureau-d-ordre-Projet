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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Service = {
  id: number;
  nom: string;
  division: string;
  description: string;
};

interface EditServiceSheetProps {
  service: Service;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedService: Service) => void;
}

export function EditServiceSheet({
  service,
  isOpen,
  onOpenChange,
  onSave,
}: EditServiceSheetProps) {
  const [formData, setFormData] = useState({
    nom: service.nom,
    division: service.division,
    description: service.description,
  });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Sync state with the selected division whenever it changes
  useEffect(() => {
    setFormData({
      nom: service.nom,
      division: service.division,
      description: service.description,
    });
  }, [service]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Select changes
  const handleDivisionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, division: value }));
  };

  const handleSave = () => {
    setIsConfirmDialogOpen(true); // Open confirmation dialog when the user clicks save
  };

  const handleConfirmUpdate = () => {
    const updatedDivision = { id: service.id, ...formData };
    onSave(updatedDivision); // Save the changes
    setIsConfirmDialogOpen(false); // Close the confirmation dialog
    onOpenChange(false); // Close the sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier le service</SheetTitle>
          <SheetDescription>
            Veuillez mettre à jour les informations du service.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Input
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <Input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <Select value={formData.division} onValueChange={handleDivisionChange}>
            <SelectTrigger>
              <SelectValue placeholder="-- Séléctionner la division --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Informatique">Informatique</SelectItem>
              <SelectItem value="Recherche">Recherche</SelectItem>
              <SelectItem value="Ressource humaine">Ressource humaine</SelectItem>
            </SelectContent>
          </Select>
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
        description="Êtes-vous sûr de vouloir enregistrer les modifications apportées à ce service?"
        onConfirm={handleConfirmUpdate}
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </Sheet>
  );
}