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
  pole:{
    id:string;
    nom:string;
    responsable:string;
    tachesPrincipales:string;
    contacts:string;
    statut:string
  }| null;
 
};

const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, pole }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails de l'Établissement
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Signé par:</strong> {pole?.nom}
            </span>
            <span>
              <strong className="font-medium">Traité par :</strong>{" "}
              {pole?.responsable}
            </span>
            <span>
              <strong className="font-medium">Objet:</strong>{" "}
              {pole?.tachesPrincipales}
            </span>
            <span>
              <strong className="font-medium">Date & Heure :</strong> {pole?.contacts}
            </span>
            <span>
              <strong className="font-medium">Destination:</strong>{" "}
              {pole?.statut}
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
