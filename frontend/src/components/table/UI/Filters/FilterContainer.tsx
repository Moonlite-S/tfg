import { AddFilterButton } from "./AddFilterButton";
import { Filters } from "./Filters";
import { type FilterCondition } from "../../Interfaces/IFilterProps";
import { type FilterOption } from "../../Options/ModelOptions";
/**
 * Props for the filter container that manages multiple filters
 */
export type FilterContainerProps = {
    filters: FilterCondition[]
    onFilterChange: (filter: FilterCondition) => void
    onAddFilter: () => void
    onRemoveFilter: (filter: FilterCondition) => void
    filterOptions: FilterOption[]
}

/**
 * Container component that manages multiple filter components
 */
export function FilterContainer({
    filters, onFilterChange, onAddFilter, onRemoveFilter, filterOptions
}: FilterContainerProps) {
    return (
        <div className="flex flex-row items-center justify-end w-full gap-3 m-4">
            <Filters
                filters={filters}
                onFilterChange={onFilterChange}
                onRemoveFilter={onRemoveFilter}
                filterOptions={filterOptions}
            />

            <AddFilterButton
                onAddFilter={onAddFilter}
            />
        </div>
    );
}
