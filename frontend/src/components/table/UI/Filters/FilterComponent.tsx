import { type FormEvent, useCallback, useState } from "react"
import { FilterByDropdown } from "./FilterByDropdown"
import type { FilterCondition } from '../../Interfaces/IFilterProps'
import { useDebounce } from "@/hooks/useDebounce"
import { FilterComponentWrapper } from "./FilterTypes/FilterComponentWrapper"
import type { FilterOption } from "../../Options/ModelOptions"
/**
 * Props for a single filter component
 */
type FilterProps = {
    filter: FilterCondition
    onFilterChange: (filter: FilterCondition) => void
    filterOptions: FilterOption[]
}

/**
 * Component for a single filter with dropdown and text input
 */
export function FilterComponent({ 
    filter, 
    onFilterChange, 
    filterOptions,
}: FilterProps) {

    const [filterText, setFilterText] = useState(filter.filterText)
    
    const { debounce } = useDebounce()

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onFilterChange({...filter, filterText: query})
        }, 500),
        [onFilterChange]
    )
    
    const handleFilterTextChange = (e: FormEvent<HTMLInputElement>) => {
        const newFilterText = (e.target as HTMLInputElement).value

        debouncedSearch(newFilterText)
        setFilterText(newFilterText)
    }

    const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilterBy = (e.target as HTMLSelectElement).value
        onFilterChange({...filter, filterBy: newFilterBy})
    }

    const handleOnRemoveFilter = () => {
        onFilterChange({...filter, filterText: ""})
        setFilterText("")
    }

    return (
        <div className="flex flex-col gap-2">
            <FilterByDropdown 
                filterSearch={filter.filterBy} 
                setFilterSearch={handleFilterByChange} 
                options={filterOptions} 
            />

            <div className="flex px-2 py-2 border-2 border-orange-200 bg-orange-50 rounded-xl dark:bg-stone-800 dark:text-white dark:border-stone-600">
                <FilterComponentWrapper
                    filter={filter}
                    filterType={filter.filterType}
                    filterText={filterText}
                    handleFilterTextChange={handleFilterTextChange}
                />

                {filterText && (
                    <button
                        type="button"
                        onClick={handleOnRemoveFilter}
                        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    )
}