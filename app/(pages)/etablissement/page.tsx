"use client"; // Ensure this runs on the client

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Download, Edit, Trash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Importing custom AlertDialog components

interface Etablissement {
  id: number;
  nom: string;
  ville: string;
  contact: string;
  fax: number;
  adresse: string;
}

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
    number | null
  >(null); // Store selected id for deletion

  // Fetch data from the server-side API route
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/etablissement"); // Call API route
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
    if (selectedEtablissementId === null) return; // If no id selected, return

    try {
      const response = await fetch(`/api/etablissement`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedEtablissementId }), // Sending ID to delete
      });

      if (response.ok) {
        // Update the list after deletion
        setEtablissements((prevData) =>
          prevData.filter((item) => item.id !== selectedEtablissementId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedEtablissementId)
        );
        setIsDeleteDialogOpen(false); // Close dialog after deletion
      } else {
        console.error("Failed to delete etablissement");
      }
    } catch (error) {
      console.error("Error deleting etablissement:", error);
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
        <div className="space-x-2">
          <Button variant="update" onClick={() => console.log("update")}>
            <Edit />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="delete"
                onClick={() => {
                  setSelectedEtablissementId(row.id); // Set selected etablissement id
                  setIsDeleteDialogOpen(true); // Open the dialog
                }}
              >
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                etablissement.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={deleteEtablissement}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <>
      <header className="flex h-16 items-center gap-2 px-4">
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Gestion</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Établissements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-col space-y-4 p-4">
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
            <Button className="bg-green-600 hover:bg-green-700">
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
            title="Liste des établissements"
            columns={columns}
            data={filteredData}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            defaultSortFieldId={1}
          />
        </div>
      </div>
    </>
  );
}