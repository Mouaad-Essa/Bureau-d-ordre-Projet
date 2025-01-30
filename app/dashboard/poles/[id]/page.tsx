"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import the chadCn Button component
import { ArrowLeftIcon } from "lucide-react"; // Assuming Lucid icon is imported this way


type Pole={
    id:string;
    nom:string;
    responsable:string;
    tachesPrincipales:string;
    contacts:string;
    statut:string
  }
  

const PolePage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter(); // Initialize the router
  const [pole, setPole] = useState<Pole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPole = async () => {
      try {
        const response = await fetch(`/api/poles/${id}`);
        if (response.ok) {
          const data = await response.json();
          
          setPole(data);
          
        } else {
          console.error("Failed to fetch Pole details");
        }
      } catch (error) {
        console.error("Error fetching Pole:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPole();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Chargement des détails...</p>
    );
  }

  if (!pole) {
    return (
      <p className="text-center text-red-500">
        Aucune pole trouvée pour cet ID.
      </p>
    );
  }

  const handleGoBack = () => {
    router.push("/dashboard/poles"); // Navigate back to /dashboard/pole
  };

  return (
    <div className="container min-h-screen px-8 py-16 mx-auto bg-slate-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Détails de la pole
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto space-y-4">
        <div className="space-y-2">
          <p className="text-lg text-gray-600">
            <span className="font-semibold">ID:</span> {pole.id}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Nom:</span> {pole.nom}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Responsable :</span> {pole.responsable}
          </p>
        
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Taches Principales :</span>{" "}
            {pole.tachesPrincipales}
          </p>
         
        
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Contacts :</span>{" "}
            {pole.contacts}
          </p>
         
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Statut:</span> {pole.statut}
          </p>
        </div>
      </div>

      {/* Go Back Button using chadCn and Lucid Icon */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleGoBack}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-3"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Retourner à la liste des
          poles
        </Button>
      </div>
    </div>
  );
};

export default PolePage;
