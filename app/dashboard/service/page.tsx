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
import AlertDialogDetail from "../_components/ServiceDetailDialog";



type Service = {
  id: number;
  nom: string;
  division: Division;
  description: string;
};
type Division= {
  id          :String 
  nom         :String
  description :String

}


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
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [selectedServiceId, setSelectedServiceId] = useState<
    null | number
  >(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/service");
      const data = await response.json();
      setServices(data);
      setFilteredData(data);
      setLoaded(true);
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
      row.division.nom,
      row.description,
    ]);

    autoTable(doc, {
      head: [["ID", "Nom", "Division", "Description"]],
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

  // show details logic
  const handleShowDetails = (service: Service) => {
    setSelectedService(service);
    setIsDetailDialogOpen(true); // Open the dialog
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
      name: "Division",
      selector: (row: Service) => row.division.nom,
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
            onClick={() => handleShowDetails(row)}
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

        {/* Dialog for displaying details */}
        <AlertDialogDetail
            isOpen={isDetailDialogOpen}
            onClose={() => setIsDetailDialogOpen(false)}
            service={selectedService}
        />
    </>
    )}
    </>
  );
}