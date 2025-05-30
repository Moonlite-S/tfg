import { z } from "zod";
import { createSelectValidator } from "../Inputs/Utils/createSelectValidator";

// City schema

export const CitySchema = z.object({
    city: createSelectValidator(
        z.string(),
        "City is required"
    )
});
