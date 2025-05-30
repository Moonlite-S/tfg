import { useState } from "react";
import type { SortProps } from "../Interfaces/ISortPros";
import type { SortOrder, TableColumn } from "react-data-table-component";

export function useSort<T>({ column } : { column: TableColumn<T> }) {
    const [sort, setSort] = useState<SortProps<T>>({
        selectedColumn: column,
        sortDirection: "desc" as SortOrder,
    })

    const setSortBy = (column: TableColumn<T>) => {
        setSort(prev => ({...prev, selectedColumn: column}))
    }

    const setSortDirection = (direction: SortOrder) => {
        setSort(prev => ({...prev, sortDirection: direction}))
    }

    const getSortDirection = () => {
        return sort.sortDirection
    }

    return {
        sort,
        setSortBy,
        setSortDirection,
        getSortDirection
    }    
}

