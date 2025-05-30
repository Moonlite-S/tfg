import { useMemo, useEffect } from "react"
import DataTable, { Direction } from "react-data-table-component"
import type { IGenericTableProps } from "./Interfaces/IGenericTableProps"
import { customStyles } from "./Utils/customStyles"
import { useTableDirector } from "./Hooks/useTableDirector"
import { FilterContainer } from "./UI/Filters/FilterContainer"
import { Toaster } from "sonner"

/**
 * The Universal Table Component (created alongside the React Data Table Component by jbetancur)
 * 
 * This component now supports multiple filters that can be added and removed dynamically.
 * Each filter has its own field selection and search text.
 * 
 * @param model_name - The name of the model to be used for the pagination
 * @param columns - The columns to be used for the table
 * @param filterOptions - The options for the filters
 * @param expandableRowComponent - The component to be used for the expandable row when the user clicks the arrow
 * @param defaultSortFieldIndex - The index of the column to sort by default (defaults to 0)
 */
export function GenericTable<T>({ expandableRowComponent, model_name, defaultSortFieldIndex=0, filterOptions, columns, starting_filters=[], show_arrow=true }: IGenericTableProps<T>) {
    const { 
        tableProps, 
        sort, 
        filters,
        page, 
        updateTable, 
        setPerPageAndCache, 
        setPageNumber,
        handleSort, 
        handleUpdateFilter, 
        handleAddFilter, 
        handleRemoveFilter, 
    } = useTableDirector<T>({ columns, model: model_name, filterOptions, defaultSortFieldIndex, starting_filters })

    const { data, totalRows } = tableProps

    const filterSearchBox = useMemo(() => {
        return (
            <FilterContainer
                filters={filters.filters}
                onFilterChange={handleUpdateFilter}
                onRemoveFilter={handleRemoveFilter}
                filterOptions={filterOptions}
                onAddFilter={() => handleAddFilter(filterOptions)}
            />
        )
    }, [filters, filterOptions, handleUpdateFilter, handleRemoveFilter, handleAddFilter])

    useEffect(() => {
        updateTable()
    }, [page.page_number, page.per_page, sort, filters, updateTable])

    return(
        <>
            <DataTable
                data={data}
                columns={columns}
                direction={Direction.AUTO}
                progressPending={!tableProps.isDataLoaded}
                subHeaderComponent={filterSearchBox}
                fixedHeader
                fixedHeaderScrollHeight="1000px"
                expandableRowsComponent={expandableRowComponent}
                sortServer
                defaultSortFieldId={columns[defaultSortFieldIndex]?.id}
                defaultSortAsc={false}
                onSort={(selectedColumn, sortDirection) => handleSort(selectedColumn, sortDirection)}
                persistTableHead
                highlightOnHover
                expandableRows={show_arrow}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                subHeader
                onChangePage={setPageNumber}
                paginationPerPage={page.per_page}
                onChangeRowsPerPage={setPerPageAndCache}
                paginationRowsPerPageOptions={[10, 20, 50]}
                customStyles={customStyles}
            />
            {/* This toast will trigger on from components like the ExpandableRowComponent and such. This does nothing for the Table above */}
            <Toaster richColors expand/>
        </>
    )
}

// /**
//  * This is legeacy code, but look at the difference between this and the new code oh my god
//  *  hoooooolllyyyy shiiiiiiiiiiiiiiiit this is a mess
//  * 
//  * The Universal Table Component (created alongside the React Data Table Component by jbetancur)
//  * 
//  * This component now supports multiple filters that can be added and removed dynamically.
//  * Each filter has its own field selection and search text.
//  * 
//  * @param model_name - The name of the model to be used for the pagination
//  * @param columns - The columns to be used for the table
//  * @param filterOptions - The options for the filters
//  * @param expandableRowComponent - The component to be used for the expandable row when the user clicks the arrow
//  * @param defaultSortFieldIndex - The index of the column to sort by default (defaults to 0)
//  */
// export function GenericTable<T>({ expandableRowComponent, model_name, defaultSortFieldIndex=0, filterOptions, columns }: IGenericTableProps<T>) {
//     const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
//     const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false)
//     const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
//     const [totalRows, setTotalRows] = useState<number>(0)
//     const [sortProps, setSortProps] = useState<SortProps<T>>({
//         selectedColumn: columns[defaultSortFieldIndex],
//         sortDirection: "desc" as SortOrder,
//         per_page: parseInt(localStorage.getItem("per_page") || "10"),
//         current_page: 1
//     })
    
//     const [data, setData] = useState<T[]>([])
    
//     // Store the latest filter props to ensure we use the most up-to-date values in debounced functions
//     const filterPropsRef = useRef<FilterPageProps>({
//         filters: [],
//         isFilterOn: false
//     })
    
//     const [pageProps, setPageProps] = useState<PageProps>({
//         page: 1, 
//         per_page: parseInt(localStorage.getItem("per_page") || "10"), 
//         setPage: (page: number) => setPageProps({...pageProps, page})
//     })


//     const [filterProps, setFilterProps] = useState<FilterPageProps>({
//         filters: [],
//         isFilterOn: false
//     })
    
//     // Keep filterPropsRef in sync with filterProps
//     useEffect(() => {
//         filterPropsRef.current = filterProps
//     }, [filterProps])

//     /**
//      * Updates the table data based on current pagination, sorting, and filtering
//      */
//     const updateTable = async () => {
//         // Don't attempt to update if sortProps is not initialized yet
//         if (!sortProps) return
        
//         try {
//             // Create a copy of the current filter props with an empty array if no filters exist
//             const currentFilterProps = {
//                 ...filterPropsRef.current,
//                 filters: filterPropsRef.current.filters || [],
//                 isFilterOn: (filterPropsRef.current.filters || []).some(
//                     filter => filter.filterText.trim() !== ""
//                 )
//             }

//             // Use the current filter props from the ref to ensure we have the latest values
//             const data = await getModelListPaginated<T>({
//                 page: pageProps.page, 
//                 per_page: parseInt(localStorage.getItem("per_page") || "10"), 
//                 model: model_name, 
//                 sortProps: sortProps, 
//                 filterProps: currentFilterProps
//             })

//             setData(data.data as T[])
//             setTotalRows(data.total_rows)
//             setIsDataLoaded(true)
//         } catch (error) {
//             console.error("Failed to update table data:", error)
//             setIsDataLoaded(true)
//         }
//     }

//     /**
//      * Debounced function to update the table after filter changes
//      */
//     const debouncedUpdateTable = useCallback(() => {
//         // Don't attempt to update if sortProps is not initialized yet
//         if (!sortProps) return
        
//         // Clear any existing timer
//         if (debounceTimerRef.current) {
//             clearTimeout(debounceTimerRef.current)
//         }
        
//         // Set a new timer
//         debounceTimerRef.current = setTimeout(async () => {
//             // Ensure filters array exists
//             const filters = filterPropsRef.current.filters || []
            
//             // Check if any filters are active using the ref for latest values
//             const hasActiveFilters = filters.some(
//                 filter => filter.filterText.trim() !== ""
//             )
            
//             // Update filter state
//             setFilterProps(prev => ({
//                 ...prev,
//                 isFilterOn: hasActiveFilters
//             }))
            
//             // Reset to first page when filter changes
//             if (hasActiveFilters && pageProps.page !== 1) {
//                 setPageProps(prev => ({...prev, page: 1}))
//                 if (sortProps) {
//                     setSortProps(prev => {
//                         if (prev) {
//                             return {...prev, current_page: 1}
//                         }
//                         return prev
//                     })
//                 }
//             }
            
//             // Reset pagination toggle when filters change
//             setResetPaginationToggle(prev => !prev)
            
//             // Update table data
//             await updateTable()
            
//             debounceTimerRef.current = null
//         }, 1000)
//     }, [pageProps.page, sortProps])

//     /**
//      * Handles changes to filter text for a specific filter
//      */
//     const handleFilterTextChange = (id: string, value: string) => {
//         setFilterProps(prev => {
//             const updatedFilters = prev.filters.map(filter => 
//                 filter.id === id ? { ...filter, filterText: value } : filter
//             )
            
//             return {
//                 ...prev,
//                 filters: updatedFilters
//             }
//         })
        
//         debouncedUpdateTable()
//     }

//     /**
//      * Handles changes to the filter field selection for a specific filter
//      */
//     const handleFilterByChange = (id: string, value: string) => {
//         setFilterProps(prev => {
//             const updatedFilters = prev.filters.map(filter => 
//                 filter.id === id ? { ...filter, filterBy: value } : filter
//             )
            
//             return {
//                 ...prev,
//                 filters: updatedFilters
//             }
//         })
        
//         debouncedUpdateTable()
//     }

//     /**
//      * Clears a specific filter's text and immediately updates the table
//      */
//     const handleClearFilter = (id: string) => {
//         // Don't attempt to update if sortProps is not initialized yet
//         if (!sortProps) return
        
//         setFilterProps(prev => {
//             const updatedFilters = prev.filters.map(filter => 
//                 filter.id === id ? { ...filter, filterText: "" } : filter
//             )
            
//             // Update the ref immediately to ensure the latest value is used
//             filterPropsRef.current = {
//                 ...prev,
//                 filters: updatedFilters
//             }
            
//             return filterPropsRef.current
//         })
        
//         // Clear any existing timer to prevent race conditions
//         if (debounceTimerRef.current) {
//             clearTimeout(debounceTimerRef.current)
//             debounceTimerRef.current = null
//         }
        
//         // Immediately update the table without debouncing
//         setTimeout(async () => {
//             // Check if any filters are active
//             const hasActiveFilters = filterPropsRef.current.filters.some(
//                 filter => filter.filterText.trim() !== ""
//             )
            
//             // Update filter state
//             setFilterProps(prev => ({
//                 ...prev,
//                 isFilterOn: hasActiveFilters
//             }))
            
//             // Reset pagination toggle
//             setResetPaginationToggle(prev => !prev)
            
//             // Update table data
//             await updateTable()
//         }, 0)
//     }

//     /**
//      * Adds a new filter with default values
//      */
//     const handleAddFilter = () => {
//         const newFilter: FilterCondition = {
//             id: uuidv4(),
//             filterText: "",
//             filterBy: filterOptions.length > 0 ? filterOptions[0].value : ""
//         }
        
//         setFilterProps(prev => ({
//             ...prev,
//             filters: [...prev.filters, newFilter]
//         }))
//     }

//     /**
//      * Removes a specific filter by ID and immediately updates the table
//      */
//     const handleRemoveFilter = (id: string) => {
//         // Don't attempt to update if sortProps is not initialized yet
//         if (!sortProps) return
        
//         setFilterProps(prev => {
//             const updatedFilters = prev.filters.filter(filter => filter.id !== id)
            
//             // Update the ref immediately to ensure the latest value is used
//             filterPropsRef.current = {
//                 ...prev,
//                 filters: updatedFilters
//             }
            
//             return filterPropsRef.current
//         })
        
//         // Clear any existing timer to prevent race conditions
//         if (debounceTimerRef.current) {
//             clearTimeout(debounceTimerRef.current)
//             debounceTimerRef.current = null
//         }
        
//         // Immediately update the table without debouncing
//         setTimeout(async () => {
//             // Check if any filters are active
//             const hasActiveFilters = filterPropsRef.current.filters.some(
//                 filter => filter.filterText.trim() !== ""
//             )
            
//             // Update filter state
//             setFilterProps(prev => ({
//                 ...prev,
//                 isFilterOn: hasActiveFilters
//             }))
            
//             // Reset pagination toggle
//             setResetPaginationToggle(prev => !prev)
            
//             // Update table data
//             await updateTable()
//         }, 0)
//     }

//     // Create the filter search box component
//     const filterSearchBox = useMemo(() => {
//         return (
//             <FilterContainer 
//                 filters={filterProps.filters}
//                 onFilterTextChange={handleFilterTextChange}
//                 onFilterByChange={handleFilterByChange}
//                 onClearFilter={handleClearFilter}
//                 onAddFilter={handleAddFilter}
//                 onRemoveFilter={handleRemoveFilter}
//                 filterOptions={filterOptions}
//             />
//         )
//     }, [filterProps.filters, filterOptions])

//     // Handle Sorting
//     const onSort = async (selectedColumn: TableColumn<T>, sortDirection: SortOrder, per_page: number) => {
//         setSortProps({...sortProps, selectedColumn, sortDirection, per_page, current_page: pageProps.page})
//     }
  
//     const changePage = (page: number) => {
//         if (!sortProps) return
//         pageProps.setPage(page)
//         setSortProps({...sortProps, current_page: page})
//     }

//     const onChangeRowsPerPage = (per_page: number) => {
//         if (!sortProps) return
//         localStorage.setItem("per_page", per_page.toString())
//         setPageProps({...pageProps, per_page})
//         setSortProps({...sortProps, per_page})
//     }

//     // Update table data when sort or pagination changes
//     useEffect(() => {
//         if (sortProps) {
//             updateTable()
//         }
//     }, [sortProps, pageProps.page, pageProps.per_page])

//     // Clean up any pending debounce timers when component unmounts
//     useEffect(() => {
//         return () => {
//             if (debounceTimerRef.current) {
//                 clearTimeout(debounceTimerRef.current)
//             }
//         }
//     }, [])

//     // Don't render the DataTable until we have columns and sortProps
//     if (!sortProps || columns.length === 0) {
//         return <div className="flex items-center justify-center h-64">Loading table configuration...</div>
//     }

//     return(
//         <DataTable
//             data={data}
//             columns={columns}
//             direction={Direction.AUTO}
//             progressPending={!isDataLoaded}
//             subHeaderComponent={filterSearchBox}
//             expandableRowsComponent={expandableRowComponent}
//             paginationResetDefaultPage={resetPaginationToggle}
//             sortServer
//             defaultSortFieldId={columns[defaultSortFieldIndex]?.id}
//             defaultSortAsc={false}
//             onSort={(selectedColumn, sortDirection) => onSort(selectedColumn, sortDirection, pageProps.per_page)}
//             persistTableHead
//             highlightOnHover
//             expandableRows
//             selectableRows
//             pagination
//             paginationServer
//             paginationTotalRows={totalRows}
//             subHeader
//             onChangePage={changePage}
//             paginationPerPage={pageProps.per_page}
//             onChangeRowsPerPage={onChangeRowsPerPage}
//             paginationRowsPerPageOptions={[10, 20, 50]}
//             customStyles={customStyles}
//         />
//     )
// }


