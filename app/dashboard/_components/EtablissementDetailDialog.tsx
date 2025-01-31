import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type AlertDialogDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  etablissement: {
    nom: string;
    ville: string;
    contact: string;
    fax: number;
    adresse: string;
  } | null;
};

const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, etablissement }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails de l'établissement
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Nom:</strong> {etablissement?.nom}
            </span>
            <span>
              <strong className="font-medium">Ville:</strong>{" "}
              {etablissement?.ville}
            </span>
            <span>
              <strong className="font-medium">Contact:</strong>{" "}
              {etablissement?.contact}
            </span>
            <span>
              <strong className="font-medium">Fax:</strong>{" "}
              {etablissement?.fax}
            </span>
            <span>
              <strong className="font-medium">Adresse:</strong>{" "}
              {etablissement?.adresse}
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Fermer
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default AlertDialogDetail;