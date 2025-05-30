// Types for the filter options of the GenericTable component

export type FilterOption = {
    value: string // Make sure this value matches the field in the database (For Foreign keys, use the field__field_name)
    label: string
    type: "string" | "number" | "date" | "boolean" // Might use this for the API backend
}

// type FilterTypes = "string" | "number" | "date" | "boolean" | "select"

export const PROJECT_FILTER_OPTIONS: FilterOption[] = [
    { value: "project_name", label: "Project Name", type: "string" },
    { value: "project_id", label: "Project ID", type: "string" },
    { value: "client_name", label: "Client Name", type: "string" },
    { value: "manager__name", label: "Manager", type: "string" },
    { value: "template", label: "Type", type: "string" },
    { value: "city", label: "City", type: "string" },
    { value: "status", label: "Status", type: "string" },
    { value: "project_size", label: "Size", type: "number" },
]

export const INVOICE_FILTER_OPTIONS: FilterOption[] = [
    { value: "project_id_id", label: "Project Name", type: "string" },
    { value: "payment_status", label: "Payment Status", type: "string" },
    { value: "payment_amount", label: "Payment Amount", type: "number" },
    { value: "invoice_date", label: "Invoice Date", type: "date" },
]
export const SUBMITTAL_FILTER_OPTIONS: FilterOption[] = [
    { value: "project__project_name", label: "Project Name", type: "string" },
    { value: "status", label: "Status", type: "string" },
    { value: "category", label: "Category", type: "string" },
    { value: "received_date", label: "Date Received", type: "date" },
]
export const TASK_FILTER_OPTIONS: FilterOption[] = [
    { value: "title", label: "Title", type: "string" },
    { value: "assigned_by__name", label: "Assigned By", type: "string" },
    { value: "assigned_to__name", label: "Assigned To", type: "string" },
    { value: "project_id__project_name", label: "Project Name", type: "string" },
    { value: "due_date", label: "Due Date", type: "date" },
    { value: "status", label: "Status", type: "string" },
]

export const RFI_FILTER_OPTIONS: FilterOption[] = [
    { value: "project__project_name", label: "Project Name", type: "string" },
    { value: "status", label: "Status", type: "string" },
    { value: "date_received", label: "Date Received", type: "date" },
    { value: "category", label: "Category", type: "string" },
    { value: "created_by__name", label: "Created By", type: "string" },
    { value: "assigned_to__name", label: "Assigned To", type: "string" },
]

export const EMPLOYEE_FILTER_OPTIONS: FilterOption[] = [
    { value: "name", label: "Name", type: "string" },
    { value: "email", label: "Email", type: "string" },
    { value: "role", label: "Role", type: "string" },
]

export const ASSIGNMENT_FILTER_OPTIONS: FilterOption[] = [
    { value: "title", label: "Title", type: "string" },
    { value: "assigned_to__name", label: "Assigned To", type: "string" },
    { value: "assigned_by__name", label: "Assigned By", type: "string" },
]

export const CLIENT_FILTER_OPTIONS: FilterOption[] = [
    { value: "name", label: "Name", type: "string" },
    { value: "email", label: "Email", type: "string" },
    { value: "phone_number", label: "Phone Number", type: "string" },
    { value: "city", label: "City", type: "string" },
    { value: "state", label: "State", type: "string" },
    { value: "postal_code", label: "Postal Code", type: "string" },
]

export const POINT_OF_CONTACT_FILTER_OPTIONS: FilterOption[] = [
    { value: "name", label: "Name", type: "string" },
    { value: "email", label: "Email", type: "string" },
    { value: "phone_number", label: "Phone Number", type: "string" },
    { value: "assigned_client__name", label: "Assigned Client", type: "string" },
]
