"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import the chadCn Button component
import { ArrowLeftIcon } from "lucide-react"; // Assuming Lucid icon is imported this way

type Division = {
  id: string;
  nom: string;
  description: string;
  responsableId: string;
  bureauId: string;
  statut: string;
};

const DivisionPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter(); // Initialize the router
  const [division, setDivision] = useState<Division | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDivision = async () => {
      try {
        const response = await fetch(`/api/division/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDivision(data);
        } else {
          console.error("Failed to fetch division details");
        }
      } catch (error) {
        console.error("Error fetching division:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDivision();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Chargement des détails...</p>
    );
  }

  if (!division) {
    return (
      <p className="text-center text-red-500">
        Aucune division trouvée pour cet ID.
      </p>
    );
  }

  const handleGoBack = () => {
    router.push("/dashboard/division"); // Navigate back to /dashboard/division
  };

  return (
    <div className="container min-h-screen px-8 py-16 mx-auto bg-slate-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Détails de la Division
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto space-y-4">
        <div className="space-y-2">
          <p className="text-lg text-gray-600">
            <span className="font-semibold">ID:</span> {division.id}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Nom:</span> {division.nom}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {division.description}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Responsable ID:</span>{" "}
            {division.responsableId}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Bureau ID:</span>{" "}
            {division.bureauId}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Statut:</span> {division.statut}
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
          divisions
        </Button>
      </div>
    </div>
  );
};

export default DivisionPage;
