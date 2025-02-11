"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Download,
  Eye,
  ArrowRightLeft,
  Building,
  Mail,
  DownloadIcon,
  Calendar,
  CalendarDays,
  FileType2,
  MessageSquareQuoteIcon,
  Newspaper,
  Paperclip,
  User,
  File,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter, useSearchParams } from "next/navigation"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";



// Définition du type pour un départ
type Arrivee = {
  id: string;
  idOrdre: string;
  dateArv: string;
  dateOrigin: string;
  expediteur: Etablissement;
  objet: string;
  numero: string;
  nbrFichier: number;
  typeSupport: string;
  typeCourrier: string;
  traitePar:Utilisateur;
  fichiers:Fichier[]
  courrierId?:string;
  courrier?:Courrier
};
type Utilisateur = {
  id:string,
  nom:string
}
type Etablissement = {
  id:string,
  nom:string
}
type Fichier = {
id:string,
nom:string,
url:string
}
type Courrier={
  id:string,
}
type Envoi={
  expediteurId:string,
  destinataireId:string,
  note?:string,
  courrierId?:string,
  createdAt?:string
}

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [arrivee,setArrivee]=useState<Arrivee>();
  const [envoi,setEnvoi]=useState<Envoi>();
  const [utilisateurs,setUtilisateurs]=useState<Utilisateur[]>();
  const [loaded, setLoaded] = useState(false);
  const [idCourrier,setIdCourrier]=useState("");
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [formData,setFormData] = useState({
    expediteurId:"a2b07ffd-e7fe-11ef-9d4f-3c7c3f5e4801",
    destinataireId:"",
    note:"",
    courrierId:"",
    createdAt:new Date(Date.now()).toISOString()

  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUtilisateurs(data);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`/api/arrivees?id=${id}`); // Fetch specific arrivee by ID
        const data = await response.json();
        setLoaded(true);
        setArrivee(data);
        
      };
      fetchData();
    }
   
  }, [id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowDetails = (arrivee: Arrivee) => {
    // setIsDetailDialogOpen(true);
  };
  useEffect(() => {
    if (arrivee?.courrier?.id) {
        setFormData({
            ...formData,
            courrierId: arrivee.courrier.id
        });
    }
}, [arrivee]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    console.log(formData);
    try {
      const response = await fetch("/api/envoi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: "Envoi ajouté",
          description: "L'Envoi a été ajouté avec succès.",
        });
        router.push("/dashboard/arrivees");
      } else {
        throw new Error("Échec de l'ajout d'Evoi");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout d'Envoi.",
        variant: "destructive",
      });
    }

   
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/dashboard/arrivees");
  };




  return (
    <>
      {!loaded ? (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <BreadcrumbPage>Transferrer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="container">
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center justify-center mt-10">
            <Card className="w-[450px] ">
              <CardHeader>
                <CardTitle>Transferrer le courrier</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex space-x-2 pb-2">
                        <User /> <Label htmlFor="name"> Destiné à :</Label>
                      </div>
                      <Select
                value={envoi?.destinataireId}
                onValueChange={(value)=>{setFormData((prev) => ({ ...prev, destinataireId:value }))}}
                name="destinationId"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Destination --" />
                </SelectTrigger>
                <SelectContent>
                  {utilisateurs?.map((e) => {
                    return (
                      <SelectItem key={e.id} value={e.id}>
                        {e.nom}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <div className="flex space-x-2 pb-2">
                        <MessageSquareQuoteIcon />
                        <Label htmlFor="framework">Note </Label>
                      </div>
                      <Input id="name" name="note" placeholder="note" value={formData?.note} onChange={handleInputChange}/>
                    </div>
                   
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleCancel} variant="outline">Fermer</Button>
                <Button onClick={handleSubmit} type="submit">Transferrer</Button>
              </CardFooter>
            </Card>
            <Card className="w-[450px] ">
              <CardHeader className="bg-sky-400">
                <div className="flex mr-px">
                  <Mail className="mr-4" />

                  <CardTitle>Détails du courrier</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex space-x-2 pb-2">
                      <Calendar />{" "}
                      <p>
                        <b> ID et Année: </b>
                        {arrivee?.idOrdre}
                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <CalendarDays />
                      <p>
                        <b> Date : </b>
                        {arrivee?.dateOrigin}
                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <User />
                      <p>
                        <b> Éxpediteur : </b>
                       {arrivee?.expediteur.nom}


                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <Newspaper />
                      <p>
                        <b> Objet : </b>
                        {arrivee?.objet}
                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <Paperclip />
                      <p>
                        <b> Type de support : </b>
                        {arrivee?.typeSupport}
                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <FileType2 />
                      <p>
                        <b> Type de courrier : </b>
                        {arrivee?.typeCourrier}
                      </p>
                    </div>
                    <div className="flex space-x-2 pb-2">
                      <File />
                      <p>
                        <b> Fiche : </b>
                        <Button
                          className="mr-2"
                          variant="see"
                          size="sm"
                          // onClick={() => handleShowDetails()}
                        >
                          <Eye />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() => handleShowDetails()}
                        >
                          <DownloadIcon />
                        </Button>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleCancel} variant="outline">retour à la liste</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )}
  </>
);
}
