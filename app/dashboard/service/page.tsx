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
import { EditServiceSheet } from "./EditService"; // Import your EditServiceSheet
import { updateService } from "../../actions/servicesActions"; // Import the updateService action
import ReusableAlertDialog from "../_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

type Service = {
  id: number;
  nom: string;
  description: string;
};

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredData, setFilteredData] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [selectedServiceId, setSelectedServiceId] = useState<
    null | number
  >(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/service");
      const data = await response.json();
      setServices(data);
      setFilteredData(data);
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = services.filter(
      (item) =>
        item.nom.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des services", 10, 10);

    const tableData = filteredData.map((row) => [
      row.id,
      row.nom,
      row.description,
    ]);

    autoTable(doc, {
      head: [["ID", "Nom", "Description"]],
      body: tableData,
    });

    doc.save("Services.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Services");
    XLSX.writeFile(workbook, "Services.xlsx");
  };

  const deleteService = async () => {
    if (selectedServiceId === null) return;

    try {
      const response = await fetch(`/api/service`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedServiceId }),
      });

      if (response.ok) {
        setServices((prevData) =>
          prevData.filter((item) => item.id !== selectedServiceId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedServiceId)
        );
        setIsDeleteDialogOpen(false);
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsEditSheetOpen(true); // Open the edit sheet
  };

  const handleSave = async (updatedService: Service) => {
    try {
      const updatedServiceWithStringId = {
        ...updatedService,
        id: String(updatedService.id), // Convert id to a string
      };

      const result = await updateService(
        updatedServiceWithStringId
      );

      if (result.error) {
        console.error("Failed to update service:", result.error);
        return;
      }

      setServices((prevData) =>
        prevData.map((item) =>
          item.id === updatedService.id ? updatedService : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === updatedService.id ? updatedService : item
        )
      );
      setIsEditSheetOpen(false); // Close the sheet after saving
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Service) => row.id,
      sortable: true,

    },
    {
      name: "Nom",
      selector: (row: Service) => row.nom,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Service) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Service) => (
        <div className="space-x-2 flex">
          <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="delete"
            onClick={() => {
              setSelectedServiceId(row.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash />
          </Button>
          <Button
            size="sm"
            variant="see"
            onClick={() => {
              router.push(`/dashboard/service/${row.id}`); // Navigate to detailed view
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
    router.push("/dashboard/service/add");
  };

  return (
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
                        <BreadcrumbPage>Services</BreadcrumbPage>
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

        {/* Edit Service Sheet */}
        {selectedService && (
            <EditServiceSheet
            service={selectedService}
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
            description="Cette action est irréversible. Voulez-vous vraiment supprimer ce service ?"
            onConfirm={deleteService}
            confirmText="Continuer"
            cancelText="Annuler"
        />
    </>
  );
}