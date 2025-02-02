"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  serviceId: string | null;
  service: string | null;
  role: string | null;
  roleId: string | null;
}

interface EditUserSheetProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

export function EditUserSheet({ user, isOpen, onOpenChange, onSave }: EditUserSheetProps) {

  const [services, setServices] = useState<{ id: number; nom: string; description: string; division: number }[]>([]);
  const [roles, setRoles] = useState<{ id: number; nom: string; description: string; }[]>([]);

  const [formData, setFormData] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    service: user.service || "",
    serviceId: user.serviceId || null,
    role: user.role || "",
    roleId: user.roleId || null,
  });

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      service: user.service || "",
      serviceId: user.serviceId || null,
      role: user.role || "",
      roleId: user.roleId || null,
    });
  }, [user]);


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Select changes
  const handleServiceChange = (value: string) => {
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        serviceId: null, // ✅ Allow unselecting a service
        service: "",   // ✅ Allow unselecting a service
      }));
      return;
    }
    if (value == "aucun") {
      setFormData((prev) => ({
        ...prev,
        serviceId: null, // ✅ Allow unselecting a service
        service: "Aucun",   // ✅ Allow unselecting a service
      }));
      return;
    }
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
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        roleId: null, // ✅ Allow unselecting a service
        role: "",   // ✅ Allow unselecting a service
      }));
      return;
    }
    if(value === "aucun"){
      setFormData((prev) => ({
        ...prev,
        roleId: null, // ✅ Allow unselecting a service
        role: "Aucun",   // ✅ Allow unselecting a service
      }));
      return;
    }
    const selectedRole = roles.find((role) => role.id.toString() === value);
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        roleId: selectedRole.id.toString(), // ✅ Store as a number
        role: selectedRole.nom, // ✅ Update role name (optional)
      }));
    }
  };

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      ...formData,
    };
    onSave(updatedUser);
    onOpenChange(false); // Close the sheet after saving
  };



  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier l'utilisateur</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <Input

            name="nom"
            placeholder="Nom..."
            value={formData.nom}
            onChange={handleInputChange}

          />
          <label htmlFor="prenom" className="block text-sm font-medium mb-1">
            Prénom
          </label>
          <Input

            name="prenom"
            placeholder="Prénom..."
            value={formData.prenom}
            onChange={handleInputChange}

          />
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input

            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleInputChange}

          />
          <label htmlFor="telephone" className="block text-sm font-medium mb-1">
            Téléphone
          </label>
          <Input

            name="telephone"
            placeholder="Téléphone..."
            value={formData.telephone}
            onChange={handleInputChange}

          />
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service
          </label>
          <Select value={formData.serviceId ? formData.serviceId.toString() : ""} onValueChange={handleServiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="-- Séléctionner le service --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="none" value="aucun">Aucun</SelectItem>
              {services.map((service) =>{
                return(
                  <SelectItem key={service.id} value={service.id.toString()}>{service.nom}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Rôle
          </label>
          <Select value={formData.roleId ? formData.roleId.toString() : ""} onValueChange={handleRoleChange} >
            <SelectTrigger>
              <SelectValue placeholder="-- Séléctionner un rôle --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="none" value="aucun">Aucun</SelectItem>
              {roles.map((role) =>{
                return(
                  <SelectItem key={role.id} value={role.id.toString()}>{role.nom}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}