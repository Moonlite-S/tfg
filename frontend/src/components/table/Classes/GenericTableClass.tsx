import type { IGenericTable } from "../Interfaces/IGenericTable"

/**
 * Base class for all tables
 * 
 * @param T - The type of the data to be displayed in the table
 */
export abstract class GenericTableClass<T> implements IGenericTable<T> {
    expandableRowComponent: React.ComponentType<{ data: T }>
    model_name: string
    show_arrow?: boolean
    
    constructor(props: IGenericTable<T>) {
        this.expandableRowComponent = props.expandableRowComponent
        this.model_name = props.model_name
        this.show_arrow = props.show_arrow
    }

    abstract RenderTable(): React.ReactNode
}