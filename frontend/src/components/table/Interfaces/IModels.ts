import type { FilterGroupedProps } from "./IFilterProps";
import type { SortProps } from "./ISortPros";


// Types for the getModelListPaginated function in the pagination.ts file

export type ModelListProps<T> = {
    page: number
    per_page: number
    model: string
    sortProps: SortProps<T>
    filterProps: FilterGroupedProps
}

export type ModelListResponse<T> = {
    data: T[]
    num_pages: number
    current_page: number
    total_rows: number
}

