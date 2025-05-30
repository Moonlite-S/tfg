import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import type { FilterCondition, FilterGroupedProps } from "../Interfaces/IFilterProps"
import type { FilterOption } from "../Options/ModelOptions"

/**
 * A custom React hook for managing filter conditions in a table component.
 * 
 * This hook provides functionality to:
 * - Start with a list of filters
 * - Add new filters with unique UUIDs
 * - Remove existing filters
 * - Update filter conditions
 * - Track filter state
 * 
 * @example
 * const { filters, addFilter, removeFilter, updateFilter } = useFilter({
 *   starting_filters: [
 *     { id: 'test-uuid-1', filterText: '', filterBy: 'name', filterType: 'string' }
 *   ],
 *   filterOptions: [
 *     { value: 'name', label: 'Name', type: 'string' }
 *   ]
 * });
 */

export function useFilter({ starting_filters, filterOptions }: { starting_filters?: FilterCondition[], filterOptions: FilterOption[] }) {
    const [filters, setFilters] = useState<FilterGroupedProps>({
        isFilterOn: false, // Honestly not really in use anymore
        filters: starting_filters ?? []
    })

    // Just adds a filter with the first option from the filterOptions array
    const addFilter = (filterOptions: FilterOption[]) => {
        const filter: FilterCondition = {
            id: uuidv4(),
            filterText: "",
            filterBy: filterOptions[0].value,
            filterType: filterOptions[0].type
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            isFilterOn: true,
            filters: [...prevFilters.filters, filter]
        }))
    }

    const removeFilter = (filter: FilterCondition) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            filters: prevFilters.filters.filter(f => f.id !== filter.id)
        }))

        if (filters.filters.length === 0) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                isFilterOn: false
            }))
        }
    }

    const updateFilter = useCallback((filter: FilterCondition) => {
        // I could find the filterBy to get the type instead of having to pass it in
        const filterBy = filter.filterBy
        const filterType = filterOptions.find(f => f.value === filterBy)?.type as string

        setFilters((prevFilters) => ({
            ...prevFilters,
            isFilterOn: true,
            filters: prevFilters.filters.map(f => 
                f.id === filter.id 
                    ? { ...f, filterText: filter.filterText, filterBy: filter.filterBy, filterType: filterType }
                    : f
            )
        }))
    }, [filterOptions])

    const clearFilters = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            isFilterOn: false,
            filters: []
        }))
    }

    return {
        filters,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters
    }
}
