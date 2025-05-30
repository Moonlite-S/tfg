/**
 * Hook for fetching data for form creation.
 * So like the data you find in the comboboxes.
 */
import { GeneralFormData, GeneralFormDataProjects, FormFetchDataProps } from "../Interfaces/FormFetchData"
import { API } from "../../API/API"
import { useCallback, useState } from "react"

type FormDataState = {
    projectManagers: FormFetchDataProps[]
    clients: FormFetchDataProps[]
    cities: string[]
    point_of_contacts: FormFetchDataProps[]
    projects: FormFetchDataProps[]
    categories: FormFetchDataProps[]
    templates: FormFetchDataProps[]
}

export function useFormData() {
    const [formData, setFormData] = useState<FormDataState>({
        projectManagers: [],
        clients: [],
        cities: [],
        projects: [],
        categories: [],
        templates: [],
        point_of_contacts: []
    })

    const fetchAllData = useCallback(async (): Promise<GeneralFormData> => {
        const response = await API.get<GeneralFormData>("api/form/fetch", { include_projects: true })

        if (response.operation == "COMPLETED" && response.data) {
            setFormData({
                projectManagers: response.data.users,
                clients: response.data.clients,
                cities: response.data.cities,
                projects: response.data.projects,
                point_of_contacts: response.data.point_of_contacts,
                categories: response.data.categories,
                templates: response.data.templates,
            })
        }
        return response.data
    }, [])

    // This one includes project related data like templates
    const fetchAllDataProject = useCallback(async (): Promise<GeneralFormDataProjects> => {
        const response = await API.get<GeneralFormDataProjects>("api/form/fetch", { include_projects: false, include_templates: true })

        if (response.operation == "COMPLETED" && response.data) {
            setFormData({
                projectManagers: response.data.users,
                clients: response.data.clients,
                cities: response.data.cities,
                projects: response.data.projects,
                point_of_contacts: response.data.point_of_contacts,
                categories: response.data.categories,
                templates: response.data.templates,
            })
        }

        return response.data
    }, [])

    const fetchQueryData = useCallback(async (queryParams: string) => {
        const response = await API.get<GeneralFormData>("api/form/fetch", { queryParams })
        return response.data
    }, [])

    return {
        ...formData,
        fetchAllData,
        fetchAllDataProject,
        fetchQueryData,
    }
}
