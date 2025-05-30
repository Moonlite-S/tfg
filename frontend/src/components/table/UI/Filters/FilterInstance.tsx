import type { FilterCondition } from "../../Interfaces/IFilterProps"
import type { FilterOption } from "../../Options/ModelOptions"
import { FilterComponent } from "./FilterComponent"

export type FilterInstanceProps = {
    filter: FilterCondition
    onFilterChange: (filter: FilterCondition) => void
    onRemoveFilter: (filter: FilterCondition) => void
    filterOptions: FilterOption[]
}

/**
 * Component that holds a filter component and a remove button
 */
export function FilterInstance({ filter, onFilterChange, onRemoveFilter, filterOptions }: FilterInstanceProps) {
    return (
        <div className="flex items-center p-2 duration-300 bg-slate-100 dark:bg-stone-700 rounded-xl">
            <FilterComponent
                filter={filter}
                onFilterChange={onFilterChange}
                filterOptions={filterOptions} />
                
            <button
                className="h-full px-2 py-6 ml-2 transition-all duration-300 bg-red-200 rounded-lg hover:bg-red-300 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                onClick={() => onRemoveFilter(filter)}
                aria-label="Remove filter"
            >
                ✕
            </button>
        </div>
    );
}
