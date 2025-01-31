"use client";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader } from "@/components/ui/card";
import { Building } from "lucide-react";
export default function AddPolePage() {
  const router = useRouter();
  const { toast } = useToast();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    responsable: "",
    tachesPrincipales: "",
    contacts: "",
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

    try {
      const response = await fetch("/api/poles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Pôle ajouté",
          description: "Le pôle a été ajouté avec succès.",
        });
        router.push("/dashboard/poles");
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

    // Reset the form after submission
    setFormData({
      nom: "",
      responsable: "",
      tachesPrincipales: "",
      contacts: "",
      statut: "",
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/poles");
  };


  return (

<>

<div className="bddepart">
      <Card className="mycard">

<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Bureau d'ordre
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage></BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>




    
    <div className="flex flex-col space-y-4 p-4 w-full max-w-screen-lg mx-auto">
    <CardHeader>
          <h1 className="rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 from-40% to-blue-500 text-gray-900 text-2xl font-semibold p-3 flex items-center justify-center">
            <span>Ajouter Pole</span>
            <Building />
          </h1>
          </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">



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
              Responsable
            </label>
            <Input
              id="responsable"
              name="responsable"
              placeholder="Responsable"
              value={formData.responsable}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>



      <div className="flex gap-4 w-full">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="nom" className="block text-sm font-medium mb-1">
              Taches Principales
            </label>
            <Input
              id="tachesPrincipales"
              name="tachesPrincipales"
              placeholder="Taches Principales"
              value={formData.tachesPrincipales}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Contacts
            </label>
            <Input
              id="contacts"
              name="contacts"
              placeholder="Contacts"
              value={formData.contacts}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="w-full sm:w-[48%]">
            <label htmlFor="nom" className="block text-sm font-medium mb-1">
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
          </div>



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
    </Card>
</div>
</>


  );
}
