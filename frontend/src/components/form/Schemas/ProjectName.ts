import { z } from "zod";

// Project name schema
export const ProjectNameSchema = z.object({
    project_name: z.string().min(1, "Project name is required")
        .max(150, "Project name must be less than 150 characters")
})