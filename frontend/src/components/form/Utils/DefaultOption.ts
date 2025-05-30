import { FormFetchDataProps } from "../Interfaces/FormFetchData"

export function getDefaultOption(options: FormFetchDataProps[], value: string, fallback_value?: string) {
    let defaultOption = options.find((option) => option.value === value)
    if (!defaultOption) {
        defaultOption = options.find((option) => option.label === fallback_value) || options.find((option) => option.value === fallback_value)
    }
    return defaultOption
}

export function getDefaultOptionString(options: string[], value: string, fallback_value?: string) {
    let defaultOption = options.find((option) => option === value)
    
    if (!defaultOption) {
        defaultOption = fallback_value
    }
    return defaultOption
}