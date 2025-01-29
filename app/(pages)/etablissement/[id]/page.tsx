"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  const [division, setDivision] = useState<Division | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDivision = async () => {
      try {
        const response = await fetch(`/api/divisions/${id}`);
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

  return (
    <div className="container min-h-screen px-8 py-16 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Détails de la Division
      </h1>
      <div className="space-y-4 text-lg text-gray-700">
        <p>
          <span className="font-medium">ID:</span> {division.id}
        </p>
        <p>
          <span className="font-medium">Nom:</span> {division.nom}
        </p>
        <p>
          <span className="font-medium">Description:</span>{" "}
          {division.description}
        </p>
        <p>
          <span className="font-medium">Responsable ID:</span>{" "}
          {division.responsableId}
        </p>
        <p>
          <span className="font-medium">Bureau ID:</span> {division.bureauId}
        </p>
        <p>
          <span className="font-medium">Statut:</span> {division.statut}
        </p>
      </div>
    </div>
  );
};

export default DivisionPage;
