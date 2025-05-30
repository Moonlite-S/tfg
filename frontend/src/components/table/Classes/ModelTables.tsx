import { GenericTable } from "../GenericTable"
import { GenericTableClass } from "./GenericTableClass"
import type { IGenericTable } from "../Interfaces/IGenericTable"
import { PROJECT_COLUMNS } from "../Options/ModelColumns"
import { PROJECT_FILTER_OPTIONS } from "../Options/ModelOptions"
import type { ProjectProps } from "@/components/interface/project_types"
import { v4 as uuidv4 } from "uuid"

export class ProjectTable extends GenericTableClass<ProjectProps> {
    constructor(props: IGenericTable<ProjectProps>) {
        super(props)
    }   

    RenderTable(): React.ReactNode {
        return <GenericTable<ProjectProps>
            expandableRowComponent={this.expandableRowComponent}
            model_name={this.model_name}
            defaultSortFieldIndex={0}
            filterOptions={PROJECT_FILTER_OPTIONS}
            columns={PROJECT_COLUMNS}
            starting_filters={[
                {
                    id: uuidv4(),
                    filterBy: "project_name",
                    filterText: "",
                    filterType: "string",
                }
            ]}
        />
    }
}