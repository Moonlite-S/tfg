
export type IGenericTable<T> = {
    expandableRowComponent: React.ComponentType<{ data: T; }>;
    model_name: string; // This will get the data and the columns from the model
    show_arrow?: boolean;
}
