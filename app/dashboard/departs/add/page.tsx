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
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation";

export default function Page() {
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

  const router = useRouter();

  const handleSubmit = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/departs");
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
                <BreadcrumbLink href="/dashboard/departs">
                      Départs
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                  <BreadcrumbPage>Ajouter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ajouter un départ</h1>
        </div>


          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Nom and Description */}
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label htmlFor="nom" className="block text-sm font-medium mb-1">
                  Signé Par * :
                </label>
            <Select>
            <SelectTrigger className="">
                <SelectValue placeholder="Sélectionner signé par" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
                <Select>
            <SelectTrigger >
                <SelectValue placeholder="Sélectionner traiter par " />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label
                  htmlFor="responsableId"
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
                <Select>
            <SelectTrigger >
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
    </>
  );
}