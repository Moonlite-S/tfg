import { useState, useCallback } from "react";
import type { TableColumn, SortOrder } from "react-data-table-component";
import { useSort } from "./useSort";
import { useFilter } from "./useFilter";
import { usePageControls } from "./usePageControls";
import { getModelListPaginated } from "@/api/pagination";
import type { FilterGroupedProps, FilterCondition } from "../Interfaces/IFilterProps";
import type { FilterOption } from "../Options/ModelOptions";

type TableProps<T> = {
    columns: TableColumn<T>[]
    data: T[]
    totalRows: number
    model: string
    filters: FilterGroupedProps
    filterOptions: FilterOption[]
    isDataLoaded: boolean
}

type TableDirectorProps<T> = {
    columns: TableColumn<T>[]
    filterOptions: FilterOption[]
    model: string
    defaultSortFieldIndex: number
    starting_filters: FilterCondition[]
}

/**
 * This hook acts as a director for the table state and user actions
 * 
 * I AM SO FUCKING PROUD OF THIS 
 * 
 * @param columns - The columns to be used for the table
 * @param model - The model to be used for the table
 * @param filterOptions - The options for the filters
 */
export function useTableDirector<T>({ columns, model, filterOptions, defaultSortFieldIndex=0, starting_filters=[] }: TableDirectorProps<T>) {
    const [tableProps, setTableProps] = useState<TableProps<T>>({
        columns: columns,
        data: [],
        totalRows: 0,
        model: model,
        filters: {
            isFilterOn: false,
            filters: []
        },
        filterOptions: filterOptions,
        isDataLoaded: false
    })

    const { sort, setSortBy, setSortDirection } = useSort<T>({ column: tableProps.columns[defaultSortFieldIndex] })
    const { filters, addFilter, removeFilter, clearFilters, updateFilter } = useFilter({ starting_filters, filterOptions })
    const { page, setPageNumber, setPerPageAndCache } = usePageControls()

    const handleSort = useCallback((column: TableColumn<T>, direction: SortOrder) => {
        setSortBy(column)
        setSortDirection(direction)

        setPageNumber(1)
    }, [setSortBy, setSortDirection, setPageNumber])

    const handleUpdateFilter = useCallback((filter: FilterCondition) => {
        updateFilter(filter)
        setPageNumber(1)
    }, [updateFilter, setPageNumber])

    const handleAddFilter = useCallback((filterOptions: FilterOption[]) => {
        addFilter(filterOptions)

        setPageNumber(1)
    }, [addFilter, setPageNumber])

    const handleClearFilters = useCallback(() => {
        clearFilters()

        setPageNumber(1)
    }, [clearFilters, setPageNumber])

    const handleRemoveFilter = useCallback((filter: FilterCondition) => {
        removeFilter(filter)

        setPageNumber(1)
    }, [removeFilter, setPageNumber])

    const updateTable = useCallback(async () => {
        const data = await getModelListPaginated({
            page: page.page_number,
            per_page: page.per_page,
            model: tableProps.model,
            sortProps: sort,
            filterProps: filters
        })

        setTableProps({
            ...tableProps,
            data: data.data,
            totalRows: data.total_rows,
            isDataLoaded: true
        })
    }, [tableProps.model, page.page_number, page.per_page, sort, filters])

    return {
        tableProps,
        sort,
        filters,
        page,
        setPageNumber,
        updateTable,
        setPerPageAndCache,
        handleSort,
        handleUpdateFilter,
        handleAddFilter,
        handleClearFilters,
        handleRemoveFilter,
    }
}
