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
import { AddUserSheet } from "./AddUserSheet";
import { ConfirmDeleteDialog } from "./DeleteDialog";

const users = [
    {
      id: 1,
      nom: "Mouhib",
      prenom: "Ayoub",
      email: "ayoub-mhb@hotmail.fr",
      telephone: "+212537654321",
    },
    {
        id: 2,
        nom: "Smith",
        prenom: "Jane",
        email: "jane.smith@example.com",
        telephone: "+212537654322",
      },
      {
        id: 3,
        nom: "Brown",
        prenom: "Alice",
        email: "alice.brown@example.com",
        telephone: "+212537654323",
      },
      {
        id: 4,
        nom: "Johnson",
        prenom: "Bob",
        email: "bob.johnson@example.com",
        telephone: "+212537654324",
      },
      {
        id: 5,
        nom: "Davis",
        prenom: "Charlie",
        email: "charlie.davis@example.com",
        telephone: "+212537654325",
      },
      {
        id: 6,
        nom: "Miller",
        prenom: "Eva",
        email: "eva.miller@example.com",
        telephone: "+212537654326",
      },
      {
        id: 7,
        nom: "Wilson",
        prenom: "Frank",
        email: "frank.wilson@example.com",
        telephone: "+212537654327",
      },
      {
        id: 8,
        nom: "Moore",
        prenom: "Grace",
        email: "grace.moore@example.com",
        telephone: "+212537654328",
      },
      {
        id: 9,
        nom: "Taylor",
        prenom: "Hank",
        email: "hank.taylor@example.com",
        telephone: "+212537654329",
      },
      {
        id: 10,
        nom: "Anderson",
        prenom: "Ivy",
        email: "ivy.anderson@example.com",
        telephone: "+212537654330",
      },
      {
        id: 11,
        nom: "Thomas",
        prenom: "Jack",
        email: "jack.thomas@example.com",
        telephone: "+212537654331",
      },
      {
        id: 12,
        nom: "Jackson",
        prenom: "Karen",
        email: "karen.jackson@example.com",
        telephone: "+212537654332",
      },
      {
        id: 13,
        nom: "White",
        prenom: "Leo",
        email: "leo.white@example.com",
        telephone: "+212537654333",
      },
      {
        id: 14,
        nom: "Harris",
        prenom: "Mona",
        email: "mona.harris@example.com",
        telephone: "+212537654334",
      },
      {
        id: 15,
        nom: "Martin",
        prenom: "Nina",
        email: "nina.martin@example.com",
        telephone: "+212537654335",
      },
      {
        id: 16,
        nom: "Thompson",
        prenom: "Oscar",
        email: "oscar.thompson@example.com",
        telephone: "+212537654336",
      },
      {
        id: 17,
        nom: "Garcia",
        prenom: "Paul",
        email: "paul.garcia@example.com",
        telephone: "+212537654337",
      },
      {
        id: 18,
        nom: "Martinez",
        prenom: "Quincy",
        email: "quincy.martinez@example.com",
        telephone: "+212537654338",
      },
      {
        id: 19,
        nom: "Robinson",
        prenom: "Rachel",
        email: "rachel.robinson@example.com",
        telephone: "+212537654339",
      },
      {
        id: 20,
        nom: "Clark",
        prenom: "Steve",
        email: "steve.clark@example.com",
        telephone: "+212537654340",
      },
      {
        id: 21,
        nom: "Rodriguez",
        prenom: "Tina",
        email: "tina.rodriguez@example.com",
        telephone: "+212537654341",
      },
      {
        id: 22,
        nom: "Lewis",
        prenom: "Uma",
        email: "uma.lewis@example.com",
        telephone: "+212537654342",
      },
      {
        id: 23,
        nom: "Lee",
        prenom: "Victor",
        email: "victor.lee@example.com",
        telephone: "+212537654343",
      },
      {
        id: 24,
        nom: "Walker",
        prenom: "Wendy",
        email: "wendy.walker@example.com",
        telephone: "+212537654344",
      },
      {
        id: 25,
        nom: "Hall",
        prenom: "Xander",
        email: "xander.hall@example.com",
        telephone: "+212537654345",
      },
      {
        id: 26,
        nom: "Allen",
        prenom: "Yara",
        email: "yara.allen@example.com",
        telephone: "+212537654346",
      },
      {
        id: 27,
        nom: "Young",
        prenom: "Zack",
        email: "zack.young@example.com",
        telephone: "+212537654347",
      },
      {
        id: 28,
        nom: "Hernandez",
        prenom: "Amy",
        email: "amy.hernandez@example.com",
        telephone: "+212537654348",
      },
      {
        id: 29,
        nom: "King",
        prenom: "Brian",
        email: "brian.king@example.com",
        telephone: "+212537654349",
      },
      {
        id: 30,
        nom: "Wright",
        prenom: "Cathy",
        email: "cathy.wright@example.com",
        telephone: "+212537654350",
      },
      {
        id: 31,
        nom: "Lopez",
        prenom: "David",
        email: "david.lopez@example.com",
        telephone: "+212537654351",
      },
      {
        id: 32,
        nom: "Hill",
        prenom: "Eva",
        email: "eva.hill@example.com",
        telephone: "+212537654352",
      },
      {
        id: 33,
        nom: "Scott",
        prenom: "Frank",
        email: "frank.scott@example.com",
        telephone: "+212537654353",
      },
      {
        id: 34,
        nom: "Green",
        prenom: "Grace",
        email: "grace.green@example.com",
        telephone: "+212537654354",
      },
      {
        id: 35,
        nom: "Adams",
        prenom: "Henry",
        email: "henry.adams@example.com",
        telephone: "+212537654355",
      },
      {
        id: 36,
        nom: "Baker",
        prenom: "Ivy",
        email: "ivy.baker@example.com",
        telephone: "+212537654356",
      },
      {
        id: 37,
        nom: "Gonzalez",
        prenom: "Jack",
        email: "jack.gonzalez@example.com",
        telephone: "+212537654357",
      },
      {
        id: 38,
        nom: "Nelson",
        prenom: "Karen",
        email: "karen.nelson@example.com",
        telephone: "+212537654358",
      },
      {
        id: 39,
        nom: "Carter",
        prenom: "Leo",
        email: "leo.carter@example.com",
        telephone: "+212537654359",
      },
      {
        id: 40,
        nom: "Mitchell",
        prenom: "Mona",
        email: "mona.mitchell@example.com",
        telephone: "+212537654360",
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
    const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    } | null>(null);

    // Handle edit button click
    const handleEditClick = (user: any) => {
        setSelectedUser(user);
        setIsSheetOpen(true);
    };

    //handle add button click
    const handleAddclick = () => {
        setIsAddSheetOpen(true);
    };

    const handleDeleteClick = (user: any) => {
        setSelectedUser(user);
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
        name: 'Prénom',
        selector: (row: { prenom: any; }) => row.prenom,
        sortable: true,
        },
        {
        name: 'Email',
        selector: (row: { email: any; }) => row.email,
        sortable: true,
        },
        {
            name: 'Téléphone',
            selector: (row: { telephone: any; }) => row.telephone,
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
    const [filteredData, setFilteredData] = useState(users);
  
    // Handle search input change
    const handleSearch = (e: { target: { value: string; }; }) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchText(searchValue);
  
      const filtered = users.filter(
        item =>
          item.nom.toLowerCase().includes(searchValue) ||
          item.prenom.toLowerCase().includes(searchValue) ||
          item.email.toString().includes(searchValue)
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
            row.prenom,
            row.email,
            row.telephone
        ]);
    
        // Generate table
        autoTable(doc, {
            head: [['ID', 'Nom', 'Prénom', 'Email', 'Téléphone']],
            body: tableData,
        });
    
        // Save the PDF
        doc.save('utilisateurs.pdf');
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
                    <BreadcrumbPage>Utilisateurs</BreadcrumbPage>
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
            {selectedUser && <EditUserSheet user={selectedUser} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} onSave={() => alert("saved")} />}
            {/* Add User Sheet */}
            {<AddUserSheet isOpen={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} onSave={() => alert("saved")} />}

            {selectedUser && (
            <ConfirmDeleteDialog
                isOpen={isDialogOpen}
                onClose={setIsDialogOpen}
                onConfirm={() => alert("Yes")}
                user={selectedUser}
            />
            )}
        </>
    )
  }
  