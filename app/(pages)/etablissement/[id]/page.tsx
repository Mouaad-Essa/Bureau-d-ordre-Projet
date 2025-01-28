"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

type Etablissement = {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: string;
  adresse: string;
};

const EtablissementPage = () => {
  const { id } = useParams<{ id: string }>();

  const [etablissement, setEtablissement] = useState<Etablissement | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEtablissement = async () => {
      try {
        const response = await fetch(`/api/etablissement/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEtablissement(data);
        } else {
          console.error("Failed to fetch etablissement details");
        }
      } catch (error) {
        console.error("Error fetching etablissement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEtablissement();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails...</p>;
  }

  if (!etablissement) {
    return <p>Aucun établissement trouvé pour cet ID.</p>;
  }

  return (
    <div className=" container min-h-screen  px-8 py-16 ">
      <h1 className="text-2xl font-bold mb-4">Détails de l'Établissement</h1>
      <div className="space-y-2 w-fit">
        <p>
          <span className="font-medium">ID:</span> {etablissement.id}
        </p>
        <p>
          <span className="font-medium">Nom:</span> {etablissement.nom}
        </p>
        <p>
          <span className="font-medium">Ville:</span> {etablissement.ville}
        </p>
        <p>
          <span className="font-medium">Contact:</span> {etablissement.contact}
        </p>
        <p>
          <span className="font-medium">Fax:</span> {etablissement.fax}
        </p>
        <p>
          <span className="font-medium">Adresse:</span> {etablissement.adresse}
        </p>
      </div>
    </div>
  );
};

export default EtablissementPage;
