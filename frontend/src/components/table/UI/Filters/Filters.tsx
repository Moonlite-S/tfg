import type { FilterCondition } from "../../Interfaces/IFilterProps";
import { FilterInstance } from "./FilterInstance";
import type { FilterOption } from "../../Options/ModelOptions";

export type FiltersProps = {   
    filters: FilterCondition[]
    onFilterChange: (filter: FilterCondition) => void
    onRemoveFilter: (filter: FilterCondition) => void
    filterOptions: FilterOption[]
}

/**
 * A collection of filters
 * 
 * @param filters - The filters to be displayed
 * @param onFilterChange - The function to call when a filter changes
 * @param onRemoveFilter - The function to call when a filter is removed
 * @param filterOptions - The options to be displayed in { value: string, label: string } format
 * @returns A collection of filters
 */
export function Filters({ filters, onFilterChange, onRemoveFilter, filterOptions }: FiltersProps) {
    return (
        <div className="flex flex-row flex-wrap justify-end w-full gap-2">
            {filters.length === 0 ? (
                <div className="flex items-center justify-center w-full">
                    <span className="text-gray-500 dark:text-gray-400">
                        No filters applied. Click "Add Filter" to start filtering.
                    </span>
                </div>
            ) : (
                filters.map((filter) => (
                    <FilterInstance
                        key={filter.id}
                        filter={filter}
                        onFilterChange={onFilterChange}
                        onRemoveFilter={onRemoveFilter}
                        filterOptions={filterOptions}
                    />
                ))
            )}
        </div>
    );
}


