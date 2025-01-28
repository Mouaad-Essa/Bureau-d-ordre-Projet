"use client";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEtablissementPage() {
  const router = useRouter();
  const { toast } = useToast();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    contact: "",
    fax: "",
    adresse: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the etablissement data to be saved
    const newEtablissement = { ...formData };

    try {
      // Call the addEtablissement API to add the new etablissement
      const response = await fetch("/api/etablissement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEtablissement),
      });

      if (response.ok) {
        // Show success toast
        toast({
          title: "Établissement ajouté",
          description: "L'établissement a été ajouté avec succès.",
        });
        //redirect
        router.push("/etablissement");
      } else {
        throw new Error("Failed to add etablissement");
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de l'établissement.",
        variant: "destructive",
      });
    }

    // Reset the form after submission
    setFormData({
      nom: "",
      ville: "",
      contact: "",
      fax: "",
      adresse: "",
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/etablissement");
  };

  return (
    <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ajouter un établissement</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Nom and Ville */}
        <div className="flex gap-4 w-full">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="nom" className="block text-sm font-medium mb-1">
              Nom
            </label>
            <Input
              id="nom"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor="ville" className="block text-sm font-medium mb-1">
              Ville
            </label>
            <Input
              id="ville"
              name="ville"
              placeholder="Ville"
              value={formData.ville}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Contact, Fax, and Adresse */}
        <div className="flex gap-4 w-full">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="contact" className="block text-sm font-medium mb-1">
              Contact
            </label>
            <Input
              id="contact"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label htmlFor="fax" className="block text-sm font-medium mb-1">
              Fax
            </label>
            <Input
              id="fax"
              name="fax"
              placeholder="Fax"
              value={formData.fax}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="w-full">
          <label htmlFor="adresse" className="block text-sm font-medium mb-1">
            Adresse
          </label>
          <Input
            id="adresse"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            Ajouter
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
