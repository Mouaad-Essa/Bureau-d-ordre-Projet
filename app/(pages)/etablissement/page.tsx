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
import { EditEtablissementSheet } from "./EditEtablissement"; // Import your EditEtablissementSheet
import { updateEtablissement } from "../../actions/etablissementsActions"; // Import the updateEtablissement action
import ReusableAlertDialog from "../../_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";

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
      style: {
        minWidth: "60px",
        maxWidth: "80px",
      },
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
              router.push(`/etablissement/${row.id}`); // Navigate to detailed view
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
    router.push("/etablissement/add");
  };

  return (
    <div className="container">
      <div className="flex flex-col space-y-4 p-4">
        <h1
          className=" rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 
         from-40% to-blue-500 text-gray-900 text-2xl 
         font-semibold p-3 flex items-center justify-center"
        >
          <span>Liste des établissements</span>
          <Building />
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchText}
                onChange={handleSearch}
                className="pl-8 w-full md:w-[300px]"
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
          onOpenChange={(open) => setIsEditSheetOpen(open)} // Pass correct handler
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
    </div>
  );
}
