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
  user: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    service: string | null;
    role: string | null;
  } | null;
};

const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, user }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails de l'utilisateur
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Nom:</strong> {user?.nom}
            </span>
            <span>
              <strong className="font-medium">Prénom:</strong>{" "}
              {user?.prenom}
            </span>
            <span>
              <strong className="font-medium">Email:</strong>{" "}
              {user?.email}
            </span>
            <span>
              <strong className="font-medium">Téléphone:</strong>{" "}
              {user?.telephone}
            </span>
            <span>
              <strong className="font-medium">Service:</strong>{" "}
              {user?.service}
            </span>
            <span>
              <strong className="font-medium">Rôle:</strong>{" "}
              {user?.role}
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