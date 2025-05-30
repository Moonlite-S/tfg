import type { FormEvent } from "react";
import type { FilterCondition } from "../../../../Interfaces/IFilterProps";


export type FilterComponentProps = {
    filter: FilterCondition;
    filterType: string;
    filterText: string;
    handleFilterTextChange: (e: FormEvent<HTMLInputElement>) => void;
};
