import { z } from "zod";
import { createOptionalSelectValidator } from "../Inputs/Utils/createSelectValidator";

// Point of contact schema

export const ContactSchema = z.object({
    point_of_contact: createOptionalSelectValidator(
        z.string(),
    )
});
