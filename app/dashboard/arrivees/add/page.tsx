"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash,
  Building,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recuPar: "",
    traitePar: "",
    numeroOrdre: "",
    dateArrivee: "",
    objet: "",
    provenance: "",
    fichier: "",
    nombreFichiers: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/arrivee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Arrivée ajoutée",
          description: "L'arrivée a été ajoutée avec succès.",
        });
        router.push("/dashboard/arrivees");
      } else {
        throw new Error("Échec de l'ajout de l'arrivée");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de l'arrivée.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Bureau d'ordre</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Arrivées</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="bdarrivee">
        <Card className="mycard">
          <div className="container">
            <div className="flex flex-col space-y-4 p-4">
              <CardHeader>
                <h1 className="rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 from-40% to-blue-500 text-gray-900 text-2xl font-semibold p-3 flex items-center justify-center">
                  <span>Créer une arrivée</span>
                  <Building />
                </h1>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  {/* Réception et traitement */}
                  <div className="flex gap-4 w-full">
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="recuPar" className="block text-sm font-medium mb-1">
                        Reçu Par * :
                      </label>
                      <Input
                        id="recuPar"
                        name="recuPar"
                        placeholder="Nom du réceptionnaire"
                        value={formData.recuPar}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="traitePar" className="block text-sm font-medium mb-1">
                        Traité par * :
                      </label>
                      <Input
                        id="traitePar"
                        name="traitePar"
                        placeholder="Nom du responsable"
                        value={formData.traitePar}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Numéro d'ordre et date */}
                  <div className="flex gap-4 w-full">
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="numeroOrdre" className="block text-sm font-medium mb-1">
                        Numéro d'ordre *
                      </label>
                      <Input
                        id="numeroOrdre"
                        name="numeroOrdre"
                        placeholder="Numéro d'ordre"
                        value={formData.numeroOrdre}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="dateArrivee" className="block text-sm font-medium mb-1">
                        Date & Heure d'Arrivée *
                      </label>
                      <Input
                        id="dateArrivee"
                        name="dateArrivee"
                        type="datetime-local"
                        value={formData.dateArrivee}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Objet et Provenance */}
                  <div className="flex gap-4 w-full">
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="objet" className="block text-sm font-medium mb-1">
                        Objet *
                      </label>
                      <Input
                        id="objet"
                        name="objet"
                        placeholder="Objet du courrier"
                        value={formData.objet}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="provenance" className="block text-sm font-medium mb-1">
                        Provenance *
                      </label>
                      <Input
                        id="provenance"
                        name="provenance"
                        placeholder="Origine du courrier"
                        value={formData.provenance}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Fichier et Nombre de fichiers */}
                  <div className="flex gap-4 w-full">
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="fichier" className="block text-sm font-medium mb-1">
                        Fichier *
                      </label>
                      <Input
                        id="fichier"
                        name="fichier"
                        type="file"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <label htmlFor="nombreFichiers" className="block text-sm font-medium mb-1">
                        Nombre de Fichiers *
                      </label>
                      <Input
                        id="nombreFichiers"
                        name="nombreFichiers"
                        type="number"
                        value={formData.nombreFichiers}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <div className="mt-6 flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                      Créer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
