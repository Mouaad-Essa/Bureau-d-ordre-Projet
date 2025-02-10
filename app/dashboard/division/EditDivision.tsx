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
import ReusableAlertDialog from "../../_components/AlertDialog";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Pole = {
  id: string;
  nom: string;
};

type Division = {
  id: string;
  nom: string;
  description: string;
  poleId: string;
  pole: { nom: string };
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
    poleId: division.poleId,
  });
  const [poles, setPoles] = useState<Pole[]>([]);
  const [selectedPole, setSelectedPole] = useState<string | null>(
    division.poleId
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchPoles() {
      try {
        const response = await fetch("/api/poles");
        const data = await response.json();
        setPoles(data);
      } catch (error) {
        console.error("Failed to fetch poles:", error);
      }
    }
    fetchPoles();
  }, []);

  useEffect(() => {
    setFormData({
      nom: division.nom,
      description: division.description,
      poleId: division.poleId,
    });
    setSelectedPole(division.poleId);
  }, [division]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePoleSelect = (id: string) => {
    setSelectedPole(id);
    setFormData((prev) => ({ ...prev, poleId: id }));
  };

  const handleSave = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = () => {
    const existingPoleName =
      poles.find((pole) => pole.id === formData.poleId)?.nom ||
      division.pole.nom;

    const updatedDivision: Division = {
      id: division.id,
      nom: formData.nom,
      description: formData.description,
      poleId: formData.poleId,
      pole: { nom: existingPoleName },
    };

    onSave(updatedDivision);
    setIsConfirmDialogOpen(false);
    onOpenChange(false);
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
          <Label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom
          </Label>
          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />

          <Label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </Label>
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Label className="block text-sm font-medium mb-1">Pole</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedPole
                  ? poles.find((pole) => pole.id === selectedPole)?.nom
                  : "Sélectionner un pôle..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] h-60 overflow-y-auto">
              {poles.map((pole) => (
                <DropdownMenuItem
                  key={pole.id}
                  onClick={() => handlePoleSelect(pole.id)}
                >
                  {pole.nom}
                  {selectedPole === pole.id && <Check className="ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>

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
