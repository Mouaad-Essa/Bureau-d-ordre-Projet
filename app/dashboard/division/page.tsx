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
import { EditDivisionSheet } from "./EditDivision"; // Import your EditDivisionSheet
import {
  updateDivision,
  fetchDivisions,
  deleteDivision,
} from "../../actions/divisionsActions"; // Import the updateDivision action
import ReusableAlertDialog from "../../_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";
import AlertDialogDetail from "../_components/DivisionDetailDialog";

type Division = {
  id: string;
  nom: string;
  description: string;
  responsableId: string;
  bureauId: string;
  statut: string;
};

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [filteredData, setFilteredData] = useState<Division[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(
    null
  );
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(
    null
  );

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDivisions();
        if (result.error) {
          console.error(result.error);
          return;
        }
        setDivisions(result); // Set the fetched data
        setFilteredData(result); // Set the filtered data for searching
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = divisions.filter(
      (item) =>
        item.nom.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue) ||
        item.responsableId.toLowerCase().includes(searchValue) ||
        item.bureauId.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des divisions", 10, 10);

    const tableData = filteredData.map((row) => [
      row.id,
      row.nom,
      row.description,
      row.responsableId,
      row.bureauId,
      row.statut,
    ]);

    autoTable(doc, {
      head: [["ID", "Nom", "Description", "Responsable", "Bureau", "Statut"]],
      body: tableData,
    });

    doc.save("divisions.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Divisions");
    XLSX.writeFile(workbook, "divisions.xlsx");
  };

  const deleteDivisionHandler = async () => {
    if (selectedDivisionId === null) return;

    try {
      const result = await deleteDivision(String(selectedDivisionId)); // Convert ID to string

      if (result.message) {
        // Check if deletion was successful based on message
        setDivisions((prevData) =>
          prevData.filter((item) => item.id !== selectedDivisionId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedDivisionId)
        );
        setIsDeleteDialogOpen(false);
      } else {
        console.error("Failed to delete division");
      }
    } catch (error) {
      console.error("Error deleting division:", error);
    }
  };

  const handleEdit = (division: Division) => {
    setSelectedDivision(division);
    setIsEditSheetOpen(true); // Open the edit sheet
  };

  const handleSave = async (updatedDivision: Division) => {
    try {
      const updatedDivisionWithStringId = {
        ...updatedDivision,
        id: String(updatedDivision.id), // Convert id to a string
      };

      const result = await updateDivision(updatedDivisionWithStringId);

      if (result.error) {
        console.error("Failed to update division:", result.error);
        return;
      }

      setDivisions((prevData) =>
        prevData.map((item) =>
          item.id === updatedDivision.id ? updatedDivision : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === updatedDivision.id ? updatedDivision : item
        )
      );
      setIsEditSheetOpen(false); // Close the sheet after saving
    } catch (error) {
      console.error("Error updating division:", error);
    }
  };

  const handleShowDetails = (division: Division) => {
    setSelectedDivision(division);
    setIsDetailDialogOpen(true); // Open the dialog
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Division) => row.id,
      sortable: true,
      style: {
        minWidth: "60px",
        maxWidth: "80px",
      },
    },
    {
      name: "Nom",
      selector: (row: Division) => row.nom,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Division) => row.description,
      sortable: true,
    },
    {
      name: "Responsable",
      selector: (row: Division) => row.responsableId,
      sortable: true,
    },
    {
      name: "Bureau",
      selector: (row: Division) => row.bureauId,
      sortable: true,
    },
    {
      name: "Statut",
      selector: (row: Division) => row.statut,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Division) => (
        <div className="space-x-2 flex">
          <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="delete"
            onClick={() => {
              setSelectedDivisionId(row.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash />
          </Button>
          <Button
            size="sm"
            variant="see"
            onClick={() => handleShowDetails(row)}
          >
            <Eye />
          </Button>
        </div>
      ),
    },
  ];

  const handleClick = () => {
    router.push("/dashboard/division/add");
  };

  return (
    <div className="container">
      <div className="flex flex-col space-y-4 p-4">
        <h1 className="rounded-lg w-fit self-center bg-gradient-to-r from-gray-200 from-40% to-blue-500 text-gray-900 text-2xl font-semibold p-3 flex items-center justify-center">
          <span>Liste des divisions</span>
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

      {/* Edit Division Sheet */}
      {selectedDivision && (
        <EditDivisionSheet
          division={selectedDivision}
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
        description="Cette action est irréversible. Voulez-vous vraiment supprimer cette division ?"
        onConfirm={deleteDivisionHandler} // Trigger delete action on confirmation
        confirmText="Continuer"
        cancelText="Annuler"
      />

      {/* Dialog for displaying details */}
      <AlertDialogDetail
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        division={selectedDivision}
      />
    </div>
  );
}
