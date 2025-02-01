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
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
  



// Définition du type pour un départ
type Depart = {
  id: string;
  signePar: string;
  traitePar: string;
  numeroOrdre: string;
  dateDepart: string;
  objet: string;
  destination: string;
  fichier: string;
  nombreFichiers: string;
};

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [departs, setDeparts] = useState<Depart[]>([]);
  const [filteredData, setFilteredData] = useState<Depart[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepart, setSelectedDepart] = useState<Depart | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const router = useRouter();









  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/depart");
      const data = await response.json();
      setDeparts(data);
      setFilteredData(data);
    };

    fetchData();
  }, []);





  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = departs.filter(
      (item) =>
        item.signePar.toLowerCase().includes(searchValue) ||
        item.traitePar.toLowerCase().includes(searchValue) ||
        item.numeroOrdre.toLowerCase().includes(searchValue) ||
        item.objet.toLowerCase().includes(searchValue) ||
        item.destination.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    { name: "ID", selector: (row: Depart) => row.id, sortable: true },
    { name: "Signé Par", selector: (row: Depart) => row.signePar, sortable: true },
    { name: "Traité Par", selector: (row: Depart) => row.traitePar, sortable: true },
    { name: "Numéro d'Ordre", selector: (row: Depart) => row.numeroOrdre, sortable: true },
    { name: "Date de Départ", selector: (row: Depart) => row.dateDepart, sortable: true },
    { name: "Objet", selector: (row: Depart) => row.objet, sortable: true },
    { name: "Destination", selector: (row: Depart) => row.destination, sortable: true },
    {
      name: "Actions",
      cell: (row: Depart) => (
        <div className="space-x-2 flex">
          <Button variant="see" size="sm" onClick={() => handleShowDetails(row)}>
            <Eye />
          </Button>
          <Button variant="update" size="sm" onClick={() => handleShowDetails(row)}>
            <ArrowRightLeft />
            
          </Button>
        </div>
      ),
    },
  ];

  const handleShowDetails = (depart: Depart) => {
    setSelectedDepart(depart);
    setIsDetailDialogOpen(true);
  };

  
  const handleAddDepart = () => {
    router.push("/dashboard/departs/add");
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
                <BreadcrumbLink href="#">Bureau d'ordre</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="container">
        <div className="flex flex-col space-y-4 p-4">
         <div className="flex items-center ">
        
  
    <Card className="w-[450px] ">
      <CardHeader>
        <CardTitle>Transferrer le courrier</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Destiné à : </Label>
              <Select>
            <SelectTrigger className="">
                <SelectValue placeholder="Sélectionner un utilisateur principa" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>


            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Note </Label>
              <Input id="name" placeholder="note" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Note </Label>
              <Input id="name" placeholder="note" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Fermer</Button>
        <Button>Transferrer</Button>
      </CardFooter>
    </Card>
    <Card className="w-[450px] ">
      <CardHeader className="bg-sky-400"> 
        <div className="flex mr-px">

      <Mail className="mr-4"/>

        <CardTitle>Détails du courrier</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <p><b>Date : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>ID et Année : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>Éxpediteur : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>Objet : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>Type de support : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>Type de courrier : </b> ipsum dolor sit amet,  elit. Explicabo </p>
              <p><b>Fiche : </b> 
              <Button 
              className="mr-2"
            variant="see"
            size="sm"
            onClick={() => handleShowDetails()}
          >
            <Eye />
          </Button> 
              <Button
            variant="see"
            size="sm"
            onClick={() => handleShowDetails(row)}
          >
            <DownloadIcon />
          </Button> 
          
          </p>


            </div>
           
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">retour à la liste</Button>
      </CardFooter>
    </Card>
    </div>

</div>
    </div>
    </>

  );
}
