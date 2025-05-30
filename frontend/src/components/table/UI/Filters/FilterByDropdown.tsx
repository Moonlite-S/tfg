import type { FilterOption } from "../../Options/ModelOptions"

type BaseFilterSearchProps = string

type FilterByDropdownProps<T extends BaseFilterSearchProps> = {
    filterSearch: T
    setFilterSearch: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: FilterOption[]
}

/**
 * A Generic Filter Selection for the Tables
 *
 * Filter options are in the GenericTable file
 *
 * You also need to create the options array
 *
 * @param filterSearch - The current filter search
 * @param setFilterSearch - The function to set the filter search
 * @param options - The options to be displayed in { value: T, label: string } format
 * @returns A dropdown to filter by
 */

export function FilterByDropdown<T extends BaseFilterSearchProps>({
    filterSearch, setFilterSearch, options
}: FilterByDropdownProps<T>) {
    return (
            <select
                value={filterSearch}
                onChange={(e) => setFilterSearch(e)}
                className="w-full px-2 py-2 border-2 border-orange-200 rounded-xl bg-orange-50 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
    );
}
