"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { toast, useToast } from "@/src/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

type Etablissement = {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
};
type Utilisateur = {
  id: string;
  nom: string;
};


export default function Page() {
  const router = useRouter();
  const [etablissement, setEtablissement] = useState<Etablissement[]>();
  const { toast } = useToast();
  const [user, setUser] = useState<Utilisateur>();
  const [error, setError] = useState<string | null>(null);

  const getEtablissements = async () => {
    const response = await fetch("/api/etablissement");
    const data = await response.json();
    setEtablissement(data);
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/etablissement");
      const data = await response.json();
      setEtablissement(data);
    };
    fetchData();
    getEtablissements()
  }, []);
  const [files, setFiles] = useState<File []| null>(null);

  const [formData, setFormData] = useState({
    idOrdre: "",
    traiteParId: "",
    numero: "", // or whatever value you want to assign, changed to "A001" from "fdf"
    dateArv: "", // Set dateArv value
    dateOrigin: "", // Set dateOrigin value
    expediteurId: "", // Set expediteur value
    objet: "", // Set objet value
    nbrFichier: 0, // Set nbrFichier value
    typeSupport: "", // Set typeSupport value
    typeCourrier: "", // Set typeCourrier value
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Step 1: Get user ID from the token
        const response = await fetch("/api/userData");
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
        const { user } = await response.json();
        // setUser(user);
        setFormData({
          ...formData,
          traiteParId: user.id
      });
     
        if (!user || !user.id) {
          throw new Error("Invalid user data");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    // Convert dates to ISO 8601 format
    const dateArv = new Date(formData.dateArv).toISOString();
    const dateOrigin = new Date(formData.dateOrigin).toISOString();
    const nbrFichier = parseInt(formData.nbrFichier.toString().valueOf());
  
    // Prepare form data with updated date formats
    const updatedFormData = {
      ...formData,
      dateArv: dateArv,
      dateOrigin: dateOrigin,
      nbrFichier: nbrFichier,
    };
  
    try {
      
      // if(files && (files?.length)!=formData.nbrFichier){
      //   toast({
      //     title: "Erreur",
      //     description: " le nombre de fichiers sélectionnés n'est pas compatible avec le nombre attendu.",
      //     variant: "destructive",
      //   });
      //   return;
      // }
      // Send the Arrivee data first
      const response = await fetch("/api/arrivees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) {
        throw new Error("Échec de l'ajout de l'arrivée");
      }
      else{
        console.log("Arrivee ajouté aveec succees");
      }
  
      const data = await response.json();
      const newArriveeId = data.data.id; // Capture the new arriveeId

      // Check if a file is selected before attempting to upload
      if(files){
        const formDataFile = new FormData();
        for(const file of files){
          formDataFile.append("files", file);
        }
          
          const fileResponse = await fetch("/api/uploadFileArrivee", {
            method: "POST",
            headers: {
              "idArrivee": newArriveeId, // Send the arriveeId with the request
            },
            body: formDataFile,
          });
          
      }
      // Send file to upload API with arriveeId in headers
      toast({
        title: "Succès",
        description: "Arrivee a été ajoutés avec succès.",
      });
  
      router.push("/dashboard/arrivees");
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de Arrivee ou du fichier.",
        variant: "destructive",
      });
    }
  };

  
  

  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, expediteurId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };


  return (
    <>

      <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ajouter une Arrivée</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Réception et traitement */}
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="dateArv"
                className="block text-sm font-medium mb-1"
              >
                Date D'arrivée * :
              </label>
              <Input
                id="dateArv"
                name="dateArv"
                type="datetime-local"
                value={formData.dateArv}
                onChange={handleInputChange}
                // required
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="traitePar"
                className="block text-sm font-medium mb-1"
              >
                ID et Année * :
              </label>
              <Input
                id="idOrdre"
                name="idOrdre"
                placeholder="ID et Année"
                value={formData.idOrdre}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Numéro d'ordre et date */}
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="numeroOrdre"
                className="block text-sm font-medium mb-1"
              >
                Date *
              </label>
              <Input
                id="dateOrigin"
                name="dateOrigin"
                type="datetime-local"
                value={formData.dateOrigin}
                onChange={handleInputChange}
                // required
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="dateArrivee"
                className="block text-sm font-medium mb-1"
              >
                Numéro *
              </label>
              <Input
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Objet et Provenance */}
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="provenance"
                className="block text-sm font-medium mb-1"
              >
                Expéditeur *
              </label>
              <Select
                value={formData.expediteurId}
                onValueChange={handleChange}
                name="expediteurId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Séléctionner un Expéditeur --" />
                </SelectTrigger>
                <SelectContent>
                  {etablissement?.map((e) => {
                    return (
                      <SelectItem key={e.id} value={e.id}>
                        {e.nom}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-[48%]">
              <label htmlFor="objet" className="block text-sm font-medium mb-1">
                Objet *
              </label>
              <Input
                id="objet"
                name="objet"
                placeholder="Objet du courrier"
                value={formData.objet}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* Fichier et Nombre de fichiers */}
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="nombreFichiers"
                className="block text-sm font-medium mb-1"
              >
                Nombre de piéces jointes *
              </label>
              <Input
                id="nbrFichier"
                name="nbrFichier"
                type="number"

                min={0}
                value={formData.nbrFichier}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="fichier"
                className="block text-sm font-medium mb-1"
              >
                Type du support *
              </label>
              <RadioGroup
                name="typeSupport"
                onChange={handleInputChange}
                defaultValue={formData.typeSupport}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Papier" id="Papier" />
                  <Label htmlFor="Papier">Papier</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Numérique" id="Numérique" />
                  <Label htmlFor="Numérique">Numérique</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="fichier"
                className="block text-sm font-medium mb-1"
              >
                Type de Courrier *
              </label>
              <RadioGroup
                name="typeCourrier"
                onChange={handleInputChange}
                defaultValue={formData.typeCourrier}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Confidential" id="Confidential" />
                  <Label htmlFor="Confidential">Confidential</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Urgent" id="Urgent" />
                  <Label htmlFor="Urgent">Urgent</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="numeroOrdre"
                className="block text-sm font-medium mb-1"
              >
                Fiche *
              </label>
              <Input
                id="fichier"
                name="fichier"
                type="file"
                multiple={true}
                onChange={handleFileChange}
                accept=".doc,.docx,.xml,.pdf" 
              />
            </div>
          </div>
          {/* Bouton de soumission */}
          <div className="mt-6 flex gap-4">
            <Button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 w-full sm:w-auto"
            >
              Créer
            </Button>
          </div>
        </form>
      </div>
    </>
  );
  }
