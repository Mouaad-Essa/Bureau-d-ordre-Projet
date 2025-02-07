"use client";
import jwt from "jsonwebtoken";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Pencil, Lock, UserPen } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  picture?: string;
  serviceId?: string;
  roleId?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    picture: "/profile.png",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState(user.picture);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        return decodeURIComponent(match[2]);
      } else {
        return null;
      }
    };

    const token = getCookie("token");

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { id: string };
        if (decodedToken?.id) {
          // Fetch user data using the decoded user ID
          fetchUserById(decodedToken.id);
        } else {
          setError("No valid user ID found in token");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Failed to decode token");
        setIsLoading(false);
      }
    } else {
      setError("No token found in cookies");
      setIsLoading(false);
    }
  }, []);

  const fetchUserById = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserInfo = async () => {
    try {
      const token = document.cookie.match(/(^| )token=([^;]+)/)?.[2];
      if (!token) {
        alert("Token is missing.");
        return;
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          updateType: "personalInfo", // Indicate that this is a personal info update
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.tel,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Informations personnelles mises à jour avec succès.");
      } else {
        alert(result.error || "Erreur de mise à jour des informations.");
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
      alert("Erreur lors de la mise à jour des informations.");
    }
  };

  const updatePassword = async () => {
    try {
      const token = document.cookie.match(/(^| )token=([^;]+)/)?.[2];
      if (!token) {
        alert("Token is missing.");
        return;
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          updateType: "password", // Indicate that this is a password update
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Mot de passe mis à jour avec succès.");
      } else {
        alert(result.error || "Erreur de mise à jour du mot de passe.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="container my-8 shadow-xl rounded-2xl p-8 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-center text-3xl py-3 flex items-center gap-1 self-center font-bold">
          <span> Profil de l'utilisateur</span>
          <UserPen />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6 border-b pb-6">
          <Image
            src={imagePreview || "/profile.png"}
            alt="Profile Image"
            width={120}
            height={120}
            className="rounded-full border shadow-md"
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Changer la photo</Label>
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">Informations Personnelles</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">Mode édition</span>
            <Switch
              checked={isEditable}
              onCheckedChange={() => setIsEditable(!isEditable)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-b pb-6">
          <div>
            <Label className="text-sm font-medium">Nom</Label>
            <Input
              name="nom"
              value={user.nom}
              onChange={handleChange}
              readOnly={!isEditable}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Prénom</Label>
            <Input
              name="prenom"
              value={user.prenom}
              onChange={handleChange}
              readOnly={!isEditable}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Téléphone</Label>
            <Input
              name="tel"
              value={user.tel || ""}
              onChange={handleChange}
              readOnly={!isEditable}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={!isEditable}
              className="bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center border-b pb-6">
          <Button
            variant="outline"
            disabled={!isEditable}
            onClick={updateUserInfo}
            className="flex items-center gap-2"
          >
            <Pencil size={16} /> Enregistrer les modifications
          </Button>
        </div>

        <div className="mt-6 border-b pb-6">
          <h2 className="text-lg font-semibold mb-4">
            Changer le mot de passe
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium">
                Nouveau mot de passe
              </Label>
              <Input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                readOnly={!isEditable}
                className="bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm font-medium">
                Confirmer le mot de passe
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                readOnly={!isEditable}
                className="bg-gray-50"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              disabled={!isEditable}
              onClick={updatePassword}
              className="flex items-center gap-2"
            >
              <Lock size={16} /> Mettre à jour le mot de passe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
