import AxiosInstance from "@/axios"
import type { ModelListResponse } from "@/components/table/Interfaces/IModels";
import type { ModelListProps } from "@/components/table/Interfaces/IModels";

/**
 * Gets the total number of rows in a list
 * 
 * @param model the model to get the total number of rows for
 * @returns an object with the total number of rows
 */
export async function getTotalRows({ model}: {model: string}): Promise<number> {
    try {
        const response = await AxiosInstance.get('api/pagination/total_rows', { params: { model: model } })
        return response.data.total_pages;
        
    } catch (error) {
        console.error("Server Error: ", error)
        throw error
    }
}

/**
 * Gets the list of entries from the database for a given model with pagination
 * Used for the GenericTable component
 * 
 * @param page Current page number
 * @param per_page Number of items per page
 * @param model Model name to query
 * @param sortProps Sorting properties
 * @param filterProps Filter properties including multiple filter conditions
 * @returns Paginated model data with total count
 */
export async function getModelListPaginated<T>({page, per_page, model, sortProps, filterProps}: ModelListProps<T>): Promise<ModelListResponse<T>> {
    try {
        // Prepare filter parameters
        const filterParams: Record<string, string> = {}
        
        // Ensure filters array exists
        const filters = filterProps.filters || []

        // Only include active filters (those with non-empty filterText)
        const activeFilters = filters.filter(filter => filter.filterText.trim() !== "")

        // Add each active filter to the params with indexed keys
        activeFilters.forEach((filter, index) => {
            filterParams[`filter_by_${index}`] = filter.filterBy
            filterParams[`filter_text_${index}`] = filter.filterText
            filterParams[`filter_type_${index}`] = filter.filterType
        })
        
        const response = await AxiosInstance.get('api/pagination/get_model_data', {
            params: {
                page: page,
                per_page: per_page,
                model: model,
                sort_by: sortProps.selectedColumn.id,
                sort_order: sortProps.sortDirection,
                filter_count: activeFilters.length,
                ...filterParams
            }
        })
        return response.data
    } catch (error) {
        console.error("Server Error: ", error)
        throw error
    }
}