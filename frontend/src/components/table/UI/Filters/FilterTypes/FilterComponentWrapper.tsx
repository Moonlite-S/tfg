import { filterComponentRegistry } from "./Registry"
import type { FilterComponentProps } from "./Interface/FilterComponentProps"
import { FilterType } from "./Interface/FilterType"
import { TextFilterComponent } from "./TextFilterComponent"


export function FilterComponentWrapper({ filter, filterType, filterText, handleFilterTextChange }: FilterComponentProps) {
    const determineFilterType = (filterType: string): FilterType => {
        if (filterType === "date") return FilterType.DATE
        if (filterType === "number") return FilterType.NUMBER
        return FilterType.TEXT
    }

    const type = determineFilterType(filterType)
    const ComponentToRender = filterComponentRegistry[type]

    if (!ComponentToRender) {
        console.warn(`No component found for filter type: ${type}`)
        return <TextFilterComponent key={FilterType.TEXT} filter={filter} filterType={filterType} filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
    }

    return <ComponentToRender key={type} filter={filter} filterType={filterType} filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
}
