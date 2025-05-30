import { ProjectTable } from "./ModelTables"
import type { GenericTableClass } from "./GenericTableClass"
import type { ProjectProps } from "@/components/interface/project_types"
import { ProjectRow } from "@/features/project/ui/project_row"

/**
 * ### Factory class for creating tables
 * 
 * Creates tables based on the model name
 * The data and columns are defined the Options folder.
 */
export class GenericTableFactory {
    static createProjectTable(): GenericTableClass<ProjectProps> {
        return new ProjectTable({
            expandableRowComponent: (props: any) => <ProjectRow data={props.data}/>,
            model_name: "project",
            show_arrow: true,
        })
    }
}