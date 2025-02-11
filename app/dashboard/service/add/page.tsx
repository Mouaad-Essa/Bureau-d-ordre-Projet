"use client";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type Division={
  id:string,
  nom:string
}
export default function AddServicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [divisions,setDivisions] = useState<Division[]>();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    divisionId: "",
    description: "",
  });
   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/division");
        const data = await response.json();
        setDivisions(data);
      };
      fetchData();
    }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the Service data to be saved
    const newService = { ...formData };

    try {
      console.log(newService);
      // Call the addService API to add the new Service
      const response = await fetch("/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        // Show success toast
        toast({
          title: "Service ajouté",
          description: "le service a été ajouté avec succès.",
        });
        //redirect
        router.push("/dashboard/service");
      } else {
        throw new Error("Failed to add service");
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du service.",
        variant: "destructive",
      });
    }

    // Reset the form after submission
    setFormData({
        nom: "",
        divisionId: "",
        description: "",
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/service");
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/service">
                          Service
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
            <h1 className="text-2xl font-bold">Ajouter un service</h1>
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
                placeholder="Nom du service"
                value={formData.nom}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="w-full sm:w-[48%]">
                <label htmlFor="division" className="block text-sm font-medium mb-1">
                Division
                </label>
                <Select
                onValueChange={(value)=>{setFormData((prev) => ({ ...prev, divisionId:value }))}}
                name="divisionId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Division --" />
                </SelectTrigger>
                <SelectContent>
                  {divisions?.map((d) => {
                    return (
                      <SelectItem key={d.id} value={d.id}>
                        {d.nom}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
            </div>
            <div className="w-full sm:w-[48%]">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
                </label>
                <Input
                id="description"
                name="description"
                placeholder="Description du service"
                value={formData.description}
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