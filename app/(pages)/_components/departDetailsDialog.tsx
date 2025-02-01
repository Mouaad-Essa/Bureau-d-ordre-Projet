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
  depart :{
    id: string;
    signePar: string;
    traitePar: string;
    numeroOrdre: string;
    dateDepart: string;
    objet: string;
    destination: string;
    fichier: string;
    nombreFichiers: string;
  }| null;
 
};

const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, depart }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails de Départ
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Signé par:</strong> {depart?.signePar}
            </span>
            <span>
              <strong className="font-medium">Traité par :</strong>{" "}
              {depart?.traitePar}
            </span>
            <span>
              <strong className="font-medium">Objet:</strong>{" "}
              {depart?.objet}
            </span>
            <span>
              <strong className="font-medium">Date & Heure :</strong> {depart?.dateDepart}
            </span>
            <span>
              <strong className="font-medium">Destination:</strong>{" "}
              {depart?.destination}
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
