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
  Edit,
  Trash,
  Building,
  Eye,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EditEtablissementSheet } from "../../\(pages\)/etablissement/EditEtablissement"; // Import your EditEtablissementSheet
import { updateEtablissement } from "../../actions/etablissementsActions"; // Import the updateEtablissement action
import ReusableAlertDialog from "../../\(pages\)/_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

type Etablissement = {
  id: number;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
};

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [filteredData, setFilteredData] = useState<Etablissement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [selectedEtablissementId, setSelectedEtablissementId] = useState<
    null | number
  >(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedEtablissement, setSelectedEtablissement] =
    useState<Etablissement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/etablissement");
      const data = await response.json();
      setEtablissements(data);
      setFilteredData(data);
      setLoaded(true);
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = etablissements.filter(
      (item) =>
        item.nom.toLowerCase().includes(searchValue) ||
        item.ville.toLowerCase().includes(searchValue) ||
        item.contact.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des établissements", 10, 10);

    const tableData = filteredData.map((row) => [
      row.id,
      row.nom,
      row.ville,
      row.contact,
      row.fax,
      row.adresse,
    ]);

    autoTable(doc, {
      head: [["ID", "Nom", "Ville", "Contact", "Fax", "Adresse"]],
      body: tableData,
    });

    doc.save("etablissements.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Établissements");
    XLSX.writeFile(workbook, "etablissements.xlsx");
  };

  const deleteEtablissement = async () => {
    if (selectedEtablissementId === null) return;

    try {
      const response = await fetch(`/api/etablissement`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedEtablissementId }),
      });

      if (response.ok) {
        setEtablissements((prevData) =>
          prevData.filter((item) => item.id !== selectedEtablissementId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedEtablissementId)
        );
        setIsDeleteDialogOpen(false);
      } else {
        console.error("Failed to delete etablissement");
      }
    } catch (error) {
      console.error("Error deleting etablissement:", error);
    }
  };

  const handleEdit = (etablissement: Etablissement) => {
    setSelectedEtablissement(etablissement);
    setIsEditSheetOpen(true); // Open the edit sheet
  };

  const handleSave = async (updatedEtablissement: Etablissement) => {
    try {
      const updatedEtablissementWithStringId = {
        ...updatedEtablissement,
        id: String(updatedEtablissement.id), // Convert id to a string
      };

      const result = await updateEtablissement(
        updatedEtablissementWithStringId
      );

      if (result.error) {
        console.error("Failed to update etablissement:", result.error);
        return;
      }

      setEtablissements((prevData) =>
        prevData.map((item) =>
          item.id === updatedEtablissement.id ? updatedEtablissement : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === updatedEtablissement.id ? updatedEtablissement : item
        )
      );
      setIsEditSheetOpen(false); // Close the sheet after saving
    } catch (error) {
      console.error("Error updating etablissement:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Etablissement) => row.id,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row: Etablissement) => row.nom,
      sortable: true,
    },
    {
      name: "Ville",
      selector: (row: Etablissement) => row.ville,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row: Etablissement) => row.contact,
      sortable: true,
    },
    {
      name: "Fax",
      selector: (row: Etablissement) => row.fax,
      sortable: true,
    },
    {
      name: "Adresse",
      selector: (row: Etablissement) => row.adresse,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Etablissement) => (
        <div className="space-x-2 flex">
          <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="delete"
            onClick={() => {
              setSelectedEtablissementId(row.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash />
          </Button>
          <Button
            size="sm"
            variant="see"
            onClick={() => {
              router.push(`/dashboard/etablissement/${row.id}`); // Navigate to detailed view
            }}
          >
            <Eye />
          </Button>
        </div>
      ),
    },
  ];

  // Navigate to /add using useRouter
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/etablissement/add");
  };

  return (
    <>
    {!loaded ? (
      <div className="flex items-center justify-center min-h-screen">
        <div role="status">
          <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                        Bureau d'ordre
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Etablissements</BreadcrumbPage>
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
                onClick={handleClick}
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
                <DropdownMenuItem onClick={exportToExcel}>Excel</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>

            <div className="w-full">
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
                defaultSortFieldId={1}
            />
            </div>
        </div>

        {/* Edit Etablissement Sheet */}
        {selectedEtablissement && (
            <EditEtablissementSheet
            etablissement={selectedEtablissement}
            isOpen={isEditSheetOpen} // Ensure this state exists
            onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => setIsEditSheetOpen(open)} // Pass correct handler
            onSave={handleSave} // Implement the save logic here
            />
        )}

        {/* Reusable AlertDialog for deletion */}
        <ReusableAlertDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            title="Êtes-vous sûr ?"
            description="Cette action est irréversible. Voulez-vous vraiment supprimer cet établissement ?"
            onConfirm={deleteEtablissement}
            confirmText="Continuer"
            cancelText="Annuler"
        />
    </>
    )}
    </>
  );
}