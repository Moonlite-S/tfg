import { z } from "zod";
import { createSelectValidator } from "../Inputs/Utils/createSelectValidator";

export const PROJECT_STATUS = [
    "Active",
    "Hold",
    "Review",
    "Not Started",
    "Completed",
    "Cancelled"
] as const

export const STATUS = [
    "Active",
    "Closed"
] as const

// Status schema
export const ProjectStatusSchema = z.object({
    status: createSelectValidator(
        z.enum(PROJECT_STATUS),
        "Status is required"
    ).optional()
});

export const StatusSchema = z.object({
    status: createSelectValidator(
        z.enum(STATUS),
        "Status is required"
    )
});