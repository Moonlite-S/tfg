import { z } from "zod";
import { createSelectValidator } from "../Inputs/Utils/createSelectValidator";

// Template schema

export const TemplateSchema = z.object({
    template: createSelectValidator(
        z.string(),
        "Template is required"
    ).optional()
});
