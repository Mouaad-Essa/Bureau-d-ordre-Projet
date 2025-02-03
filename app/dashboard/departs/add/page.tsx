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
import { Input } from "@/components/ui/input"; // Input component for search bar
import { Button } from "@/components/ui/button"; // Button component

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Dropdown menu components
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import ReusableAlertDialog from "../../../_components/AlertDialog"; // Import the reusable dialog
import { fetchPoles, updatePole } from "@/app/actions/polesActions";
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
  } from "@/components/ui/select"


  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { toast, useToast } from "@/hooks/use-toast";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    signePar: "",
    traitepar: "",
    numeroOrdre: "",
    dateDepart: "",
    objet: "",
    destination: "",
    ficher: "",
    nombreFichiers: "",
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/depart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Départs ajouté",
          description: "Le pôle a été ajouté avec succès.",
        });
        router.push("/dashboard/departs");
      } else {
        throw new Error("Échec de l'ajout du pôle");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du pôle.",
        variant: "destructive",
      });
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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

                <BreadcrumbPage>Créer un Départ</BreadcrumbPage>

              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>


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
                <select onChange={handleSelectChange} id="small" name="signePar" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>


              </div>
              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Traité par * :
                </label>

                <select onChange={handleSelectChange} id="small" name="traitePar" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>

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
                  name="numeroOrdre"
                  placeholder="Numéro d'ordre"
                  value={formData.numeroOrdre}
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

                <select onChange={handleSelectChange} id="small" name="destination" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled >Sélectionner une Destination :</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>

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
                  placeholder="Objet"
                  type="file"
                  value={formData.ficher}
                  onChange={handleInputChange}
                  required
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
                  id="nombreFichiers"
                  name="nombreFichiers"
                  placeholder="Nombre de Fichiers"
                  type="number"
                  value={formData.nombreFichiers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {/* Buttons */}
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

