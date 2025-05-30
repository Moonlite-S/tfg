import type { TableColumn } from "react-data-table-component";
import type { FilterOption } from "../Options/ModelOptions";
import type { FilterCondition } from "./IFilterProps";


export type IGenericTableProps<T> = {
    expandableRowComponent: React.ComponentType<{ data: T; }>;
    model_name: string;
    className?: string;
    defaultSortFieldIndex?: number;
    filterOptions: FilterOption[];
    columns: TableColumn<T>[];
    starting_filters?: FilterCondition[];
    show_arrow?: boolean;
};
