import type { FilterComponentProps } from "./Interface/FilterComponentProps";

export function DateFilterComponent({ filter, filterText, handleFilterTextChange }: FilterComponentProps) {
    return (
        <input
            id={`search-${filter.id}`}
            type="date"
            placeholder="Search..."
            aria-label="Search input"
            value={filterText}
            onChange={handleFilterTextChange}
            className="bg-orange-50 rounded-xl dark:bg-stone-800 dark:text-white focus:outline-none" />
    );
}
