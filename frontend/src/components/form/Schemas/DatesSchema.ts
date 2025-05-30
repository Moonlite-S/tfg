import { z } from "zod";

// Dates schema

export const DatesSchema = z.object({
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.union([z.string(), z.undefined(), z.null()]).transform(val => val === '' || val === null || val === undefined ? undefined : val
    ).optional()
});
