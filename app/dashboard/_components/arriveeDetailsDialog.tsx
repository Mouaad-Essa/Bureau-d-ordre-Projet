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
  arrivee: {
    id: string;
    expediteur: string;
    objet: string;
    dateArrivee: string;
    trierPar: string;
  } | null;
};

const AlertDialogDetailArrivee: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, arrivee }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails d'Arrivée
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Expéditeur :</strong> {arrivee?.expediteur}
            </span>
            <span>
              <strong className="font-medium">Objet :</strong> {arrivee?.objet}
            </span>
            <span>
              <strong className="font-medium">Date d'Arrivée :</strong> {arrivee?.dateArrivee}
            </span>
            <span>
              <strong className="font-medium">Trié par :</strong> {arrivee?.trierPar}
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

export default AlertDialogDetailArrivee;
