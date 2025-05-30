import { styles } from "@/components/form/Utils/styles"
import { Controller, type FieldValues, type Control, type Path, type PathValue } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

type Option = {
    value: string
    label: string
}

type CreateSelectProps<TFormValues extends FieldValues> = {
    defaultValue?: string,
    options: Option[] | undefined,
    name: string,
    label?: string,
    onChange?: (e: unknown) => void,
    readonly?: boolean,
    className?: string,
    optional?: boolean,
    control: Control<TFormValues>
}

export function CreateSelect<TFormValues extends FieldValues>({
    defaultValue = "", // Can be either a value or a label
    options,
    name,
    label,
    className,
    optional = false,
    control
}: CreateSelectProps<TFormValues>) {
    if (!options) {
        options = [{ value: "", label: "" }]
    }

    // Find the default option based on the defaultValue
    const defaultOption = options.find((option) => option.value === defaultValue) || 
                         options.find((option) => option.label === defaultValue)

    // If no default option is found, create one from the defaultValue
    const initialValue = defaultOption || (defaultValue ? { value: defaultValue, label: defaultValue } : null)

    return (
        <div className={`flex flex-col justify-between ${className}`}>
            <label 
                data-testid={name} 
                id={`${name}-label`} 
                htmlFor={name} 
                className="py-2"
            >
                {optional ? "" : <span className="text-red-500">*</span>} {label}
            </label>

            <Controller
                control={control}
                name={name as Path<TFormValues>}
                defaultValue={initialValue as PathValue<TFormValues, Path<TFormValues>>}
                render={({ field: { onChange, value, ...field } }) => (
                    <CreatableSelect<Option> 
                        {...field}
                        data-testid={name}
                        inputId={name} 
                        aria-labelledby={`${name}-label`} 
                        defaultInputValue={initialValue?.label}
                        value={value} 
                        options={options} 
                        name={name} 
                        onChange={onChange}
                        placeholder="Search" 
                        isMulti={false} 
                        classNamePrefix="react-select"
                        styles={styles(false)}
                    />
                )}
            />
        </div>
    )
}