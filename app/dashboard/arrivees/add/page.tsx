"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash,
  Building,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recuPar: "",
    traiteParId: "Admin",
    idOrdre:"",
    numeroOrdre: "",
    dateArv: "",
    dateOrigin: "",
    expediteur: "",
    objet: "",
    nbrFichier: 0,
    typeSupport:"",
    typeCourrier:"",
    fichier: "",

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("/api/arrivees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Arrivée ajoutée",
          description: "L'arrivée a été ajoutée avec succès.",
        });
        router.push("/dashboard/arrivees");
      } else {
        throw new Error("Échec de l'ajout de l'arrivée");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de l'arrivée.",
        variant: "destructive",
      });
    }
  };
  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, divisionId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Bureau d'ordre</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Créer une Arrivée</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ajouter une Arrivée</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Réception et traitement */}
          <div className="flex gap-4 w-full">
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="recuPar"
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
                required
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
                placeholder="Date"
                type="datetime-local"
                value={formData.dateOrigin}
                onChange={handleInputChange}
                required
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
                id="numeroOrdre"
                name="numeroOrdre"
                value={formData.numeroOrdre}
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
              <Select value={formData.expediteur} onValueChange={handleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Séléctionner un Expéditeur --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uudi1">user1</SelectItem>
                  <SelectItem value="uuid2">user 2</SelectItem>
                  <SelectItem value="uuid3">user3</SelectItem>
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
              <RadioGroup defaultValue={formData.typeSupport}>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="Papier">Papier</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
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
              <RadioGroup defaultValue={formData.typeCourrier}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="Papier">Confidential</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="Numérique">Urgent</Label>
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
                value={""}
                onChange={handleInputChange}
                required
              />
            </div>
            </div>
          {/* Bouton de soumission */}
          <div className="mt-6 flex gap-4">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              Créer
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
