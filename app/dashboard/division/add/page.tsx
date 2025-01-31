"use client";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";


export default function AddDivisionPage() {
  const router = useRouter();
  const { toast } = useToast();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    responsableId: "",
    bureauId: "",
    statut: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the division data to be saved
    const newDivision = { ...formData };

    try {
      // Call the addDivision API to add the new division
      const response = await fetch("/api/division", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDivision),
      });

      if (response.ok) {
        // Show success toast
        toast({
          title: "Division ajoutée",
          description: "La division a été ajoutée avec succès.",
        });
        // Redirect to division list page
        router.push("/dashboard/division");
      } else {
        throw new Error("Failed to add division");
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de la division.",
        variant: "destructive",
      });
    }

    // Reset the form after submission
    setFormData({
      nom: "",
      description: "",
      responsableId: "",
      bureauId: "",
      statut: "",
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/division");
  };

  return (

    <>
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Bureau d'ordre
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/division">
                    Divisions
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Créer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

    <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ajouter une division</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Nom and Description */}
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
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Responsable ID, Bureau ID, and Statut */}
        <div className="flex gap-4 w-full">
          <div className="w-full sm:w-[48%]">
            <label
              htmlFor="responsableId"
              className="block text-sm font-medium mb-1"
            >
              Responsable ID
            </label>
            <Input
              id="responsableId"
              name="responsableId"
              placeholder="Responsable ID"
              value={formData.responsableId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label
              htmlFor="bureauId"
              className="block text-sm font-medium mb-1"
            >
              Bureau ID
            </label>
            <Input
              id="bureauId"
              name="bureauId"
              placeholder="Bureau ID"
              value={formData.bureauId}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Statut */}
        <div className="w-full">
          <label htmlFor="statut" className="block text-sm font-medium mb-1">
            Statut
          </label>
          <Input
            id="statut"
            name="statut"
            placeholder="Statut"
            value={formData.statut}
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

    </>
  );
}

