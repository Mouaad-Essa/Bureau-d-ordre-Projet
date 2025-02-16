"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import {QueryLog} from "@prisma/client";

const paginationComponentOptions = {
    rowsPerPageText: "Lignes par page",
    rangeSeparatorText: "de",
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tous",
};

export default function LogsPage() {
    const [logs, setLogs] = useState<QueryLog[]>([]);
    const [filteredData, setFilteredData] = useState<QueryLog[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/logs");
                const data = await response.json();
                setLogs(data || []);
                setFilteredData(data || []);
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filtered = logs.filter(
            (item : QueryLog) =>
                item.query.toLowerCase().includes(searchValue) ||
                item.duration.toString().includes(searchValue) ||
                new Date(item.timestamp)
                    .toLocaleString()
                    .toLowerCase()
                    .includes(searchValue)
        );

        setFilteredData(filtered);
    };

    const columns = [
        {
            name: "ID",
            selector: (row : QueryLog) => row.id,
            sortable: true,
        },
        {
            name: "Query",
            selector: (row : QueryLog) => row.query,
            sortable: false,
            wrap: true,
        },
        {
            name: "Timestamp",
            selector: (row : QueryLog) => new Date(row.timestamp).toLocaleString() ,
            sortable: true,
        },
    ];

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
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col space-y-4 p-4">
                        {
                            logs.length > 0 && (
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Rechercher..."
                                            value={searchText}
                                            onChange={handleSearch}
                                            className="pl-8 w-full md:w-[300px]"
                                        />
                                    </div>
                                </div>
                            )
                        }
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
                </>
            )}
        </>
    );
}
