// Types for the columns of the GenericTable component
// Change this if you want to add, remove, or modify columns shown in the tables for each model

import type { TableColumn } from "react-data-table-component"
import type { ProjectProps } from "@/components/interface/project_types"
import { openFolder } from "@/components/openFolder"

export const PROJECT_COLUMNS: TableColumn<ProjectProps>[] = [
    { name: "Project ID", width: "10rem", id: "project_id", selector: (row: ProjectProps) => row.project_id ?? "N/A", sortable: true, cell: (row: ProjectProps) => <div className="text-blue-500 cursor-pointer hover:text-blue-600 text-underline" onClick={() => openFolder(row.folder_location || "")}>{row.project_id?.split('-')[0]}</div> },
    { name: "Project Name", id: "project_name", selector: (row: ProjectProps) => row.project_name, sortable: true, cell: (row: ProjectProps) => <div className="">{row.project_name}</div> },
    // { name: "Download Files", id: "download_files", cell: (row: ProjectProps) => <div className="text-blue-500 cursor-pointer hover:text-blue-600 text-underline" onClick={() => openFolder(row.folder_location || "")}>Download</div> },
    { name: "Client Name", id: "client_name", selector: (row: ProjectProps) => row.client ?? "N/A", sortable: true, cell: (row: ProjectProps) => <div className="">{row.client}</div> },
    { name: "Manager", id: "manager", selector: (row: ProjectProps) => row.manager ?? "N/A", sortable: true, cell: (row: ProjectProps) => <div className="">{row.manager}</div> },
    { name: "Status", id: "status", selector: (row: ProjectProps) => row.status ?? "N/A",
        conditionalCellStyles: [
            { 
                when: (row: ProjectProps) => row.status === "Active", 
                style: { 
                    backgroundColor: "var(--status-active)"
                } 
            },
            { 
                when: (row: ProjectProps) => row.status === "Hold", 
                style: { 
                    backgroundColor: "var(--status-hold)"
                } 
            },
            { 
                when: (row: ProjectProps) => row.status === "Review", 
                style: { 
                    backgroundColor: "var(--status-review)"
                } 
            },
            { 
                when: (row: ProjectProps) => row.status === "Completed", 
                style: { 
                    backgroundColor: "var(--status-completed)"
                } 
            },
        ],
        sortable: true, cell: (row: ProjectProps) => <div className="">{row.status}</div>, width: "10rem", },
]