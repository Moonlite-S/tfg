
/**
 * This is the format given when fetching data for form creatoion like 
 * (user names, emails), clients, projects, etc.
 * 
 * @param label : The label of the data
 * @param value : The value of the data
 */
export type FormFetchDataProps = {
    label: string,
    value: string,
}

export type GeneralFormData = {
    templates: FormFetchDataProps[]
    users: FormFetchDataProps[], // User names and emails
    clients: FormFetchDataProps[],
    cities: string[],
    point_of_contacts: FormFetchDataProps[],
    projects: FormFetchDataProps[],
    categories: FormFetchDataProps[],
}

export type GeneralFormDataProjects = GeneralFormData & {
    templates: FormFetchDataProps[],
}