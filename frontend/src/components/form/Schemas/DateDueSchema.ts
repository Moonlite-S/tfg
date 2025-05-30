import { z } from "zod";

// Date due schema

export const DateDueSchema = z.object({
    no_date_due: z.boolean().optional()
});
