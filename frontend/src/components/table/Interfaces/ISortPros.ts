import type { TableColumn, SortOrder } from "react-data-table-component"

// Used to keep track of the current sort column and direction
export type SortProps<T> = {
    selectedColumn: TableColumn<T>
    sortDirection: SortOrder
}