"use client"; // Add this directive since we're using client-side state

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function AddUserPage() {
  const router = useRouter(); // Initialize the router

  // State to manage form inputs
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    service: "",
    serviceId: "",
    role: "",
    roleId: "",
    password: "",
    repeatPassword: "",
  });
  const [services, setServices] = useState<{ id: number; nom: string; description: string; division: number }[]>([]);
  const [roles, setRoles] = useState<{ id: number; nom: string; description: string; }[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/service");
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error("Error fetching sevices:", error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/role");
          const data = await response.json();
          setRoles(data);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
  
      fetchData();
    }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Select changes
  const handleServiceChange = (value: string) => {
    const selectedService = services.find((service) => service.id.toString() === value);
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceId: selectedService.id.toString(), // ✅ Store as a number
        service: selectedService.nom, // ✅ Update service name (optional)
      }));
    }
  };

  // Handle Select changes
  const handleRoleChange = (value: string) => {
    const selectedRole = roles.find((role) => role.id.toString() === value);
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        roleId: selectedRole.id.toString(), // ✅ Store as a number
        role: selectedRole.nom, // ✅ Update service name (optional)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate passwords match
    if (formData.password !== formData.repeatPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
  
    // Prepare the user data to be saved
    const newUser = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      password: formData.password,
      repeatPassword: formData.repeatPassword,
      serviceId: formData.serviceId ? formData.serviceId : null, // ✅ Convert to number or allow null
      roleId: formData.roleId ? formData.roleId : null, // ✅ Convert to number or allow null
    };
  
    try {
      console.log(newUser);
      // Call the addUser API to add the new user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json(); // Parse the response JSON
  
      if (result.error) {
        // Show server-side validation error message
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de l'ajout de l'utilisateur.",
          variant: "destructive",
        });
      } else {
        // Show success toast
        toast({
          title: "Utilisateur ajouté",
          description: "L'utilisateur a été ajouté avec succès.",
        });
        // Redirect
        router.push("/dashboard/users");
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de l'utilisateur.",
        variant: "destructive",
      });
    }
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

            <div className="flex gap-4 w-full">
              <div className="w-full sm:w-[48%]">
                  <label htmlFor="service" className="block text-sm font-medium mb-1">
                  Service
                  </label>
                  <Select value={formData.serviceId ? formData.serviceId.toString() : ""} onValueChange={handleServiceChange} >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Séléctionner le service --" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) =>{
                        return(
                          <SelectItem key={service.id} value={service.id.toString()}>{service.nom}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
              </div>
            

              <div className="w-full sm:w-[48%]">
                  <label htmlFor="role" className="block text-sm font-medium mb-1">
                    Rôle
                  </label>
                  <Select value={formData.roleId ? formData.roleId.toString() : ""} onValueChange={handleRoleChange} >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Séléctionner un rôle --" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) =>{
                        return(
                          <SelectItem key={role.id} value={role.id.toString()}>{role.nom}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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