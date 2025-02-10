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
    traitePar: Utilisateur;
    signePar: Utilisateur;
  } | null;
};
type Fichier = {
  id: string;
  nom: string;
  url: string;
};
type Utilisateur = {
  id: string;
  nom: string;
};
type Etablissement = {
  id: string;
  nom: string;
};

const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, depart }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg w-[600px] max-h-[800px] flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails Fichier
            </AlertDialogTitle>
          </AlertDialogHeader>

          {/* Conteneur avec scroll */}
          <div className="flex-1 max-h-[600px] overflow-auto p-2 space-y-4">
            {depart?.fichiers.map((f) => (
              <iframe
                key={f.id}
                src={f.url} // Path to your PDF in the public directory
                width="100%"
                height="500px"
                title="Fichier PDF"
                className="border rounded-lg shadow"
              />
            ))}
          </div>

          {/* Footer fixé en bas */}
          <AlertDialogFooter className=" bg-white py-3  h-auto">
            <AlertDialogCancel
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800  hover:bg-gray-400 transition"
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
