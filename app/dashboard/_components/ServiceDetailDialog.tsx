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
  
  service: {
    nom: string;
    division?: Division;
    description?: string;
  } | null;
  
};
type Division= {
  id          :String 
  nom         :String
  description ?:String

}
const AlertDialogDetail: React.FC<AlertDialogDetailProps> = React.memo(
  ({ isOpen, onClose, service }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="rounded-lg bg-white shadow-lg p-6">
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Détails du service
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-4 text-sm text-gray-700">
            <span>
              <strong className="font-medium">Nom:</strong> {service?.nom}
            </span>
            <span>
              <strong className="font-medium">Division:</strong>{" "}
              {service?.division?.nom}
            </span>
            <span>
              <strong className="font-medium">Description:</strong>{" "}
              {service?.description}
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