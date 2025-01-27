"use client"; // Add this directive since we're using client-side state

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function AddUserPage() {
  const router = useRouter(); // Initialize the router

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    repeatPassword: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.repeatPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Prepare the user data to be saved
    const newUser = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      password: formData.password,
    };

    // Log the new user (replace this with your actual save logic)
    console.log("New User:", newUser);

    // Reset the form after submission
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      password: "",
      repeatPassword: "",
    });

    alert("Utilisateur ajouté avec succès!");
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/users"); // Redirect to /dashboard/users
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
                  <BreadcrumbLink href="/dashboard/users">
                    Utilisateurs
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
            <h1 className="text-2xl font-bold">Ajouter un nouveau utilisateur</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Nom and Prénom */}
            <div className="flex gap-4 w-full">
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
              <div className="w-full sm:w-[48%]"> {/* Adjust to 50% on larger screens */}
                <label htmlFor="prenom" className="block text-sm font-medium mb-1">
                  Prénom
                </label>
                <Input
                  id="prenom"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Email and Téléphone */}
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <label htmlFor="telephone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <Input
                  id="telephone"
                  name="telephone"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password and Repeat Password */}
            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <label htmlFor="repeatPassword" className="block text-sm font-medium mb-1">
                  Répéter le mot de passe
                </label>
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  placeholder="Répéter le mot de passe"
                  value={formData.repeatPassword}
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