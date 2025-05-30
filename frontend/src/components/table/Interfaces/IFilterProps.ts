
/**
 * Represents a single filter condition
 * 
 * filterText: The text that will be queried
 * filterBy: The field that will be filtered by
 * filterType: The type of filter that will be used (used for the API backend)
 */

export type FilterCondition = {
    id: string
    filterText: string
    filterBy: string
    filterType: string
}

/**
 * Contains all filter conditions and filter state
 */
export type FilterGroupedProps = {
    isFilterOn: boolean
    filters: FilterCondition[]
}