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

interface Role {
  id: number;
  role: string;
  nom: string;
  description: string;
  privileges: {
    canView: boolean,
    canEditEstablishment: boolean,
    canCreateDepart: boolean,
    canCreateArrive: boolean,
    isSuperAdmin: boolean,
  },
}

interface EditRoleSheetProps {
  role: Role;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedRole: Role) => void;
}

export function EditRoleSheet({ role, isOpen, onOpenChange, onSave }: EditRoleSheetProps) {
  const [formData, setFormData] = useState({
    role: role.role,
    nom: role.nom,
    description: role.description,
    privileges: {
      canView: false,
      canEditEstablishment: false,
      canCreateDepart: false,
      canCreateArrive: false,
      isSuperAdmin: false,
    },
  });

  // Sync state with the selected user whenever it changes
  useEffect(() => {
    setFormData({
      role: role.role,
      nom: role.nom,
      description: role.description,
      privileges: {
        canView: false,
        canEditEstablishment: false,
        canCreateDepart: false,
        canCreateArrive: false,
        isSuperAdmin: false,
      },
    });
  }, [role]);

  useEffect(() => {
    const fetchRolePrivileges = async () => {
      try {
        const response = await fetch(`/api/role/${role.id}`); // Fetch privileges from API
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error("Failed to fetch role privileges");
        }
  
        // Convert privilege list into boolean object
        const privileges = {
          canView: data.privileges.includes("canView"),
          canEditEstablishment: data.privileges.includes("canEditEstablishment"),
          canCreateDepart: data.privileges.includes("canCreateDepart"),
          canCreateArrive: data.privileges.includes("canCreateArrive"),
          isSuperAdmin: data.privileges.includes("isSuperAdmin"),
        };
  
        setFormData({
          role: data.nom, // Update role name
          nom: data.nom,
          description: data.description,
          privileges, // Assign privileges from API response
        });
      } catch (error) {
        console.error("Error fetching role privileges:", error);
      }
    };
  
    if (role.id && isOpen) {
      fetchRolePrivileges(); // ✅ Fetch updated role only when the form is opened
    }
    
  }, [role.id && isOpen]); // Fetch data when role.id changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedRole = {
      id: role.id,
      ...formData,
    };
    onSave(updatedRole);
    onOpenChange(false); // Close the sheet after saving
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier un role</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Rôle
          </label>
          <Input
            name="nom"
            placeholder="Role"
            value={formData.nom}
            onChange={handleInputChange}
          />
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Input
            name="description"
            placeholder="Description"
            value={formData.description ? formData.description : ""}
            onChange={handleInputChange}
          />

          {/* Privilèges Section */}
          <fieldset className="border-t border-gray-300 mt-4 pt-4">
              <legend className="text-base font-semibold text-gray-700 mb-2">
                Privilèges
              </legend>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges?.canView || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privileges: { ...formData.privileges, canView: e.target.checked },
                      })
                    }
                  />
                  <span>Peut consulter</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges?.canEditEstablishment || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privileges: {
                          ...formData.privileges,
                          canEditEstablishment: e.target.checked,
                        },
                      })
                    }
                  />
                  <span>Peut modifier établissement</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges?.canCreateDepart || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privileges: {
                          ...formData.privileges,
                          canCreateDepart: e.target.checked,
                        },
                      })
                    }
                  />
                  <span>Peut créer un départ</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges?.canCreateArrive || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privileges: {
                          ...formData.privileges,
                          canCreateArrive: e.target.checked,
                        },
                      })
                    }
                  />
                  <span>Peut créer une arrivée</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privileges?.isSuperAdmin || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privileges: {
                          ...formData.privileges,
                          isSuperAdmin: e.target.checked,
                        },
                      })
                    }
                  />
                  <span>Super Admin</span>
                </label>
              </div>
            </fieldset>


        </div>
        <SheetFooter>
          <Button onClick={handleSave}>Modifier</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}