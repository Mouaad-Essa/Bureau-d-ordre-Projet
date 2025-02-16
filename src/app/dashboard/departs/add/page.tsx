"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { Input } from "@/src/components/ui/input"; // Input component for search bar
import { Button } from "@/src/components/ui/button"; // Button component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/src/components/ui/select"

import { toast, useToast } from "@/src/hooks/use-toast";


type Utilisateur = {
  id: string;
  nom: string;
};
type Fichier = {
  nom: string;
  url: string;
  dateAjout: Date;
  idArrivee: string;
};
type Etablissement = {
  id: string;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
};


export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [users,setUsers] = useState<Utilisateur[]>();
  const [destinations,setDestinations] = useState<Etablissement[]>();
  const [files, setFiles] = useState<File[] | null>(null);

  const [formData, setFormData] = useState({
    signeParId: "",
    traiteparId: "",
    numOrdre: "",
    dateDepart: "",
    objet: "",
    destinationId: "",
    nbrFichier: 0,

  }); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/etablissement");
      const data = await response.json();
      setDestinations(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateDep = new Date(formData.dateDepart).toISOString();
    const nbrFichier = parseInt(formData.nbrFichier.toString().valueOf());
    const updatedFormData = {
      ...formData,
      dateDepart: dateDep,
      nbrFichier: nbrFichier,
    };

    try {

      if(files && (files?.length)!=formData.nbrFichier){
        toast({
          title: "Erreur",
          description: " le nombre de fichiers sélectionnés n'est pas compatible avec le nombre attendu.",
          variant: "destructive",
        });
        return;
      }

      
      const response = await fetch("/api/depart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      
      console.log(updatedFormData);
      if (!response.ok) {
        throw new Error("Échec de l'ajout du Départ");
      }
      else{
        console.log("Départ ajouté aveec succees");
      }
  
      const data = await response.json();
      const idDepart = data.data.id; // Capture the new arriveeId
    
      if(files){
        const formDataFile = new FormData();
        for(const file of files){
          formDataFile.append("files", file);
        }
          
          const fileResponse = await fetch("/api/uploadFileDepart", {
            method: "POST",
            headers: {
              "idDepart": idDepart, // Send the arriveeId with the request
            },
            body: formDataFile,
          });
          const responseText = await fileResponse.text(); // Get response text for debugging
          console.log(responseText);
      }
      // Send file to upload API with arriveeId in headers
      
      toast({
        title: "Succès",
        description: "Depart a été ajoutés avec succès.",
      });
  
      router.push("/dashboard/departs");
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de Depart ou du fichier.",
        variant: "destructive",
      });
    }
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
            <h1 className="text-2xl font-bold">Ajouter un Départ</h1>
        </div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Nom and Description */}
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">

                <label htmlFor="signePar" className="block text-sm font-medium mb-1">
                  Signé Par * :
                </label >
                <Select
                value={formData.signeParId}
                onValueChange={(value)=>{setFormData((prev) => ({ ...prev, signeParId:value }))}}
                name="signeParId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Signé par --" />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((e) => {
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
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Traité par * :
                </label>

                <Select
                value={formData.traiteparId}
                onValueChange={(value)=>{setFormData((prev) => ({ ...prev, traiteparId:value }))}}
                name="traiteparId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Traité par --" />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((e) => {
                    return (
                      <SelectItem key={e.id} value={e.id}>
                        {e.nom}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>


              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label

                  htmlFor="numeroOrdre"

                  className="block text-sm font-medium mb-1"
                >
                  Numéro d'ordre *
                </label>
                <Input
                  id=""
                  name="numOrdre"
                  placeholder="Numéro d'ordre"
                  value={formData.numOrdre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="bureauId"
                  className="block text-sm font-medium mb-1"
                >
                  Date & Heure
                </label>
                <Input
                  id="dateDepart"
                  name="dateDepart"
                  placeholder="dateDepart"
                  value={formData.dateDepart}
                  type="datetime-local"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/*  */}
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="statut"
                  className="block text-sm font-medium mb-1"
                >
                  Objet *
                </label>
                <Input
                  id="objet"
                  name="objet"
                  placeholder="Objet"
                  value={formData.objet}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="statut"
                  className="block text-sm font-medium mb-1"
                >
                  Destination *
                </label>

                <Select
                value={formData.destinationId}
                onValueChange={(value)=>{setFormData((prev) => ({ ...prev, destinationId:value }))}}
                name="destinationId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Déstination --" />
                </SelectTrigger>
                <SelectContent>
                  {destinations?.map((e) => {
                    return (
                      <SelectItem key={e.id} value={e.id}>
                        {e.nom}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>


              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="statut"
                  className="block text-sm font-medium mb-1"
                >
                  Fichier *
                </label>
                <Input
                  id="fichier"
                  name="ficher"
                  type="file"
                  onChange={handleFileChange}
                  multiple={true}
                />
              </div>

              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="statut"
                  className="block text-sm font-medium mb-1"
                >
                  Nombre de Fichiers *
                </label>
                <Input
                  id="nbrFichier"
                  name="nbrFichier"
                  placeholder="Nombre de Fichiers"
                  type="number"
                  min={0}
                  value={formData.nbrFichier}
                  onChange={handleInputChange}
                  required

                />
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                type="submit"
                className="bg-sky-500 hover:bg-sky-700 w-full sm:w-auto"
              >
                Créer
              </Button>

            </div>
          </form>

        </div>
     

    </>
  );
}

