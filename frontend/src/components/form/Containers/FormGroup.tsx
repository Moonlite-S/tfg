import { cn } from "@/lib/utils"

/**
 * Groups Inputs in a grid 
 * 
 * By default, it will be 2 columns
 * @param children - The children to be grouped
 * @param grid_cols - The number of columns in the grid
 */
export function FormGroup({children, grid_cols = 2, className}: {children: React.ReactNode, grid_cols?: number, className?: string}) {
    return (
        <div className={cn("grid gap-4 items-center", `grid-cols-${grid_cols}`, className)}>
            {children}
        </div>
    )
}

export function FormChild({children, layout = "col", className}: {children: React.ReactNode, layout?: "col" | "row", className?: string}) {
    return (
        <div className={cn("flex gap-2", layout === "col" ? "flex-col" : "flex-row", className)}>
            {children}
        </div>
    )
}
