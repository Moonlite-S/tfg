import { TextFilterComponent } from "./TextFilterComponent"
import { DateFilterComponent } from "./DateFilterComponent"
import { NumberFilterComponent } from "./NumberFilterComponent"
import { FilterType } from "./Interface/FilterType"
import type { FilterComponentProps } from "./Interface/FilterComponentProps"

// This is a registry of filter components for each filter type
// So whenever you want to add a new filter type, you can just add it here
export const filterComponentRegistry: Record<FilterType, React.FC<FilterComponentProps>> = {
    [FilterType.DATE]: DateFilterComponent,
    [FilterType.NUMBER]: NumberFilterComponent,
    [FilterType.TEXT]: TextFilterComponent
}