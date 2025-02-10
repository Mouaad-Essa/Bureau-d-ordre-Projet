"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Eye,
  ArrowRightLeft,
  Download,
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
import AlertDialogDetail from "../_components/arriveeDetailsDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as XLSX from "xlsx";
import autoTable, { Row } from "jspdf-autotable";
import jsPDF from "jspdf";

// Définition du type pour une arrivée
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

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [arrivees, setArrivees] = useState<Arrivee[]>([]);
  const [filteredData, setFilteredData] = useState<Arrivee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedArrivee, setSelectedArrivee] = useState<Arrivee | null>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [showFile,setShowFile] = useState(false);
  const[file,setFile] = useState<Fichier>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/arrivees");
      const data = await response.json();
      setArrivees(data);
      setFilteredData(data);
      setLoaded(true);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filtered = arrivees.filter(
      (item) =>
        item.expediteur.nom.toLowerCase().includes(searchValue) ||
        item.objet.toLowerCase().includes(searchValue) ||
        item.numero.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      name: "Date d'Arrivée",
      selector: (row: Arrivee) => new Date(row.dateArv).toLocaleString(),
      sortable: true,
    },
    {
      name: "Expéditeur",
      selector: (row: Arrivee) => row.expediteur.nom,
      sortable: true,
    },
    { name: "Objet", selector: (row: Arrivee) => row.objet, sortable: true },
   
    {
      name: "Trier Par",
      selector: (row: Arrivee) => row.traitePar.nom,
      sortable: true,
    },
       {
         name: "Fichier",
         cell: (row: Arrivee) => (
          <div className="space-x-2 flex">
          {row?.fichiers?.length>0 ? (
            <Button
              variant="see"
              size="sm"
              onClick={() => handleShowDetails(row)}
            >
              <Eye />
            </Button>
          ) : null}
        </div>
         ),
       },
       {
         name: "Actions",
         cell: (row: Arrivee) => (
           <div className="space-x-2 flex">
             <Button
               variant="update"
               size="sm"
               onClick={() => handleTransfer(row.id)}
             >
               <ArrowRightLeft />
             </Button>
           </div>
         ),
       },
       { name: "Type", selector: (row: Arrivee) => row.typeCourrier, sortable: true },

  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des arrivées", 10, 10);

    const tableData = filteredData.map((row) => [
      row.dateArv,
      row.expediteur.nom,
      row.objet,
      row.traitePar.nom
      
    
    ]);

    autoTable(doc, {
      head: [
        [
          "Date ",
          "Expéditeur",
          "Objet",
          "Trier Par",
          "Expediteur",
        ],
      ],
      body: tableData,
    });

    doc.save("Arrivées.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Arrivees");
    XLSX.writeFile(workbook, "Arrivées.xlsx");
  };

  const handleShowDetails = (arrivee: Arrivee) => {
    setSelectedArrivee(arrivee);
    setIsDetailDialogOpen(true);
  };


  const handleAddArrivee = () => {
    router.push("/dashboard/arrivees/add");
  };

  const handleTransfer = (id: string) => {
    router.push("/dashboard/arrivees/" + id);
  };

  const handleShowFile2 = ()=>{
    window.open('/dashboard/arrivees');
  }

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
                    <BreadcrumbPage>Liste des Arrivées</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-col space-y-4 p-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              {/* Left Side: Search Bar and Add New Button */}
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    value={searchText}
                    onChange={handleSearch}
                    className="pl-8 w-full md:w-[300px]" // Adjust width as needed
                  />
                </div>

                <Button
                  onClick={handleAddArrivee}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Ajouter
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Exporter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportToPDF}>PDF</DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToExcel}>
                    Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-full">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                defaultSortFieldId={1}
                paginationComponentOptions={paginationComponentOptions}
              />
            </div>
          </div>
          <AlertDialogDetail
            isOpen={isDetailDialogOpen}
            onClose={() => setIsDetailDialogOpen(false)}
            Arrivee={selectedArrivee}
          />
    
        </>
      )}
    </>
  );
}