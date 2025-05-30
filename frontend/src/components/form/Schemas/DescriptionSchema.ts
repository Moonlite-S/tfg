import { z } from "zod";

// Description schema

export const DescriptionSchema = z.object({
    description: z.string().optional()
});
