// Custom validator for React Select components

import { z } from "zod";

// Used for showing errors when the user doesn't select an option
// Use this for the CreateSelect and SearchSelect components
// or else they will show no errors when the user doesn't select an option
// == MAKE SURE BOTH EMAIL AND NAME ARE IN DEFAULTS OR ELSE THE DEFAULT VALUE DOESN'T WORK [when working with User model] ==

// @param schema: The schema to validate the value against (for our uses, it's usually just z.string())
// @param errorMessage: The error message to show when the value is not valid

// Required select validator - shows error when no option is selected
export const createSelectValidator = <T extends z.ZodTypeAny>(
    schema: T,
    errorMessage: string
) => {
    return z.object({
        value: schema,
        label: z.string()
    }).nullable().superRefine((val, ctx) => {
        if (!val || val.value === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: errorMessage,
                fatal: true
            });
        }
    });
};

// Optional select validator - allows null/undefined values
export const createOptionalSelectValidator = <T extends z.ZodTypeAny>(
    schema: T
) => {
    return z.object({
        value: schema,
        label: z.string()
    }).nullable().optional()
};
