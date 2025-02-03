"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Pencil, Lock, UserPen } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

// Define types for user data
interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  profilePicture: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>({
    id: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    profilePicture: "/profile.png", // placeholder to fix later
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState(user.profilePicture);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchUserData = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Placeholder for updating user information
  const updateUserInfo = async () => {
    try {
      const response = await fetch(
        `https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      alert("Personal information updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update personal information");
    }
  };

  // Placeholder for updating password
  const updatePassword = async () => {
    try {
      if (passwords.newPassword !== passwords.confirmPassword) {
        alert("New password and confirmation do not match!");
        return;
      }

      const response = await fetch(
        `https://67978c4fc2c861de0c6d1fb0.mockapi.io/uni/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: passwords.newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      alert("Password updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update password");
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const userId = "2";
    fetchUserData(userId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle Image Change
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

  return (
    <Card className="container my-8 shadow-xl rounded-2xl p-8 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-center text-3xl py-3 flex items-center gap-1 self-center font-bold">
          <span> Profil de l'utilisateur</span>
          <UserPen />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6 border-b pb-6">
          <Image
            src={imagePreview}
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

        {/* Toggle Edit Mode */}
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

        {/* Section Informations Personnelles */}
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
              name="telephone"
              value={user.telephone}
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

        {/* Update Personal Info Button */}
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

        {/* Section Changer le mot de passe */}
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
