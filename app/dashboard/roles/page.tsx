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
import { EditUserSheet } from "./EditUserSheet"; // Import the new component
import { ConfirmDeleteDialog } from "./DeleteDialog";
import { useRouter } from "next/navigation";

const roles = [
    {
      id: 1,
      role: "Admin",
      nom: "Admin",
      description: "",
    },
    {
      id: 2,
      role: "Chef de service",
      nom: "Chef de service",
      description: "Rôle de chef de service",
    },
    {
      id: 3,
      role: "Président",
      nom: "Président",
      description: "Président de l'UCD",
    },
    {
      id: 4,
      role: "Secrétaire générale",
      nom: "Secrétaire générale",
      description: "Secrétaire générale de l'UCD",
    },
    {
      id: 5,
      role: "Super Admin",
      nom: "Super Admin",
      description: "",
    },
    {
      id: 6,
      role: "Vice-président",
      nom: "Vice-président",
      description: "Vice-président1",
    },
  ];
  
  // Custom French translations for pagination
  const paginationComponentOptions = {
    rowsPerPageText: 'Lignes par page',
    rangeSeparatorText: 'de',
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tous',
  };
  
  export default function Page() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<{
    id: number;
    role: string;
    nom: string;
    description: string;
    } | null>(null);

    const router = useRouter();

    // Handle edit button click
    const handleEditClick = (role: any) => {
        setSelectedRole(role);
        setIsSheetOpen(true);
    };

    //handle add button click
    const handleAddclick = () => {
        router.push("/dashboard/roles/create");
    };

    const handleDeleteClick = (role: any) => {
        setSelectedRole(role);
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
        name: 'Role',
        selector: (row: { role: any; }) => row.role,
        sortable: true,
        },
        {
        name: 'Nom d\'affichage',
        selector: (row: { nom: any; }) => row.nom,
        sortable: true,
        },
        {
        name: 'Description',
        selector: (row: { description: any; }) => row.description,
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
    const [filteredData, setFilteredData] = useState(roles);
  
    // Handle search input change
    const handleSearch = (e: { target: { value: string; }; }) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchText(searchValue);
  
      const filtered = roles.filter(
        item =>
          item.role.toLowerCase().includes(searchValue) ||
          item.nom.toLowerCase().includes(searchValue) ||
          item.description.toString().includes(searchValue)
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
            row.role,
            row.nom,
            row.description,
        ]);
    
        // Generate table
        autoTable(doc, {
            head: [['ID', 'Role', 'Nom d\'affichage', 'Description']],
            body: tableData,
        });
    
        // Save the PDF
        doc.save('Roles.pdf');
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Roles');
        XLSX.writeFile(workbook, 'Roles.xlsx');
    };

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ); // Show a loading state to avoid hydration errors
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
                    <BreadcrumbPage>Rôles</BreadcrumbPage>
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
                <Plus className="mr-2 h-4 w-4" /> Créer
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
                        title="Liste des rôles"
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
            {selectedRole && <EditUserSheet role={selectedRole} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} onSave={() => alert("saved")} />}

            {selectedRole && (
            <ConfirmDeleteDialog
                isOpen={isDialogOpen}
                onClose={setIsDialogOpen}
                onConfirm={() => alert("Yes")}
                role={selectedRole}
            />
            )}
        </>
    )
  }
  