"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarTrigger
  } from "@/components/ui/sidebar"
import { Search, Plus, Download, Edit, Trash } from "lucide-react"; // Import icons
import { Input } from "@/components/ui/input"; // Input component for search bar
import { Button } from "@/components/ui/button"; // Button component
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Dropdown menu components
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import EditPole from "./EditPole";
// import { EditUserSheet } from "./EditUserSheet"; // Import the new component
// import { AddUserSheet } from "./AddUserSheet";
// import { ConfirmDeleteDialog } from "./DeleteDialog";


const poles= [
    {
    id:1,
      nom: "Pôle Accueil",
      responsable: "Ahmed El Amrani",
      tachesPrincipales: [
        "Accueil des visiteurs",
        "Gestion des demandes de renseignement"
      ],
      contacts: "06XXXXXXXX, accueil@...",
      statutCommentaires: "Assurez-vous que le personnel soit formé sur les procédures."
    },
    {
        id:2,

      nom: "Pôle Administration",
      responsable: "Fatima Zahra",
      tachesPrincipales: [
        "Gestion des documents administratifs",
        "Archivage"
      ],
      contacts: "06XXXXXXXX, admin@...",
      statutCommentaires: "Mise à jour des archives en cours."
    },
    {
        id:3,

      nom: "Pôle Finances",
      responsable: "Rachid Benjelloun",
      tachesPrincipales: [
        "Gestion des budgets",
        "Paiements",
        "Suivi des factures"
      ],
      contacts: "06XXXXXXXX, finance@...",
      statutCommentaires: "Révision du budget du trimestre en cours."
    },
    {
        id:4,

      nom: "Pôle Ressources Humaines",
      responsable: "Souad Bakkali",
      tachesPrincipales: [
        "Recrutement",
        "Gestion des contrats",
        "Formations"
      ],
      contacts: "06XXXXXXXX, rh@...",
      statutCommentaires: "Plan de formation à finaliser."
    },
    {
        id:5,
      nom: "Pôle Juridique",
      responsable: "Yassine Idrissi",
      tachesPrincipales: [
        "Gestion des contrats légaux",
        "Conseils juridiques"
      ],
      contacts: "06XXXXXXXX, juridique@...",
      statutCommentaires: "Consultation pour nouveaux contrats."
    },
    {
        id:6,
      nom: "Pôle Logistique",
      responsable: "Khalid El Yassir",
      tachesPrincipales: [
        "Gestion des fournitures",
        "Équipements",
        "Espace de travail"
      ],
      contacts: "06XXXXXXXX, logistique@...",
      statutCommentaires: "Inventaire mensuel prévu."
    },
    {
        id:7,
      nom: "Pôle Communication",
      responsable: "Nabila Kabbaj",
      tachesPrincipales: [
        "Communication interne",
        "Mise à jour des informations publiques"
      ],
      contacts: "06XXXXXXXX, comm@...",
      statutCommentaires: "Préparer le communiqué de janvier."
    },
    {
        id:8,
      nom: "Pôle Informatique",
      responsable: "Mustapha Ouazzani",
      tachesPrincipales: [
        "Gestion des systèmes informatiques",
        "Maintenance du réseau"
      ],
      contacts: "06XXXXXXXX, info@...",
      statutCommentaires: "Mise à jour du système de gestion de documents prévue."
    },
    {
        id:9,
      nom: "Pôle Gestion des Projets",
      responsable: "Samira El Hassani",
      tachesPrincipales: [
        "Suivi des projets en cours",
        "Gestion des ressources"
      ],
      contacts: "06XXXXXXXX, projets@...",
      statutCommentaires: "Définition des objectifs pour le prochain trimestre."
    },
    {
        id:10,
      nom: "Pôle Qualité et Conformité",
      responsable: "Ahmed Bouzid",
      tachesPrincipales: [
        "Vérification du respect des normes",
        "Contrôles de qualité"
      ],
      contacts: "06XXXXXXXX, qualite@...",
      statutCommentaires: "Inspection annuelle de la qualité prévue."
    }
  ];



  // Custom French translations for pagination
  const paginationComponentOptions = {
    rowsPerPageText: 'Lignes par page',
    rangeSeparatorText: 'de',
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tous',
  };
  

export default function Page(){
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
    const [selectedPole, setSelectedPole] = useState<{
    id: number;
    nom:string;
    responsable: string;
    tachesPrincipales: string;
    contacts: string;
    statutCommentaires: string;
    } | null>(null);

    // Handle edit button click
    const handleEditClick = (pole: any) => {
        setSelectedPole(pole);
        setIsSheetOpen(true);
    };

    //handle add button click
    const handleAddclick = () => {
        setIsAddSheetOpen(true);
    };

    const handleDeleteClick = (pole: any) => {
        setSelectedPole(pole);
        setIsDialogOpen(true);
    };

    // Column definitions (in French)
    const columns = [
        {
        name: 'ID',
        selector: (row: { id: any; }) => row.id,
        sortable: true,
        },
        {
        name: 'Nom',
        selector: (row: { nom: any; }) => row.nom,
        sortable: true,
        },
        {
        name: 'responsable',
        selector: (row: { responsable: any; }) => row.responsable,
        sortable: true,
        },
        {
        name: 'tachesPrincipales',
        selector: (row: { tachesPrincipales: any; }) => row.tachesPrincipales,
        sortable: true,
        },
        {
        name: 'contacts',
        selector: (row: { contacts: any; }) => row.contacts,
        sortable: true,
        },
        {
            name: 'statut',
            selector: (row: { statutCommentaires: any; }) => row.statutCommentaires,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div className="space-x-2">
                    <Button variant="update" onClick={() => handleEditClick(row)}><Edit /></Button>
                    <Button variant="delete" onClick={() => handleDeleteClick(row)}><Trash /></Button>
                </div>
            )
        }
    ];

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(poles);
  
    // Handle search input change
    const handleSearch = (e: { target: { value: string; }; }) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchText(searchValue);
  
      const filtered = poles.filter(
        item =>
          item.nom.toLowerCase().includes(searchValue) ||
          item.responsable.toLowerCase().includes(searchValue) ||
          item.tachesPrincipales.toString().includes(searchValue)
      );
  
      setFilteredData(filtered);
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Liste des utilisateurs', 10, 10);
    
        // Prepare table data
        const tableData = filteredData.map(row => [
            row.id,
            row.nom,
            row.responsable,
            row.statutCommentaires,
            row.contacts,
            row.tachesPrincipales
        ]);
    
        // Generate table
        autoTable(doc, {
            head: [['ID', 'exemple Pole', 'exemple pole']],
            body: tableData,
        });
    
        // Save the PDF
        doc.save('poles.pdf');
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Utilisateurs');
        XLSX.writeFile(workbook, 'utilisateurs.xlsx');
    };

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Chargement...</div>; // Show a loading state to avoid hydration errors
    }
    return (
        <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Bureau d'ordre
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage></BreadcrumbPage>
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

            {/* Add New Button */}
            <Button onClick={handleAddclick} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
                </div>

                {/* Right Side: Export Dropdown */}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Exporter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportToPDF}>PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToExcel}>Excel</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

                {/* Main Content (e.g., Data Table) */}
                <div className="w-full">
                    {/* Data Table */}
                    <DataTable
                        title="Liste des utilisateurs"
                        columns={columns}
                        data={filteredData}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        highlightOnHover
                        defaultSortFieldId={1} // Default sorting on the first column (ID)
                    />
                </div>
            </div>

            {/* Edit User Sheet */}
            {selectedPole && <EditPole pole={selectedPole} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} onSave={() => alert("saved")} />} 
            {/* Add User Sheet */}
            {/* {<AddUserSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} onSave={() => alert("saved")} />}

            {/* {selectedUser && (
            <ConfirmDeleteDialog
                isOpen={isDialogOpen}
                onClose={setIsDialogOpen}
                onConfirm={() => alert("Yes")}
                user={selectedUser}
            />
            )} */}

        </>
    );
}