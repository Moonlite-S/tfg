import { z } from "zod";
import { createSelectValidator } from "../Inputs/Utils/createSelectValidator";

export const CategorySchema = z.object({
    category: createSelectValidator(
        z.string().min(1, "Category is required"),
        "Category is required"
    ).optional()
})