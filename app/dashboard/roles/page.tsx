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
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EditRoleSheet } from "./EditRoleSheet"; 
import { updateRole } from "../../actions/rolesActions"; 
import ReusableAlertDialog from "../_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { toast } from "@/hooks/use-toast";

type role = {
  id: number;
  role: string;
  nom: string;
  description: string;
  privileges: {
    canView: boolean,
    canEditEstablishment: boolean,
    canCreateDepart: boolean,
    canCreateArrive: boolean,
    isSuperAdmin: boolean,
  },
};

const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};

export default function Page() {
  const [roles, setRoles] = useState<role[]>([]);
  const [filteredData, setFilteredData] = useState<role[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [selectedRoleId, setSelectedRoleId] = useState<
    null | number
  >(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedRole, setSelectedRole] =
    useState<role | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/role");
        const data = await response.json();
        setLoaded(true); // Set loaded to true after data is fetched
        setRoles(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = roles.filter(
      (item) =>
        item.nom.toLowerCase().includes(searchValue)
        || item.description?.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des rôles", 10, 10);

    const tableData = filteredData.map((row) => [
      row.id,
      row.role,
      row.nom,
      row.description,
    ]);

    autoTable(doc, {
      head: [["ID", "Role", "Nom", "Description"]],
      body: tableData,
    });

    doc.save("Roles.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");
    XLSX.writeFile(workbook, "Roles.xlsx");
  };

  const deleteRole = async () => {
    if (selectedRoleId === null) return;

    try {
      const response = await fetch(`/api/role`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedRoleId }),
      });

      if (response.ok) {
        setRoles((prevData) =>
          prevData.filter((item) => item.id !== selectedRoleId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedRoleId)
        );
        setIsDeleteDialogOpen(false);
        toast({
          title: "Rôle supprimé",
          description: "Le rôle a été supprimé avec succès.",
        });
      } else {
        console.error("Failed to delete role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleEdit = (Role: role) => {
    setSelectedRole(Role);
    setIsEditSheetOpen(true); // Open the edit sheet
  };

  const handleSave = async (updatedRole: role) => {

    try {
      const response = await fetch(`/api/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedRole.id,
          nom: updatedRole.nom,
          description: updatedRole.description,
          privileges: {
            canView: updatedRole.privileges.canView,
            canEditEstablishment: updatedRole.privileges.canEditEstablishment,
            canCreateDepart: updatedRole.privileges.canCreateDepart,
            canCreateArrive: updatedRole.privileges.canCreateArrive,
            isSuperAdmin: updatedRole.privileges.isSuperAdmin,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la modification du rôle",
          variant: "destructive",
        });
        return;
      }

      setRoles((prevData) =>
        prevData.map((item) =>
          item.id === updatedRole.id ? updatedRole : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === updatedRole.id ? updatedRole : item
        )
      );

      toast({
        title: "Rôle modifié",
        description: "Le rôle a été modifié avec succès.",
      });
    
      setIsEditSheetOpen(false); // Close the sheet after saving
  } catch (error) {
    console.error("Error updating role:", error);
    toast({
      title: "Erreur",
      description: "Erreur lors de la modification du rôle.",
      variant: "destructive",
    });
  }
};

  const columns = [
    {
      name: "ID",
      selector: (row: role) => row.id,
      sortable: true,

    },
    {
      name: "Rôle",
      selector: (row: role) => row.nom,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: role) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: role) => (
        <div className="space-x-2 flex">
          <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="delete"
            onClick={() => {
              setSelectedRoleId(row.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  // Navigate to /add using Roleouter
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/roles/create");
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

        {/* Edit Role Sheet */}
        {selectedRole && (
            <EditRoleSheet
            role={selectedRole}
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
            description="Cette action est irréversible. Voulez-vous vraiment supprimer ce rôle ?"
            onConfirm={deleteRole}
            confirmText="Continuer"
            cancelText="Annuler"
        />
        </>
      )}
    </>
  );
}