export type ProjectProps = {
    project_id: string;
    project_name: string;
    client?: string;
    manager?: string;
    consulting_fee?: number;
    folder_location?: string;
    status: string;
    created_at: string;
    updated_at: string;
}