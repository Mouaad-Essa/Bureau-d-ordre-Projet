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
import { Search, Plus, Download, Edit, Trash, Eye } from "lucide-react"; // Import icons
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
import { useRouter } from "next/navigation";
import ReusableAlertDialog from "../../_components/AlertDialog"; // Import the reusable dialog
import { updatePole } from "@/app/actions/polesActions";




  type Pole={
    id:string;
    nom:string;
    responsable:string;
    tachesPrincipales:string;
    contacts:string;
    statut:string
  }

  // Custom French translations for pagination
  const paginationComponentOptions = {
    rowsPerPageText: 'Lignes par page',
    rangeSeparatorText: 'de',
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Tous',
  };
  

export default function Page(){
   const [poles, setPoles] = useState<Pole[]>([]);
     const [filteredData, setFilteredData] = useState<Pole[]>([]);
     const [searchText, setSearchText] = useState("");
     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
     const [selectedPoleId, setSelectedPoleId] = useState<string | null>(
       null
     );
     const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
     const [selectedPole, setSelectedPole] = useState<Pole | null>(
       null
     );



     useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/poles");
        const data = await response.json();
        setPoles(data);
        setFilteredData(data);
      };
  
      fetchData();
    }, []);
  

    // Handle edit button click
    const handleEditClick = (pole: any) => {
        setSelectedPole(pole);
    };

    

     //Export 
  
     const exportToPDF = () => {
      const doc = new jsPDF();
      doc.text("Liste des divisions", 10, 10);
  
      const tableData = filteredData.map((row) => [
        row.id,
        row.nom,
        row.responsable,
        row.tachesPrincipales,
        row.contacts,
        row.statut,
      ]);
  
      autoTable(doc, {
        head: [["ID", "Nom", "Responsable", "TachesPrincipales", "Contacts", "Statut"]],
        body: tableData,
      });
  
      doc.save("divisions.pdf");
    };
  
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Poles");
      XLSX.writeFile(workbook, "poles.xlsx");
    };




  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/poles");
        const data = await response.json();
        setPoles(data);
        setFilteredData(data);
      };
  
      fetchData();
    }, []);
  
    //Search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchText(searchValue);
  
      const filtered = poles.filter(
        (item) =>
          item.nom.toLowerCase().includes(searchValue) ||
          item.responsable.toLowerCase().includes(searchValue) ||
          item.tachesPrincipales.toLowerCase().includes(searchValue) 
      );
  
      setFilteredData(filtered);
    };

   
  //Delete
    const deletePole = async () => {
      if (selectedPoleId === null) return;
  
      try {
        const response = await fetch(`/api/poles`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedPoleId }),
        });
  
        if (response.ok) {
          setPoles((prevData) =>
            prevData.filter((item) => item.id !== selectedPoleId)
          );
          setFilteredData((prevData) =>
            prevData.filter((item) => item.id !== selectedPoleId)
          );
          setIsDeleteDialogOpen(false);
        } else {
          console.error("Failed to delete pole 1"+response);
        }
      } catch (error) {
        console.error("Error deleting pole:", error);
      }
    };
  

    const handleEdit = (pole: Pole) => {
      setSelectedPole(pole);
      setIsEditSheetOpen(true); // Open the edit sheet
    };
  
    //update
    const handleSave = async (updatedPole: Pole) => {
      try {
        const updatedPoleWithStringId = {
          ...updatedPole,
          id: String(updatedPole.id), // Convert id to a string
        };
  
        const result = await updatePole(updatedPoleWithStringId);
  
        if (result.error) {
          console.error("Failed to update division:", result.error);
          return;
        }
  
        setPoles((prevData) =>
          prevData.map((item) =>
            item.id === updatedPole.id ? updatedPole : item
          )
        );
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item.id === updatedPole.id ? updatedPole : item
          )
        );
        setIsEditSheetOpen(false); // Close the sheet after saving
      } catch (error) {
        console.error("Error updating pole:", error);
      }
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
            selector: (row: { statut: any; }) => row.statut,
            sortable: true,
        },
        {
          name: "Actions",
          cell: (row: Pole) => (
            <div className="space-x-2 flex">
              <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
                <Edit />
              </Button>
              <Button
                size="sm"
                variant="delete"
                onClick={() => {
                  setSelectedPoleId(row.id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash />
              </Button>
              <Button
                size="sm"
                variant="see"
                onClick={() => {
                  router.push(`/dashboard/poles/${row.id}`); // Navigate to detailed view
                }}
              >
                <Eye />
              </Button>
            </div>
          ),
        },
    ];




    const router = useRouter();
    
    //handle add button click
    const handleAddclick = () => {
        router.push("/dashboard/poles/add");

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
                        title="Liste des Poles"
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
 {selectedPole && (
        <EditPole
          pole={selectedPole}
          isOpen={isEditSheetOpen} // Ensure this state exists
          onOpenChange={(open) => setIsEditSheetOpen(open)} // Pass correct handler
          onSave={handleSave} // Implement the save logic here
        />
      )}      

<ReusableAlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Êtes-vous sûr ?"
        description="Cette action est irréversible. Voulez-vous vraiment supprimer cette division ?"
        onConfirm={deletePole}
        confirmText="Continuer"
        cancelText="Annuler"
      />
        </>
    );
}