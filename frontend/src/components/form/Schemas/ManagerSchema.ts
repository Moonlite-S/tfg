import { z } from "zod";
import { createSelectValidator } from "../Inputs/Utils/createSelectValidator";

// Manager schema

// For Project Form
export const ManagerSchema = z.object({
    manager: createSelectValidator(
        z.string().email("Invalid email format"),
        "Manager is required"
    ).optional()
})

// For Invoice
export const UserSchema = z.object({
    user_sent_by_name: createSelectValidator(
        z.string().email("Invalid email format"),
        "User is required"
    ).optional()
})

export const AssignedToSchema = z.object({
    assigned_to: createSelectValidator(
        z.string().email("Invalid email format"),
        "User is required"
    ).optional()
})

export const AssignedBySchema = z.object({
    assigned_by: createSelectValidator(
        z.string().email("Invalid email format"),
        "User is required"
    ).optional()
})

// Specifically for the RFI form cuz i suck at consistently naming things
export const CreatedBySchema = z.object({
    created_by: createSelectValidator(
        z.string().email("Invalid email format"),
        "User is required"
    ).optional()
})