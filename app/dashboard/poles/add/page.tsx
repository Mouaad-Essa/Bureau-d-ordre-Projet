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
    description: "",
    
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
      description: ""
      
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/poles");
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
                    <BreadcrumbLink href="#">
                      Bureau d'ordre
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>

                    <BreadcrumbLink href="/dashboard/poles">
                      Pôles
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
            <h1 className="text-2xl font-bold">Ajouter un Pole</h1>
        </div>
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
              Description
            </label>
            <Input
              id="description"
              name="description"
              placeholder="description"
              value={formData.description}
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
</>



  );
}
