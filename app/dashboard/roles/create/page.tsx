"use client"; // Add this directive since we're using client-side state

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function AddUserPage() {
  const router = useRouter(); // Initialize the router

  // State to manage form inputs
  const [formData, setFormData] = useState({
    role: "",
    nom: "",
    description: "",
  });

  // Handle input changes
  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement> (e: React.ChangeEvent<T>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the Service data to be saved
    const newService = { ...formData };

    try {
      // Call the addService API to add the new Service
      const response = await fetch("/api/role", {
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
          description: "le rôle a été ajouté avec succès.",
        });
        //redirect
        router.push("/dashboard/roles");
      } else {
        throw new Error("Failed to add rôle");
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du rôle.",
        variant: "destructive",
      });
    }
  }

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/roles"); // Redirect to /dashboard/roles
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
                  <BreadcrumbLink href="/dashboard">
                    Bureau d'ordre
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/roles">
                    Rôles
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
            <h1 className="text-2xl font-bold">Ajouter un nouveau rôle</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]"> {/* Adjust to 50% on larger screens */}
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Rôle
                </label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Rôle"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[48%]"> {/* Adjust to 50% on larger screens */}
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
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[98%]">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
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