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
import { EditUserSheet } from "./EditUserSheet"; 
import ReusableAlertDialog from "../_components/AlertDialog"; // Import the reusable dialog
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { toast } from "@/hooks/use-toast";
import AlertDialogDetail from "../_components/UserDetailsDialog";

type user = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  serviceId: string | null;
  service: string | null;
  role: string | null;
  roleId: string | null;
};


const paginationComponentOptions = {
  rowsPerPageText: "Lignes par page",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Tous",
};


export default function Page() {
  const [users, setUsers] = useState<user[]>([]);
  const [filteredData, setFilteredData] = useState<user[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for dialog visibility
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<
    null | string
  >(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false); // State for edit sheet visibility
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setLoaded(true); // Set loaded to true after data is fetched
        setUsers(data);
        setFilteredData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = users.filter(
      (item) =>
        item.nom.toLowerCase().includes(searchValue) ||
        item.prenom.toLowerCase().includes(searchValue)
        || item.email.toLowerCase().includes(searchValue)
        || item.telephone.toLowerCase().includes(searchValue)
        || item.service?.toLowerCase().includes(searchValue)
        || item.role?.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des utilisateurs", 10, 10);

    const tableData = filteredData.map((row) => [
      row.id,
      row.nom,
      row.prenom,
      row.email,
      row.telephone,
      row.service,
      row.role,
    ]);

    autoTable(doc, {
      head: [["ID", "Nom", "Prénom", "Email", "Téléphone", "Service", "Rôle"]],
      body: tableData,
    });

    doc.save("users.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const deleteUser = async () => {
    if (selectedUserId === null) return;

    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedUserId }),
      });

      if (response.ok) {
        setUsers((prevData) =>
          prevData.filter((item) => item.id !== selectedUserId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.id !== selectedUserId)
        );
        toast({
          title: "Utilisateur supprimé",
          description: "L'utilisateur a été supprimé avec succès.",
        });
        setIsDeleteDialogOpen(false);
      } else {
        console.error("Failed to delete user");
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de l'utilisateur.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'utilisateur.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (user: user) => {
    setSelectedUser(user);
    setIsEditSheetOpen(true); // Open the edit sheet
  };

  const handleSave = async (updatedUser: user) => {
    try {
      // Prepare the user data for update
      const userData = {
        id: updatedUser.id,
        nom: updatedUser.nom,
        prenom: updatedUser.prenom,
        email: updatedUser.email,
        telephone: updatedUser.telephone,
        serviceId: updatedUser.serviceId ? updatedUser.serviceId : null, // ✅ Convert empty values to null
        roleId: updatedUser.roleId ? updatedUser.roleId : null, // ✅ Convert empty values to null
        role: updatedUser.role,
        service: updatedUser.service,
      };
  
      console.log("Updating user:", userData);
  
      // Call the API to update the user
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json(); // Parse the response JSON
  
      if (!response.ok || result.error) {
        // Show server-side validation error message
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la modification de l'utilisateur.",
          variant: "destructive",
        });
        return;
      }
  
        // ✅ Update local state with new user data
        setUsers((prevData) =>
          prevData.map((item) =>
            item.id === updatedUser.id ? { ...item, ...userData } : item
          )
        );
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item.id === updatedUser.id ? { ...item, ...userData } : item
          )
        );
    
        // ✅ Show success message
        toast({
          title: "Utilisateur modifié",
          description: "L'utilisateur a été modifié avec succès.",
        });
        
    } catch (error) {
      console.error("❌ Error updating user:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification de l'utilisateur.",
        variant: "destructive",
      });
    }
  };

  // show details logic
  const handleShowDetails = (user: user) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true); // Open the dialog
  };

  const columns = [
    {
      name: "ID",
      selector: (row: user) => row.id,
      sortable: true,

    },
    {
      name: "Nom",
      selector: (row: user) => row.nom,
      sortable: true,
    },
    {
      name: "Prénom",
      selector: (row: user) => row.prenom,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: user) => row.email,
      sortable: true,
    },
    {
      name: "Téléphone",
      selector: (row: user) => row.telephone,
      sortable: true,
    },
    {
      name: "Service",
      selector: (row: user) => row.service || "",
      sortable: true,
    },
    {
      name: "Rôle",
      selector: (row: user) => row.role || "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: user) => (
        <div className="space-x-2 flex">
          <Button variant="update" size="sm" onClick={() => handleEdit(row)}>
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="delete"
            onClick={() => {
              setSelectedUserId(row.id);
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
    router.push("/dashboard/users/add");
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

        {/* Edit user Sheet */}
        {selectedUser && (
            <EditUserSheet
              user={selectedUser}
              isOpen={isEditSheetOpen}
              onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => setIsEditSheetOpen(open)}
              onSave={handleSave}
            />
        )}

        {/* Reusable AlertDialog for deletion */}
        <ReusableAlertDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            title="Êtes-vous sûr ?"
            description="Cette action est irréversible. Voulez-vous vraiment supprimer cet utilisateur ?"
            onConfirm={deleteUser}
            confirmText="Continuer"
            cancelText="Annuler"
        />

        {/* Dialog for displaying details */}
        <AlertDialogDetail
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          user={selectedUser}
        />
        </>
      )}
    </>
  );
}