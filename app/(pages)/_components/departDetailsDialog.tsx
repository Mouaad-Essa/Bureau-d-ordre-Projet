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
  depart: {
    id: string;
    signeParId: string;
    traiteParId: string;
    numOrdre: string;
    dateDepart: string;
    objet: string;
    destination: Etablissement;
    fichiers: Fichier[];
    nbrFichier: Number;
    traitePar:Utilisateur
    signePar:Utilisateur
  
  }|null;
  
};
type Fichier = {
  id:string,
  nom:string
}
type Utilisateur={
  id:string,
  nom:string
}
type Etablissement={
  id:string,
  nom:string
}

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
              <strong className="font-medium">Signé par:</strong> {depart?.signePar?.nom}
            </span>
            <span>
              <strong className="font-medium">Traité par :</strong>{" "}
              {depart?.traitePar?.nom}
            </span>
            <span>
              <strong className="font-medium">Objet:</strong>{" "}
              {depart?.objet}
            </span>
            <span>
              <strong className="font-medium">Numero Ordre:</strong>{" "}
              {depart?.numOrdre}
            </span>
            <span>
              <strong className="font-medium">Date & Heure :</strong> {depart?.dateDepart}
            </span>
            <span>
              <strong className="font-medium">Destination:</strong>{" "}
              {depart?.destination.nom}
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