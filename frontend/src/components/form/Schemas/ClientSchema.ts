import { z } from "zod";
import { createOptionalSelectValidator, createSelectValidator } from "../Inputs/Utils/createSelectValidator";

// Client schema

export const ClientSchema = z.object({
    client_name: createOptionalSelectValidator(
        z.string(),
    )
});

export const RequiredClientSchema = z.object({
    client_name: createSelectValidator(
        z.string(),
        "Client is required"
    )
});