import { styles } from "@/components/form/Utils/styles"
import Select from "react-select"
import { Controller, type FieldValues, type Control, type Path, type PathValue } from "react-hook-form"

export type Option = {
    value: string
    label: string
}

type SearchSelect<TFormValues extends FieldValues> = {
    value?: string,
    multiple?: boolean, // Not used yet ; used for setting multiple values
    options: Option[] | undefined,
    name: string,
    label?: string, // Dumb hack due to the fact that some forms look different
    readonly?: boolean,
    className?: string,
    optional?: boolean,
    defaultInputValue?: string,
    control: Control<TFormValues>
}
export function SearchSelect<TFormValues extends FieldValues>({value: defaultValue = '', options, name, label, readonly, className, optional=false, control, defaultInputValue}: SearchSelect<TFormValues>){
    if (!options) {
        options = [{value: '', label: ''}]
        console.error("No options found for", name)
        return <div>No options found for {name}</div>
    }

    const defaultOption = options.find((option) => option.value === defaultValue)
    
    // This one is specifically for the manager (getting the email for defaultmanager)
    const defaultOptionValue = options.find((option) => option.label === defaultValue)?.value

    // If the default option value is not found, it will be undefined
    // This would cause an error if the manager's email is not found
    if (!defaultOptionValue) {
        // Kinda annoying to see in the console
        //console.warn("No default option value found for", name, "with options", options)
    }
    
    // Sets default to the defaultOption if it exists
    // if not, uses DefaultValue
    const selectDefaultValue = defaultOption || {value: defaultOptionValue || defaultValue, label: defaultValue}

    return (
        <div data-testid={name} className="flex flex-col justify-between">
            {label && <label id={`${name}-label`} htmlFor={name} className="py-2">{optional ? "" : <span className="text-red-500">*</span>} {label}:</label>}
            
            <Controller
                control={control}
                name={name as Path<TFormValues>}
                defaultValue={selectDefaultValue as PathValue<TFormValues, Path<TFormValues>>}
                render={({field: {onChange, value, ...field}}) => (
                    <Select<Option>
                        {...field}
                        aria-labelledby={`${name}-label`} 
                        defaultInputValue={defaultInputValue}
                        value={value || selectDefaultValue} 
                        onChange={onChange} 
                        options={options} 
                        name={name} 
                        placeholder="Search" 
                        classNamePrefix="react-select"
                        className={className}
                        styles = {styles(readonly ?? false)}
                    />
                )}
            />
        </div>
    )
}