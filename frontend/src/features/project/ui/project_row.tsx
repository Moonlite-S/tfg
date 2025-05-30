import type { ProjectProps } from "@/components/interface/project_types"

export function ProjectRow({ data }: { data: ProjectProps }) {
    return (
        <div className="w-full h-full p-4 border rounded-lg">
            <h1>Project Row</h1>

            <p>{data.project_name}</p>
        </div>
    )
}