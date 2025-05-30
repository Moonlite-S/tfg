import { GenericTableFactory } from "@/components/table/Classes/Factory"

export function ProjectTableList() {
    const projectTable = GenericTableFactory.createProjectTable()

    return (
        <div className="w-full h-full p-4 border rounded-lg">
            <h1>Project Table List</h1>

            {projectTable.RenderTable()}
        </div>
    )
}