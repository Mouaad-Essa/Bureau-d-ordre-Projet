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

type Arrivee = {
  id: string;
  idOrdre: string;
  dateArv: string;
  dateOrigin: string;
  expediteur: string;
  objet: string;
  numero: string;
  nbrFichier: number;
  typeSupport: string;
  typeCourrier: string;
  trierPar:string;
};

type AlertDialogDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  Arrivee:Arrivee|null;

};

const AlertDialogDetailArrivee: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, Arrivee }) => {
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
    <strong className="font-medium">Date d'Arrivée :</strong> {Arrivee?.dateArv}
  </span>
  <span>
    <strong className="font-medium">Date d'Origine :</strong> {Arrivee?.dateOrigin}
  </span>
  <span>
    <strong className="font-medium">Expéditeur :</strong> {Arrivee?.expediteur}
  </span>
  <span>
    <strong className="font-medium">Objet :</strong> {Arrivee?.objet}
  </span>
  <span>
    <strong className="font-medium">Numéro :</strong> {Arrivee?.numero}
  </span>
  <span>
    <strong className="font-medium">Nombre de Fichiers :</strong> {Arrivee?.nbrFichier}
  </span>
  <span>
    <strong className="font-medium">Type de Support :</strong> {Arrivee?.typeSupport || "Non spécifié"}
  </span>
  <span>
    <strong className="font-medium">Type de Courrier :</strong> {Arrivee?.typeCourrier || "Non spécifié"}
  </span>
  <span>
    <strong className="font-medium">Trié par :</strong> {Arrivee?.trierPar}
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
