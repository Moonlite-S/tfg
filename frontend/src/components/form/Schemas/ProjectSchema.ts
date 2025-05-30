import { createOptionalSelectValidator, createSelectValidator } from "../Inputs/Utils/createSelectValidator";
import { z } from "zod";

export const ProjectSchema = z.object({
    project: createSelectValidator(
        z.string().min(1, "Project is required"),
        "Project is required"
    )
})

export const ProjectSchemaOptional = z.object({
    project: createOptionalSelectValidator(
        z.string().optional(),
    )
})

export const ProjectIDSchema = z.object({
    project_id: createSelectValidator(
        z.string().min(1, "Project is required"),
        "Project is required"
    )
})